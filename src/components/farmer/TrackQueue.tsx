import React from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Clock, CheckCircle2, AlertCircle, ArrowRight, MapPin, RefreshCw, Sprout, Sparkles } from 'lucide-react';

export const TrackQueue: React.FC = () => {
  const { state, setFarmerTab, t } = useApp();
  const { activeToken, currentTokenBeingServed, centres } = state;

  const centre = centres.find(c => c.id === activeToken.centreId) || centres[0];
  const farmersAhead = Math.max(0, activeToken.tokenNumber - currentTokenBeingServed);
  const estWaitMins = farmersAhead * 5;

  // Generate queue visual list from currentTokenBeingServed to activeToken
  const queueList = [];
  const startToken = Math.max(1, currentTokenBeingServed - 1);
  const endToken = activeToken.tokenNumber + 2;

  for (let tNum = startToken; tNum <= endToken; tNum++) {
    queueList.push({
      tokenNumber: tNum,
      isServing: tNum === currentTokenBeingServed,
      isYou: tNum === activeToken.tokenNumber,
      isPassed: tNum < currentTokenBeingServed
    });
  }

  return (
    <div className="space-y-8 pb-20 max-w-4xl mx-auto">
      
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-[#18221b] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#e2eedd] text-[#204e38] flex items-center justify-center font-bold">
                <Users className="w-6 h-6 text-[#204e38]" />
              </div>
              <span>{t('liveTrackerTitle')}</span>
            </h1>
            <p className="text-sm text-[#5e6a5f] mt-1 font-medium">
              Real-time counter sync from <span className="font-extrabold text-[#204e38]">{activeToken.centreName}</span>.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#e2eedd] text-[#204e38] px-4 py-2 rounded-full border border-[#bcdba6] text-xs font-black shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#204e38] animate-ping"></span>
            <span>{t('movingNormallyBadge')}</span>
          </div>
        </div>

        {/* Big 4 Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-4 border-t border-gray-100 text-center">
          <div className="bg-gradient-to-b from-amber-200/40 to-amber-300/20 border-2 border-amber-400 p-4 rounded-2xl shadow-inner">
            <span className="text-[10px] font-black uppercase text-amber-950 tracking-wider">{t('yourPassShort')}</span>
            <div className="text-3xl sm:text-4xl font-black text-slate-950 mt-1">#{activeToken.tokenNumber}</div>
          </div>

          <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-2xl">
            <span className="text-[10px] font-black uppercase text-emerald-800 tracking-wider">{t('nowServingShort')}</span>
            <div className="text-3xl sm:text-4xl font-black text-emerald-950 mt-1 animate-soft-pulse">#{currentTokenBeingServed}</div>
          </div>

          <div className="bg-sky-50 border border-sky-200 p-4 rounded-2xl">
            <span className="text-[10px] font-black uppercase text-sky-800 tracking-wider">{t('farmersAheadShort')}</span>
            <div className="text-3xl sm:text-4xl font-black text-sky-950 mt-1">{farmersAhead}</div>
          </div>

          <div className="bg-purple-50 border border-purple-200 p-4 rounded-2xl">
            <span className="text-[10px] font-black uppercase text-purple-800 tracking-wider">{t('estWaitShort')}</span>
            <div className="text-3xl sm:text-4xl font-black text-purple-950 mt-1">~{estWaitMins}m</div>
          </div>
        </div>
      </div>

      {/* Visual Live Queue Sequence */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-lg space-y-5">
        <h3 className="font-extrabold text-xl text-[#18221b] flex items-center justify-between">
          <span>{t('counterSequenceTitle')}</span>
          <span className="text-xs font-bold text-[#204e38] bg-[#e2eedd] px-3 py-1 rounded-full">
            Live Counters Active: 4
          </span>
        </h3>

        <div className="space-y-3 pt-1">
          {queueList.map((item) => (
            <div
              key={item.tokenNumber}
              className={`p-5 rounded-2xl border transition-all flex items-center justify-between shadow-sm hover-card-lift ${
                item.isYou
                  ? 'bg-amber-100/80 border-2 border-amber-400 ring-4 ring-amber-200/60'
                  : item.isServing
                  ? 'bg-[#e2eedd] border-2 border-[#204e38]'
                  : item.isPassed
                  ? 'bg-gray-100 border-gray-200 text-gray-400 opacity-60'
                  : 'bg-gray-50 border-gray-200 text-gray-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`text-xl font-black ${
                  item.isYou ? 'text-amber-950' : item.isServing ? 'text-[#204e38]' : 'text-gray-800'
                }`}>
                  Token #{item.tokenNumber}
                </span>

                {item.isServing && (
                  <span className="bg-[#204e38] text-white font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider animate-pulse shadow-sm">
                    ← NOW SERVING AT COUNTER #02
                  </span>
                )}

                {item.isYou && (
                  <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    ← YOU (Rahul Patil)
                  </span>
                )}
              </div>

              <div className="text-xs font-bold">
                {item.isPassed ? (
                  <span className="text-gray-400">Completed</span>
                ) : item.isServing ? (
                  <span className="text-[#204e38] font-black">Inside Counter</span>
                ) : item.isYou ? (
                  <span className="text-amber-950 font-black">Next in line</span>
                ) : (
                  <span className="text-gray-500 font-semibold">Waiting</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#e2eedd] p-4 rounded-2xl border border-[#bcdba6] text-xs text-[#1c4d29] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-semibold">
            <Clock className="w-5 h-5 text-[#204e38]" />
            <span>Average processing speed: <span className="font-extrabold text-[#204e38]">~5 minutes per farmer</span></span>
          </div>

          <button
            onClick={() => setFarmerTab('procurement')}
            className="font-bold text-[#204e38] hover:underline flex items-center gap-1 cursor-pointer text-xs"
          >
            <span>Check Procurement Status</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
