import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppState, Language, UserRole, ProcurementCentre } from '../types';
import { fetchState, advanceQueue, updateProcurementStep, updateWeighing, bookSlot, toggleCentreStatus, updateWeatherDemo, resetDemoState } from '../services/api';
import { translations } from '../i18n/translations';

// Default initial state fallback in case backend is loading
const defaultState: AppState = {
  farmer: {
    id: "FARMER-9842",
    name: "Rahul Patil",
    village: "Khed",
    phone: "98******42",
    aadhaar: "XXXX-XXXX-4512",
    bankAccount: "XXXXXXXX1234",
    bankName: "State Bank of India",
    ifsc: "SBIN0001234",
    upiId: "rahulpatil@okicici",
    preferredLanguage: "en",
    cropPreferences: ["Wheat", "Soybean", "Rice"]
  },
  weather: {
    temp: 28,
    condition: "Clear & Sunny",
    rainChance: 10,
    humidity: 45,
    windSpeed: 12,
    advice: "Optimal dry conditions for crop transport and weighing."
  },
  centres: [
    {
      id: "centre-1",
      name: "ABC Procurement Centre",
      code: "ABC-APMC-01",
      address: "Mandi Road, Khed Sector 4",
      distanceKm: 4.2,
      travelTimeMins: 15,
      status: "OPEN",
      crowdLevel: "LOW",
      waitingCount: 8,
      estimatedWaitMins: 30,
      fitScore: 94,
      fitReason: "Closest distance, shortest queue, and high weighing counter capacity.",
      acceptedCrops: ["Wheat", "Rice", "Soybean"],
      operatingHours: "08:00 AM – 06:00 PM",
      activeCounters: 4,
      contactPhone: "+91 98765 43210",
      lat: 18.5204,
      lng: 73.8567,
      slots: [
        { id: "s1", time: "09:00 AM – 09:30 AM", status: "FULL", crowd: "HIGH", isRecommended: false },
        { id: "s2", time: "10:30 AM – 11:00 AM", status: "AVAILABLE", crowd: "LOW", isRecommended: true },
        { id: "s3", time: "12:00 PM – 12:30 PM", status: "LIMITED", crowd: "MEDIUM", isRecommended: false },
        { id: "s4", time: "02:00 PM – 02:30 PM", status: "AVAILABLE", crowd: "LOW", isRecommended: false }
      ]
    },
    {
      id: "centre-2",
      name: "XYZ Grain Collection Hub",
      code: "XYZ-HUB-09",
      address: "NH-48 Bypass, Talegaon",
      distanceKm: 7.5,
      travelTimeMins: 25,
      status: "BUSY",
      crowdLevel: "HIGH",
      waitingCount: 29,
      estimatedWaitMins: 90,
      fitScore: 78,
      fitReason: "Further away with higher active crowd.",
      acceptedCrops: ["Wheat", "Cotton", "Maize"],
      operatingHours: "07:30 AM – 07:00 PM",
      activeCounters: 2,
      contactPhone: "+91 98765 43211",
      lat: 18.5304,
      lng: 73.8667,
      slots: [
        { id: "s5", time: "09:00 AM – 09:30 AM", status: "FULL", crowd: "HIGH", isRecommended: false },
        { id: "s6", time: "10:30 AM – 11:00 AM", status: "LIMITED", crowd: "MEDIUM", isRecommended: false },
        { id: "s7", time: "12:00 PM – 12:30 PM", status: "FULL", crowd: "HIGH", isRecommended: false },
        { id: "s8", time: "02:00 PM – 02:30 PM", status: "AVAILABLE", crowd: "LOW", isRecommended: true }
      ]
    },
    {
      id: "centre-3",
      name: "PQR Agri Mandi",
      code: "PQR-MANDI-03",
      address: "Market Yard, Chakan",
      distanceKm: 10.1,
      travelTimeMins: 35,
      status: "OPEN",
      crowdLevel: "LOW",
      waitingCount: 6,
      estimatedWaitMins: 20,
      fitScore: 82,
      fitReason: "Short queue but requires longer travel distance.",
      acceptedCrops: ["Rice", "Onion", "Tomato", "Wheat"],
      operatingHours: "08:00 AM – 05:00 PM",
      activeCounters: 3,
      contactPhone: "+91 98765 43212",
      lat: 18.5404,
      lng: 73.8767,
      slots: [
        { id: "s9", time: "09:00 AM – 09:30 AM", status: "AVAILABLE", crowd: "LOW", isRecommended: true },
        { id: "s10", time: "10:30 AM – 11:00 AM", status: "AVAILABLE", crowd: "LOW", isRecommended: false },
        { id: "s11", time: "12:00 PM – 12:30 PM", status: "LIMITED", crowd: "MEDIUM", isRecommended: false },
        { id: "s12", time: "02:00 PM – 02:30 PM", status: "AVAILABLE", crowd: "LOW", isRecommended: false }
      ]
    }
  ],
  currentTokenBeingServed: 19,
  activeToken: {
    tokenNumber: 27,
    farmerName: "Rahul Patil",
    farmerId: "FARMER-9842",
    crop: "Wheat",
    quantityEstKg: 450,
    centreId: "centre-1",
    centreName: "ABC Procurement Centre",
    bookedDate: "2026-09-10",
    bookedSlot: "10:30 AM – 11:00 AM",
    status: "CONFIRMED",
    createdAt: "2026-09-08 09:15 AM"
  },
  procurementJourney: {
    currentStep: 2,
    steps: [
      { id: 1, name: "Token Generated", nameHi: "टोकन जारी", nameMr: "टोकन तयार", completed: true, timestamp: "09:15 AM", note: "Token #27 generated for ABC Procurement Centre" },
      { id: 2, name: "Waiting in Queue", nameHi: "कतार में प्रतीक्षा", nameMr: "रांगेत प्रतीक्षा", completed: true, timestamp: "10:10 AM", note: "8 farmers ahead. Moving normally." },
      { id: 3, name: "Arrived at Centre", nameHi: "केंद्र पर पहुंचे", nameMr: "केंद्रावर आगमन", completed: false, timestamp: "Pending", note: "Report to Counter #02 upon entry" },
      { id: 4, name: "Crop Received & Weighed", nameHi: "फसल प्राप्त एवं वजन", nameMr: "पिक प्राप्त व वजन", completed: false, timestamp: "Pending", note: "Weighing Machine #02" },
      { id: 5, name: "Quality Check", nameHi: "गुणवत्ता जांच", nameMr: "गुणवत्ता तपासणी", completed: false, timestamp: "Pending", note: "Moisture & Purity analysis" },
      { id: 6, name: "Payment Processing", nameHi: "भुगतान प्रक्रिया", nameMr: "पैसे हस्तांतरण", completed: false, timestamp: "Pending", note: "Bank Transfer verification" },
      { id: 7, name: "Payment Completed", nameHi: "भुगतान पूर्ण", nameMr: "पैसे पूर्ण झाले", completed: false, timestamp: "Pending", note: "Digital Receipt Ready" }
    ]
  },
  weighing: {
    status: "WAITING",
    machineNumber: "Weighing Machine #02",
    actualWeightKg: 450,
    grossBagsCount: 9,
    tareWeightKg: 18,
    netWeightKg: 432,
    officerName: "Officer S. Deshmukh",
    timestamp: "10:45 AM"
  },
  quality: {
    status: "PENDING",
    grade: "Grade A Superfine",
    moisturePercentage: 11.5,
    purityPercentage: 98.8,
    foreignMatterPercentage: 1.2,
    ratePerKg: 22.75,
    remarks: "Good grain shine and low moisture content."
  },
  payment: {
    status: "PENDING",
    ratePerKg: 22.75,
    weightKg: 432,
    grossAmount: 9828.00,
    deductions: 120.00,
    deductionReason: "Standard labor & handling charges",
    finalAmount: 9708.00,
    paymentMethod: "Bank Direct Transfer (NEFT/RTGS)",
    transactionId: "DEMO-KS-89210",
    accountMasked: "XXXXXXXX1234",
    bankName: "State Bank of India",
    completedAt: null
  },
  notifications: [
    {
      id: "n1",
      title: "Token Confirmed",
      message: "Your token #27 for Wheat at ABC Procurement Centre is confirmed for 10:30 AM.",
      time: "10 mins ago",
      type: "QUEUE",
      read: false
    },
    {
      id: "n2",
      title: "Weather Alert",
      message: "Clear skies today with 28°C. Ideal time for crop transport.",
      time: "30 mins ago",
      type: "WEATHER",
      read: false
    }
  ],
  history: [
    {
      id: "HIST-2026-08",
      date: "14 August 2026",
      centre: "ABC Procurement Centre",
      crop: "Soybean",
      quantityKg: 650,
      grossAmount: 31200,
      finalAmount: 30850,
      status: "COMPLETED",
      receiptId: "REC-KS-2026-881"
    },
    {
      id: "HIST-2026-06",
      date: "02 June 2026",
      centre: "PQR Agri Mandi",
      crop: "Wheat",
      quantityKg: 800,
      grossAmount: 18200,
      finalAmount: 17950,
      status: "COMPLETED",
      receiptId: "REC-KS-2026-412"
    }
  ]
};

