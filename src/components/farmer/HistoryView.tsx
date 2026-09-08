import React from 'react';
import { useApp } from '../../context/AppContext';
import { History, FileText, CheckCircle2, Calendar, MapPin, Sparkles } from 'lucide-react';

export const HistoryView: React.FC = () => {
  const { state, setIsReceiptModalOpen, t } = useApp();
  const { history } = state;

  return (
    <div className="space-y-8 pb-20 max-w-4xl mx-auto">
      
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-lg space-y-3">
        <h1 className="text-3xl font-black text-[#18221b] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#e2eedd] text-[#204e38] flex items-center justify-center font-bold">
            <History className="w-6 h-6 text-[#204e38]" />
          </div>
          <span>{t('historyTitle')}</span>
        </h1>
        <p className="text-sm text-[#5e6a5f] font-medium">
          {t('historySub')}
        </p>
      </div>

      <div className="space-y-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-md hover-card-lift flex flex-col sm:flex-row sm:items-center justify-between gap-6"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="bg-[#e2eedd] text-[#204e38] font-black text-xs px-3 py-1 rounded-full border border-[#bcdba6]">
                  {item.crop}
                </span>
                <span className="text-xs text-gray-500 font-bold flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.date}
                </span>
              </div>

              <h3 className="font-extrabold text-xl text-gray-900">{item.centre}</h3>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">
                Quantity: <span className="font-extrabold text-gray-900">{item.quantityKg} kg</span> • Payout: <span className="font-black text-[#204e38]">₹{item.finalAmount.toLocaleString('en-IN')}</span>
              </p>
            </div>

            <button
              onClick={() => setIsReceiptModalOpen(true)}
              className="btn-pill-white text-xs py-3 px-5 shadow-sm shrink-0"
            >
              <FileText className="w-4 h-4 text-[#204e38]" />
              <span>{t('oldReceiptBtn')}</span>
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
