import React, { useState } from 'react';
import { Project, ProjectCategory } from '../types';
import { getImageFallbackUrl, normalizeImageUrl } from '../utils/normalizeImageUrl';
import { ArrowRight, Sparkles, Eye, Filter, Copy, Check, ExternalLink, Image } from 'lucide-react';

interface HomeViewProps {
  projects: Project[];
  onSelectProject: (slug: string) => void;
  onOpenManifestoModal: () => void;
  onOpenImageLinksModal: () => void;
  onContactClick: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  projects,
  onSelectProject,
  onOpenManifestoModal,
  onOpenImageLinksModal,
  onContactClick,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['Todos', 'UI/UX Design', 'Design Systems', 'Branding', 'E-Commerce', 'Mobile'];

  const filteredProjects = selectedCategory === 'Todos'
    ? projects.filter(p => p.status === 'Publicado')
    : projects.filter(p => p.status === 'Publicado' && (p.category === selectedCategory || p.tags.includes(selectedCategory)));

  const handleCopyImageLink = (e: React.MouseEvent, url: string, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    if (target.dataset.fallbackApplied === 'true') return;
    target.dataset.fallbackApplied = 'true';
    target.src = getImageFallbackUrl();
  };

  return (
    <div className="space-y-24 pb-16">
      
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 overflow-hidden">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10 px-4">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/80 text-purple-950 border border-purple-200 text-xs small-caps tracking-widest shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-purple-700" />
            <span>Design de Produto & UX/UI • Atelier Recife</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight text-stone-900 leading-[1.1]">
            Crio produtos digitais que <span className="italic font-serif text-purple-900">fazem sentido.</span>
          </h1>

          <p className="text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto font-sans leading-relaxed font-light">
            Transformando processos complexos em experiências intuitivas, elegantes e fundamentadas em pesquisa e rigor estético.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#projetos"
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-purple-950 hover:bg-purple-900 text-purple-50 font-semibold uppercase tracking-wider text-xs transition-all shadow-xl flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Ver Projetos</span>
              <ArrowRight className="w-4 h-4 text-purple-200" />
            </a>

            <button
              onClick={onOpenManifestoModal}
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-white hover:bg-purple-50 text-purple-950 border border-purple-200/80 transition-all font-medium uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Ler Manifesto de Design</span>
            </button>
          </div>

        </div>
      </section>

      {/* Projects Grid & Filtering Section */}
      <section id="projetos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header & Categories */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200/80 pb-8">
          <div>
            <div className="text-xs small-caps uppercase tracking-widest text-purple-900 mb-1 font-medium">Portfólio Selecionado</div>
            <h2 className="text-3xl font-serif text-stone-900 font-medium">Projetos & Trabalhos</h2>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            <Filter className="w-4 h-4 text-stone-400 shrink-0 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs small-caps tracking-wider whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-purple-950 text-white font-bold shadow-md'
                    : 'bg-white/80 text-stone-600 hover:text-purple-950 border border-stone-200/80 hover:bg-purple-50/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project.slug)}
              className="group bg-white border border-stone-200/80 hover:border-purple-300 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-sm hover:shadow-xl hover:shadow-purple-950/5"
            >
              <div>
                {/* Image Container with Direct Link Overlay */}
                <div className="relative aspect-video overflow-hidden bg-stone-100">
                  <img
                    src={normalizeImageUrl(project.coverImage)}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={handleImageError}
                  />
                  
                  <div className="absolute inset-0 bg-stone-950/10 group-hover:bg-stone-950/20 transition-colors" />

                  {/* Category Tag Overlay */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-purple-950 text-xs small-caps tracking-wider border border-purple-100 font-medium shadow-sm">
                      {project.category}
                    </span>
                  </div>

                  {/* Direct Image URL Quick Copy Button */}
                  <button
                    onClick={(e) => handleCopyImageLink(e, project.coverImage, project.id)}
                    title="Copiar link direto da imagem HTML"
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-purple-950 text-stone-700 hover:text-white transition-all backdrop-blur-md border border-stone-200 shadow-sm"
                  >
                    {copiedId === project.id ? (
                      <Check className="w-3.5 h-3.5 text-purple-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-purple-950/90 text-white px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1 shadow-md">
                    <span className="small-caps text-[11px]">Ver Estudo</span>
                    <ExternalLink className="w-3 h-3 text-purple-200" />
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
                    <span>{project.client}</span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="text-xl font-serif text-stone-900 group-hover:text-purple-900 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-stone-600 line-clamp-2 leading-relaxed font-light">
                    {project.summary}
                  </p>
                </div>
              </div>

              {/* Card Footer Tools */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-stone-100 mt-4 text-xs text-stone-500">
                <div className="flex flex-wrap gap-1.5">
                  {project.tools.slice(0, 2).map((tool) => (
                    <span key={tool} className="px-2 py-0.5 rounded bg-purple-50 text-purple-900 border border-purple-100 text-[11px]">
                      {tool}
                    </span>
                  ))}
                  {project.tools.length > 2 && (
                    <span className="px-1.5 py-0.5 text-stone-400 text-[11px]">+{project.tools.length - 2}</span>
                  )}
                </div>

                <div className="flex items-center gap-1 text-stone-400 group-hover:text-purple-900 font-medium">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{project.views}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* Design Philosophy Section ("Filosofia de Design") */}
      <section className="bg-[#F5F1E8] border-y border-stone-200/80 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Column 1: Image & Editorial Caption */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-stone-300/80 shadow-xl bg-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
                  alt="Workspace de Design e Arquitetura de Informação"
                  className="w-full h-80 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-stone-800 bg-white/90 p-3 rounded-xl border border-stone-200 backdrop-blur-md shadow-sm">
                  <span>Espaço de Trabalho • Recife, Brasil</span>
                </div>
              </div>
            </div>

            {/* Column 2: Text Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="text-xs small-caps uppercase tracking-widest text-purple-900 font-semibold">Filosofia de Design</div>
              
              <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 leading-tight">
                Simplicidade Intencional & <br className="hidden sm:inline" />
                <span className="italic font-serif text-purple-900">Arquitetura de Informação Rigorosa</span>
              </h2>

              <p className="text-stone-700 text-base leading-relaxed font-sans font-light">
                Acredito que interfaces excepcionais não dependem de ornamentos superficiais, mas sim da clareza com que resolvem problemas reais. Todo Pixel deve possuir uma razão de existir baseada nas necessidades do usuário e nos objetivos do negócio.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-purple-100 shadow-sm space-y-1">
                  <h4 className="text-sm font-semibold text-purple-950">Redução de Carga Cognitiva</h4>
                  <p className="text-xs text-stone-600 font-light">Hierarquias visuais matemáticas que orientam a atenção sem sobrecarregar o usuário.</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-purple-100 shadow-sm space-y-1">
                  <h4 className="text-sm font-semibold text-purple-950">Sistemas Escaláveis</h4>
                  <p className="text-xs text-stone-600 font-light">Tokens e componentes padronizados que garantem consistência e agilidade no dev.</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* CTA Contact Callout */}
      <section className="max-w-5xl mx-auto px-4 text-center">
        <div className="bg-purple-950 text-purple-50 border border-purple-900 p-10 sm:p-14 rounded-3xl space-y-6 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-serif text-white font-medium">
              Tem um projeto em mente?
            </h2>
            <p className="text-purple-200 max-w-xl mx-auto text-sm sm:text-base font-light">
              Disponível para consultorias de UX, redesenho de produtos digitais e liderança de design systems.
            </p>
            <div className="pt-2">
              <button
                onClick={onContactClick}
                className="px-8 py-3.5 rounded-lg bg-white hover:bg-purple-50 text-purple-950 font-bold uppercase tracking-wider text-xs transition-all inline-flex items-center gap-2 shadow-xl active:scale-95"
              >
                <span>Iniciar uma Conversa</span>
                <ArrowRight className="w-4 h-4 text-purple-950" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
