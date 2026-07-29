import React, { useState } from 'react';
import { Lock, Eye, EyeOff, X } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
  error?: string | null;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSubmit, error }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(password);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white border border-purple-100 shadow-2xl overflow-hidden">
        <div className="flex items-start justify-between p-6 border-b border-stone-200 bg-purple-50/80">
          <div>
            <p className="text-xs small-caps tracking-widest text-purple-950 font-semibold">Acesso Restrito</p>
            <h2 className="mt-2 text-2xl font-serif font-medium text-stone-900">Entrar no Painel Administrativo</h2>
            <p className="mt-2 text-sm text-stone-600 font-light">Somente você pode acessar este gerenciador. Informe a senha pessoal para prosseguir.</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-purple-950 hover:bg-purple-100 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-xs small-caps text-stone-600 font-semibold">Senha do acesso administrativo</label>
            <div className="relative rounded-2xl border border-stone-200 bg-[#FAF7F2] overflow-hidden">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-transparent text-stone-900 text-sm focus:outline-none"
                placeholder="Digite sua senha"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-purple-950"
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-2xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>
          )}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-2xl border border-stone-200 bg-white text-stone-700 text-sm font-medium transition-colors hover:bg-stone-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 rounded-2xl bg-purple-950 text-white text-sm font-semibold uppercase tracking-widest shadow-sm hover:bg-purple-900 transition-all"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
