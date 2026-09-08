import React from 'react';
import { useApp } from '../../context/AppContext';
import { Ticket, MapPin, Calendar, Clock, Users, ArrowRight, ShieldCheck, Share2, Printer, QrCode, Sparkles } from 'lucide-react';

export const MyToken: React.FC = () => {
  const { state, setFarmerTab, t, showToast } = useApp();
  const { activeToken, currentTokenBeingServed, farmer, centres } = state;

  const centre = centres.find(c => c.id === activeToken.centreId) || centres[0];
  const farmersAhead = Math.max(0, activeToken.tokenNumber - currentTokenBeingServed);
  const estWaitMins = farmersAhead * 5;

  return (
    <div className="space-y-8 pb-20 max-w-4xl mx-auto">
      
      {/* Prominent Digital Token Card */}
      <div className="bg-gradient-to-br from-[#122e20] via-[#153425] to-[#173e2c] text-white rounded-3xl p-8 sm:p-10 shadow-2xl border-2 border-amber-400 relative overflow-hidden space-y-6">
        <div className="absolute right-0 top-0 opacity-10 transform translate-x-6 -translate-y-6 pointer-events-none">
          <Ticket className="w-80 h-80 text-white" />
        </div>

        {/* Top Token Badge */}
        <div className="flex items-center justify-between border-b border-emerald-700/60 pb-5 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="p-3.5 bg-amber-400 text-slate-950 rounded-2xl font-black shadow-md">
              <Ticket className="w-7 h-7 text-slate-950" />
            </div>
            <div>
              <span className="text-xs font-black text-amber-300 uppercase tracking-widest block">{t('officialPassBadge')}</span>
              <h1 className="text-2xl font-black text-white">{t('digitalTokenTitle')}</h1>
            </div>
          </div>

          <span className="bg-amber-400 text-slate-950 font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            {t('tokenConfirmedBadge')}
          </span>
        </div>

        {/* Large Prominent Token Display */}
        <div className="relative z-10 py-8 text-center bg-emerald-950/70 backdrop-blur-md rounded-3xl border border-emerald-700/50 space-y-3 shadow-inner">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-200">{t('verifiedTokenNum')}</span>
          <div className="text-7xl sm:text-9xl font-black text-amber-300 tracking-wider drop-shadow-lg">
            #{activeToken.tokenNumber}
          </div>

          {/* Barcode Mock Visual */}
          <div className="flex items-center justify-center gap-1 max-w-xs mx-auto py-2 opacity-80">
            {Array.from({ length: 28 }).map((_, i) => (
              <div key={i} className={`h-8 rounded-sm bg-white ${i % 3 === 0 ? 'w-1.5' : i % 5 === 0 ? 'w-2' : 'w-1'}`}></div>
            ))}
          </div>

          <p className="text-xs text-emerald-100 font-semibold">
            {t('farmerNameLabel')}: <span className="text-white font-black">{activeToken.farmerName}</span> (ID: <span className="font-mono text-amber-300 font-bold">{activeToken.farmerId}</span>)
          </p>
        </div>

        {/* Live Queue Comparison Grid */}
        <div className="relative z-10 grid grid-cols-3 gap-3 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 text-center text-xs">
          <div>
            <span className="text-emerald-200 block text-[10px] uppercase font-bold">{t('currentlyServing')}</span>
            <div className="text-3xl font-black text-white mt-1 animate-soft-pulse">
              #{currentTokenBeingServed}
            </div>
          </div>

          <div>
            <span className="text-emerald-200 block text-[10px] uppercase font-bold">{t('farmersAhead')}</span>
            <div className="text-3xl font-black text-amber-300 mt-1">
              {farmersAhead}
            </div>
          </div>

          <div>
            <span className="text-emerald-200 block text-[10px] uppercase font-bold">{t('estimatedWait')}</span>
            <div className="text-3xl font-black text-emerald-300 mt-1">
              ~{estWaitMins} mins
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-emerald-900/60 p-5 rounded-2xl border border-emerald-700/50 text-xs">
          <div className="space-y-1">
            <span className="text-emerald-300 font-bold block uppercase tracking-wider">{t('selectedCentre')}:</span>
            <p className="font-extrabold text-white text-base">{activeToken.centreName}</p>
            <p className="text-emerald-200 font-medium">{centre.address}</p>
          </div>

          <div className="space-y-1">
            <span className="text-emerald-300 font-bold block uppercase tracking-wider">Crop & Slot Window:</span>
            <p className="font-black text-amber-300 text-base">{activeToken.crop} ({activeToken.quantityEstKg} kg est.)</p>
            <p className="text-white font-semibold">Date: 10 Sept 2026 • Slot: {activeToken.bookedSlot}</p>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="relative z-10 flex flex-col sm:flex-row gap-3.5 pt-2">
          <button
            onClick={() => setFarmerTab('track-queue')}
            className="flex-1 btn-pill-gold py-4 text-base shadow-xl"
          >
            <Users className="w-5 h-5 text-slate-950" />
            <span>Track Live Queue</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => showToast("Digital Token Pass saved to your photo gallery!")}
            className="bg-emerald-900/90 hover:bg-emerald-800 text-white font-bold py-4 px-6 rounded-full border border-emerald-600/80 shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Share2 className="w-5 h-5 text-amber-300" />
            <span>Share / Save Pass</span>
          </button>
        </div>

      </div>

    </div>
  );
};