interface AppContextType {
  state: AppState;
  role: UserRole;
  setRole: (role: UserRole) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
  farmerTab: string;
  setFarmerTab: (tab: string) => void;
  officerTab: string;
  setOfficerTab: (tab: string) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  selectedCrop: string;
  setSelectedCrop: (crop: string) => void;
  selectedCentre: ProcurementCentre | null;
  setSelectedCentre: (c: ProcurementCentre | null) => void;
  
  // Actions
  handleAdvanceQueue: () => Promise<void>;
  handleUpdateStep: (stepId: number, note?: string) => Promise<void>;
  handleUpdateWeighing: (kg: number, machine: string, bags: number) => Promise<void>;
  handleBookSlot: (centreId: string, crop: string, slotTime: string) => Promise<void>;
  handleToggleCentre: (centreId: string, status: 'OPEN' | 'BUSY' | 'CLOSED') => Promise<void>;
  handleUpdateWeather: (temp: number, cond: string, rain: number) => Promise<void>;
  handleResetDemo: () => Promise<void>;
  isSOSOpen: boolean;
  setIsSOSOpen: (open: boolean) => void;
  isReceiptModalOpen: boolean;
  setIsReceiptModalOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'FARMER' | 'OFFICER';
  setAuthModalMode: (mode: 'FARMER' | 'OFFICER') => void;
  openAuthModal: (mode: 'FARMER' | 'OFFICER') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appState, setAppState] = useState<AppState>(defaultState);
  const [role, setRole] = useState<UserRole>('FARMER');
  const [language, setLanguage] = useState<Language>('en');
  const [farmerTab, setFarmerTab] = useState<string>('dashboard');
  const [officerTab, setOfficerTab] = useState<string>('queue');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedCrop, setSelectedCrop] = useState<string>('Wheat');
  const [selectedCentre, setSelectedCentre] = useState<ProcurementCentre | null>(defaultState.centres[0]);
  const [isSOSOpen, setIsSOSOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'FARMER' | 'OFFICER'>('FARMER');

  const openAuthModal = (mode: 'FARMER' | 'OFFICER') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const showToast = (msg: string) => {
    // Floating popup disabled - append directly to dedicated Notifications view
    setAppState(prev => ({
      ...prev,
      notifications: [
        {
          id: `n-${Date.now()}`,
          title: 'KisanSetu Update',
          message: msg,
          time: 'Just now',
          type: 'PROCUREMENT',
          read: false
        },
        ...prev.notifications
      ]
    }));
  };

  const syncBackendState = async () => {
    const data = await fetchState();
    if (data) {
      setAppState(data);
    }
  };

  // Poll backend state every 2 seconds for real-time synchronization between portals
  useEffect(() => {
    syncBackendState();
    const interval = setInterval(syncBackendState, 2500);
    return () => clearInterval(interval);
  }, []);

  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  const handleAdvanceQueue = async () => {
    const res = await advanceQueue();
    if (res?.success) {
      showToast(`Queue advanced! Token #${res.currentTokenBeingServed} is now being served.`);
    } else {
      setAppState(prev => {
        const nextServed = prev.currentTokenBeingServed + 1;
        return { ...prev, currentTokenBeingServed: nextServed };
      });
      showToast(`Queue advanced locally! Token #${appState.currentTokenBeingServed + 1} served.`);
    }
    syncBackendState();
  };

  const handleUpdateStep = async (stepId: number, note?: string) => {
    const res = await updateProcurementStep(stepId, note);
    if (res?.success) {
      showToast(`Procurement step updated to Step ${stepId}!`);
    } else {
      setAppState(prev => {
        const updatedSteps = prev.procurementJourney.steps.map(s => ({
          ...s,
          completed: s.id <= stepId ? true : s.completed
        }));
        return {
          ...prev,
          procurementJourney: { currentStep: stepId, steps: updatedSteps }
        };
      });
      showToast(`Step updated locally to ${stepId}`);
    }
    syncBackendState();
  };

  const handleUpdateWeighing = async (kg: number, machine: string, bags: number) => {
    const res = await updateWeighing(kg, machine, bags);
    if (res?.success) {
      showToast(`Weighing logged: ${kg} kg on ${machine}`);
    } else {
      setAppState(prev => ({
        ...prev,
        weighing: { ...prev.weighing, actualWeightKg: kg, netWeightKg: kg - 18, machineNumber: machine, status: 'COMPLETED' },
        payment: { ...prev.payment, weightKg: kg - 18, grossAmount: (kg - 18) * 22.75, finalAmount: (kg - 18) * 22.75 - 120 }
      }));
      showToast(`Weight recorded locally: ${kg} kg`);
    }
    syncBackendState();
  };

  const handleBookSlot = async (centreId: string, crop: string, slotTime: string) => {
    const res = await bookSlot(centreId, crop, slotTime);
    if (res?.success) {
      showToast(`Slot booked successfully! Token #${res.token.tokenNumber} generated.`);
    } else {
      showToast(`Slot booked! Token #28 generated for ${slotTime}`);
    }
    syncBackendState();
  };

  const handleToggleCentre = async (centreId: string, status: 'OPEN' | 'BUSY' | 'CLOSED') => {
    const res = await toggleCentreStatus(centreId, status);
    if (res?.success) {
      showToast(`Centre status changed to ${status}`);
    }
    syncBackendState();
  };

  const handleUpdateWeather = async (temp: number, cond: string, rain: number) => {
    const res = await updateWeatherDemo(temp, cond, rain);
    if (res?.success) {
      showToast(`Weather updated to ${temp}°C, ${cond}`);
    }
    syncBackendState();
  };

  const handleResetDemo = async () => {
    await resetDemoState();
    showToast("Demo environment reset to initial state!");
    syncBackendState();
  };

  return (
    <AppContext.Provider
      value={{
        state: appState,
        role,
        setRole,
        language,
        setLanguage,
        t,
        farmerTab,
        setFarmerTab,
        officerTab,
        setOfficerTab,
        toastMessage,
        showToast,
        selectedCrop,
        setSelectedCrop,
        selectedCentre,
        setSelectedCentre,
        handleAdvanceQueue,
        handleUpdateStep,
        handleUpdateWeighing,
        handleBookSlot,
        handleToggleCentre,
        handleUpdateWeather,
        handleResetDemo,
        isSOSOpen,
        setIsSOSOpen,
        isReceiptModalOpen,
        setIsReceiptModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        openAuthModal
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
