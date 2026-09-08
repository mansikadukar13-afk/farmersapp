import React from 'react';
import { useApp } from '../../context/AppContext';
import { LanguageSelector } from './LanguageSelector';
import { Sprout, ShieldAlert, Bell, User, LayoutDashboard, Ticket, MapPin, Clock, CreditCard, History, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const { role, setRole, t, farmerTab, setFarmerTab, officerTab, setOfficerTab, state, setIsSOSOpen } = useApp();

  const unreadCount = state.notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-50 bg-[#0c2417]/90 backdrop-blur-xl border-b border-[#86c559]/20 shadow-2xl shadow-[#0c2417]/40 text-white">
      {/* Background Glow Accent */}
      <div className="absolute top-0 left-1/4 w-96 h-20 bg-[#86c559]/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Main Top Header Bar */}
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div 
            className="flex items-center gap-3.5 cursor-pointer group"
            onClick={() => setRole('LANDING')}
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#86c559] via-[#6ca843] to-[#1e4d36] flex items-center justify-center text-[#0c2417] font-black shadow-lg shadow-[#86c559]/25 ring-2 ring-[#86c559]/30 group-hover:scale-105 transition-all duration-300">
              <Sprout className="w-6 h-6 text-[#0c2417]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-2xl tracking-tight text-white font-sans group-hover:text-emerald-300 transition-colors">
                  {t('brandName')}
                </span>
                <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider hidden md:inline shadow-md shadow-amber-500/20 ring-1 ring-amber-300/40">
                  <Sparkles className="w-2.5 h-2.5 inline mr-1 -mt-0.5" />
                  PROD 2026
                </span>
              </div>
              <p className="text-xs text-emerald-200/80 font-medium tracking-wide hidden sm:block">
                {t('tagline')}
              </p>
            </div>
          </div>

          {/* Navigation & Action Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Language Selector */}
            <LanguageSelector />

            {/* Role Switcher Pill Toggle */}
            <div className="flex items-center bg-black/40 backdrop-blur-md p-1 rounded-2xl border border-white/10 shadow-inner">
              <button
                onClick={() => {
                  setRole('FARMER');
                  setFarmerTab('dashboard');
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                  role === 'FARMER'
                    ? 'bg-gradient-to-r from-[#86c559] to-[#68a83c] text-[#0c2417] shadow-md shadow-[#86c559]/25 scale-105'
                    : 'text-emerald-200/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{t('farmerRole')}</span>
                <span className="md:hidden">Farmer</span>
              </button>

              <button
                onClick={() => {
                  setRole('OFFICER');
                  setOfficerTab('queue');
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                  role === 'OFFICER'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md shadow-amber-400/25 scale-105'
                    : 'text-emerald-200/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{t('officerRole')}</span>
                <span className="md:hidden">Officer</span>
              </button>
            </div>

            {/* SOS Help Trigger */}
            {role === 'FARMER' && (
              <button
                onClick={() => setIsSOSOpen(true)}
                className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white px-3.5 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 shadow-lg shadow-red-600/30 active:scale-95 border border-red-400/30 cursor-pointer"
                title="Emergency Help & Support"
              >
                <ShieldAlert className="w-4 h-4 animate-pulse text-amber-300" />
                <span className="hidden sm:inline">SOS</span>
              </button>
            )}
          </div>
        </div>

        {/* Farmer Horizontal Tab Navigation Bar */}
        {role === 'FARMER' && (
          <div className="flex items-center gap-1 sm:gap-2 py-2 overflow-x-auto border-t border-white/10 no-scrollbar text-xs sm:text-sm">
            
            <button
              onClick={() => setFarmerTab('dashboard')}
              className={`px-3.5 py-2 rounded-xl whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                farmerTab === 'dashboard'
                  ? 'bg-white/15 text-white font-black shadow-inner ring-1 ring-white/20'
                  : 'text-emerald-200/70 hover:text-white hover:bg-white/10 font-semibold'
              }`}
            >
              <LayoutDashboard className={`w-4 h-4 ${farmerTab === 'dashboard' ? 'text-[#86c559]' : 'text-emerald-300/70'}`} />
              <span>{t('navDashboard')}</span>
              {farmerTab === 'dashboard' && <div className="w-1.5 h-1.5 rounded-full bg-[#86c559] animate-pulse" />}
            </button>

            <button
              onClick={() => setFarmerTab('find-centre')}
              className={`px-3.5 py-2 rounded-xl whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                farmerTab === 'find-centre'
                  ? 'bg-white/15 text-white font-black shadow-inner ring-1 ring-white/20'
                  : 'text-emerald-200/70 hover:text-white hover:bg-white/10 font-semibold'
              }`}
            >
              <MapPin className={`w-4 h-4 ${farmerTab === 'find-centre' ? 'text-[#86c559]' : 'text-emerald-300/70'}`} />
              <span>{t('navFindCentre')}</span>
              {farmerTab === 'find-centre' && <div className="w-1.5 h-1.5 rounded-full bg-[#86c559] animate-pulse" />}
            </button>

            <button
              onClick={() => setFarmerTab('schedule')}
              className={`px-3.5 py-2 rounded-xl whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                farmerTab === 'schedule'
                  ? 'bg-white/15 text-white font-black shadow-inner ring-1 ring-white/20'
                  : 'text-emerald-200/70 hover:text-white hover:bg-white/10 font-semibold'
              }`}
            >
              <Clock className={`w-4 h-4 ${farmerTab === 'schedule' ? 'text-[#86c559]' : 'text-emerald-300/70'}`} />
              <span>{t('navSchedule')}</span>
              {farmerTab === 'schedule' && <div className="w-1.5 h-1.5 rounded-full bg-[#86c559] animate-pulse" />}
            </button>

            <button
              onClick={() => setFarmerTab('my-token')}
              className={`px-3.5 py-2 rounded-xl whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                farmerTab === 'my-token'
                  ? 'bg-white/15 text-white font-black shadow-inner ring-1 ring-white/20'
                  : 'text-emerald-200/70 hover:text-white hover:bg-white/10 font-semibold'
              }`}
            >
              <Ticket className="w-4 h-4 text-amber-300" />
              <span>{t('navMyToken')}</span>
              <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full shadow-sm">
                #{state.activeToken.tokenNumber}
              </span>
            </button>

            <button
              onClick={() => setFarmerTab('procurement')}
              className={`px-3.5 py-2 rounded-xl whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                farmerTab === 'procurement'
                  ? 'bg-white/15 text-white font-black shadow-inner ring-1 ring-white/20'
                  : 'text-emerald-200/70 hover:text-white hover:bg-white/10 font-semibold'
              }`}
            >
              <Sprout className={`w-4 h-4 ${farmerTab === 'procurement' ? 'text-[#86c559]' : 'text-emerald-300/70'}`} />
              <span>{t('navProcurement')}</span>
              {farmerTab === 'procurement' && <div className="w-1.5 h-1.5 rounded-full bg-[#86c559] animate-pulse" />}
            </button>

            <button
              onClick={() => setFarmerTab('payment')}
              className={`px-3.5 py-2 rounded-xl whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                farmerTab === 'payment'
                  ? 'bg-white/15 text-white font-black shadow-inner ring-1 ring-white/20'
                  : 'text-emerald-200/70 hover:text-white hover:bg-white/10 font-semibold'
              }`}
            >
              <CreditCard className={`w-4 h-4 ${farmerTab === 'payment' ? 'text-[#86c559]' : 'text-emerald-300/70'}`} />
              <span>{t('navPayment')}</span>
              {farmerTab === 'payment' && <div className="w-1.5 h-1.5 rounded-full bg-[#86c559] animate-pulse" />}
            </button>

            <button
              onClick={() => setFarmerTab('history')}
              className={`px-3.5 py-2 rounded-xl whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                farmerTab === 'history'
                  ? 'bg-white/15 text-white font-black shadow-inner ring-1 ring-white/20'
                  : 'text-emerald-200/70 hover:text-white hover:bg-white/10 font-semibold'
              }`}
            >
              <History className={`w-4 h-4 ${farmerTab === 'history' ? 'text-[#86c559]' : 'text-emerald-300/70'}`} />
              <span>{t('navHistory')}</span>
              {farmerTab === 'history' && <div className="w-1.5 h-1.5 rounded-full bg-[#86c559] animate-pulse" />}
            </button>

            <button
              onClick={() => setFarmerTab('notifications')}
              className={`px-3.5 py-2 rounded-xl whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer relative ${
                farmerTab === 'notifications'
                  ? 'bg-white/15 text-white font-black shadow-inner ring-1 ring-white/20'
                  : 'text-emerald-200/70 hover:text-white hover:bg-white/10 font-semibold'
              }`}
            >
              <Bell className={`w-4 h-4 ${farmerTab === 'notifications' ? 'text-[#86c559]' : 'text-emerald-300/70'}`} />
              <span>{t('navNotifications')}</span>
              {unreadCount > 0 && (
                <span className="bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center ml-0.5 shadow-md shadow-red-500/30 animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setFarmerTab('profile')}
              className={`px-3.5 py-2 rounded-xl whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ml-auto ${
                farmerTab === 'profile'
                  ? 'bg-white/15 text-white font-black shadow-inner ring-1 ring-white/20'
                  : 'text-emerald-200/70 hover:text-white hover:bg-white/10 font-semibold'
              }`}
            >
              <User className={`w-4 h-4 ${farmerTab === 'profile' ? 'text-[#86c559]' : 'text-emerald-300/70'}`} />
              <span>{t('navProfile')}</span>
            </button>
          </div>
        )}

        {/* Officer Horizontal Tab Navigation Bar */}
        {role === 'OFFICER' && (
          <div className="flex items-center gap-2 py-2 overflow-x-auto border-t border-white/10 no-scrollbar text-xs sm:text-sm">
            
            <button
              onClick={() => setOfficerTab('queue')}
              className={`px-3.5 py-2 rounded-xl whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                officerTab === 'queue'
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-extrabold shadow-md shadow-amber-400/20'
                  : 'text-emerald-200/70 hover:text-white hover:bg-white/10 font-semibold'
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span>{t('navLiveQueue')}</span>
            </button>

            <button
              onClick={() => setOfficerTab('weighing')}
              className={`px-3.5 py-2 rounded-xl whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                officerTab === 'weighing'
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-extrabold shadow-md shadow-amber-400/20'
                  : 'text-emerald-200/70 hover:text-white hover:bg-white/10 font-semibold'
              }`}
            >
              <Sprout className="w-4 h-4" />
              <span>{t('navWeighingStation')}</span>
            </button>

            <button
              onClick={() => setOfficerTab('quality')}
              className={`px-3.5 py-2 rounded-xl whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                officerTab === 'quality'
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-extrabold shadow-md shadow-amber-400/20'
                  : 'text-emerald-200/70 hover:text-white hover:bg-white/10 font-semibold'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{t('navQualityCheck')}</span>
            </button>

            <button
              onClick={() => setOfficerTab('payment')}
              className={`px-3.5 py-2 rounded-xl whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                officerTab === 'payment'
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-extrabold shadow-md shadow-amber-400/20'
                  : 'text-emerald-200/70 hover:text-white hover:bg-white/10 font-semibold'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>{t('navPaymentApproval')}</span>
            </button>

            <button
              onClick={() => setOfficerTab('settings')}
              className={`px-3.5 py-2 rounded-xl whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                officerTab === 'settings'
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-extrabold shadow-md shadow-amber-400/20'
                  : 'text-emerald-200/70 hover:text-white hover:bg-white/10 font-semibold'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>{t('navCentreSettings')}</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
