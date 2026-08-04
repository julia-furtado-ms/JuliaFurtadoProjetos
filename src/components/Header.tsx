import React from 'react';
import { Sparkles, Briefcase, Mail, Settings } from 'lucide-react';

interface HeaderProps {
  activeTab: 'home' | 'about' | 'contact' | 'admin';
  onNavClick: (tab: 'home' | 'about' | 'contact' | 'admin') => void;
  onOpenImageLinksModal: () => void;
  selectedProjectSlug: string | null;
  onClearSelectedProject: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onNavClick,
  onOpenImageLinksModal,
  selectedProjectSlug,
  onClearSelectedProject,
}) => {
  const handleNavClick = (tab: 'home' | 'about' | 'contact' | 'admin') => {
    onClearSelectedProject();
    onNavClick(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#FAF7F2]/90 border-b border-purple-900/10 text-stone-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Identifier */}
        <button 
          onClick={() => handleNavClick('home')}
          className="group flex items-center gap-3.5 text-left focus:outline-none rounded-lg p-1 transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-purple-950 text-purple-50 flex items-center justify-center font-serif italic font-bold text-lg shadow-sm group-hover:bg-purple-900 group-hover:scale-105 transition-all">
            JF
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-stone-900 tracking-tight text-base sm:text-lg group-hover:text-purple-950 transition-colors">
                Júlia Furtado
              </span>
              <span className="text-[10px] small-caps tracking-widest px-2 py-0.5 rounded-full bg-purple-100/80 text-purple-900 border border-purple-200">
                Atelier
              </span>
            </div>
            <p className="text-xs text-stone-500 hidden sm:block font-light">Design & Criatividade</p>
          </div>
        </button>

        {/* Central Navigation */}
        <nav className="hidden md:flex items-center gap-1.5 bg-stone-200/60 p-1.5 rounded-full border border-stone-300/60 shadow-inner">
          <button
            onClick={() => handleNavClick('home')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all ${
              activeTab === 'home' && !selectedProjectSlug
                ? 'bg-purple-950 text-white font-semibold shadow-sm'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/70'
            }`}
          >
            Projetos
          </button>

          <button
            onClick={() => handleNavClick('about')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all ${
              activeTab === 'about'
                ? 'bg-purple-950 text-white font-semibold shadow-sm'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/70'
            }`}
          >
            Sobre
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all ${
              activeTab === 'contact'
                ? 'bg-purple-950 text-white font-semibold shadow-sm'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/70'
            }`}
          >
            Contato
          </button>
        </nav>

        {/* Action Buttons & Discreet Manage Action */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Discreet Admin / Manage Button */}
          <button
            onClick={() => handleNavClick('admin')}
            title="Gerenciar Conteúdo"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] small-caps transition-all ${
              activeTab === 'admin'
                ? 'bg-purple-100 text-purple-950 border border-purple-200'
                : 'text-stone-500 hover:text-purple-900 hover:bg-stone-200/50 border border-transparent'
            }`}
          >
            <Settings className="w-3.5 h-3.5 text-stone-500" />
            <span className="hidden sm:inline">Gerenciar</span>
          </button>
        </div>

      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-stone-200 px-2 py-2 bg-[#FAF7F2]/95 text-xs">
        <button
          onClick={() => handleNavClick('home')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] uppercase tracking-wider ${
            activeTab === 'home' ? 'text-purple-950 font-semibold bg-purple-100' : 'text-stone-600'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Projetos</span>
        </button>
        <button
          onClick={() => handleNavClick('about')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] uppercase tracking-wider ${
            activeTab === 'about' ? 'text-purple-950 font-semibold bg-purple-100' : 'text-stone-600'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Sobre</span>
        </button>
        <button
          onClick={() => handleNavClick('contact')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] uppercase tracking-wider ${
            activeTab === 'contact' ? 'text-purple-950 font-semibold bg-purple-100' : 'text-stone-600'
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Contato</span>
        </button>
        <button
          onClick={() => handleNavClick('admin')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] uppercase tracking-wider ${
            activeTab === 'admin' ? 'text-purple-950 font-semibold bg-purple-100' : 'text-stone-600'
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Gerenciar</span>
        </button>
      </div>
    </header>
  );
};
