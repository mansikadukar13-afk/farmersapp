import React from 'react';
import { useApp } from '../../context/AppContext';
import { CropPicker } from '../common/CropPicker';
import { ProcurementGuide } from './ProcurementGuide';
import { 
  Sprout, Ticket, Users, Clock, MapPin, ArrowRight, Sun, CloudRain, 
  ShieldCheck, ChevronRight, CheckCircle2, CreditCard, PhoneCall, Wheat, Activity,
  Sparkles, Zap, Award, Flame
} from 'lucide-react';

export const FarmerDashboard: React.FC = () => {
  const { state, setFarmerTab, selectedCrop, setSelectedCrop, setIsSOSOpen, language, t } = useApp();
  const { farmer, activeToken, currentTokenBeingServed, weather, procurementJourney, centres } = state;

  const selectedCentre = centres.find(c => c.id === activeToken.centreId) || centres[0];
  const farmersAhead = Math.max(0, activeToken.tokenNumber - currentTokenBeingServed);
  const estWaitMins = farmersAhead * 5;
  const currentStep = procurementJourney.currentStep;

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto relative farm-watermark-bg">
      
      {/* 🌾 1. VIBRANT FARMER WELCOME HERO */}
      <div className="bg-gradient-to-r from-[#0c2417] via-[#153425] to-[#1e4d36] text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden border border-emerald-700/40">
        
        {/* Ambient background glows & Translucent Wheat Watermark */}
        <div className="absolute -top-10 -right-10 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-2 right-10 text-white/5 pointer-events-none transform rotate-12">
          <Wheat className="w-72 h-72 text-white" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="bg-amber-400 text-slate-950 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-md flex items-center gap-1.5">
                <Wheat className="w-3.5 h-3.5 text-slate-950" />
                {t('harvestPortalBadge')}
              </span>
              <span className="bg-emerald-900/80 text-emerald-200 border border-emerald-500/40 px-3.5 py-1 rounded-full text-xs font-bold backdrop-blur-md">
                {t('todayDate')}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {t('welcomeGreeting')}
            </h1>

            <p className="text-sm sm:text-lg text-emerald-100/90 font-medium max-w-2xl leading-relaxed">
              {t('welcomeSubtext')}
            </p>
          </div>

          {/* Farmer Profile Badge Card */}
          <div className="bg-white/10 backdrop-blur-xl p-5 rounded-3xl border border-white/20 flex items-center gap-4 shrink-0 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-300 text-slate-950 font-black text-2xl flex items-center justify-center shadow-lg">
              RP
            </div>
            <div className="text-xs space-y-0.5">
              <div className="font-extrabold text-white text-base flex items-center gap-1.5">
                <span>{farmer.name}</span>
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
              <div className="text-emerald-200 font-semibold">
                {t('selectedCentre')}: <span className="text-white font-bold">{farmer.village}</span>
              </div>
              <div className="text-amber-300 font-mono text-xs font-bold">
                ID: {farmer.id}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 🌾 2. VISUAL CROP SELECTION CARDS */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-lg space-y-3 hover-card-lift">
        <CropPicker selectedCrop={selectedCrop} onSelectCrop={setSelectedCrop} />
      </div>

      {/* 🚀 3. LARGE FARMER-FRIENDLY ACTION TILES */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Tile 1: Find Centre */}
        <button 
          onClick={() => setFarmerTab('find-centre')}
          className="bg-white p-6 rounded-3xl border-2 border-emerald-200/80 shadow-md hover:border-[#204e38] hover-card-lift text-left space-y-3 cursor-pointer group"
        >
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#204e38] flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
            <MapPin className="w-7 h-7 text-[#204e38]" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-gray-900 group-hover:text-[#204e38] transition-colors">{t('tileFindCentre')}</h3>
            <p className="text-xs text-gray-500 font-medium mt-1 leading-relaxed">{t('tileFindCentreSub')}</p>
          </div>
        </button>

        {/* Tile 2: Track Queue */}
        <button 
          onClick={() => setFarmerTab('track-queue')}
          className="bg-white p-6 rounded-3xl border-2 border-amber-200/80 shadow-md hover:border-amber-500 hover-card-lift text-left space-y-3 cursor-pointer group"
        >
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
            <Users className="w-7 h-7 text-amber-800" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-gray-900 group-hover:text-amber-800 transition-colors">{t('tileTrackQueue')}</h3>
            <p className="text-xs text-gray-500 font-medium mt-1 leading-relaxed">{t('tileTrackQueueSub')}</p>
          </div>
        </button>

        {/* Tile 3: Payment & Receipt */}
        <button 
          onClick={() => setFarmerTab('payment')}
          className="bg-white p-6 rounded-3xl border-2 border-sky-200/80 shadow-md hover:border-sky-500 hover-card-lift text-left space-y-3 cursor-pointer group"
        >
          <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
            <CreditCard className="w-7 h-7 text-sky-800" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-gray-900 group-hover:text-sky-800 transition-colors">{t('tilePayment')}</h3>
            <p className="text-xs text-gray-500 font-medium mt-1 leading-relaxed">{t('tilePaymentSub')}</p>
          </div>
        </button>

        {/* Tile 4: Help SOS */}
        <button 
          onClick={() => setIsSOSOpen(true)}
          className="bg-gradient-to-br from-red-500 to-rose-600 text-white p-6 rounded-3xl border border-red-400 shadow-lg hover-card-lift text-left space-y-3 cursor-pointer group"
        >
          <div className="w-14 h-14 rounded-2xl bg-white/20 text-white flex items-center justify-center group-hover:scale-110 transition-transform backdrop-blur-md">
            <PhoneCall className="w-7 h-7 animate-pulse text-amber-300" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-white">{t('tileSos')}</h3>
            <p className="text-xs text-red-100 font-medium mt-1 leading-relaxed">{t('tileSosSub')}</p>
          </div>
        </button>

      </div>

      {/* 🎟️ 4. PROMINENT DIGITAL TOKEN CARD & WEATHER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Active Token Spotlight */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-200/80 shadow-xl space-y-6">
          
          <div className="flex items-center justify-between border-b border-gray-100 pb-5">
            <div className="flex items-center gap-4">
              <div className="p-3.5 bg-amber-400 text-slate-950 rounded-2xl font-black shadow-md">
                <Ticket className="w-7 h-7 text-slate-950" />
              </div>
              <div>
                <span className="text-xs font-black text-amber-700 uppercase tracking-widest block">{t('activeTokenTitle')}</span>
                <h2 className="font-extrabold text-2xl text-gray-900 mt-0.5">{activeToken.centreName}</h2>
              </div>
            </div>

            <span className="bg-[#e2eedd] text-[#204e38] border border-[#bcdba6] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#204e38] animate-pulse"></span>
              {activeToken.status}
            </span>
          </div>

          {/* Large High-Contrast Counter Numbers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-center">
            
            <div className="bg-gradient-to-b from-amber-200/40 to-amber-300/20 border-2 border-amber-400 p-4 rounded-2xl shadow-inner">
              <span className="text-[10px] font-black uppercase text-amber-950 tracking-wider">{t('yourPassShort')}</span>
              <div className="text-4xl sm:text-5xl font-black text-slate-950 mt-1">
                #{activeToken.tokenNumber}
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-2xl">
              <span className="text-[10px] font-extrabold uppercase text-emerald-800 tracking-wider">{t('nowServingShort')}</span>
              <div className="text-4xl sm:text-5xl font-black text-emerald-950 mt-1 animate-soft-pulse">
                #{currentTokenBeingServed}
              </div>
            </div>

            <div className="bg-sky-50 border border-sky-200 p-4 rounded-2xl">
              <span className="text-[10px] font-extrabold uppercase text-sky-800 tracking-wider">{t('farmersAheadShort')}</span>
              <div className="text-4xl sm:text-5xl font-black text-sky-950 mt-1">
                {farmersAhead}
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 p-4 rounded-2xl">
              <span className="text-[10px] font-extrabold uppercase text-purple-800 tracking-wider">{t('estWaitShort')}</span>
              <div className="text-3xl sm:text-4xl font-black text-purple-950 mt-1">
                ~{estWaitMins}m
              </div>
            </div>

          </div>

          {/* Info Details Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4.5 rounded-2xl border border-gray-200/80 text-xs">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#204e38] shrink-0" />
              <div>
                <span className="font-bold text-gray-900 text-sm block">{selectedCentre.address}</span>
                <span className="text-gray-500 font-medium">{selectedCentre.distanceKm} km {t('centreDistance')}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <span className="font-bold text-gray-900 text-sm block">{t('bookedSlotLabel')}</span>
                <span className="text-amber-800 font-bold">{activeToken.bookedSlot}</span>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
            <button
              onClick={() => setFarmerTab('track-queue')}
              className="flex-1 btn-pill-green py-3.5 text-base shadow-md"
            >
              <Users className="w-5 h-5 text-white" />
              <span>{t('btnTrackQueue')}</span>
              <ArrowRight className="w-5 h-5 ml-auto" />
            </button>

            <button
              onClick={() => setFarmerTab('procurement')}
              className="btn-pill-white py-3.5 text-base shadow-sm"
            >
              <Sprout className="w-5 h-5 text-[#204e38]" />
              <span>{t('btnViewWeighing')}</span>
            </button>
          </div>

        </div>

        {/* Weather & Security Side Cards */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-emerald-50 rounded-3xl p-6 border border-amber-300/80 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-amber-200/60 pb-3">
              <div className="flex items-center gap-2">
                <Sun className="w-6 h-6 text-amber-500 animate-spin-slow" />
                <h3 className="font-extrabold text-lg text-amber-950">{t('weatherTitle')}</h3>
              </div>
              <span className="bg-amber-400 text-slate-950 text-xs font-black px-3 py-0.5 rounded-full shadow-sm">
                Khed Sector
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-black text-slate-900">{weather.temp}°C</div>
                <div className="text-xs font-bold text-amber-900 mt-1">{weather.condition}</div>
              </div>

              <div className="text-right text-xs space-y-1 font-bold text-gray-700">
                <div className="flex items-center gap-1 justify-end text-blue-600">
                  <CloudRain className="w-4 h-4" />
                  {t('rainChance')}: {weather.rainChance}%
                </div>
                <div>Humidity: {weather.humidity}%</div>
              </div>
            </div>

            <div className="bg-white/90 p-3.5 rounded-2xl border border-amber-200 text-xs text-amber-950 font-semibold shadow-inner">
              💡 <span className="font-bold">Advice:</span> {t('weatherAdvice')}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-sm flex items-start gap-4 text-xs hover-card-lift">
            <ShieldCheck className="w-7 h-7 text-[#204e38] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-extrabold text-sm text-gray-900">{t('securityShield')}</h4>
              <p className="text-gray-500 font-medium mt-1 leading-relaxed">
                Masked: {farmer.aadhaar} • {farmer.bankAccount}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* 🗺️ 5. PROCUREMENT JOURNEY PROGRESS TRACKER */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-lg space-y-5">
        
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#e2eedd] text-[#204e38] flex items-center justify-center font-bold">
              <Activity className="w-6 h-6 text-[#204e38]" />
            </div>
            <h3 className="font-extrabold text-xl text-gray-900">
              {t('procurementJourneyTitle')}
            </h3>
          </div>

          <button
            onClick={() => setFarmerTab('procurement')}
            className="text-xs font-bold text-[#204e38] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{t('navProcurement')}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 pt-2">
          {procurementJourney.steps.map((step) => {
            const isCurrent = step.id === currentStep;
            const stepName = language === 'hi' ? step.nameHi : language === 'mr' ? step.nameMr : step.name;

            return (
              <div
                key={step.id}
                onClick={() => setFarmerTab('procurement')}
                className={`p-4 rounded-2xl text-center border transition-all cursor-pointer relative hover-card-lift ${
                  step.completed
                    ? 'bg-[#e2eedd] border-[#bcdba6] text-[#1c4d29] shadow-sm'
                    : isCurrent
                    ? 'bg-amber-100 border-2 border-amber-400 text-amber-950 ring-2 ring-amber-300/50 shadow-md scale-105'
                    : 'bg-gray-50 border-gray-200 text-gray-400 opacity-70'
                }`}
              >
                <div className="text-[10px] font-black uppercase mb-1 flex items-center justify-center gap-1">
                  Step {step.id}
                  {step.completed && <CheckCircle2 className="w-3.5 h-3.5 text-[#204e38] inline" />}
                </div>

                <div className="text-xs font-bold line-clamp-1">
                  {stepName}
                </div>

                <div className="text-[10px] font-semibold mt-1.5">
                  {step.completed ? step.timestamp : isCurrent ? '⚡ In Progress' : 'Pending'}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* 📊 MANDI OPERATIONS & PAYOUT CALCULATOR */}
      <ProcurementGuide />

    </div>
  );
};
