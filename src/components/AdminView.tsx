import React, { useState } from 'react';
import { Project, PostStatus, ProjectCategory } from '../types';
import { Plus, Search, Filter, Edit, Trash2, Eye, ToggleLeft, ToggleRight, Copy, Check, Sparkles, RefreshCw, Layers, FileText } from 'lucide-react';

interface AdminViewProps {
  projects: Project[];
  onAddProjectClick: () => void;
  onEditProjectClick: (project: Project) => void;
  onDeleteProject: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onResetProjects: () => void;
  onOpenImageLinksModal: () => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  projects,
  onAddProjectClick,
  onEditProjectClick,
  onDeleteProject,
  onToggleStatus,
  onResetProjects,
  onOpenImageLinksModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Todos');
  const [categoryFilter, setCategoryFilter] = useState<string>('Todas');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['Todas', 'UI/UX Design', 'Design Systems', 'Branding', 'E-Commerce', 'Mobile'];

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'Todos' || p.status === statusFilter;
    const matchesCategory = categoryFilter === 'Todas' || p.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const totalViews = projects.reduce((acc, p) => acc + p.views, 0);
  const publishedCount = projects.filter(p => p.status === 'Publicado').length;
  const draftCount = projects.filter(p => p.status === 'Rascunho').length;

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white border border-purple-100/80 shadow-sm p-6 sm:p-8 rounded-3xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100/80 text-purple-950 border border-purple-200 text-xs small-caps tracking-widest font-medium">
            <Sparkles className="w-3.5 h-3.5 text-purple-700" />
            <span>Gerenciador de Conteúdo Editorial</span>
          </div>
          <h1 className="text-3xl font-serif text-stone-900 font-medium">Painel de Gestão de Projetos</h1>
          <p className="text-xs text-stone-600 font-light">Adicione, edite e gerencie o status dos estudos de caso exibidos no portfólio.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onAddProjectClick}
            className="px-5 py-3 rounded-lg bg-purple-950 hover:bg-purple-900 text-white font-bold uppercase tracking-wider text-xs transition-all shadow-xl flex items-center gap-2 active:scale-95"
          >
            <Plus className="w-4 h-4 text-purple-200" />
            <span>Novo Post / Projeto</span>
          </button>
        </div>
      </div>

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-purple-100/80 shadow-sm space-y-1">
          <div className="text-xs small-caps text-purple-950 font-semibold">Total de Publicações</div>
          <div className="text-2xl font-serif font-medium text-stone-900">{projects.length}</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-purple-100/80 shadow-sm space-y-1">
          <div className="text-xs small-caps text-purple-950 font-semibold">Publicados no Ar</div>
          <div className="text-2xl font-serif font-medium text-purple-950">{publishedCount}</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-purple-100/80 shadow-sm space-y-1">
          <div className="text-xs small-caps text-stone-500 font-medium">Rascunhos</div>
          <div className="text-2xl font-serif font-medium text-stone-700">{draftCount}</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-purple-100/80 shadow-sm space-y-1">
          <div className="text-xs small-caps text-purple-950 font-semibold">Visualizações Totais</div>
          <div className="text-2xl font-serif font-medium text-stone-900">{totalViews.toLocaleString('pt-BR')}</div>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-purple-100/80 shadow-sm">
        
        {/* Search Field */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-purple-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por título, categoria ou cliente..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#FAF7F2] border border-stone-200 text-stone-900 text-xs focus:outline-none focus:border-purple-600"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs small-caps text-stone-500 shrink-0 font-medium">Status:</span>
          {['Todos', 'Publicado', 'Rascunho'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs small-caps whitespace-nowrap transition-all ${
                statusFilter === status
                  ? 'bg-purple-950 text-white font-bold'
                  : 'bg-[#FAF7F2] text-stone-700 hover:text-purple-950 border border-stone-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Reset Button */}
        <button
          onClick={onResetProjects}
          title="Restaurar projetos padrão"
          className="p-2.5 rounded-lg bg-[#FAF7F2] hover:bg-purple-100 text-stone-600 hover:text-purple-950 border border-stone-200 transition-colors shrink-0"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

      </div>

      {/* Projects Items List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs small-caps text-stone-500 px-2 font-medium">
          <span>Listando {filteredProjects.length} posts</span>
          <span>Ações: Editar • Status • Copiar Link • Excluir</span>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-purple-100/80 shadow-sm space-y-3">
            <FileText className="w-8 h-8 text-stone-400 mx-auto" />
            <p className="text-sm text-stone-600 font-light">Nenhum projeto encontrado com os filtros selecionados.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-purple-100/80 hover:border-purple-300 shadow-sm transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                {/* Left Thumbnail & Info */}
                <div className="flex items-center gap-4">
                  <div className="w-20 h-14 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] small-caps px-2 py-0.5 rounded bg-[#FAF7F2] text-purple-950 border border-purple-200 font-semibold">
                        {project.category}
                      </span>
                      <span className="text-xs text-stone-500 font-mono">{project.client} • {project.year}</span>
                    </div>

                    <h3 className="text-base font-serif font-medium text-stone-900">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Right Actions & Status */}
                <div className="flex items-center justify-between w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-200">
                  
                  {/* Status Toggle Badge */}
                  <button
                    onClick={() => onToggleStatus(project.id)}
                    className={`px-3 py-1.5 rounded-full text-xs small-caps flex items-center gap-1.5 border transition-all font-medium ${
                      project.status === 'Publicado'
                        ? 'bg-purple-100/80 text-purple-950 border-purple-300 hover:bg-purple-200'
                        : 'bg-stone-100 text-stone-600 border-stone-200 hover:bg-stone-200'
                    }`}
                  >
                    {project.status === 'Publicado' ? (
                      <>
                        <ToggleRight className="w-4 h-4 text-purple-700" />
                        <span>Publicado</span>
                      </>
                    ) : (
                      <>
                        <ToggleLeft className="w-4 h-4 text-stone-400" />
                        <span>Rascunho</span>
                      </>
                    )}
                  </button>

                  {/* Action Icons */}
                  <div className="flex items-center gap-2">
                    
                    {/* Copy Direct Image URL */}
                    <button
                      onClick={() => handleCopyUrl(project.coverImage, project.id)}
                      title="Copiar URL da Imagem do Post"
                      className="p-2 rounded-lg bg-[#FAF7F2] hover:bg-purple-100 text-stone-700 hover:text-purple-950 border border-stone-200 transition-colors"
                    >
                      {copiedId === project.id ? <Check className="w-3.5 h-3.5 text-purple-700" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>

                    {/* Edit Project */}
                    <button
                      onClick={() => onEditProjectClick(project)}
                      title="Editar Post"
                      className="p-2 rounded-lg bg-[#FAF7F2] hover:bg-purple-100 text-stone-700 hover:text-purple-950 border border-stone-200 transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete Project */}
                    <button
                      onClick={() => {
                        if (confirm(`Tem certeza que deseja excluir o post "${project.title}"?`)) {
                          onDeleteProject(project.id);
                        }
                      }}
                      title="Excluir Post"
                      className="p-2 rounded-lg bg-[#FAF7F2] hover:bg-rose-50 text-stone-600 hover:text-rose-700 border border-stone-200 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                  </div>

                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
