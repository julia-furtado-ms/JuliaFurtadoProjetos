import React from 'react';
import { ArrowUp, Image, Heart, MapPin, Linkedin, Github } from 'lucide-react';

interface FooterProps {
  onNavClick: (tab: 'home' | 'about' | 'contact' | 'admin') => void;
  onOpenImageLinksModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onOpenImageLinksModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#F5F1E8] text-stone-600 border-t border-purple-900/10 pt-16 pb-12 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-stone-300/60">
          
          {/* Column 1: Brand & Bio */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-purple-950 text-purple-50 flex items-center justify-center font-serif italic font-bold text-base shadow-sm">
                JF
              </div>
              <span className="text-xl font-medium text-stone-900 tracking-tight">
                Júlia Furtado
              </span>
            </div>
            <p className="text-sm text-stone-600 max-w-md leading-relaxed font-light">
              Design de produto, sistemas de interface e prototipagem interativa.
              Criando soluções que combinam criatividade e funcionalidade.
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-500 font-light">
              <MapPin className="w-3.5 h-3.5 text-purple-700" />
              <span>Recife, Pernambuco — Brasil • Projetos Globais Remote</span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs small-caps uppercase tracking-widest text-purple-950 font-semibold">Navegação</h4>
            <ul className="space-y-2 text-sm font-light">
              <li>
                <button 
                  onClick={() => onNavClick('home')} 
                  className="hover:text-purple-950 transition-colors text-stone-700"
                >
                  Projetos & Estudos de Caso
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavClick('about')} 
                  className="hover:text-purple-950 transition-colors text-stone-700"
                >
                  Sobre Mim & Conhecimentos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavClick('contact')} 
                  className="hover:text-purple-950 transition-colors text-stone-700"
                >
                  Formulário de Contato
                </button>
              </li>
              <li className="pt-2">
                <button 
                  onClick={() => onNavClick('admin')} 
                  className="text-xs text-stone-500 hover:text-purple-900 transition-colors flex items-center gap-1.5"
                >
                  <span>Área Administrativa</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-light">
          <p>© {new Date().getFullYear()} Júlia Furtado. Todos os direitos reservados.</p>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://www.linkedin.com/in/julia-furtado-ms/" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-purple-950 transition-colors p-1"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-purple-950 transition-colors p-1"
            >
              <Github className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white text-purple-950 hover:bg-purple-100 border border-purple-200 shadow-sm transition-colors ml-4"
              title="Voltar ao topo"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
