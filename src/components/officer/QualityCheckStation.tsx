import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Award, CheckCircle2, ShieldCheck, AlertTriangle, Sparkles } from 'lucide-react';

export const QualityCheckStation: React.FC = () => {
  const { state, handleUpdateStep, showToast, t } = useApp();
  const { quality, activeToken } = state;

  const [grade, setGrade] = useState(quality.grade);
  const [moisture, setMoisture] = useState(quality.moisturePercentage);
  const [rate, setRate] = useState(quality.ratePerKg);

  const handleApproveQuality = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleUpdateStep(5, `Quality inspection passed: ${grade} at ₹${rate}/kg`);
    showToast(`Approved Quality: ${grade} (₹${rate}/kg)`);
  };

  return (
    <div className="space-y-8 pb-20 max-w-4xl mx-auto">
      
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-lg space-y-3">
        <h1 className="text-3xl font-black text-[#18221b] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
            <Award className="w-6 h-6 text-amber-800" />
          </div>
          <span>Quality Inspection Station</span>
        </h1>
        <p className="text-sm text-[#5e6a5f] font-medium">
          Inspect moisture percentage, grain purity, and assign APMC MSP procurement rate.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xl space-y-6">
        
        <form onSubmit={handleApproveQuality} className="space-y-6 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div>
              <label className="block font-extrabold text-gray-700 uppercase tracking-wider mb-2">Quality Grade</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-bold focus:ring-2 focus:ring-[#204e38]"
              >
                <option value="Grade A Superfine">Grade A Superfine</option>
                <option value="Grade B Standard">Grade B Standard</option>
                <option value="Fair Average Quality (FAQ)">Fair Average Quality (FAQ)</option>
              </select>
            </div>

            <div>
              <label className="block font-extrabold text-gray-700 uppercase tracking-wider mb-2">Moisture Level (%)</label>
              <input
                type="number"
                step="0.1"
                value={moisture}
                onChange={(e) => setMoisture(Number(e.target.value))}
                className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-bold focus:ring-2 focus:ring-[#204e38]"
              />
            </div>

            <div>
              <label className="block font-extrabold text-gray-700 uppercase tracking-wider mb-2">Approved Rate (₹/kg)</label>
              <input
                type="number"
                step="0.05"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full p-3.5 bg-amber-50 border-2 border-amber-400 rounded-2xl text-base font-black text-slate-950 focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full btn-pill-gold py-4 text-base shadow-xl"
          >
            <Award className="w-5 h-5 text-slate-950" />
            <span>Approve Quality Inspection & Pass to Payment</span>
          </button>
        </form>

      </div>

    </div>
  );
};
