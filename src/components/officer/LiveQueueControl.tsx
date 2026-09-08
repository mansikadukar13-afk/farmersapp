import React from 'react';
import { useApp } from '../../context/AppContext';
import { Ticket, Users, FastForward, Play, CheckCircle2, ShieldCheck, Scale, Award, CreditCard, Clock, Sparkles } from 'lucide-react';

export const LiveQueueControl: React.FC = () => {
  const { state, handleAdvanceQueue, handleUpdateStep, t } = useApp();
  const { currentTokenBeingServed, activeToken, procurementJourney } = state;

  const currentStep = procurementJourney.currentStep;

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto">
      
      {/* Officer Header */}
      <div className="bg-gradient-to-r from-[#122e20] via-[#153425] to-[#173e2c] text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-emerald-700/40 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3 shadow-md">
              ABC Procurement Centre • Officer Portal
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white">Officer Live Queue Controller</h1>
            <p className="text-sm text-emerald-100/90 font-medium mt-1">
              Manage token calls, mark arrivals, trigger weighing, quality inspection, and payment credit.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleAdvanceQueue}
              className="btn-pill-gold text-base py-4 px-8 shadow-xl"
            >
              <FastForward className="w-5 h-5 text-slate-950" />
              <span>{t('callNextFarmer')}</span>
            </button>
          </div>
        </div>

        {/* Live Counters Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-emerald-950/80 backdrop-blur-md p-5 rounded-2xl border border-emerald-700/50 text-center text-xs shadow-inner">
          <div>
            <span className="text-emerald-300 block text-[10px] uppercase font-extrabold">{t('currentlyServing')}</span>
            <div className="text-3xl sm:text-4xl font-black text-amber-300 mt-1 animate-soft-pulse">
              #{currentTokenBeingServed}
            </div>
          </div>

          <div>
            <span className="text-emerald-300 block text-[10px] uppercase font-extrabold">Rahul Patil (Token)</span>
            <div className="text-3xl sm:text-4xl font-black text-white mt-1">
              #{activeToken.tokenNumber}
            </div>
          </div>

          <div>
            <span className="text-emerald-300 block text-[10px] uppercase font-extrabold">Journey Step</span>
            <div className="text-2xl sm:text-3xl font-black text-[#86c559] mt-1">
              Step {currentStep} / 7
            </div>
          </div>

          <div>
            <span className="text-emerald-300 block text-[10px] uppercase font-extrabold">Active Counters</span>
            <div className="text-2xl sm:text-3xl font-black text-sky-300 mt-1">
              4 Counters
            </div>
          </div>
        </div>
      </div>

      {/* Step Actions Station for Rahul Patil (#27) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-lg space-y-6">
        <h2 className="font-extrabold text-xl text-gray-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
          <span>Active Token Management: <span className="font-black text-[#204e38]">#{activeToken.tokenNumber} ({activeToken.farmerName})</span></span>
          <span className="text-xs bg-[#e2eedd] text-[#204e38] font-black px-3.5 py-1 rounded-full border border-[#bcdba6] self-start sm:self-auto">
            {activeToken.crop} • {activeToken.quantityEstKg} kg est.
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          <button
            onClick={() => handleUpdateStep(3, "Farmer Rahul Patil reported at Counter #02")}
            className={`p-6 rounded-3xl border-2 text-left space-y-2 transition-all cursor-pointer hover-card-lift ${
              currentStep === 3
                ? 'bg-amber-100/90 border-amber-400 ring-4 ring-amber-200 shadow-md'
                : currentStep > 3
                ? 'bg-[#e2eedd]/80 border-[#bcdba6]'
                : 'bg-white border-gray-200 hover:border-amber-300 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-black text-xs uppercase text-amber-950">Step 3</span>
              {currentStep > 3 && <CheckCircle2 className="w-6 h-6 text-[#204e38]" />}
            </div>
            <h3 className="font-extrabold text-lg text-gray-900">{t('markAtCentre')}</h3>
            <p className="text-xs text-gray-500 font-medium">Record farmer physical arrival at Mandi entry gate.</p>
          </button>

          <button
            onClick={() => handleUpdateStep(4, "Crop unloaded into Weighing Machine #02")}
            className={`p-6 rounded-3xl border-2 text-left space-y-2 transition-all cursor-pointer hover-card-lift ${
              currentStep === 4
                ? 'bg-amber-100/90 border-amber-400 ring-4 ring-amber-200 shadow-md'
                : currentStep > 4
                ? 'bg-[#e2eedd]/80 border-[#bcdba6]'
                : 'bg-white border-gray-200 hover:border-amber-300 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-black text-xs uppercase text-amber-950">Step 4</span>
              {currentStep > 4 && <CheckCircle2 className="w-6 h-6 text-[#204e38]" />}
            </div>
            <h3 className="font-extrabold text-lg text-gray-900">{t('startWeighing')}</h3>
            <p className="text-xs text-gray-500 font-medium">Record actual net weight at Weighing Machine #02.</p>
          </button>

          <button
            onClick={() => handleUpdateStep(5, "Quality Grade A Superfine approved")}
            className={`p-6 rounded-3xl border-2 text-left space-y-2 transition-all cursor-pointer hover-card-lift ${
              currentStep === 5
                ? 'bg-amber-100/90 border-amber-400 ring-4 ring-amber-200 shadow-md'
                : currentStep > 5
                ? 'bg-[#e2eedd]/80 border-[#bcdba6]'
                : 'bg-white border-gray-200 hover:border-amber-300 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-black text-xs uppercase text-amber-950">Step 5</span>
              {currentStep > 5 && <CheckCircle2 className="w-6 h-6 text-[#204e38]" />}
            </div>
            <h3 className="font-extrabold text-lg text-gray-900">{t('qualityPassed')}</h3>
            <p className="text-xs text-gray-500 font-medium">Moisture & purity inspection grade approval.</p>
          </button>

          <button
            onClick={() => handleUpdateStep(6, "Initiating direct bank payout transfer")}
            className={`p-6 rounded-3xl border-2 text-left space-y-2 transition-all cursor-pointer hover-card-lift ${
              currentStep === 6
                ? 'bg-amber-100/90 border-amber-400 ring-4 ring-amber-200 shadow-md'
                : currentStep > 6
                ? 'bg-[#e2eedd]/80 border-[#bcdba6]'
                : 'bg-white border-gray-200 hover:border-amber-300 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-black text-xs uppercase text-amber-950">Step 6</span>
              {currentStep > 6 && <CheckCircle2 className="w-6 h-6 text-[#204e38]" />}
            </div>
            <h3 className="font-extrabold text-lg text-gray-900">Start Bank Transfer</h3>
            <p className="text-xs text-gray-500 font-medium">Dispatch transaction to SBI Direct Transfer Gateway.</p>
          </button>

          <button
            onClick={() => handleUpdateStep(7, "Payment credit verified. Receipt generated.")}
            className={`p-6 rounded-3xl border-2 text-left space-y-2 transition-all cursor-pointer col-span-1 sm:col-span-2 hover-card-lift ${
              currentStep === 7
                ? 'bg-[#204e38] text-white border-[#153425] ring-4 ring-emerald-200 shadow-xl'
                : 'bg-[#153425] text-white border-emerald-800 hover:bg-[#0f271b]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-black text-xs uppercase text-amber-300">Step 7 Final</span>
              <CheckCircle2 className="w-6 h-6 text-amber-300" />
            </div>
            <h3 className="font-black text-xl text-white">{t('completePayment')}</h3>
            <p className="text-xs text-emerald-200 font-medium">Complete transaction and issue digital printable receipt.</p>
          </button>

        </div>
      </div>

    </div>
  );
};
