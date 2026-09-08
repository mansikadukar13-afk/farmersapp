import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calculator, Award, Building2, TrendingUp, Sparkles } from 'lucide-react';

export const ProcurementGuide: React.FC = () => {
  const { t } = useApp();
  const [calcWeightKg, setCalcWeightKg] = useState<number>(450);
  const [calcRatePerKg, setCalcRatePerKg] = useState<number>(22.75);

  const calculatedGross = calcWeightKg * calcRatePerKg;
  const calculatedDeductions = 120;
  const calculatedNet = Math.max(0, calculatedGross - calculatedDeductions);

  return (
    <div className="space-y-6">
      
      {/* MANDI LIVE OPERATIONS METRICS */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-lg space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#e2eedd] text-[#204e38] flex items-center justify-center font-bold">
              <Building2 className="w-6 h-6 text-[#204e38]" />
            </div>
            <h3 className="font-extrabold text-xl text-gray-900">
              {t('mandiDataTitle')}
            </h3>
          </div>
          <span className="bg-[#e2eedd] text-[#204e38] font-extrabold text-xs px-3.5 py-1.5 rounded-full border border-[#bcdba6] self-start sm:self-auto">
            ABC Procurement Centre • Khed
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 text-center text-xs">
          <div className="bg-[#e2eedd]/60 p-4.5 rounded-2xl border border-[#bcdba6]">
            <span className="text-[#204e38] font-extrabold block text-[10px] uppercase tracking-wider">{t('farmersServedToday')}</span>
            <div className="text-3xl font-black text-[#153425] mt-1">142</div>
            <span className="text-[10px] text-[#204e38] font-bold">100% On-time</span>
          </div>

          <div className="bg-amber-50 p-4.5 rounded-2xl border border-amber-200">
            <span className="text-amber-900 font-extrabold block text-[10px] uppercase tracking-wider">{t('totalCropProcured')}</span>
            <div className="text-3xl font-black text-amber-950 mt-1">640 Qtl</div>
            <span className="text-[10px] text-amber-800 font-bold">Wheat & Soybean</span>
          </div>

          <div className="bg-sky-50 p-4.5 rounded-2xl border border-sky-200">
            <span className="text-sky-900 font-extrabold block text-[10px] uppercase tracking-wider">{t('activeCountersCount')}</span>
            <div className="text-3xl font-black text-sky-950 mt-1">4</div>
            <span className="text-[10px] text-sky-700 font-bold">Operational</span>
          </div>

          <div className="bg-purple-50 p-4.5 rounded-2xl border border-purple-200">
            <span className="text-purple-900 font-extrabold block text-[10px] uppercase tracking-wider">{t('avgSpeed')}</span>
            <div className="text-3xl font-black text-purple-950 mt-1">~5 mins</div>
            <span className="text-[10px] text-purple-700 font-bold">Per farmer load</span>
          </div>
        </div>
      </div>

      {/* QUALITY INSPECTION CRITERIA & FINANCIAL CALCULATOR GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Quality Standards Guide */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-lg space-y-4">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
              <Award className="w-6 h-6 text-amber-800" />
            </div>
            <h3 className="font-extrabold text-xl text-gray-900">
              {t('qualityStandardsTitle')}
            </h3>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200/80 flex justify-between items-center">
              <div>
                <div className="font-extrabold text-gray-900 text-sm">{t('moistureLimit')}</div>
                <div className="text-gray-500 font-semibold text-[11px]">Grade A Approved</div>
              </div>
              <span className="font-black text-[#204e38] bg-[#e2eedd] px-3.5 py-1.5 rounded-full border border-[#bcdba6]">
                Max 12.0%
              </span>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200/80 flex justify-between items-center">
              <div>
                <div className="font-extrabold text-gray-900 text-sm">{t('minPurity')}</div>
                <div className="text-gray-500 font-semibold text-[11px]">Clean seed standard</div>
              </div>
              <span className="font-black text-[#204e38] bg-[#e2eedd] px-3.5 py-1.5 rounded-full border border-[#bcdba6]">
                Min 98.0%
              </span>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200/80 flex justify-between items-center">
              <div>
                <div className="font-extrabold text-gray-900 text-sm">{t('foreignMatter')}</div>
                <div className="text-gray-500 font-semibold text-[11px]">Chaff/dust tolerance</div>
              </div>
              <span className="font-black text-amber-900 bg-amber-100 px-3.5 py-1.5 rounded-full border border-amber-300">
                Max 1.5%
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Payout Calculator */}
        <div className="bg-gradient-to-br from-[#122e20] via-[#153425] to-[#173e2c] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-700/50 space-y-5">
          <div className="flex items-center justify-between border-b border-emerald-800 pb-4">
            <div className="flex items-center gap-3">
              <Calculator className="w-6 h-6 text-amber-300" />
              <h3 className="font-black text-xl text-white">{t('dbtCalculatorTitle')}</h3>
            </div>
            <span className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              DBT GATEWAY
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-emerald-200 font-extrabold uppercase tracking-wider mb-1.5">{t('cropWeightLabel')}</label>
              <input
                type="number"
                value={calcWeightKg}
                onChange={(e) => setCalcWeightKg(Number(e.target.value))}
                className="w-full p-3 bg-emerald-950 border border-emerald-700 rounded-2xl font-black text-white focus:ring-2 focus:ring-amber-400 text-base"
              />
            </div>

            <div>
              <label className="block text-emerald-200 font-extrabold uppercase tracking-wider mb-1.5">{t('ratePerKgLabel')}</label>
              <input
                type="number"
                step="0.25"
                value={calcRatePerKg}
                onChange={(e) => setCalcRatePerKg(Number(e.target.value))}
                className="w-full p-3 bg-emerald-950 border border-emerald-700 rounded-2xl font-black text-white focus:ring-2 focus:ring-amber-400 text-base"
              />
            </div>
          </div>

          <div className="bg-emerald-950/80 p-5 rounded-2xl border border-emerald-700/50 space-y-2.5 text-xs shadow-inner">
            <div className="flex justify-between text-emerald-200 font-semibold">
              <span>{t('grossPayoutLabel')}:</span>
              <span className="font-bold text-white">₹{calculatedGross.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-red-300 font-semibold">
              <span>{t('labourDeductionsLabel')}:</span>
              <span>- ₹{calculatedDeductions.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-black text-amber-300 text-base pt-2.5 border-t border-emerald-800">
              <span>{t('netDbtPayoutLabel')}:</span>
              <span>₹{calculatedNet.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
