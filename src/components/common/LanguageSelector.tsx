import React from 'react';
import { useApp } from '../../context/AppContext';
import { Language } from '../../types';
import { Globe } from 'lucide-react';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useApp();

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'mr', label: 'मराठी' }
  ];

  return (
    <div className="flex items-center gap-1 bg-black/30 backdrop-blur-md p-1 rounded-2xl border border-white/10 shadow-inner">
      <div className="pl-2 pr-1 hidden sm:flex items-center text-[#86c559]">
        <Globe className="w-3.5 h-3.5" />
      </div>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-all cursor-pointer ${
            language === lang.code
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md shadow-amber-500/20 scale-105'
              : 'text-emerald-200/80 hover:text-white hover:bg-white/10'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

