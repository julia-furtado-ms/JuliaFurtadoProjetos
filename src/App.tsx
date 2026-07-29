import React, { useState, useEffect } from 'react';
import { INITIAL_PROJECTS } from './data/mockProjects';
import { Project } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ProjectDetailView } from './components/ProjectDetailView';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { AdminView } from './components/AdminView';
import { AdminLoginModal } from './components/AdminLoginModal';
import { DirectImageLinksModal } from './components/DirectImageLinksModal';
import { ProjectModal } from './components/ProjectModal';
import { ManifestoModal } from './components/ManifestoModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'contact' | 'admin'>('home');
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return JSON.parse(localStorage.getItem('julia_furtado_admin_authenticated_v1') || 'false');
    } catch {
      return false;
    }
  });
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [adminLoginError, setAdminLoginError] = useState<string | null>(null);

  // Initialize projects state with local storage fallback
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('julia_furtado_projects_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Failed to load projects from localStorage:', err);
    }
    return INITIAL_PROJECTS;
  });

  // Modals state
  const [isImageLinksModalOpen, setIsImageLinksModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isManifestoModalOpen, setIsManifestoModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const ADMIN_ACCESS_PASSWORD = 'minha-senha-secreta';

  // Persist projects to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('julia_furtado_projects_v1', JSON.stringify(projects));
    } catch (err) {
      console.warn('Failed to save projects to localStorage:', err);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem('julia_furtado_admin_authenticated_v1', JSON.stringify(isAdminAuthenticated));
    } catch (err) {
      console.warn('Failed to save admin auth state:', err);
    }
  }, [isAdminAuthenticated]);

  // Selected project calculation
  const selectedProject = projects.find((p: { slug: any; }) => p.slug === selectedProjectSlug);

  // CRUD Actions
  const handleSaveProject = (projectData: Partial<Project>) => {
    if (editingProject) {
      // Edit existing
      setProjects(prev => prev.map(p => p.id === editingProject.id ? { ...p, ...projectData } as Project : p));
    } else {
      // Add new
      const newProject: Project = {
        id: Date.now().toString(),
        title: projectData.title || 'Sem Título',
        slug: projectData.slug || `projeto-${Date.now()}`,
        category: projectData.category || 'UI/UX Design',
        tags: projectData.tags || ['UI/UX Design'],
        summary: projectData.summary || 'Resumo do projeto...',
        description: projectData.description || 'Descrição detalhada do estudo de caso...',
        client: projectData.client || 'Cliente',
        year: projectData.year || new Date().getFullYear().toString(),
        role: projectData.role || 'Designer',
        tools: projectData.tools || ['Figma'],
        coverImage: projectData.coverImage || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
        galleryImages: [
          projectData.coverImage || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200'
        ],
        status: projectData.status || 'Publicado',
        views: 100,
        publishedAt: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
      };
      setProjects(prev => [newProject, ...prev]);
    }
    setEditingProject(null);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    if (selectedProject?.id === id) {
      setSelectedProjectSlug(null);
    }
  };

  const handleToggleStatus = (id: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === id) {
        const nextStatus = p.status === 'Publicado' ? 'Rascunho' : 'Publicado';
        return { ...p, status: nextStatus };
      }
      return p;
    }));
  };

  const handleResetProjects = () => {
    if (confirm('Deseja restaurar a lista inicial de projetos padrão?')) {
      setProjects(INITIAL_PROJECTS);
      try {
        localStorage.removeItem('julia_furtado_projects_v1');
      } catch (e) {
        // ignore
      }
    }
  };

  const handleSelectProject = (slug: string) => {
    setSelectedProjectSlug(slug);
    // Increment views count
    setProjects(prev => prev.map(p => p.slug === slug ? { ...p, views: p.views + 1 } : p));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactClick = () => {
    setSelectedProjectSlug(null);
    setActiveTab('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: 'home' | 'about' | 'contact' | 'admin') => {
    setSelectedProjectSlug(null);
    if (tab === 'admin') {
      if (isAdminAuthenticated) {
        setActiveTab('admin');
      } else {
        setAdminLoginError(null);
        setIsAdminLoginOpen(true);
      }
      return;
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLoginSubmit = (password: string) => {
    if (password === ADMIN_ACCESS_PASSWORD) {
      setIsAdminAuthenticated(true);
      setAdminLoginError(null);
      setIsAdminLoginOpen(false);
      setActiveTab('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setAdminLoginError('Senha incorreta. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 font-sans selection:bg-purple-200 selection:text-purple-950 flex flex-col justify-between">
      
      {/* Top Header Navigation */}
      <Header
        activeTab={activeTab}
        onNavClick={handleTabChange}
        onOpenImageLinksModal={() => setIsImageLinksModalOpen(true)}
        selectedProjectSlug={selectedProjectSlug}
        onClearSelectedProject={() => setSelectedProjectSlug(null)}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {selectedProject ? (
          <ProjectDetailView
            project={selectedProject}
            allProjects={projects}
            onBack={() => setSelectedProjectSlug(null)}
            onSelectProject={handleSelectProject}
            onOpenImageLinksModal={() => setIsImageLinksModalOpen(true)}
          />
        ) : (
          <>
            {activeTab === 'home' && (
              <HomeView
                projects={projects}
                onSelectProject={handleSelectProject}
                onOpenManifestoModal={() => setIsManifestoModalOpen(true)}
                onOpenImageLinksModal={() => setIsImageLinksModalOpen(true)}
                onContactClick={handleContactClick}
              />
            )}

            {activeTab === 'about' && (
              <AboutView
                onContactClick={handleContactClick}
                onOpenImageLinksModal={() => setIsImageLinksModalOpen(true)}
              />
            )}

            {activeTab === 'contact' && (
              <ContactView />
            )}

            {activeTab === 'admin' && (
              <AdminView
                projects={projects}
                onAddProjectClick={() => {
                  setEditingProject(null);
                  setIsProjectModalOpen(true);
                }}
                onEditProjectClick={(p) => {
                  setEditingProject(p);
                  setIsProjectModalOpen(true);
                }}
                onDeleteProject={handleDeleteProject}
                onToggleStatus={handleToggleStatus}
                onResetProjects={handleResetProjects}
                onOpenImageLinksModal={() => setIsImageLinksModalOpen(true)}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavClick={handleTabChange}
        onOpenImageLinksModal={() => setIsImageLinksModalOpen(true)}
      />

      {/* Modals */}
      <DirectImageLinksModal
        isOpen={isImageLinksModalOpen}
        onClose={() => setIsImageLinksModalOpen(false)}
      />

      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => {
          setIsProjectModalOpen(false);
          setEditingProject(null);
        }}
        onSave={handleSaveProject}
        editingProject={editingProject}
      />

      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onSubmit={handleAdminLoginSubmit}
        error={adminLoginError}
      />

      <ManifestoModal
        isOpen={isManifestoModalOpen}
        onClose={() => setIsManifestoModalOpen(false)}
      />

    </div>
  );
}
