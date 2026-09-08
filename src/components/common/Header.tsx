import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LanguageSelector } from './LanguageSelector';
import { Sprout, ShieldAlert, Bell, User, LayoutDashboard, Ticket, MapPin, Clock, CreditCard, History, Sparkles, Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const { role, setRole, t, farmerTab, setFarmerTab, officerTab, setOfficerTab, state, setIsSOSOpen } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#86c559] via-[#6ca843] to-[#1e4d36] flex items-center justify-center text-[#0c2417] font-black shadow-lg shadow-[#86c559]/25 ring-2 ring-[#86c559]/30 group-hover:scale-105 transition-all duration-300">
              <Sprout className="w-5 h-5 sm:w-6 sm:h-6 text-[#0c2417]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-black text-xl sm:text-2xl tracking-tight text-white font-sans group-hover:text-emerald-300 transition-colors">
                  {t('brandName')}
                </span>
                <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 text-slate-950 text-[9px] sm:text-[10px] font-black px-2 sm:px-2.5 py-0.5 rounded-full uppercase tracking-wider hidden xs:inline shadow-md shadow-amber-500/20 ring-1 ring-amber-300/40">
                  <Sparkles className="w-2.5 h-2.5 inline mr-1 -mt-0.5" />
                  PROD 2026
                </span>
              </div>
              <p className="text-xs text-emerald-200/80 font-medium tracking-wide hidden sm:block">
                {t('tagline')}
              </p>
            </div>
          </div>

          {/* Desktop Controls */}
          <div className="hidden lg:flex items-center gap-3 sm:gap-4">
            <LanguageSelector />

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
                <span>{t('farmerRole')}</span>
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
                <span>{t('officerRole')}</span>
              </button>
            </div>

            {role === 'FARMER' && (
              <button
                onClick={() => setIsSOSOpen(true)}
                className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white px-3.5 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 shadow-lg shadow-red-600/30 active:scale-95 border border-red-400/30 cursor-pointer"
                title="Emergency Help & Support"
              >
                <ShieldAlert className="w-4 h-4 animate-pulse text-amber-300" />
                <span>SOS</span>
              </button>
            )}
          </div>

          {/* Mobile Header Right Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSelector />
            
            {role === 'FARMER' && (
              <button
                onClick={() => setIsSOSOpen(true)}
                className="bg-red-600 text-white p-2 rounded-xl text-xs font-black shadow-md border border-red-400/30 cursor-pointer"
                title="SOS Help"
              >
                <ShieldAlert className="w-4 h-4 animate-pulse text-amber-300" />
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-200 hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Collapsible Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 py-4 px-2 space-y-4 bg-[#0a1e13] rounded-b-3xl shadow-2xl animate-fade-in">
            {/* Role Switcher for Mobile */}
            <div className="grid grid-cols-2 gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/10">
              <button
                onClick={() => {
                  setRole('FARMER');
                  setFarmerTab('dashboard');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 ${
                  role === 'FARMER'
                    ? 'bg-gradient-to-r from-[#86c559] to-[#68a83c] text-[#0c2417] shadow-md'
                    : 'text-emerald-200'
                }`}
              >
                <User className="w-4 h-4" />
                <span>{t('farmerRole')}</span>
              </button>

              <button
                onClick={() => {
                  setRole('OFFICER');
                  setOfficerTab('queue');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 ${
                  role === 'OFFICER'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md'
                    : 'text-emerald-200'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>{t('officerRole')}</span>
              </button>
            </div>

            {/* Mobile Tab Links */}
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              {role === 'FARMER' && (
                <>
                  <button
                    onClick={() => { setFarmerTab('dashboard'); setMobileMenuOpen(false); }}
                    className={`p-3 rounded-2xl flex items-center gap-2 border ${farmerTab === 'dashboard' ? 'bg-[#86c559]/20 border-[#86c559] text-white font-bold' : 'bg-white/5 border-white/5 text-emerald-200'}`}
                  >
                    <LayoutDashboard className="w-4 h-4 text-[#86c559]" />
                    <span>{t('navDashboard')}</span>
                  </button>

                  <button
                    onClick={() => { setFarmerTab('find-centre'); setMobileMenuOpen(false); }}
                    className={`p-3 rounded-2xl flex items-center gap-2 border ${farmerTab === 'find-centre' ? 'bg-[#86c559]/20 border-[#86c559] text-white font-bold' : 'bg-white/5 border-white/5 text-emerald-200'}`}
                  >
                    <MapPin className="w-4 h-4 text-[#86c559]" />
                    <span>{t('navFindCentre')}</span>
                  </button>

                  <button
                    onClick={() => { setFarmerTab('schedule'); setMobileMenuOpen(false); }}
                    className={`p-3 rounded-2xl flex items-center gap-2 border ${farmerTab === 'schedule' ? 'bg-[#86c559]/20 border-[#86c559] text-white font-bold' : 'bg-white/5 border-white/5 text-emerald-200'}`}
                  >
                    <Clock className="w-4 h-4 text-[#86c559]" />
                    <span>{t('navSchedule')}</span>
                  </button>

                  <button
                    onClick={() => { setFarmerTab('my-token'); setMobileMenuOpen(false); }}
                    className={`p-3 rounded-2xl flex items-center gap-2 border ${farmerTab === 'my-token' ? 'bg-[#86c559]/20 border-[#86c559] text-white font-bold' : 'bg-white/5 border-white/5 text-emerald-200'}`}
                  >
                    <Ticket className="w-4 h-4 text-amber-300" />
                    <span>{t('navMyToken')}</span>
                  </button>

                  <button
                    onClick={() => { setFarmerTab('procurement'); setMobileMenuOpen(false); }}
                    className={`p-3 rounded-2xl flex items-center gap-2 border ${farmerTab === 'procurement' ? 'bg-[#86c559]/20 border-[#86c559] text-white font-bold' : 'bg-white/5 border-white/5 text-emerald-200'}`}
                  >
                    <Sprout className="w-4 h-4 text-[#86c559]" />
                    <span>{t('navProcurement')}</span>
                  </button>

                  <button
                    onClick={() => { setFarmerTab('payment'); setMobileMenuOpen(false); }}
                    className={`p-3 rounded-2xl flex items-center gap-2 border ${farmerTab === 'payment' ? 'bg-[#86c559]/20 border-[#86c559] text-white font-bold' : 'bg-white/5 border-white/5 text-emerald-200'}`}
                  >
                    <CreditCard className="w-4 h-4 text-[#86c559]" />
                    <span>{t('navPayment')}</span>
                  </button>

                  <button
                    onClick={() => { setFarmerTab('history'); setMobileMenuOpen(false); }}
                    className={`p-3 rounded-2xl flex items-center gap-2 border ${farmerTab === 'history' ? 'bg-[#86c559]/20 border-[#86c559] text-white font-bold' : 'bg-white/5 border-white/5 text-emerald-200'}`}
                  >
                    <History className="w-4 h-4 text-[#86c559]" />
                    <span>{t('navHistory')}</span>
                  </button>

                  <button
                    onClick={() => { setFarmerTab('notifications'); setMobileMenuOpen(false); }}
                    className={`p-3 rounded-2xl flex items-center gap-2 border ${farmerTab === 'notifications' ? 'bg-[#86c559]/20 border-[#86c559] text-white font-bold' : 'bg-white/5 border-white/5 text-emerald-200'}`}
                  >
                    <Bell className="w-4 h-4 text-[#86c559]" />
                    <span>{t('navNotifications')}</span>
                    {unreadCount > 0 && (
                      <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold ml-auto">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                </>
              )}

              {role === 'OFFICER' && (
                <>
                  <button
                    onClick={() => { setOfficerTab('queue'); setMobileMenuOpen(false); }}
                    className={`p-3 rounded-2xl flex items-center gap-2 border ${officerTab === 'queue' ? 'bg-amber-400/20 border-amber-400 text-amber-300 font-bold' : 'bg-white/5 border-white/5 text-emerald-200'}`}
                  >
                    <Ticket className="w-4 h-4 text-amber-300" />
                    <span>{t('navLiveQueue')}</span>
                  </button>

                  <button
                    onClick={() => { setOfficerTab('weighing'); setMobileMenuOpen(false); }}
                    className={`p-3 rounded-2xl flex items-center gap-2 border ${officerTab === 'weighing' ? 'bg-amber-400/20 border-amber-400 text-amber-300 font-bold' : 'bg-white/5 border-white/5 text-emerald-200'}`}
                  >
                    <Sprout className="w-4 h-4 text-amber-300" />
                    <span>{t('navWeighingStation')}</span>
                  </button>

                  <button
                    onClick={() => { setOfficerTab('quality'); setMobileMenuOpen(false); }}
                    className={`p-3 rounded-2xl flex items-center gap-2 border ${officerTab === 'quality' ? 'bg-amber-400/20 border-amber-400 text-amber-300 font-bold' : 'bg-white/5 border-white/5 text-emerald-200'}`}
                  >
                    <LayoutDashboard className="w-4 h-4 text-amber-300" />
                    <span>{t('navQualityCheck')}</span>
                  </button>

                  <button
                    onClick={() => { setOfficerTab('payment'); setMobileMenuOpen(false); }}
                    className={`p-3 rounded-2xl flex items-center gap-2 border ${officerTab === 'payment' ? 'bg-amber-400/20 border-amber-400 text-amber-300 font-bold' : 'bg-white/5 border-white/5 text-emerald-200'}`}
                  >
                    <CreditCard className="w-4 h-4 text-amber-300" />
                    <span>{t('navPaymentApproval')}</span>
                  </button>

                  <button
                    onClick={() => { setOfficerTab('settings'); setMobileMenuOpen(false); }}
                    className={`p-3 rounded-2xl flex items-center gap-2 border ${officerTab === 'settings' ? 'bg-amber-400/20 border-amber-400 text-amber-300 font-bold' : 'bg-white/5 border-white/5 text-emerald-200'}`}
                  >
                    <MapPin className="w-4 h-4 text-amber-300" />
                    <span>{t('navCentreSettings')}</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Farmer Desktop Horizontal Tab Bar */}
        {role === 'FARMER' && (
          <div className="hidden lg:flex items-center gap-1 sm:gap-2 py-2 overflow-x-auto border-t border-white/10 no-scrollbar text-xs sm:text-sm">
            
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

        {/* Officer Desktop Horizontal Tab Bar */}
        {role === 'OFFICER' && (
          <div className="hidden lg:flex items-center gap-2 py-2 overflow-x-auto border-t border-white/10 no-scrollbar text-xs sm:text-sm">
            
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

