import React from 'react';
import { useApp } from '../../context/AppContext';
import { CreditCard, CheckCircle2, ShieldCheck, FileText, Sparkles } from 'lucide-react';

export const PaymentApproval: React.FC = () => {
  const { state, handleUpdateStep, setIsReceiptModalOpen, showToast, t } = useApp();
  const { payment, activeToken } = state;

  const handleDispatchPayment = async () => {
    await handleUpdateStep(6, "Payment processing initiated via SBI NEFT/RTGS gateway");
    setTimeout(async () => {
      await handleUpdateStep(7, "Payment credit verified. Receipt generated.");
      showToast("Payment completed and digital receipt generated!");
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-20 max-w-4xl mx-auto">
      
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-lg space-y-3">
        <h1 className="text-3xl font-black text-[#18221b] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#e2eedd] text-[#204e38] flex items-center justify-center font-bold">
            <CreditCard className="w-6 h-6 text-[#204e38]" />
          </div>
          <span>Payment Dispatch & Bank Credit</span>
        </h1>
        <p className="text-sm text-[#5e6a5f] font-medium">
          Review weight & MSP rate calculations and release bank payment credit.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xl space-y-6">
        
        <div className="bg-gradient-to-br from-[#122e20] via-[#153425] to-[#173e2c] text-white p-8 rounded-3xl text-center space-y-2 relative overflow-hidden shadow-2xl">
          <span className="text-xs text-emerald-200 font-extrabold uppercase tracking-widest">NET PAYABLE AMOUNT TO RAHUL PATIL</span>
          <div className="text-4xl sm:text-6xl font-black text-amber-300 tracking-tight drop-shadow-md">
            ₹{payment.finalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-emerald-100/90 font-medium">
            Account: <span className="font-mono text-white font-bold">{payment.accountMasked}</span> ({payment.bankName})
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <button
            onClick={handleDispatchPayment}
            className="flex-1 btn-pill-green py-4 text-base shadow-xl"
          >
            <CreditCard className="w-5 h-5 text-white" />
            <span>Dispatch Direct Bank Transfer (SBI DBT)</span>
          </button>

          <button
            onClick={() => setIsReceiptModalOpen(true)}
            className="btn-pill-white py-4 text-base shadow-sm"
          >
            <FileText className="w-5 h-5 text-[#204e38]" />
            <span>Preview Printable Receipt</span>
          </button>
        </div>

      </div>

    </div>
  );
};
