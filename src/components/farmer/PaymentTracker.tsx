import React from 'react';
import { useApp } from '../../context/AppContext';
import { CreditCard, FileText, Printer, Download, CheckCircle2, ShieldCheck, AlertCircle, Building, ArrowRight, Sparkles } from 'lucide-react';

export const PaymentTracker: React.FC = () => {
  const { state, setIsReceiptModalOpen, t, showToast } = useApp();
  const { payment, activeToken, weighing, farmer } = state;

  const isCompleted = payment.status === 'COMPLETED';

  return (
    <div className="space-y-8 pb-20 max-w-4xl mx-auto">
      
      {/* Page Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-lg space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-[#18221b] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#e2eedd] text-[#204e38] flex items-center justify-center font-bold">
                <CreditCard className="w-6 h-6 text-[#204e38]" />
              </div>
              <span>{t('paymentHubTitle')}</span>
            </h1>
            <p className="text-sm text-[#5e6a5f] mt-1 font-medium">
              Direct Bank Credit details for Token <span className="font-extrabold text-amber-800">#{activeToken.tokenNumber}</span>.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-amber-400 text-slate-950 px-4 py-2 rounded-full font-black text-xs shadow-md shrink-0">
            <ShieldCheck className="w-4 h-4 text-slate-950" />
            <span>GOVT DIRECT BENEFIT TRANSFER (DBT)</span>
          </div>
        </div>
      </div>

      {/* Main Payment Status Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xl space-y-6">
        
        {/* Status Indicator */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="p-3.5 bg-[#e2eedd] text-[#204e38] rounded-2xl font-black shadow-sm">
              <Building className="w-6 h-6 text-[#204e38]" />
            </div>
            <div>
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">{t('bankAccountLabel')} ({payment.bankName})</span>
              <h2 className="font-extrabold text-xl text-gray-900 mt-0.5">{payment.accountMasked}</h2>
            </div>
          </div>

          <span className={`text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm ${
            isCompleted ? 'bg-[#86c559] text-[#183624]' : 'bg-amber-400 text-slate-950 animate-pulse'
          }`}>
            {payment.status}
          </span>
        </div>

        {/* Amount Highlight */}
        <div className="bg-gradient-to-br from-[#122e20] via-[#153425] to-[#173e2c] text-white p-8 rounded-3xl text-center space-y-2 relative overflow-hidden shadow-2xl">
          <span className="text-xs text-emerald-200 font-extrabold uppercase tracking-widest">{t('netPayableCredit')}</span>
          <div className="text-4xl sm:text-6xl font-black text-amber-300 tracking-tight drop-shadow-md">
            ₹{payment.finalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-emerald-100/90 font-medium">
            Ref Transaction ID: <span className="font-mono text-white font-bold">{payment.transactionId}</span>
          </p>
        </div>

        {/* Calculation Table */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200/80 space-y-4 text-xs">
          <h4 className="font-extrabold text-gray-900 uppercase tracking-wider text-xs">{t('calcBreakdownTitle')}</h4>

          <div className="space-y-3 divide-y divide-gray-200/80">
            <div className="flex justify-between pt-1">
              <span className="text-gray-600 font-medium">Crop & Net Weight:</span>
              <span className="font-extrabold text-gray-900">{activeToken.crop} ({payment.weightKg} kg)</span>
            </div>

            <div className="flex justify-between pt-2.5">
              <span className="text-gray-600 font-medium">Approved MSP Procurement Rate:</span>
              <span className="font-extrabold text-gray-900">₹{payment.ratePerKg.toFixed(2)} / kg</span>
            </div>

            <div className="flex justify-between pt-2.5 font-bold text-gray-900">
              <span>{t('grossTotalLabel')}:</span>
              <span className="font-black text-gray-900 text-sm">₹{payment.grossAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>

            <div className="flex justify-between pt-2.5 text-red-600 font-bold">
              <span>Standard Deductions ({payment.deductionReason}):</span>
              <span>- ₹{payment.deductions.toFixed(2)}</span>
            </div>

            <div className="flex justify-between pt-3 text-lg font-black text-[#204e38] border-t-2 border-[#bcdba6]">
              <span>{t('netCreditedLabel')}:</span>
              <span className="text-xl">₹{payment.finalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
          <button
            onClick={() => setIsReceiptModalOpen(true)}
            className="btn-pill-green py-3.5 text-sm shadow-md"
          >
            <FileText className="w-5 h-5 text-white" />
            <span>{t('viewReceipt')}</span>
          </button>

          <button
            onClick={() => showToast("Downloading Digital Receipt PDF...")}
            className="btn-pill-white py-3.5 text-sm shadow-sm"
          >
            <Download className="w-5 h-5 text-[#204e38]" />
            <span>{t('downloadReceipt')}</span>
          </button>

          <button
            onClick={() => setIsReceiptModalOpen(true)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-extrabold py-3.5 px-5 rounded-full transition-all flex items-center justify-center gap-2 text-sm cursor-pointer shadow-sm"
          >
            <Printer className="w-5 h-5 text-gray-800" />
            <span>{t('printReceipt')}</span>
          </button>
        </div>

      </div>

    </div>
  );
};
