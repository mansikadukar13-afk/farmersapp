import React from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Sliders, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export const CentreSettings: React.FC = () => {
  const { state, handleToggleCentre, showToast, t } = useApp();
  const { centres } = state;
  const currentCentre = centres[0];

  return (
    <div className="space-y-8 pb-20 max-w-4xl mx-auto">
      
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-lg space-y-3">
        <h1 className="text-3xl font-black text-[#18221b] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#e2eedd] text-[#204e38] flex items-center justify-center font-bold">
            <MapPin className="w-6 h-6 text-[#204e38]" />
          </div>
          <span>Centre Operations Settings</span>
        </h1>
        <p className="text-sm text-[#5e6a5f] font-medium">
          Control MANDI operating status, crowd level, and active weighing counter capacity.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xl space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-5">
          <div>
            <h3 className="font-extrabold text-2xl text-gray-900">{currentCentre.name}</h3>
            <p className="text-sm text-gray-500 font-medium">{currentCentre.address}</p>
          </div>

          <span className={`text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm self-start sm:self-auto ${
            currentCentre.status === 'OPEN' ? 'bg-[#e2eedd] text-[#204e38] border border-[#bcdba6]' : 'bg-red-100 text-red-900 border border-red-300'
          }`}>
            {currentCentre.status}
          </span>
        </div>

        <div className="space-y-4 text-xs">
          <h4 className="font-extrabold text-gray-900 uppercase tracking-wider text-xs">Operating Controls</h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <button
              onClick={() => handleToggleCentre(currentCentre.id, 'OPEN')}
              className={`p-5 rounded-2xl font-black transition-all border cursor-pointer hover-card-lift ${
                currentCentre.status === 'OPEN'
                  ? 'bg-[#204e38] text-white border-[#153425] shadow-md'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              Set OPEN Status
            </button>

            <button
              onClick={() => handleToggleCentre(currentCentre.id, 'BUSY')}
              className={`p-5 rounded-2xl font-black transition-all border cursor-pointer hover-card-lift ${
                currentCentre.status === 'BUSY'
                  ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-md'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              Set BUSY Status
            </button>

            <button
              onClick={() => handleToggleCentre(currentCentre.id, 'CLOSED')}
              className={`p-5 rounded-2xl font-black transition-all border cursor-pointer hover-card-lift ${
                currentCentre.status === 'CLOSED'
                  ? 'bg-red-600 text-white border-red-700 shadow-md'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              Set CLOSED Status
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
