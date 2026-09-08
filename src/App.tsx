import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Toast } from './components/common/Toast';
import { SOSModal } from './components/common/SOSModal';
import { DigitalReceiptModal } from './components/common/DigitalReceiptModal';
import { AuthLoginModal } from './components/common/AuthLoginModal';
import { LandingPage } from './components/landing/LandingPage';

// Farmer Views
import { FarmerDashboard } from './components/farmer/FarmerDashboard';
import { FindCentre } from './components/farmer/FindCentre';
import { ScheduleSlot } from './components/farmer/ScheduleSlot';
import { MyToken } from './components/farmer/MyToken';
import { TrackQueue } from './components/farmer/TrackQueue';
import { StatusTimeline } from './components/farmer/StatusTimeline';
import { PaymentTracker } from './components/farmer/PaymentTracker';
import { HistoryView } from './components/farmer/HistoryView';
import { NotificationsView } from './components/farmer/NotificationsView';
import { FarmerProfile } from './components/farmer/FarmerProfile';

// Officer Views
import { LiveQueueControl } from './components/officer/LiveQueueControl';
import { WeighingStation } from './components/officer/WeighingStation';
import { QualityCheckStation } from './components/officer/QualityCheckStation';
import { PaymentApproval } from './components/officer/PaymentApproval';
import { CentreSettings } from './components/officer/CentreSettings';

const AppContent: React.FC = () => {
  const { role, farmerTab, officerTab } = useApp();

  return (
    <>
      <AuthLoginModal />
      {role === 'LANDING' ? (
        <LandingPage />
      ) : (
        <div className="min-h-screen bg-[#fdfbf7] flex flex-col font-sans">
          <Header />
          <SOSModal />
          <DigitalReceiptModal />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {role === 'FARMER' && (
          <>
            {farmerTab === 'dashboard' && <FarmerDashboard />}
            {farmerTab === 'find-centre' && <FindCentre />}
            {farmerTab === 'schedule' && <ScheduleSlot />}
            {farmerTab === 'my-token' && <MyToken />}
            {farmerTab === 'track-queue' && <TrackQueue />}
            {farmerTab === 'procurement' && <StatusTimeline />}
            {farmerTab === 'payment' && <PaymentTracker />}
            {farmerTab === 'history' && <HistoryView />}
            {farmerTab === 'notifications' && <NotificationsView />}
            {farmerTab === 'profile' && <FarmerProfile />}
          </>
        )}

        {role === 'OFFICER' && (
          <>
            {officerTab === 'queue' && <LiveQueueControl />}
            {officerTab === 'weighing' && <WeighingStation />}
            {officerTab === 'quality' && <QualityCheckStation />}
            {officerTab === 'payment' && <PaymentApproval />}
            {officerTab === 'settings' && <CentreSettings />}
          </>
        )}
      </main>
    </div>
      )}
    </>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
