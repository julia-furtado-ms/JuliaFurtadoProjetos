import React, { useState, useEffect } from 'react';
import { Project, ProjectCategory, PostStatus } from '../types';
import { X, Save, Plus, Image } from 'lucide-react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (projectData: Partial<Project>) => void;
  editingProject: Project | null;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingProject,
}) => {
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    category: 'UI/UX Design',
    tags: ['UI/UX Design'],
    summary: '',
    description: '',
    client: 'Cliente Exemplo',
    year: '2024',
    role: 'Lead Designer',
    tools: ['Figma', 'Design System'],
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
    status: 'Publicado',
  });

  const [tagsInput, setTagsInput] = useState('');
  const [toolsInput, setToolsInput] = useState('');

  useEffect(() => {
    if (editingProject) {
      setFormData(editingProject);
      setTagsInput(editingProject.tags.join(', '));
      setToolsInput(editingProject.tools.join(', '));
    } else {
      setFormData({
        title: '',
        category: 'UI/UX Design',
        tags: ['UI/UX Design'],
        summary: '',
        description: '',
        client: 'Cliente Exemplo',
        year: '2024',
        role: 'Lead Designer',
        tools: ['Figma', 'Design System'],
        coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
        status: 'Publicado',
      });
      setTagsInput('UI/UX Design, Mobile');
      setToolsInput('Figma, Design System');
    }
  }, [editingProject, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.coverImage) return;

    const parsedTags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    const parsedTools = toolsInput.split(',').map(t => t.trim()).filter(Boolean);

    onSave({
      ...formData,
      tags: parsedTags,
      tools: parsedTools,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-md animate-fade-in">
      <div className="bg-white border border-purple-100/80 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-purple-100 flex items-center justify-between bg-purple-50/50">
          <h2 className="text-xl font-serif text-stone-900 font-medium">
            {editingProject ? 'Editar Post / Estudo de Caso' : 'Novo Post / Estudo de Caso'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-purple-950 hover:bg-purple-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="small-caps text-purple-950 font-semibold">Título do Projeto *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ex: EcoApp Redesign"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF7F2] border border-stone-200 text-stone-900 focus:outline-none focus:border-purple-600 font-sans"
              />
            </div>

            <div className="space-y-1">
              <label className="small-caps text-purple-950 font-semibold">Categoria Principal *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as ProjectCategory })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF7F2] border border-stone-200 text-stone-900 focus:outline-none focus:border-purple-600 font-sans"
              >
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Design Systems">Design Systems</option>
                <option value="Branding">Branding</option>
                <option value="E-Commerce">E-Commerce</option>
                <option value="Mobile">Mobile</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="small-caps text-purple-950 font-semibold">Cliente</label>
              <input
                type="text"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF7F2] border border-stone-200 text-stone-900 focus:outline-none focus:border-purple-600 font-sans"
              />
            </div>

            <div className="space-y-1">
              <label className="small-caps text-purple-950 font-semibold">Ano</label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF7F2] border border-stone-200 text-stone-900 focus:outline-none focus:border-purple-600 font-sans"
              />
            </div>

            <div className="space-y-1">
              <label className="small-caps text-purple-950 font-semibold">Status do Post</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as PostStatus })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF7F2] border border-stone-200 text-stone-900 focus:outline-none focus:border-purple-600 font-sans"
              >
                <option value="Publicado">Publicado</option>
                <option value="Rascunho">Rascunho</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="small-caps text-purple-950 font-semibold">URL Direta da Imagem de Capa (HTML / Unsplash / Direct) *</label>
            <input
              type="url"
              required
              value={formData.coverImage}
              onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF7F2] border border-stone-200 text-stone-900 focus:outline-none focus:border-purple-600 font-sans"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="small-caps text-purple-950 font-semibold">Tags (separadas por vírgula)</label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="UI/UX, Mobile, Sustainability"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF7F2] border border-stone-200 text-stone-900 focus:outline-none focus:border-purple-600 font-sans"
              />
            </div>

            <div className="space-y-1">
              <label className="small-caps text-purple-950 font-semibold">Ferramentas Usadas (separadas por vírgula)</label>
              <input
                type="text"
                value={toolsInput}
                onChange={(e) => setToolsInput(e.target.value)}
                placeholder="Figma, Protopie, Design System"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF7F2] border border-stone-200 text-stone-900 focus:outline-none focus:border-purple-600 font-sans"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="small-caps text-purple-950 font-semibold">Resumo Curto (Exibido no Card)</label>
            <textarea
              rows={2}
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF7F2] border border-stone-200 text-stone-900 focus:outline-none focus:border-purple-600 font-sans"
            />
          </div>

          <div className="space-y-1">
            <label className="small-caps text-purple-950 font-semibold">Descrição Completa / Estudo de Caso</label>
            <textarea
              rows={5}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF7F2] border border-stone-200 text-stone-900 focus:outline-none focus:border-purple-600 leading-relaxed font-light font-sans"
            />
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-stone-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg bg-white border border-stone-200 text-stone-700 hover:text-purple-950 text-xs small-caps transition-colors font-medium shadow-sm"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-purple-950 hover:bg-purple-900 text-white font-bold uppercase tracking-wider text-xs flex items-center gap-2 active:scale-95 transition-all shadow-md"
            >
              <Save className="w-4 h-4 text-purple-200" />
              <span>Salvar Projeto</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
