import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sprout, CheckCircle2, Clock, Scale, Award, CreditCard, FileText, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const StatusTimeline: React.FC = () => {
  const { state, setFarmerTab, setIsReceiptModalOpen, language, t } = useApp();
  const { procurementJourney, activeToken, weighing, quality, payment } = state;

  return (
    <div className="space-y-8 pb-20 max-w-4xl mx-auto">
      
      {/* Page Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-lg space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-[#18221b] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#e2eedd] text-[#204e38] flex items-center justify-center font-bold">
                <Sprout className="w-6 h-6 text-[#204e38]" />
              </div>
              <span>{t('timelineTitle')}</span>
            </h1>
            <p className="text-sm text-[#5e6a5f] mt-1 font-medium">
              Track live progress for Token <span className="font-extrabold text-amber-800">#{activeToken.tokenNumber}</span> ({activeToken.crop}).
            </p>
          </div>

          <span className="bg-amber-400 text-slate-950 font-black text-xs px-4 py-2 rounded-full uppercase tracking-wider shadow-md shrink-0">
            STEP {procurementJourney.currentStep} OF 7 IN PROGRESS
          </span>
        </div>
      </div>

      {/* Timeline List */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-lg space-y-6">
        <div className="relative border-l-4 border-[#bcdba6] ml-4 space-y-8 pl-6 py-2">
          {procurementJourney.steps.map((step) => {
            const isCompleted = step.completed;
            const isCurrent = step.id === procurementJourney.currentStep;
            const stepName = language === 'hi' ? step.nameHi : language === 'mr' ? step.nameMr : step.name;

            return (
              <div key={step.id} className="relative group">
                
                {/* Step Circle Indicator */}
                <div className={`absolute -left-[35px] top-0 w-8 h-8 rounded-full border-2 flex items-center justify-center font-black text-xs transition-all shadow-sm ${
                  isCompleted
                    ? 'bg-[#204e38] border-[#153425] text-white'
                    : isCurrent
                    ? 'bg-amber-400 border-amber-500 text-slate-950 ring-4 ring-amber-200 scale-110'
                    : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-5 h-5 text-white" /> : step.id}
                </div>

                {/* Step Content */}
                <div className={`p-5 rounded-2xl border transition-all hover-card-lift ${
                  isCurrent
                    ? 'bg-amber-50/80 border-amber-300 shadow-md'
                    : isCompleted
                    ? 'bg-[#e2eedd]/60 border-[#bcdba6]'
                    : 'bg-gray-50 border-gray-100 opacity-60'
                }`}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-lg text-gray-900">{stepName}</h3>
                    <span className="text-xs font-bold text-gray-500">{step.timestamp}</span>
                  </div>

                  <p className="text-xs text-gray-600 mt-1 font-medium leading-relaxed">{step.note}</p>

                  {/* Step 4 Special Weighing Station Info */}
                  {step.id === 4 && (weighing.status === 'COMPLETED' || isCurrent) && (
                    <div className="mt-4 bg-white p-4 rounded-2xl border border-gray-200/80 space-y-3 text-xs shadow-sm">
                      <div className="flex items-center justify-between font-extrabold text-gray-900 border-b border-gray-100 pb-2">
                        <span className="flex items-center gap-2 text-[#204e38] text-sm">
                          <Scale className="w-4 h-4" />
                          {t('weighingInfoTitle')}
                        </span>
                        <span className="bg-[#86c559] text-[#183624] text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                          {weighing.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center pt-1">
                        <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                          <span className="text-gray-500 block text-[10px] font-bold uppercase">{t('machineNumberLabel')}</span>
                          <span className="font-extrabold text-gray-900">{weighing.machineNumber}</span>
                        </div>
                        <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                          <span className="text-gray-500 block text-[10px] font-bold uppercase">{t('grossBagsLabel')}</span>
                          <span className="font-extrabold text-gray-900">{weighing.grossBagsCount} bags</span>
                        </div>
                        <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                          <span className="text-gray-500 block text-[10px] font-bold uppercase">{t('actualWeightLabel')}</span>
                          <span className="font-black text-amber-800">{weighing.actualWeightKg} kg</span>
                        </div>
                        <div className="bg-[#e2eedd] p-2.5 rounded-xl border border-[#bcdba6]">
                          <span className="text-[#204e38] block text-[10px] font-bold uppercase">{t('netWeightLabel')}</span>
                          <span className="font-black text-[#204e38]">{weighing.netWeightKg} kg</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 5 Special Quality Inspection Info */}
                  {step.id === 5 && (quality.status === 'PASSED' || isCurrent) && (
                    <div className="mt-4 bg-white p-4 rounded-2xl border border-amber-200/80 space-y-3 text-xs shadow-sm">
                      <div className="flex items-center justify-between font-extrabold text-gray-900 border-b border-gray-100 pb-2">
                        <span className="flex items-center gap-2 text-amber-800 text-sm">
                          <Award className="w-4 h-4 text-amber-500" />
                          {t('qualityResultsTitle')}
                        </span>
                        <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                          {quality.grade}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2.5 text-center pt-1">
                        <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                          <span className="text-gray-500 block text-[10px] font-bold uppercase">{t('moistureLimit')}</span>
                          <span className="font-extrabold text-gray-900">{quality.moisturePercentage}%</span>
                        </div>
                        <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                          <span className="text-gray-500 block text-[10px] font-bold uppercase">{t('minPurity')}</span>
                          <span className="font-extrabold text-[#204e38]">{quality.purityPercentage}%</span>
                        </div>
                        <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                          <span className="text-amber-900 block text-[10px] font-bold uppercase">{t('approvedRateLabel')}</span>
                          <span className="font-black text-amber-950">₹{quality.ratePerKg}/kg</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 7 Completed - Receipt Button */}
                  {step.id === 7 && isCompleted && (
                    <div className="mt-4 pt-3 border-t border-emerald-200">
                      <button
                        onClick={() => setIsReceiptModalOpen(true)}
                        className="btn-pill-gold text-xs py-2.5 px-5 shadow-md"
                      >
                        <FileText className="w-4 h-4 text-slate-950" />
                        <span>View & Print Digital Receipt</span>
                      </button>
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
