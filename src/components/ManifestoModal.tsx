import React from 'react';
import { X, Sparkles, CheckCircle2 } from 'lucide-react';

interface ManifestoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManifestoModal: React.FC<ManifestoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-md animate-fade-in">
      <div className="bg-white border border-purple-100/80 rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-purple-100 flex items-center justify-between bg-purple-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-100 text-purple-950 border border-purple-200">
              <Sparkles className="w-5 h-5 text-purple-700" />
            </div>
            <div>
              <h2 className="text-xl font-serif text-stone-900 font-medium">Manifesto de Design</h2>
              <p className="text-xs text-stone-600 font-light">Princípios orientadores para produtos digitais significativos.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-purple-950 hover:bg-purple-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto space-y-6 font-sans text-stone-700 text-sm leading-relaxed font-light">
          
          <div className="space-y-2">
            <span className="text-xs small-caps text-purple-950 uppercase tracking-widest font-semibold">Princípio 01</span>
            <h3 className="text-xl font-serif text-stone-900 font-medium">1. Simplicidade Intencional</h3>
            <p className="text-stone-700">
              Simplificar não é remover elementos aleatoriamente, mas sim compreender tão profundamente a essência do problema que apenas o estritamente necessário permanece. Interfaces limpas trazem paz de espírito.
            </p>
          </div>

          <div className="space-y-2 border-t border-stone-200/80 pt-4">
            <span className="text-xs small-caps text-purple-950 uppercase tracking-widest font-semibold">Princípio 02</span>
            <h3 className="text-xl font-serif text-stone-900 font-medium">2. Arquitetura de Informação Rigorosa</h3>
            <p className="text-stone-700">
              A beleza visual sem estrutura clara é apenas ornamento. Organizamos dados, conteúdos e fluxos operacionais para que a mente do usuário encontre respostas sem esforço.
            </p>
          </div>

          <div className="space-y-2 border-t border-stone-200/80 pt-4">
            <span className="text-xs small-caps text-purple-950 uppercase tracking-widest font-semibold">Princípio 03</span>
            <h3 className="text-xl font-serif text-stone-900 font-medium">3. Respeito à Atenção Humana</h3>
            <p className="text-stone-700">
              Rejeitamos padrões obscuros (dark patterns) e ruídos visuais criados para prender o usuário de forma artificial. Criamos ferramentas que capacitam, concluem a tarefa e devolvem o tempo às pessoas.
            </p>
          </div>

          <div className="space-y-2 border-t border-stone-200/80 pt-4">
            <span className="text-xs small-caps text-purple-950 uppercase tracking-widest font-semibold">Princípio 04</span>
            <h3 className="text-xl font-serif text-stone-900 font-medium">4. Sistemas Vivos & Acessíveis</h3>
            <p className="text-stone-700">
              Design Systems bem estruturados e com alto nível de contraste WCAG garantem inclusão radical e agilidade para a engenharia evoluir o software com segurança.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-[#FAF7F2] text-right">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg bg-purple-950 hover:bg-purple-900 text-white font-bold uppercase tracking-wider text-xs transition-colors active:scale-95 shadow-md"
          >
            Entendido
          </button>
        </div>

      </div>
    </div>
  );
};
