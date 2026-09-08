import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, PhoneCall, MessageSquare, AlertCircle, X, CheckCircle2 } from 'lucide-react';

export const SOSModal: React.FC = () => {
  const { isSOSOpen, setIsSOSOpen, t, showToast } = useApp();
  const [submittedIssue, setSubmittedIssue] = useState(false);
  const [issueType, setIssueType] = useState('Queue Delay');
  const [description, setDescription] = useState('');

  if (!isSOSOpen) return null;

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedIssue(true);
    showToast("SOS Alert Sent! Procurement Officer Deshmukh has been notified.");
    setTimeout(() => {
      setSubmittedIssue(false);
      setIsSOSOpen(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-red-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-2xl">
              <ShieldAlert className="w-7 h-7 text-amber-300 animate-pulse" />
            </div>
            <div>
              <h3 className="font-extrabold text-xl">{t('sosTitle')}</h3>
              <p className="text-xs text-red-100 mt-0.5">{t('sosSubtitle')}</p>
            </div>
          </div>
          <button 
            onClick={() => setIsSOSOpen(false)}
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {submittedIssue ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-bold text-lg text-gray-900">Emergency Alert Transmitted!</h4>
              <p className="text-sm text-gray-600 max-w-xs mx-auto">
                Your report has been sent to **Officer S. Deshmukh** at ABC Procurement Centre.
              </p>
            </div>
          ) : (
            <>
              {/* Emergency Hotline Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="tel:18001801551"
                  onClick={() => showToast("Dialing Kisan Helpline 1800-180-1551...")}
                  className="bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 p-4 rounded-2xl flex items-center gap-3 transition-all group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-emerald-900">{t('emergencyLine')}</div>
                    <div className="text-[11px] text-emerald-700 font-medium">Toll Free 24/7</div>
                  </div>
                </a>

                <button
                  onClick={() => showToast("Connecting call to Officer S. Deshmukh (+91 98765 43210)...")}
                  className="bg-amber-50 hover:bg-amber-100 border border-amber-300 p-4 rounded-2xl flex items-center gap-3 transition-all text-left group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-amber-950">{t('callOfficer')}</div>
                    <div className="text-[11px] text-amber-800 font-medium">Officer S. Deshmukh</div>
                  </div>
                </button>
              </div>

              {/* Problem Report Form */}
              <form onSubmit={handleSubmitReport} className="space-y-4 pt-2 border-t border-gray-100">
                <h4 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  Report Centre or Payment Problem
                </h4>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Issue Category</label>
                  <select
                    value={issueType}
                    onChange={(e) => setIssueType(e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="Queue Delay">Unusually long queue delay</option>
                    <option value="Weighing Discrepancy">Weighing machine error / discrepancy</option>
                    <option value="Payment Delayed">Payment processing delayed</option>
                    <option value="Centre Closed">Centre closed during operating hours</option>
                    <option value="Other">Other emergency</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Description (Optional)</label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide details about your query..."
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSOSOpen(false)}
                    className="w-1/2 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs transition-all cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="w-1/2 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-md transition-all cursor-pointer"
                  >
                    Send Urgent Report
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
