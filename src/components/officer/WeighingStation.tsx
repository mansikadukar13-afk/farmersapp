import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Scale, CheckCircle2, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

export const WeighingStation: React.FC = () => {
  const { state, handleUpdateWeighing, handleUpdateStep, showToast, t } = useApp();
  const { weighing, activeToken } = state;

  const [weightInput, setWeightInput] = useState<number>(weighing.actualWeightKg);
  const [machineInput, setMachineInput] = useState<string>(weighing.machineNumber);
  const [bagsInput, setBagsInput] = useState<number>(weighing.grossBagsCount);

  const handleSubmitWeighing = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleUpdateWeighing(weightInput, machineInput, bagsInput);
    await handleUpdateStep(4, `Weighing recorded: ${weightInput - 18} kg net on ${machineInput}`);
    showToast(`Recorded ${weightInput} kg at ${machineInput}`);
  };

  return (
    <div className="space-y-8 pb-20 max-w-4xl mx-auto">
      
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-lg space-y-3">
        <h1 className="text-3xl font-black text-[#18221b] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#e2eedd] text-[#204e38] flex items-center justify-center font-bold">
            <Scale className="w-6 h-6 text-[#204e38]" />
          </div>
          <span>Officer Weighing Counter Station</span>
        </h1>
        <p className="text-sm text-[#5e6a5f] font-medium">
          Enter digital scale parameters for crop load unload and record net weight.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xl space-y-6">
        
        {/* Token Context Header */}
        <div className="bg-[#e2eedd] p-5 rounded-2xl border border-[#bcdba6] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-[#204e38] font-bold uppercase tracking-wider">Active Weighing Session</span>
            <h3 className="font-extrabold text-xl text-gray-900 mt-0.5">
              Token #{activeToken.tokenNumber} ({activeToken.farmerName})
            </h3>
            <p className="text-gray-700 font-medium">Crop: {activeToken.crop} • Estimated: {activeToken.quantityEstKg} kg</p>
          </div>

          <span className="bg-[#204e38] text-white font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm self-start sm:self-auto">
            STATUS: {weighing.status}
          </span>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmitWeighing} className="space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div>
              <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-2">Select Weighing Machine</label>
              <select
                value={machineInput}
                onChange={(e) => setMachineInput(e.target.value)}
                className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-bold focus:ring-2 focus:ring-[#204e38]"
              >
                <option value="Weighing Machine #01">Weighing Machine #01 (Gate 1)</option>
                <option value="Weighing Machine #02">Weighing Machine #02 (Main Counter)</option>
                <option value="Weighing Machine #03">Weighing Machine #03 (Heavy Platform)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-2">Number of Bags</label>
              <input
                type="number"
                value={bagsInput}
                onChange={(e) => setBagsInput(Number(e.target.value))}
                className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-bold focus:ring-2 focus:ring-[#204e38]"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-2">Actual Scale Weight (kg)</label>
              <input
                type="number"
                value={weightInput}
                onChange={(e) => setWeightInput(Number(e.target.value))}
                className="w-full p-3.5 bg-amber-50 border-2 border-amber-400 rounded-2xl text-base font-black text-slate-950 focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200/80 text-xs space-y-1.5">
            <div className="flex justify-between text-gray-600 font-medium">
              <span>Standard Tare Deduction (9 Bags × 2kg):</span>
              <span>- 18 kg</span>
            </div>
            <div className="flex justify-between font-black text-[#204e38] text-base pt-2 border-t border-gray-200">
              <span>Calculated Net Crop Weight:</span>
              <span>{Math.max(0, weightInput - 18)} kg</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full btn-pill-green py-4 text-base shadow-xl"
          >
            <Scale className="w-5 h-5 text-amber-300" />
            <span>Submit Weight & Advance to Quality Check</span>
          </button>
        </form>

      </div>

    </div>
  );
};
