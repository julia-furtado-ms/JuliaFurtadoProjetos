import React, { useState } from 'react';
import { SKILL_ITEMS } from '../data/mockProjects';
import { normalizeImageUrl } from '../utils/normalizeImageUrl';
import { ArrowRight, MapPin, Award, BookOpen, Layers, Copy, Check, Sparkles, Cpu, Code, Palette, Search } from 'lucide-react';

interface AboutViewProps {
  onContactClick: () => void;
  onOpenImageLinksModal: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onContactClick, onOpenImageLinksModal }) => {
  const [copiedPortrait, setCopiedPortrait] = useState(false);
  const portraitUrl = '/portrait.jpg';

  const handleCopyPortrait = () => {
    navigator.clipboard.writeText(window.location.origin + portraitUrl);
    setCopiedPortrait(true);
    setTimeout(() => setCopiedPortrait(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* Editorial Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Portrait Image Column */}
        <div className="lg:col-span-5 space-y-3">
          <div className="relative rounded-2xl overflow-hidden bg-stone-200 border border-stone-300 shadow-xl group">
            <img
              src={portraitUrl}
              alt="Júlia Furtado - Designer de Produto"
              className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1200';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/30 via-transparent to-transparent" />
            
            {/* Quick Copy URL overlay */}
            <button
              onClick={handleCopyPortrait}
              className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-white/90 text-stone-800 hover:text-purple-950 text-xs small-caps border border-stone-200 backdrop-blur-md transition-all flex items-center gap-1.5 shadow-sm font-medium"
            >
              {copiedPortrait ? <Check className="w-3.5 h-3.5 text-purple-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPortrait ? 'Link Copiado' : 'URL da Foto'}</span>
            </button>
          </div>

          <div className="text-center sm:text-left text-xs font-mono text-stone-500">
            <span>Retrato Editorial • Recife, Pernambuco</span>
          </div>
        </div>

        {/* Narrative Biography */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100/80 text-purple-950 border border-purple-200 text-xs small-caps tracking-widest font-medium">
            <Sparkles className="w-3.5 h-3.5 text-purple-700" />
            <span>Perfil Profissional & Filosofia</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif text-stone-900 leading-tight font-medium">
            Design vai além da estética: <br />
            <span className="italic font-serif text-purple-900">é sobre resolver intenções.</span>
          </h1>

          <div className="space-y-4 text-stone-700 text-base leading-relaxed font-sans font-light">
            <p>
              Olá! Sou Júlia Furtado, Designer em formação no Recife. Atuo em diversas áreas do Design, portando uma visão estratégica refinada pela minha graduação em Adminsitração na UPE.
            </p>
            <p>
              Multidisciplinaridade é, para mim, mais do que uma vantagem, é uma necessidade. Por isso busco sempre por conhecimento e não paro.
            </p>
            <p>
              Neste site, que eu fiz com auxilio de IA estarei expondo meus projetos e a intenção por trás de cada um deles.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-4 text-xs text-stone-600 font-light">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-purple-100 shadow-sm text-purple-950 font-medium">
              <MapPin className="w-3.5 h-3.5 text-purple-700" />
              <span>Recife • Atuação Global</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-purple-100 shadow-sm text-purple-950 font-medium">
              <Award className="w-3.5 h-3.5 text-purple-700" />
              <span>6+ Anos de Experiência</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-purple-100 shadow-sm text-purple-950 font-medium">
              <BookOpen className="w-3.5 h-3.5 text-purple-700" />
              <span>CESAR School & PUCRS</span>
            </div>
          </div>

        </div>

      </section>

      {/* Tools & Mastery Matrix ("Conhecimentos & Ferramentas") */}
      <section className="space-y-8 border-t border-stone-200/80 pt-16">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs small-caps uppercase tracking-widest text-purple-900 font-semibold">Habilidades & Domínio Técnico</div>
          <h2 className="text-3xl font-serif text-stone-900 font-medium">Conhecimentos & Ferramentas</h2>
          <p className="text-sm text-stone-600 font-light">Stack moderna adaptada para prototipagem rápida e desenvolvimento produtivo.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_ITEMS.map((skill) => (
            <div 
              key={skill.name}
              className="p-6 rounded-2xl bg-white border border-purple-100/80 hover:border-purple-300 shadow-sm transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs small-caps text-purple-900 font-semibold">{skill.category}</span>
                <span className="text-xs font-mono text-stone-500">{skill.level}% Dominio</span>
              </div>

              <h3 className="text-lg font-medium text-stone-900">{skill.name}</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-light">{skill.description}</p>

              {/* Progress Bar */}
              <div className="w-full bg-purple-100/50 h-2 rounded-full overflow-hidden border border-purple-200/50">
                <div 
                  className="bg-purple-900 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CAD, 3D & Vibe Coding Specialization Box */}
      <section className="bg-purple-950 text-white p-8 rounded-3xl border border-purple-900 space-y-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-xl font-serif text-white font-medium">
              Modelagem 3D & Vibe Coding Acelerado por IA
            </h3>
            <p className="text-xs text-purple-200 leading-relaxed font-light">
              Integração de software CAD (Onshape / Autodesk Fusion) para conceitos físicos com prototipagem web reativa em React, Tailwind e Gemini API.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onContactClick}
              className="px-6 py-3 rounded-lg bg-white hover:bg-purple-50 text-purple-950 font-bold uppercase tracking-wider text-xs transition-all flex items-center gap-2 active:scale-95 shadow-md"
            >
              <span>Falar com Júlia</span>
              <ArrowRight className="w-4 h-4 text-purple-950" />
            </button>
          </div>
        </div>
      </section>

      {/* Final Callout */}
      <section className="text-center pt-8">
        <div className="space-y-4">
          <h3 className="text-2xl font-serif text-stone-900 font-medium">
            Tem interesse em um ponto de vista inovador?
          </h3>
          <p className="text-sm text-stone-600 max-w-md mx-auto font-light">
            Vamos conversar sobre como elevar a experiência digital da sua marca ou produto.
          </p>
          <div>
            <button
              onClick={onContactClick}
              className="px-6 py-3 rounded-lg bg-purple-950 hover:bg-purple-900 text-purple-50 font-bold uppercase tracking-wider text-xs transition-all inline-flex items-center gap-2 active:scale-95 shadow-xl"
            >
              <span>Entre em Contato</span>
              <ArrowRight className="w-4 h-4 text-purple-200" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
