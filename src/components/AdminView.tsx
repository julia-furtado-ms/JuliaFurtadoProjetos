import React, { useState } from 'react';
import { Project, PostStatus, ProjectCategory, SkillItem } from '../types';
import { getImageFallbackUrl, normalizeImageUrl } from '../utils/normalizeImageUrl';
import { Plus, Search, Filter, Edit, Trash2, Eye, ToggleLeft, ToggleRight, Copy, Check, Sparkles, RefreshCw, Layers, FileText, Save, X } from 'lucide-react';

interface AdminViewProps {
  projects: Project[];
  skills: SkillItem[];
  onAddProjectClick: () => void;
  onEditProjectClick: (project: Project) => void;
  onDeleteProject: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onResetProjects: () => void;
  onSaveSkills: (skills: SkillItem[]) => void;
  onResetSkills: () => void;
  onOpenImageLinksModal: () => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  projects,
  skills,
  onAddProjectClick,
  onEditProjectClick,
  onDeleteProject,
  onToggleStatus,
  onResetProjects,
  onSaveSkills,
  onResetSkills,
  onOpenImageLinksModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Todos');
  const [categoryFilter, setCategoryFilter] = useState<string>('Todas');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [skillDraft, setSkillDraft] = useState<SkillItem[]>(skills);
  const [newSkill, setNewSkill] = useState({ name: '', category: '', description: '' });

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

  const handleSkillChange = (index: number, field: keyof SkillItem, value: string) => {
    setSkillDraft(prev => prev.map((skill, idx) => idx === index ? { ...skill, [field]: field === 'level' ? Number(value) : value } : skill));
  };

  const handleDeleteSkill = (index: number) => {
    setSkillDraft(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleAddSkill = () => {
    if (!newSkill.name.trim() || !newSkill.category.trim() || !newSkill.description.trim()) return;
    setSkillDraft(prev => [...prev, { ...newSkill, level: 0 }]);
    setNewSkill({ name: '', category: '', description: '' });
  };

  const handleSaveSkillList = () => {
    onSaveSkills(skillDraft);
  };

  const handleResetSkillList = () => {
    onResetSkills();
    setSkillDraft(skills);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    if (target.dataset.fallbackApplied === 'true') return;
    target.dataset.fallbackApplied = 'true';
    target.src = getImageFallbackUrl('https://drive.google.com/file/d/1S-N9MfR7XTLBf7Ud_KNHzpzjoUQcoD_F/view');
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

      {/* Skills Editor Section */}
      <section className="rounded-3xl bg-white border border-purple-100/80 shadow-sm p-6 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100/80 text-purple-950 border border-purple-200 text-xs small-caps tracking-widest font-medium">
              <Layers className="w-3.5 h-3.5 text-purple-700" />
              <span>Gerenciar Habilidades & Ferramentas</span>
            </div>
            <h2 className="text-2xl font-serif text-stone-900 font-medium mt-3">Conhecimentos & Ferramentas</h2>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSaveSkillList}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-950 text-white text-xs uppercase tracking-wider font-semibold hover:bg-purple-900 transition"
            >
              <Save className="w-4 h-4" />
              Salvar
            </button>
            <button
              onClick={handleResetSkillList}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FAF7F2] text-stone-700 border border-stone-200 text-xs uppercase tracking-wider font-semibold hover:text-purple-950 transition"
            >
              <RefreshCw className="w-4 h-4" />
              Resetar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            value={newSkill.name}
            onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Nome da habilidade"
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF7F2] border border-stone-200 text-stone-900 focus:outline-none focus:border-purple-600 font-sans"
          />
          <input
            type="text"
            value={newSkill.category}
            onChange={(e) => setNewSkill(prev => ({ ...prev, category: e.target.value }))}
            placeholder="Categoria"
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF7F2] border border-stone-200 text-stone-900 focus:outline-none focus:border-purple-600 font-sans"
          />
          <button
            type="button"
            onClick={handleAddSkill}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-purple-950 text-white text-xs uppercase tracking-wider font-semibold hover:bg-purple-900 transition"
          >
            <Plus className="w-4 h-4" />
            Adicionar
          </button>
        </div>

        <textarea
          rows={2}
          value={newSkill.description}
          onChange={(e) => setNewSkill(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Descrição da habilidade/ferramenta"
          className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF7F2] border border-stone-200 text-stone-900 focus:outline-none focus:border-purple-600 font-sans"
        />

        <div className="space-y-3">
          {skillDraft.map((skill, index) => (
            <div key={`${skill.name}-${index}`} className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1.8fr_auto] gap-2 items-start rounded-2xl bg-[#FAF7F2] border border-stone-200 p-3">
              <input
                type="text"
                value={skill.name}
                onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                className="px-3.5 py-2.5 rounded-lg bg-white border border-stone-200 text-stone-900 focus:outline-none focus:border-purple-600 font-sans"
              />
              <input
                type="text"
                value={skill.category}
                onChange={(e) => handleSkillChange(index, 'category', e.target.value)}
                className="px-3.5 py-2.5 rounded-lg bg-white border border-stone-200 text-stone-900 focus:outline-none focus:border-purple-600 font-sans"
              />
              <textarea
                rows={2}
                value={skill.description}
                onChange={(e) => handleSkillChange(index, 'description', e.target.value)}
                className="px-3.5 py-2.5 rounded-lg bg-white border border-stone-200 text-stone-900 focus:outline-none focus:border-purple-600 font-sans"
              />
              <button
                type="button"
                onClick={() => handleDeleteSkill(index)}
                className="p-2 rounded-lg bg-white border border-stone-200 text-stone-600 hover:text-rose-700 hover:border-rose-200 transition-colors"
                aria-label={`Remover habilidade ${index + 1}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

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
                      src={normalizeImageUrl(project.coverImage)}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={handleImageError}
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
