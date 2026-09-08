import React from 'react';
import { useApp } from '../../context/AppContext';
import { User, ShieldCheck, Lock, Globe, Sprout, CheckCircle2, Phone, MapPin, Building, Sparkles } from 'lucide-react';

export const FarmerProfile: React.FC = () => {
  const { state, language, setLanguage, t } = useApp();
  const { farmer } = state;

  return (
    <div className="space-y-8 pb-20 max-w-4xl mx-auto">
      
      {/* Page Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-lg space-y-3">
        <h1 className="text-3xl font-black text-[#18221b] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#e2eedd] text-[#204e38] flex items-center justify-center font-bold">
            <User className="w-6 h-6 text-[#204e38]" />
          </div>
          <span>{t('profileTitle')}</span>
        </h1>
        <p className="text-sm text-[#5e6a5f] font-medium">
          {t('profileSub')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Main Details Card */}
        <div className="md:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-lg space-y-6">
          <div className="flex items-center gap-4 pb-5 border-b border-gray-100">
            <div className="w-16 h-16 rounded-2xl bg-[#204e38] text-white font-black text-2xl flex items-center justify-center shadow-md">
              RP
            </div>
            <div>
              <h2 className="font-black text-2xl text-gray-900">{farmer.name}</h2>
              <p className="text-xs text-gray-500 font-bold">Farmer ID: <span className="font-mono text-[#204e38]">{farmer.id}</span></p>
              <p className="text-xs text-[#204e38] font-bold mt-0.5">Registered Village: {farmer.village}</p>
            </div>
          </div>

          {/* Personal Info Grid */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-xs text-gray-700 uppercase tracking-wider">Personal Information & Preferences</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200/80">
                <span className="text-gray-500 block mb-1 font-semibold">{t('maskedPhone')}</span>
                <span className="font-mono font-black text-gray-900 text-sm">{farmer.phone}</span>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200/80">
                <span className="text-gray-500 block mb-1 font-semibold">Preferred Language</span>
                <span className="font-bold text-[#204e38] text-sm capitalize">{language === 'en' ? 'English' : language === 'hi' ? 'हिन्दी' : 'मराठी'}</span>
              </div>
            </div>

            {/* Preferred Crops */}
            <div className="bg-[#e2eedd] p-5 rounded-2xl border border-[#bcdba6] space-y-2">
              <span className="text-xs font-extrabold text-[#204e38] block uppercase tracking-wider">Cultivated Crop Preferences</span>
              <div className="flex flex-wrap gap-2">
                {farmer.cropPreferences.map(crop => (
                  <span key={crop} className="bg-[#204e38] text-white font-bold text-xs px-3.5 py-1.5 rounded-full shadow-sm">
                    🌾 {crop}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Security & Masking Card */}
        <div className="bg-gradient-to-br from-[#122e20] to-[#153425] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-700/40 space-y-5">
          <div className="flex items-center gap-2 text-amber-300">
            <ShieldCheck className="w-6 h-6 text-amber-300" />
            <h3 className="font-black text-lg">{t('privacyTitle')}</h3>
          </div>

          <p className="text-xs text-emerald-100/90 leading-relaxed font-medium">
            {t('securityShield')} Your sensitive identification documents are masked with 256-bit encryption.
          </p>

          <div className="space-y-3.5 pt-1 text-xs">
            <div className="bg-emerald-950/80 p-3.5 rounded-2xl border border-emerald-800 space-y-1">
              <span className="text-emerald-300 block text-[11px] font-bold">{t('maskedAadhaar')}</span>
              <span className="font-mono font-bold text-amber-300 text-sm">{farmer.aadhaar}</span>
            </div>

            <div className="bg-emerald-950/80 p-3.5 rounded-2xl border border-emerald-800 space-y-1">
              <span className="text-emerald-300 block text-[11px] font-bold">{t('dbtAccountLabel')}</span>
              <span className="font-mono font-bold text-amber-300 text-sm">{farmer.bankAccount}</span>
              <span className="text-[10px] text-emerald-200 block font-medium">Bank: {farmer.bankName} ({farmer.ifsc})</span>
            </div>

            <div className="bg-emerald-950/80 p-3.5 rounded-2xl border border-emerald-800 space-y-1">
              <span className="text-emerald-300 block text-[11px] font-bold">{t('upiLabel')}</span>
              <span className="font-mono font-bold text-emerald-200">{farmer.upiId}</span>
            </div>
          </div>

          <div className="bg-emerald-950 p-4 rounded-2xl border border-emerald-800 text-xs text-emerald-200 font-medium">
            🔒 <span className="font-bold">Role-Based Access:</span> Procurement officers only view weight and grade specs required for transaction processing.
          </div>
        </div>

      </div>

    </div>
  );
};
