import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProcurementCentre } from '../../types';
import { CropPicker } from '../common/CropPicker';
import { MapPin, Search, Award, Clock, Users, ArrowRight, CheckCircle2, ShieldCheck, Filter, AlertCircle, Wheat, Sparkles } from 'lucide-react';

export const FindCentre: React.FC = () => {
  const { state, setFarmerTab, selectedCrop, setSelectedCrop, setSelectedCentre, t } = useApp();
  const { centres } = state;

  const [villageFilter, setVillageFilter] = useState('Khed');
  const [maxDistance, setMaxDistance] = useState<number>(15);

  // Dynamic fit score calculation
  const scoredCentres = centres.map(centre => {
    let score = 50;
    
    // Crop match (+25)
    if (centre.acceptedCrops.includes(selectedCrop)) score += 25;
    
    // Distance factor (up to +15)
    if (centre.distanceKm < 5) score += 15;
    else if (centre.distanceKm < 8) score += 10;
    else score += 5;

    // Crowd & wait time (up to +10)
    if (centre.waitingCount < 10) score += 10;
    else if (centre.waitingCount < 20) score += 5;

    return {
      ...centre,
      fitScore: Math.min(99, score)
    };
  }).sort((a, b) => b.fitScore - a.fitScore);

  const bestCentre = scoredCentres[0];

  const handleSelectCentre = (centre: ProcurementCentre) => {
    setSelectedCentre(centre);
    setFarmerTab('schedule');
  };

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-[#18221b] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#e2eedd] text-[#204e38] flex items-center justify-center font-bold">
                <MapPin className="w-6 h-6 text-[#204e38]" />
              </div>
              <span>{t('findCentreTitle')}</span>
            </h1>
            <p className="text-sm text-[#5e6a5f] mt-1 font-medium">
              {t('findCentreSub')}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-amber-400 text-slate-950 px-4 py-2 rounded-full text-xs font-black shadow-md shrink-0">
            <Award className="w-4 h-4 text-slate-950" />
            <span>{t('smartMatchBadge')}</span>
          </div>
        </div>

        {/* VISUAL CROP PICKER INTEGRATION */}
        <div className="pt-2">
          <CropPicker selectedCrop={selectedCrop} onSelectCrop={setSelectedCrop} />
        </div>

        {/* Location & Distance Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
          <div>
            <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-2">{t('yourVillageLabel')}</label>
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={villageFilter}
                onChange={(e) => setVillageFilter(e.target.value)}
                placeholder="Enter village..."
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-[#204e38] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider">{t('maxDistanceLabel')}</label>
              <span className="text-xs font-black text-[#204e38] bg-[#e2eedd] px-2.5 py-0.5 rounded-full">{maxDistance} km</span>
            </div>
            <input
              type="range"
              min="2"
              max="25"
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-[#204e38] mt-3"
            />
          </div>
        </div>
      </div>

      {/* Recommended Best Match Spotlight Card */}
      {bestCentre && (
        <div className="bg-gradient-to-r from-[#122e20] via-[#153425] to-[#173e2c] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-amber-400 relative overflow-hidden space-y-6">
          <div className="flex items-center justify-between">
            <span className="bg-amber-400 text-slate-950 font-black text-xs px-3.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-md">
              <Award className="w-4 h-4 text-slate-950" />
              {t('bestRecommendedOption')}
            </span>

            <span className="text-xl font-black text-amber-300 flex items-center gap-1">
              <Sparkles className="w-5 h-5" />
              {bestCentre.fitScore}/100 {t('fitScoreTitle')}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="md:col-span-2 space-y-3">
              <h2 className="text-3xl font-black text-white">{bestCentre.name}</h2>
              <p className="text-sm text-emerald-200/90 font-medium">{bestCentre.address} • Code: <span className="font-mono text-amber-300 font-bold">{bestCentre.code}</span></p>

              {/* Recommendation Explanation */}
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 text-xs text-amber-200 font-medium leading-relaxed shadow-inner">
                💡 <span className="font-bold">{t('whyRecommendedTitle')}</span> "Recommended because it is closer ({bestCentre.distanceKm} km), accepts {selectedCrop}, and has a shorter queue ({bestCentre.waitingCount} farmers waiting)."
              </div>
            </div>

            <div className="bg-emerald-950/80 backdrop-blur-md p-5 rounded-2xl border border-emerald-700/50 space-y-3 text-xs shadow-xl">
              <div className="flex justify-between items-center text-emerald-200">
                <span>{t('estimatedWait')}:</span>
                <span className="font-extrabold text-amber-300 text-base">~{bestCentre.estimatedWaitMins} mins</span>
              </div>
              <div className="flex justify-between items-center text-emerald-200">
                <span>{t('farmersAhead')}:</span>
                <span className="font-bold text-white text-sm">{bestCentre.waitingCount}</span>
              </div>
              <div className="flex justify-between items-center text-emerald-200">
                <span>Status:</span>
                <span className="bg-[#86c559] text-[#183624] font-black px-2.5 py-0.5 rounded-full text-[10px] uppercase">{bestCentre.status}</span>
              </div>

              <button
                onClick={() => handleSelectCentre(bestCentre)}
                className="w-full btn-pill-gold py-3 text-sm shadow-md mt-3"
              >
                <span>{t('chooseCentreBtn')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* All Nearby Centres Comparison List */}
      <div className="space-y-6">
        <h3 className="font-extrabold text-2xl text-[#18221b]">{t('allNearbyCentres')}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scoredCentres.map((centre) => {
            const isBest = centre.id === bestCentre.id;
            return (
              <div
                key={centre.id}
                className={`bg-white rounded-3xl p-6 sm:p-8 border transition-all space-y-5 shadow-md hover-card-lift ${
                  isBest ? 'border-2 border-[#86c559] ring-4 ring-emerald-100' : 'border-gray-200/80'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-extrabold text-xl text-[#18221b]">{centre.name}</h4>
                    <p className="text-xs text-[#5e6a5f] font-medium mt-0.5">{centre.address}</p>
                  </div>
                  
                  <div className="text-right">
                    <span className="bg-[#e2eedd] text-[#204e38] font-extrabold text-xs px-3 py-1.5 rounded-full border border-[#bcdba6]">
                      {centre.fitScore}/100 {t('fitScoreTitle')}
                    </span>
                  </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 bg-gray-50 p-3.5 rounded-2xl text-center text-xs border border-gray-100">
                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase font-bold">{t('centreDistance')}</span>
                    <span className="font-extrabold text-gray-900 text-sm">{centre.distanceKm} km</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase font-bold">{t('estWaitShort')}</span>
                    <span className="font-extrabold text-amber-700 text-sm">{centre.estimatedWaitMins} mins</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px] uppercase font-bold">{t('farmersAheadShort')}</span>
                    <span className="font-extrabold text-[#204e38] text-sm">{centre.waitingCount}</span>
                  </div>
                </div>

                {/* Accepted Crops Badges */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Accepted Crops:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {centre.acceptedCrops.map(crop => (
                      <span
                        key={crop}
                        className={`text-xs font-bold px-3 py-1 rounded-full transition-all ${
                          crop === selectedCrop
                            ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs">
                  <span className="text-gray-500 font-semibold">{t('operatingHours')}: {centre.operatingHours}</span>
                  
                  <button
                    onClick={() => handleSelectCentre(centre)}
                    className="btn-pill-green py-2.5 px-5 text-xs shadow-sm"
                  >
                    <span>{t('chooseCentreBtn')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
