import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  User, 
  ShieldCheck, 
  Phone, 
  Lock, 
  ArrowRight, 
  Sprout, 
  Building2, 
  CheckCircle2, 
  Sparkles,
  KeyRound,
  BadgeCheck
} from 'lucide-react';

export const AuthLoginModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authModalMode, 
    setAuthModalMode, 
    setRole, 
    setFarmerTab, 
    setOfficerTab, 
    showToast,
    t
  } = useApp();

  // Farmer login form state
  const [farmerPhone, setFarmerPhone] = useState('9876543210');
  const [farmerOtp, setFarmerOtp] = useState('4512');

  // Officer login form state
  const [officerId, setOfficerId] = useState('OFFICER-APMC-01');
  const [officerPass, setOfficerPass] = useState('mandi2026');
  const [selectedCentre, setSelectedCentre] = useState('centre-1');

  if (!isAuthModalOpen) return null;

  const handleFarmerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setRole('FARMER');
    setFarmerTab('dashboard');
    setIsAuthModalOpen(false);
    showToast('Welcome Rahul Patil! Logged into Farmer Procurement Portal.');
  };

  const handleOfficerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setRole('OFFICER');
    setOfficerTab('queue');
    setIsAuthModalOpen(false);
    showToast('Authenticated! Logged into Officer Command Portal.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-gray-100 overflow-hidden relative transform transition-all">
        
        {/* Top Decorative Header */}
        <div className="bg-[#204e38] text-white p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 opacity-10 pointer-events-none">
            <Sprout className="w-48 h-48 text-white" />
          </div>

          {/* Close Button */}
          <button 
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#86c559] text-[#183624] flex items-center justify-center font-bold shadow-sm">
              <Sprout className="w-6 h-6 text-[#183624]" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white">KisanSetu</span>
              <span className="text-[10px] block font-bold text-emerald-200 uppercase tracking-widest">
                AUTHENTICATION PORTAL
              </span>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-3">
            {authModalMode === 'FARMER' ? 'Farmer Portal Login' : 'Procurement Officer Portal Login'}
          </h2>
          <p className="text-xs text-emerald-100/90 font-medium mt-1">
            {authModalMode === 'FARMER'
              ? 'Enter mobile number or Aadhaar to manage tokens & payments.'
              : 'Official government credentials for mandi procurement officers.'}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex border-b border-gray-100 bg-[#f7f7f2] p-1.5 gap-1.5">
          <button
            type="button"
            onClick={() => setAuthModalMode('FARMER')}
            className={`flex-1 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              authModalMode === 'FARMER'
                ? 'bg-white text-[#204e38] shadow-sm border border-gray-200/80'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <User className="w-4 h-4 text-[#204e38]" />
            <span>Farmer Login</span>
          </button>

          <button
            type="button"
            onClick={() => setAuthModalMode('OFFICER')}
            className={`flex-1 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              authModalMode === 'OFFICER'
                ? 'bg-[#204e38] text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#86c559]" />
            <span>Officer Portal</span>
          </button>
        </div>

        {/* Modal Form Body */}
        <div className="p-6 sm:p-8">

          {/* 🌾 FARMER LOGIN FORM */}
          {authModalMode === 'FARMER' && (
            <form onSubmit={handleFarmerLogin} className="space-y-4">
              
              {/* Quick Demo Pre-fill Notice */}
              <div className="bg-[#e2eedd] border border-[#bcdba6] rounded-2xl p-3.5 flex items-center justify-between text-xs text-[#1c4d29]">
                <div className="flex items-center gap-2 font-bold">
                  <BadgeCheck className="w-4 h-4 text-[#204e38]" />
                  <span>Demo Farmer: Rahul Patil (Khed Village)</span>
                </div>
                <span className="bg-[#204e38] text-white font-mono text-[10px] px-2 py-0.5 rounded-full font-bold">
                  TEST ACCOUNT
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Mobile Number / Aadhaar Number
                </label>
                <div className="relative">
                  <Phone className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={farmerPhone}
                    onChange={(e) => setFarmerPhone(e.target.value)}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#204e38]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  OTP Code / Access Pin
                </label>
                <div className="relative">
                  <KeyRound className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={farmerOtp}
                    onChange={(e) => setFarmerOtp(e.target.value)}
                    placeholder="Enter 4-digit code"
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#204e38]"
                    required
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#204e38] hover:bg-[#153425] text-white font-bold py-3.5 px-6 rounded-2xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer text-base"
                >
                  <span>Login to Farmer Portal</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={handleFarmerLogin}
                  className="text-xs font-bold text-[#204e38] hover:underline cursor-pointer"
                >
                  ⚡ One-Click Direct Demo Login (Skip OTP)
                </button>
              </div>
            </form>
          )}

          {/* 🛡️ OFFICER LOGIN FORM */}
          {authModalMode === 'OFFICER' && (
            <form onSubmit={handleOfficerLogin} className="space-y-4">
              
              {/* Quick Demo Pre-fill Notice */}
              <div className="bg-[#faf6ee] border border-[#eee4d2] rounded-2xl p-3.5 flex items-center justify-between text-xs text-[#6e4605]">
                <div className="flex items-center gap-2 font-bold">
                  <BadgeCheck className="w-4 h-4 text-[#6e4605]" />
                  <span>Demo Officer: Officer S. Deshmukh</span>
                </div>
                <span className="bg-[#6e4605] text-white font-mono text-[10px] px-2 py-0.5 rounded-full font-bold">
                  APMC OFFICER
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Officer Employee ID / Code
                </label>
                <div className="relative">
                  <User className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={officerId}
                    onChange={(e) => setOfficerId(e.target.value)}
                    placeholder="OFFICER-APMC-01"
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#204e38]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Assigned Procurement Mandi Centre
                </label>
                <div className="relative">
                  <Building2 className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    value={selectedCentre}
                    onChange={(e) => setSelectedCentre(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#204e38] appearance-none bg-white"
                  >
                    <option value="centre-1">ABC Procurement Centre (Khed Sector 4)</option>
                    <option value="centre-2">XYZ Grain Collection Hub (Talegaon)</option>
                    <option value="centre-3">PQR Agri Mandi (Chakan)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Official Security Passkey
                </label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={officerPass}
                    onChange={(e) => setOfficerPass(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#204e38]"
                    required
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#153425] hover:bg-[#0f271b] text-white font-bold py-3.5 px-6 rounded-2xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer text-base"
                >
                  <ShieldCheck className="w-5 h-5 text-[#86c559]" />
                  <span>Authenticate & Open Officer Portal</span>
                </button>
              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={handleOfficerLogin}
                  className="text-xs font-bold text-[#204e38] hover:underline cursor-pointer"
                >
                  ⚡ One-Click Direct Officer Demo Login
                </button>
              </div>
            </form>
          )}

        </div>

      </div>

    </div>
  );
};
