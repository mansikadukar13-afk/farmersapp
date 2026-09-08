import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sprout, Printer, Download, X, CheckCircle, ShieldCheck, FileText } from 'lucide-react';

export const DigitalReceiptModal: React.FC = () => {
  const { isReceiptModalOpen, setIsReceiptModalOpen, state, t, showToast } = useApp();

  if (!isReceiptModalOpen) return null;

  const { farmer, payment, activeToken, weighing, quality } = state;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    showToast("Downloading official KisanSetu Digital Receipt PDF...");
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-emerald-200 animate-in fade-in zoom-in-95 duration-200 my-8">
        
        {/* Modal Top Controls */}
        <div className="bg-farm-dark text-white px-6 py-4 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-300" />
            <span className="font-bold text-sm">Digital Procurement & Payment Receipt</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              {t('printReceipt')}
            </button>
            <button
              onClick={handleDownload}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              {t('downloadReceipt')}
            </button>
            <button
              onClick={() => setIsReceiptModalOpen(false)}
              className="p-1.5 text-emerald-200 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Official Printable Receipt Content */}
        <div className="p-8 space-y-6 bg-white print:p-0 print:m-0" id="receipt-print-area">
          
          {/* Receipt Header */}
          <div className="border-b-2 border-dashed border-emerald-200 pb-6 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-farm-primary flex items-center justify-center text-white font-bold shadow-md">
                <Sprout className="w-7 h-7" />
              </div>
              <div>
                <h2 className="font-black text-2xl text-farm-dark tracking-tight">KisanSetu</h2>
                <p className="text-xs font-semibold text-emerald-700">Digital Agricultural Procurement Receipt</p>
                <p className="text-[11px] text-gray-500">Government Procurement Assistance Platform</p>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-300">
                RECEIPT #{payment.transactionId}
              </span>
              <p className="text-xs text-gray-500 font-medium mt-1">Date: {payment.completedAt || activeToken.bookedDate}</p>
              <p className="text-xs text-emerald-600 font-bold">Status: VERIFIED & COMPLETED ✓</p>
            </div>
          </div>

          {/* Farmer & Centre Details Grid */}
          <div className="grid grid-cols-2 gap-6 bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100">
            <div>
              <h4 className="text-xs font-extrabold text-emerald-900 uppercase tracking-wider mb-2">Farmer Information</h4>
              <p className="text-sm font-bold text-gray-900">{farmer.name}</p>
              <p className="text-xs text-gray-600">Village: {farmer.village}</p>
              <p className="text-xs text-gray-600">Farmer ID: <span className="font-mono text-gray-800 font-semibold">{farmer.id}</span></p>
              <p className="text-xs text-gray-600">Aadhaar (Masked): <span className="font-mono text-gray-800 font-semibold">{farmer.aadhaar}</span></p>
            </div>

            <div>
              <h4 className="text-xs font-extrabold text-emerald-900 uppercase tracking-wider mb-2">Procurement Centre</h4>
              <p className="text-sm font-bold text-gray-900">{activeToken.centreName}</p>
              <p className="text-xs text-gray-600">Code: ABC-APMC-01</p>
              <p className="text-xs text-gray-600">Token Ref: <span className="font-mono text-emerald-700 font-bold">#{activeToken.tokenNumber}</span></p>
              <p className="text-xs text-gray-600">Weighing Machine: {weighing.machineNumber}</p>
            </div>
          </div>

          {/* Crop & Financial Breakdown Table */}
          <div>
            <h4 className="text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-2">Procurement & Payment Breakdown</h4>
            <div className="border border-gray-200 rounded-2xl overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-gray-100 text-gray-700 font-bold">
                  <tr>
                    <th className="p-3">Description</th>
                    <th className="p-3">Quantity / Grade</th>
                    <th className="p-3">Rate (₹)</th>
                    <th className="p-3 text-right">Total Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 font-medium">
                  <tr>
                    <td className="p-3">
                      <span className="font-bold text-gray-900">{activeToken.crop} Procurement</span>
                      <p className="text-[11px] text-gray-500">Quality: {quality.grade} (Moisture {quality.moisturePercentage}%)</p>
                    </td>
                    <td className="p-3">{weighing.netWeightKg} kg</td>
                    <td className="p-3">₹{payment.ratePerKg.toFixed(2)}/kg</td>
                    <td className="p-3 text-right font-bold text-gray-900">₹{payment.grossAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-3 text-gray-600" colSpan={3}>
                      Handling & Labour Charges (Standard APMC Deduction)
                    </td>
                    <td className="p-3 text-right text-red-600 font-semibold">- ₹{payment.deductions.toFixed(2)}</td>
                  </tr>
                  <tr className="bg-emerald-100/70 text-emerald-950 font-extrabold text-sm">
                    <td className="p-3" colSpan={3}>NET PAYOUT AMOUNT CREDITED</td>
                    <td className="p-3 text-right font-extrabold text-emerald-900 text-base">
                      ₹{payment.finalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment Transfer Info */}
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 flex items-center justify-between text-xs">
            <div>
              <p className="font-bold text-gray-800">Payment Mode: {payment.paymentMethod}</p>
              <p className="text-gray-600">Bank: {payment.bankName} (<span className="font-mono">{payment.accountMasked}</span>)</p>
              <p className="text-gray-500 font-mono text-[11px] mt-0.5">Transaction Ref: {payment.transactionId}</p>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 font-bold px-3 py-1.5 rounded-xl border border-emerald-300">
                <ShieldCheck className="w-4 h-4" />
                RBI Compliant Direct Credit
              </div>
            </div>
          </div>

          {/* Footer & Masking Security Notice */}
          <div className="text-center pt-4 border-t border-gray-200 text-[11px] text-gray-500 space-y-1">
            <p className="font-semibold text-gray-700">Thank you for utilizing KisanSetu for your harvest procurement.</p>
            <p>This is a computer-generated digital receipt. Personal identifier numbers (Aadhaar/Bank Account) are masked for data protection.</p>
          </div>
        </div>

        {/* Modal Bottom Close */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end print:hidden">
          <button
            onClick={() => setIsReceiptModalOpen(false)}
            className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-xl text-xs transition-all cursor-pointer"
          >
            Close Receipt
          </button>
        </div>
      </div>
    </div>
  );
};
