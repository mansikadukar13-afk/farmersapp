import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, Ticket, CloudSun, CreditCard, Sprout, CheckCircle2, Sparkles } from 'lucide-react';

export const NotificationsView: React.FC = () => {
  const { state, t } = useApp();
  const { notifications } = state;

  return (
    <div className="space-y-8 pb-20 max-w-4xl mx-auto">
      
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-lg space-y-3">
        <h1 className="text-3xl font-black text-[#18221b] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#e2eedd] text-[#204e38] flex items-center justify-center font-bold">
            <Bell className="w-6 h-6 text-[#204e38]" />
          </div>
          <span>{t('notificationsTitle')}</span>
        </h1>
        <p className="text-sm text-[#5e6a5f] font-medium">
          {t('notificationsSub')}
        </p>
      </div>

      <div className="space-y-4">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-md flex items-start gap-4 hover-card-lift"
          >
            <div className={`p-3.5 rounded-2xl shrink-0 shadow-sm ${
              n.type === 'QUEUE' ? 'bg-amber-100 text-amber-900' :
              n.type === 'PAYMENT' ? 'bg-[#e2eedd] text-[#204e38]' :
              n.type === 'WEATHER' ? 'bg-sky-100 text-sky-900' : 'bg-purple-100 text-purple-900'
            }`}>
              {n.type === 'QUEUE' ? <Ticket className="w-6 h-6 text-amber-900" /> :
               n.type === 'PAYMENT' ? <CreditCard className="w-6 h-6 text-[#204e38]" /> :
               n.type === 'WEATHER' ? <CloudSun className="w-6 h-6 text-sky-900" /> : <Sprout className="w-6 h-6" />}
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-base text-gray-900">{n.title}</h4>
                <span className="text-xs font-bold text-gray-400">{n.time}</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">{n.message}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
