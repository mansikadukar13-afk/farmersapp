import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Play, FastForward, ShieldCheck, RefreshCw, ChevronUp, ChevronDown, CheckCircle2, Sliders, Scale, Award, CreditCard, Radio, Sparkles } from 'lucide-react';

export const DemoControlBar: React.FC = () => {
  const { state, handleAdvanceQueue, handleUpdateStep, handleUpdateWeighing, handleResetDemo, setIsReceiptModalOpen, t } = useApp();
  const [isOpen, setIsOpen] = useState(true);

  const currentStep = state.procurementJourney.currentStep;
  const currentServed = state.currentTokenBeingServed;
  const activeTokenNumber = state.activeToken.tokenNumber;
  const farmersAhead = Math.max(0, activeTokenNumber - currentServed);

  return (
    <div className="fixed bottom-3 right-3 z-50 max-w-xl w-full px-2 sm:px-0 transition-all">
      <div className="bg-slate-950/95 text-white rounded-3xl shadow-2xl border-2 border-emerald-500/50 backdrop-blur-xl overflow-hidden">
        
        {/* Bar Header */}
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-950 px-4 py-3 flex items-center justify-between cursor-pointer border-b border-emerald-800/60"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
            <Radio className="w-4 h-4 text-amber-400" />
            <span className="font-black text-xs sm:text-sm text-amber-300 tracking-wide uppercase">
              Real-Time Procurement Simulator & Controller
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-emerald-900/80 text-emerald-300 border border-emerald-700/60 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold hidden sm:inline-block">
              Serving: #{currentServed} • Token #{activeTokenNumber} ({farmersAhead} ahead)
            </span>
            {isOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronUp className="w-4 h-4 text-slate-400" />}
          </div>
        </div>

        {/* Controls Grid */}
        {isOpen && (
          <div className="p-4 space-y-3 text-xs">
            
            {/* Quick Simulation Triggers */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              
              <button
                onClick={handleAdvanceQueue}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold p-2.5 rounded-2xl flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow cursor-pointer text-xs"
                title="Advance live queue counter to call next token"
              >
                <FastForward className="w-4 h-4 text-amber-300" />
                Call Next Token (#{currentServed + 1})
              </button>

              <button
                onClick={() => handleUpdateWeighing(450, "Weighing Machine #02", 9)}
                className="bg-sky-600 hover:bg-sky-500 text-white font-extrabold p-2.5 rounded-2xl flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow cursor-pointer text-xs"
                title="Log 450kg actual crop weight at Machine #02"
              >
                <Scale className="w-4 h-4 text-sky-200" />
                Log Weight (450 kg)
              </button>

              <button
                onClick={() => handleUpdateStep(5, "Quality Grade A Superfine approved")}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black p-2.5 rounded-2xl flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow cursor-pointer text-xs"
                title="Approve Quality Grade A Superfine"
              >
                <Award className="w-4 h-4 text-slate-950" />
                Pass Grade A Quality
              </button>

              <button
                onClick={() => {
                  handleUpdateStep(7, "Payment credit verified. Receipt generated.");
                  setIsReceiptModalOpen(true);
                }}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold p-2.5 rounded-2xl flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow cursor-pointer text-xs"
                title="Complete bank payment credit and show printable receipt"
              >
                <CreditCard className="w-4 h-4 text-purple-200" />
                Dispatch Bank Credit
              </button>

              <button
                onClick={() => handleUpdateStep(currentStep + 1)}
                disabled={currentStep >= 7}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold p-2.5 rounded-2xl flex items-center justify-center gap-1.5 transition-all active:scale-95 border border-slate-700 disabled:opacity-40 text-xs"
              >
                <Play className="w-4 h-4 text-amber-400" />
                Step Forward ({currentStep}/7)
              </button>

              <button
                onClick={handleResetDemo}
                className="bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white font-bold p-2.5 rounded-2xl flex items-center justify-center gap-1.5 transition-all active:scale-95 border border-slate-800 text-xs"
              >
                <RefreshCw className="w-4 h-4" />
                Reset Demo
              </button>
            </div>

            {/* Direct Journey Step Buttons */}
            <div className="pt-2 border-t border-slate-800/80">
              <div className="text-[11px] font-bold text-slate-300 mb-2 flex items-center justify-between">
                <span>Jump Directly to Procurement Journey Step:</span>
                <span className="text-amber-300 font-mono">Rahul Patil (Token #{activeTokenNumber})</span>
              </div>

              <div className="grid grid-cols-7 gap-1">
                {[
                  { step: 1, label: "1. Token" },
                  { step: 2, label: "2. Queue" },
                  { step: 3, label: "3. Arrived" },
                  { step: 4, label: "4. Weighed" },
                  { step: 5, label: "5. Quality" },
                  { step: 6, label: "6. Paying" },
                  { step: 7, label: "7. Paid" }
                ].map((item) => (
                  <button
                    key={item.step}
                    onClick={() => handleUpdateStep(item.step)}
                    className={`py-2 rounded-xl text-[10px] font-black transition-all cursor-pointer ${
                      currentStep === item.step
                        ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300 shadow-md scale-105'
                        : item.step < currentStep
                        ? 'bg-emerald-900/70 text-emerald-300 border border-emerald-700/60'
                        : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
