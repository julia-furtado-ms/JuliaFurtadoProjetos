import React, { useState } from 'react';
import { DirectImageLink } from '../types';
import { DIRECT_IMAGE_LINKS } from '../data/mockProjects';
import { getImageFallbackUrl, normalizeImageUrl } from '../utils/normalizeImageUrl';
import { X, Copy, Check, ExternalLink, Image, Sparkles, Plus } from 'lucide-react';

interface DirectImageLinksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DirectImageLinksModal: React.FC<DirectImageLinksModalProps> = ({ isOpen, onClose }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [linksList, setLinksList] = useState<DirectImageLink[]>(DIRECT_IMAGE_LINKS);
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newUsage, setNewUsage] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  if (!isOpen) return null;

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyAllAsJson = () => {
    const jsonStr = JSON.stringify(linksList, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopiedId('all-json');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    if (target.dataset.fallbackApplied === 'true') return;
    target.dataset.fallbackApplied = 'true';
    target.src = getImageFallbackUrl();
  };

  const handleAddCustomLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl || !newTitle) return;

    const newItem: DirectImageLink = {
      id: Date.now().toString(),
      title: newTitle,
      url: newUrl,
      usage: newUsage || 'Ativo Personalizado no HTML',
      aspectRatio: '16:9'
    };

    setLinksList([newItem, ...linksList]);
    setNewTitle('');
    setNewUrl('');
    setNewUsage('');
    setShowAddForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-md animate-fade-in">
      <div className="bg-white border border-purple-100/80 rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-purple-100 flex items-center justify-between bg-purple-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-100 text-purple-950 border border-purple-200">
              <Image className="w-5 h-5 text-purple-700" />
            </div>
            <div>
              <h2 className="text-xl font-serif text-stone-900 font-medium">Banco de Links Diretos das Imagens HTML</h2>
              <p className="text-xs text-stone-600 font-light">Copie ou adicione URLs diretas para os ativos e mockups utilizados no projeto.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-purple-950 hover:bg-purple-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Controls Bar */}
        <div className="px-6 py-3 bg-[#FAF7F2] border-b border-stone-200 flex items-center justify-between text-xs font-light">
          <span className="text-stone-600 small-caps font-medium">{linksList.length} Imagens HTML Registradas</span>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-3 py-1.5 rounded-lg bg-purple-950 hover:bg-purple-900 text-white font-bold uppercase tracking-wider text-[11px] transition-colors flex items-center gap-1 active:scale-95"
            >
              <Plus className="w-3.5 h-3.5 text-purple-200" />
              <span>Adicionar Novo Link</span>
            </button>

            <button
              onClick={handleCopyAllAsJson}
              className="px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-stone-700 hover:text-purple-950 text-[11px] small-caps transition-colors font-medium shadow-sm"
            >
              {copiedId === 'all-json' ? 'JSON Copiado!' : 'Copiar Lista como JSON'}
            </button>
          </div>
        </div>

        {/* Add Link Form Toggle */}
        {showAddForm && (
          <form onSubmit={handleAddCustomLink} className="p-4 bg-[#FAF7F2] border-b border-stone-200 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-purple-950 small-caps font-semibold">Título da Imagem</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ex: Novo Banner de Projeto"
                  className="w-full px-3 py-2 rounded-lg bg-white border border-stone-200 text-stone-900 text-xs focus:outline-none focus:border-purple-600"
                />
              </div>

              <div>
                <label className="text-purple-950 small-caps font-semibold">Uso ou Seção</label>
                <input
                  type="text"
                  value={newUsage}
                  onChange={(e) => setNewUsage(e.target.value)}
                  placeholder="Ex: Capa do Estudo de Caso X"
                  className="w-full px-3 py-2 rounded-lg bg-white border border-stone-200 text-stone-900 text-xs focus:outline-none focus:border-purple-600"
                />
              </div>
            </div>

            <div>
              <label className="text-purple-950 small-caps text-xs font-semibold">URL Direta (http/https)</label>
              <input
                type="url"
                required
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="Imagem Aqui"
                className="w-full px-3 py-2 rounded-lg bg-white border border-stone-200 text-stone-900 text-xs focus:outline-none focus:border-purple-600"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-stone-700 text-xs small-caps font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg bg-purple-950 text-white font-bold uppercase tracking-wider text-xs"
              >
                Salvar Link
              </button>
            </div>
          </form>
        )}

        {/* Scrollable Links List */}
        <div className="p-6 overflow-y-auto space-y-4 divide-y divide-stone-200">
          {linksList.map((item) => (
            <div key={item.id} className="pt-4 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              
              <div className="flex items-center gap-4">
                <div className="w-16 h-12 rounded-lg overflow-hidden bg-stone-100 border border-stone-200 shrink-0">
                  <img
                    src={normalizeImageUrl(item.url)}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                  />
                </div>

                <div className="space-y-0.5">
                  <h4 className="text-sm font-medium text-stone-900">{item.title}</h4>
                  <p className="text-xs text-stone-500 font-light">{item.usage}</p>
                  <p className="text-[11px] font-mono text-stone-400 truncate max-w-md">{item.url}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  title="Abrir imagem em nova aba"
                  className="p-2 rounded-lg bg-[#FAF7F2] hover:bg-purple-100 text-stone-600 hover:text-purple-950 border border-stone-200 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => handleCopy(item.url, item.id)}
                  className="px-3 py-2 rounded-lg bg-purple-100/80 hover:bg-purple-200 text-purple-950 border border-purple-300 text-xs small-caps transition-colors flex items-center gap-1.5 font-medium"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-purple-700" />
                      <span>Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-stone-600" />
                      <span>Copiar URL</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-[#FAF7F2] text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-white border border-stone-200 text-stone-800 hover:text-purple-950 text-xs small-caps transition-colors font-medium shadow-sm"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
