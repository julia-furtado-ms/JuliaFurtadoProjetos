import React, { useEffect, useState } from 'react';
import { Project } from '../types';
import { getImageFallbackUrl, normalizeImageUrl } from '../utils/normalizeImageUrl';
import { ArrowLeft, ExternalLink, Calendar, User, Wrench, Building, Copy, Check, Eye, Share2, Image, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectDetailViewProps {
  project: Project;
  allProjects: Project[];
  onBack: () => void;
  onSelectProject: (slug: string) => void;
  onOpenImageLinksModal: () => void;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  project,
  allProjects,
  onBack,
  onSelectProject,
  onOpenImageLinksModal,
}) => {
  const [copiedCover, setCopiedCover] = useState(false);
  const [copiedGalleryIndex, setCopiedGalleryIndex] = useState<number | null>(null);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  useEffect(() => {
    setActiveGalleryIndex(0);
  }, [project.id]);

  const otherProjects = allProjects.filter(p => p.id !== project.id && p.status === 'Publicado').slice(0, 3);

  const handleCopyCoverLink = () => {
    navigator.clipboard.writeText(project.coverImage);
    setCopiedCover(true);
    setTimeout(() => setCopiedCover(false), 2000);
  };

  const handleCopyGalleryLink = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    setCopiedGalleryIndex(index);
    setTimeout(() => setCopiedGalleryIndex(null), 2000);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    if (target.dataset.fallbackApplied === 'true') return;
    target.dataset.fallbackApplied = 'true';
    target.src = getImageFallbackUrl(target.currentSrc || target.src);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Top Breadcrumb & Back Button */}
      <div className="flex items-center justify-between border-b border-stone-200/80 pb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-stone-600 hover:text-purple-950 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4 text-purple-900" />
          <span>Voltar para Todos os Projetos</span>
        </button>

        <div className="flex items-center gap-3 text-xs font-mono text-stone-500">
          <span>{project.client}</span>
          <span>•</span>
          <span>{project.year}</span>
        </div>
      </div>

      {/* Title & Header Overview */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-purple-100/80 text-purple-950 border border-purple-200 text-xs small-caps tracking-wider font-semibold">
            {project.category}
          </span>
          {project.tags.map(tag => (
            <span key={tag} className="px-2.5 py-0.5 rounded-full bg-stone-200/60 text-stone-700 text-xs border border-stone-300/60 font-medium">
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif text-stone-900 leading-tight font-medium">
          {project.title}
        </h1>

        <p className="text-lg text-stone-700 font-sans leading-relaxed font-light">
          {project.summary}
        </p>

        {/* Project Metadata Card Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-white border border-purple-100/80 shadow-sm text-xs">
          <div className="space-y-1">
            <div className="text-purple-900 font-semibold flex items-center gap-1.5 small-caps">
              <Building className="w-3.5 h-3.5 text-purple-700" />
              <span>Cliente</span>
            </div>
            <div className="font-medium text-stone-900 text-sm">{project.client}</div>
          </div>

          <div className="space-y-1">
            <div className="text-purple-900 font-semibold flex items-center gap-1.5 small-caps">
              <User className="w-3.5 h-3.5 text-purple-700" />
              <span>Função</span>
            </div>
            <div className="font-medium text-stone-900 text-sm">{project.role}</div>
          </div>

          <div className="space-y-1">
            <div className="text-purple-900 font-semibold flex items-center gap-1.5 small-caps">
              <Calendar className="w-3.5 h-3.5 text-purple-700" />
              <span>Ano</span>
            </div>
            <div className="font-medium text-stone-900 text-sm">{project.year}</div>
          </div>

          <div className="space-y-1">
            <div className="text-purple-900 font-semibold flex items-center gap-1.5 small-caps">
              <Wrench className="w-3.5 h-3.5 text-purple-700" />
              <span>Ferramentas</span>
            </div>
            <div className="font-medium text-stone-900 text-sm truncate">{project.tools.join(', ')}</div>
          </div>
        </div>
      </div>

      {/* Hero Cover Image & Direct Link Action */}
      <div className="space-y-3">
        <div className="relative rounded-2xl overflow-hidden bg-stone-200 border border-stone-300 aspect-video group shadow-xl">
          <img
            src={normalizeImageUrl(project.coverImage)}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-stone-950/10" />

          {/* Direct Link Action Overlay */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <button
              onClick={handleCopyCoverLink}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/90 text-stone-800 hover:text-purple-950 text-xs small-caps border border-stone-200 backdrop-blur-md transition-all shadow-sm font-medium"
            >
              {copiedCover ? <Check className="w-3.5 h-3.5 text-purple-700" /> : <Copy className="w-3.5 h-3.5 text-stone-600" />}
              <span>{copiedCover ? 'Link Copiado!' : 'Copiar URL da Imagem'}</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-stone-500 font-mono px-2">
          <span className="flex items-center gap-1">
            <Image className="w-3.5 h-3.5 text-purple-700" />
            <span>Imagem principal em alta resolução do projeto</span>
          </span>
        </div>
      </div>

      {/* Metrics Banner (if available) */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {project.metrics.map((metric, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white border border-purple-100/80 shadow-sm text-center space-y-1">
              <div className="text-3xl font-serif font-medium text-purple-950">{metric.value}</div>
              <div className="text-xs text-stone-500 small-caps tracking-widest">{metric.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Case Study Content Breakdown */}
      <div className="prose max-w-none space-y-8 text-stone-800 leading-relaxed font-sans border-t border-stone-200/80 pt-10">
        <div className="space-y-4">
          <h2 className="text-2xl font-serif text-stone-900 font-medium">Visão Geral & Processo de Design</h2>
          <div className="whitespace-pre-line text-stone-700 leading-relaxed font-light text-base sm:text-lg">
            {project.description}
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      {project.galleryImages && project.galleryImages.length > 0 && (
        <div className="space-y-6 border-t border-stone-200/80 pt-10">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-serif text-stone-900 font-medium">Galeria Visual & Interfaces</h3>
            <span className="text-xs font-mono text-stone-500">{project.galleryImages.length} {project.galleryImages.length === 1 ? 'imagem' : 'imagens'}</span>
          </div>

          <div className="space-y-6">
            <div className="relative rounded-3xl overflow-hidden bg-stone-200 aspect-video shadow-xl">
              <img
                src={normalizeImageUrl(project.galleryImages[activeGalleryIndex])}
                alt={`${project.title} - Visual ${activeGalleryIndex + 1}`}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />

              {project.galleryImages.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveGalleryIndex((prev) => (prev === 0 ? project.galleryImages.length - 1 : prev - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 text-stone-700 hover:bg-white border border-stone-200 transition"
                    aria-label="Mostrar imagem anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveGalleryIndex((prev) => (prev === project.galleryImages.length - 1 ? 0 : prev + 1))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 text-stone-700 hover:bg-white border border-stone-200 transition"
                    aria-label="Mostrar próxima imagem"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {project.galleryImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveGalleryIndex(idx)}
                  className={`flex-shrink-0 rounded-2xl overflow-hidden border transition ${activeGalleryIndex === idx ? 'border-purple-950 shadow-lg' : 'border-stone-200 hover:border-purple-300'}`}
                >
                  <img
                    src={normalizeImageUrl(imgUrl)}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-28 h-20 object-cover"
                    onError={handleImageError}
                  />
                </button>
              ))}
            </div>

            {project.galleryLink && (
              <div className="rounded-3xl border border-purple-100/90 bg-purple-50/70 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-purple-950">Link externo para visualização em carrossel</div>
                  <p className="text-xs text-stone-600 mt-1">Abra um pdf, apresentação ou galeria externa com várias imagens.</p>
                </div>
                <a
                  href={project.galleryLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-purple-950 text-white text-xs uppercase tracking-wider font-semibold hover:bg-purple-900 transition"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Ver carrossel externo
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* See More Projects */}
      <div className="border-t border-stone-200/80 pt-12 space-y-6">
        <h3 className="text-2xl font-serif text-stone-900 font-medium">Ver Outros Estudos de Caso</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherProjects.map(p => (
            <div
              key={p.id}
              onClick={() => onSelectProject(p.slug)}
              className="group bg-white hover:border-purple-300 border border-purple-100/80 shadow-sm rounded-xl p-4 cursor-pointer transition-all space-y-3"
            >
              <div className="aspect-video rounded-lg overflow-hidden bg-stone-100">
                <img src={normalizeImageUrl(p.coverImage)} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div>
                <div className="text-xs small-caps text-purple-950 font-semibold">{p.category}</div>
                <h4 className="text-sm font-medium text-stone-900 group-hover:text-purple-900 transition-colors">{p.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
