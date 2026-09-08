import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Clock, CheckCircle2, Award, Calendar, AlertCircle, ArrowRight, ShieldCheck, Ticket, Sparkles } from 'lucide-react';

export const ScheduleSlot: React.FC = () => {
  const { state, selectedCentre, selectedCrop, handleBookSlot, setFarmerTab, t } = useApp();
  const centre = selectedCentre || state.centres[0];

  const [selectedSlotTime, setSelectedSlotTime] = useState<string>("10:30 AM – 11:00 AM");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const recommendedSlot = centre.slots.find(s => s.isRecommended) || centre.slots[1];

  const handleConfirm = async () => {
    await handleBookSlot(centre.id, selectedCrop, selectedSlotTime);
    setIsConfirmed(true);
  };

  return (
    <div className="space-y-8 pb-20 max-w-4xl mx-auto">
      
      {/* Step Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-lg space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-400 text-slate-950 rounded-2xl font-black flex items-center justify-center shadow-md">
              <Clock className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#18221b]">{t('scheduleSlotTitle')}</h1>
              <p className="text-xs sm:text-sm text-[#5e6a5f] mt-0.5 font-medium">
                {t('scheduleSlotSub')} <span className="font-extrabold text-[#204e38]">{centre.name}</span> for {selectedCrop}.
              </p>
            </div>
          </div>

          <span className="bg-[#e2eedd] text-[#204e38] text-xs font-black px-4 py-1.5 rounded-full border border-[#bcdba6] shrink-0">
            Date: 10 Sept 2026
          </span>
        </div>
      </div>

      {isConfirmed ? (
        /* Confirmation Screen */
        <div className="bg-gradient-to-br from-[#122e20] via-[#153425] to-[#173e2c] text-white rounded-3xl p-8 sm:p-10 shadow-2xl border-2 border-amber-400 text-center space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-20 h-20 bg-amber-400 text-slate-950 rounded-3xl flex items-center justify-center mx-auto shadow-xl">
            <Ticket className="w-10 h-10 text-slate-950" />
          </div>

          <div className="space-y-2">
            <span className="bg-emerald-900/80 text-emerald-200 text-xs font-black px-4 py-1.5 rounded-full border border-emerald-600 uppercase tracking-widest">
              {t('tokenConfirmedBadge')}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-amber-300">TOKEN #27 GENERATED</h2>
            <p className="text-sm text-emerald-100 font-medium">Your harvest procurement slot is secured.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 max-w-md mx-auto text-left text-xs space-y-3.5 shadow-inner">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-emerald-200">{t('selectedCentre')}:</span>
              <span className="font-extrabold text-white">{centre.name}</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-emerald-200">Crop Type:</span>
              <span className="font-black text-amber-300">{selectedCrop}</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-emerald-200">Scheduled Date:</span>
              <span className="font-extrabold text-white">10 September 2026</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-emerald-200">{t('selectedWindowLabel')}:</span>
              <span className="font-black text-amber-300">{selectedSlotTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-200">{t('farmersAhead')}:</span>
              <span className="font-extrabold text-white">8 farmers (~30 mins)</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-3">
            <button
              onClick={() => setFarmerTab('my-token')}
              className="btn-pill-gold text-base py-4 px-8 shadow-xl"
            >
              <Ticket className="w-5 h-5 text-slate-950" />
              <span>View My Token & Track Queue</span>
            </button>
          </div>
        </div>
      ) : (
        /* Slot Selection View */
        <div className="space-y-6">
          
          {/* Smart Slot Recommendation Banner */}
          <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-emerald-50 p-6 rounded-3xl border border-amber-300/80 shadow-md flex items-start gap-4">
            <div className="p-3.5 bg-amber-400 text-slate-950 rounded-2xl font-black shrink-0 shadow-sm">
              <Award className="w-6 h-6" />
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-black text-amber-950 text-sm">{t('recommendedSlotTitle')}</span>
                <span className="bg-amber-400 text-slate-950 font-extrabold px-3 py-0.5 rounded-full">
                  {recommendedSlot.time}
                </span>
              </div>
              <p className="text-amber-900 font-semibold leading-relaxed">
                <span className="font-bold">Reason:</span> "Lower expected crowd and suitable for your transport route from Khed village."
              </p>
            </div>
          </div>

          {/* Slots Grid */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-xl text-[#18221b]">{t('availableWindowsTitle')}</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {centre.slots.map((slot) => {
                const isSelected = selectedSlotTime === slot.time;
                const isFull = slot.status === 'FULL';

                return (
                  <div
                    key={slot.id}
                    onClick={() => !isFull && setSelectedSlotTime(slot.time)}
                    className={`p-6 rounded-3xl border-2 transition-all cursor-pointer relative space-y-3 shadow-md hover-card-lift ${
                      isSelected
                        ? 'bg-[#e2eedd] border-[#204e38] ring-4 ring-emerald-100'
                        : isFull
                        ? 'bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed'
                        : 'bg-white border-gray-200/80 hover:border-[#204e38]'
                    }`}
                  >
                    {slot.isRecommended && (
                      <span className="absolute top-4 right-4 bg-amber-400 text-slate-950 font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                        Recommended
                      </span>
                    )}

                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-[#204e38] bg-[#204e38] text-white' : 'border-gray-300'
                      }`}>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                      </div>
                      <span className="font-black text-lg text-gray-900">{slot.time}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-100">
                      <span className={`font-bold px-3 py-0.5 rounded-full text-[10px] uppercase ${
                        slot.status === 'AVAILABLE' ? 'bg-[#86c559] text-[#183624]' :
                        slot.status === 'LIMITED' ? 'bg-amber-100 text-amber-900' : 'bg-red-100 text-red-800'
                      }`}>
                        {slot.status}
                      </span>

                      <span className="text-gray-500 font-semibold">
                        Crowd: <span className="font-bold text-gray-800">{slot.crowd}</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Booking Summary Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-lg space-y-5">
            <h3 className="font-extrabold text-base text-gray-900 uppercase tracking-wider">{t('slotSummaryTitle')}</h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50 p-4 rounded-2xl text-xs border border-gray-100">
              <div>
                <span className="text-gray-500 block font-bold">Centre</span>
                <span className="font-extrabold text-gray-900 text-sm">{centre.name}</span>
              </div>

              <div>
                <span className="text-gray-500 block font-bold">Crop</span>
                <span className="font-extrabold text-[#204e38] text-sm">{selectedCrop}</span>
              </div>

              <div>
                <span className="text-gray-500 block font-bold">{t('selectedWindowLabel')}</span>
                <span className="font-extrabold text-amber-800 text-sm">{selectedSlotTime}</span>
              </div>

              <div>
                <span className="text-gray-500 block font-bold">{t('estQueueLabel')}</span>
                <span className="font-extrabold text-[#204e38] text-sm">8 farmers</span>
              </div>
            </div>

            <button
              onClick={handleConfirm}
              className="w-full btn-pill-green py-4 text-lg shadow-xl"
            >
              <Ticket className="w-6 h-6 text-amber-300" />
              <span>{t('confirmBook')}</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
