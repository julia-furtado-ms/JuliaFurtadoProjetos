import React, { useState } from 'react';
import { Mail, MapPin, Send, Copy, Check, Linkedin, Github, Sparkles, MessageSquare } from 'lucide-react';
import { ContactFormData } from '../types';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    budgetRange: 'Não se aplica'
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const emailAddress = 'julifurtado22@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMessage('');

    const subject = formData.subject.trim() || 'Mensagem do site';
    const budgetRange = formData.budgetRange?.trim() || 'Não se aplica';

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject,
          budgetRange,
          message: formData.message,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Falha ao enviar mensagem');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '', budgetRange: 'Não se aplica' });
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      const message = error instanceof Error ? error.message : 'Não foi possível enviar a mensagem no momento.';
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100/80 text-purple-950 border border-purple-200 text-xs small-caps tracking-widest font-medium">
          <Sparkles className="w-3.5 h-3.5 text-purple-700" />
          <span>Contato & Consultoria</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-serif text-stone-900 font-medium">
          Vamos conversar?
        </h1>
        <p className="text-stone-600 text-base font-sans font-light">
          Estou disponível para novos projetos de design de produto, consultorias de UX e parcerias criativas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Direct Info & Location */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Direct Email Card */}
          <div className="p-6 rounded-2xl bg-white border border-purple-100/80 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs small-caps text-purple-950 font-semibold">
              <Mail className="w-4 h-4 text-purple-700" />
              <span>E-mail Direto</span>
            </div>

            <div>
              <p className="text-xs text-stone-500 mb-1 font-light">Envie uma mensagem direta para:</p>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF7F2] border border-stone-200">
                <span className="font-mono text-stone-900 text-sm font-semibold truncate">
                  {emailAddress}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg hover:bg-purple-100 text-stone-500 hover:text-purple-950 transition-colors"
                  title="Copiar endereço de e-mail"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-purple-700" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {copiedEmail && (
              <p className="text-xs text-purple-900 font-medium small-caps">
                ✓ Endereço de e-mail copiado para a área de transferência!
              </p>
            )}
          </div>

          {/* Social Links */}
          <div className="p-6 rounded-2xl bg-white border border-purple-100/80 shadow-sm space-y-4">
            <h4 className="text-xs small-caps text-purple-950 uppercase tracking-widest font-semibold">Redes Profissionais</h4>
            <div className="space-y-3 text-sm font-light">
              <a
                href="https://www.linkedin.com/in/julia-furtado-ms/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[#FAF7F2] hover:bg-purple-50/60 border border-stone-200 text-stone-800 transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-purple-900" />
                  <span className="font-medium text-stone-900">LinkedIn / juliafurtado</span>
                </div>
                <span className="text-xs text-stone-400 group-hover:text-purple-900">↗</span>
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[#FAF7F2] hover:bg-purple-50/60 border border-stone-200 text-stone-800 transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <Github className="w-4 h-4 text-purple-900" />
                  <span className="font-medium text-stone-900">GitHub / juliafurtado</span>
                </div>
                <span className="text-xs text-stone-400 group-hover:text-purple-900">↗</span>
              </a>
            </div>
          </div>

          {/* Location & Image Card */}
          <div className="rounded-2xl overflow-hidden bg-white border border-purple-100/80 shadow-sm space-y-3 p-4">
            <div className="aspect-video rounded-xl overflow-hidden relative border border-stone-200">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Recife_-_Vista_a%C3%A9rea_a_partir_do_bairro_do_Recife.jpg"
                alt="Recife Antigo"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-stone-950/20" />
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-stone-900 font-mono bg-white/95 px-3 py-1 rounded-lg border border-stone-200 backdrop-blur-md shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-purple-700" />
                <span>Recife, Pernambuco — Brasil</span>
              </div>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed px-1 font-light">
              Vivendo em Recife, disponível para projetos remotos globais e workshops presenciais.
            </p>
          </div>

        </div>

        {/* Right Column: Interactive Form */}
        <div className="lg:col-span-7">
          <div className="p-8 rounded-3xl bg-white border border-purple-100/80 shadow-xl space-y-6">
            
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-950 flex items-center justify-center mx-auto border border-purple-200">
                  <Check className="w-8 h-8 text-purple-700" />
                </div>
                <h3 className="text-2xl font-serif text-stone-900 font-medium">Mensagem Enviada!</h3>
                <p className="text-stone-600 max-w-md mx-auto text-sm leading-relaxed font-light">
                  Obrigada pelo contato, <span className="text-purple-950 font-medium">{formData.name}</span>. Responderei ao e-mail <span className="text-purple-950 font-medium">{formData.email}</span> em até 24 horas úteis.
                </p>
                <button
                  onClick={() => {
                      setSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '', budgetRange: 'Não se aplica' });
                  }}
                  className="px-6 py-2.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-950 text-xs small-caps transition-colors border border-purple-200 font-medium"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center gap-2 border-b border-stone-200/80 pb-4">
                  <MessageSquare className="w-5 h-5 text-purple-700" />
                  <h3 className="text-xl font-serif text-stone-900 font-medium">Formulário de Mensagem</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs small-caps text-purple-950 font-semibold">Seu Nome *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: Clara Mendes"
                      className="w-full px-4 py-3 rounded-lg bg-[#FAF7F2] border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-purple-600 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs small-caps text-purple-950 font-semibold">Seu E-mail *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="seu@email.com"
                      className="w-full px-4 py-3 rounded-lg bg-[#FAF7F2] border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-purple-600 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs small-caps text-purple-950 font-semibold">Assunto</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Ex: Redesenho de App Mobile"
                      className="w-full px-4 py-3 rounded-lg bg-[#FAF7F2] border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-purple-600 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs small-caps text-purple-950 font-semibold">Estimativa de Orçamento</label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-[#FAF7F2] border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-purple-600 transition-colors"
                    >
                      <option value="Não se aplica">Não se aplica</option>
                      <option value="R$ 5k - R$ 15k">R$ 5.000 — R$ 15.000</option>
                      <option value="R$ 15k - R$ 35k">R$ 15.000 — R$ 35.000</option>
                      <option value="R$ 35k+">Acima de R$ 35.000</option>
                      <option value="Consultoria por hora">Consultoria / Mentoria</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs small-caps text-purple-950 font-semibold">Detalhes do Projeto ou Mensagem *</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Conte um pouco sobre os objetivos do produto, público-alvo ou prazos estimados..."
                    className="w-full px-4 py-3 rounded-lg bg-[#FAF7F2] border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-purple-600 transition-colors leading-relaxed"
                  />
                </div>

                {errorMessage && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-lg bg-purple-950 hover:bg-purple-900 text-white font-bold uppercase tracking-wider text-xs transition-all shadow-xl flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4 text-purple-200" />
                  <span>{isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}</span>
                </button>
              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
