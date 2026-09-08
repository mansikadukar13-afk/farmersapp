export type Language = 'en' | 'hi' | 'mr';

export type UserRole = 'LANDING' | 'FARMER' | 'OFFICER';

export interface FarmerProfile {
  id: string;
  name: string;
  village: string;
  phone: string;
  aadhaar: string;
  bankAccount: string;
  bankName: string;
  ifsc: string;
  upiId: string;
  preferredLanguage: Language;
  cropPreferences: string[];
}

export interface SlotOption {
  id: string;
  time: string;
  status: 'AVAILABLE' | 'LIMITED' | 'FULL';
  crowd: 'LOW' | 'MEDIUM' | 'HIGH';
  isRecommended: boolean;
}

export interface ProcurementCentre {
  id: string;
  name: string;
  code: string;
  address: string;
  distanceKm: number;
  travelTimeMins: number;
  status: 'OPEN' | 'BUSY' | 'CLOSED';
  crowdLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  waitingCount: number;
  estimatedWaitMins: number;
  fitScore: number;
  fitReason: string;
  acceptedCrops: string[];
  operatingHours: string;
  activeCounters: number;
  contactPhone: string;
  lat: number;
  lng: number;
  slots: SlotOption[];
}

export interface Token {
  tokenNumber: number;
  farmerName: string;
  farmerId: string;
  crop: string;
  quantityEstKg: number;
  centreId: string;
  centreName: string;
  bookedDate: string;
  bookedSlot: string;
  status: 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  createdAt: string;
}

export interface ProcurementStep {
  id: number;
  name: string;
  nameHi: string;
  nameMr: string;
  completed: boolean;
  timestamp: string;
  note: string;
}

export interface ProcurementJourney {
  currentStep: number;
  steps: ProcurementStep[];
}

export interface WeighingInfo {
  status: 'WAITING' | 'IN_PROGRESS' | 'COMPLETED';
  machineNumber: string;
  actualWeightKg: number;
  grossBagsCount: number;
  tareWeightKg: number;
  netWeightKg: number;
  officerName: string;
  timestamp: string;
}

export interface QualityInfo {
  status: 'PENDING' | 'PASSED' | 'REJECTED';
  grade: string;
  moisturePercentage: number;
  purityPercentage: number;
  foreignMatterPercentage: number;
  ratePerKg: number;
  remarks: string;
}

export interface PaymentInfo {
  status: 'PENDING' | 'VERIFYING' | 'PROCESSING' | 'COMPLETED';
  ratePerKg: number;
  weightKg: number;
  grossAmount: number;
  deductions: number;
  deductionReason: string;
  finalAmount: number;
  paymentMethod: string;
  transactionId: string;
  accountMasked: string;
  bankName: string;
  completedAt: string | null;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'QUEUE' | 'SLOT' | 'PROCUREMENT' | 'PAYMENT' | 'WEATHER' | 'CENTRE';
  read: boolean;
}

export interface HistoryItem {
  id: string;
  date: string;
  centre: string;
  crop: string;
  quantityKg: number;
  grossAmount: number;
  finalAmount: number;
  status: string;
  receiptId: string;
}

export interface WeatherData {
  temp: number;
  condition: string;
  rainChance: number;
  humidity: number;
  windSpeed: number;
  advice: string;
}

export interface AppState {
  farmer: FarmerProfile;
  weather: WeatherData;
  centres: ProcurementCentre[];
  currentTokenBeingServed: number;
  activeToken: Token;
  procurementJourney: ProcurementJourney;
  weighing: WeighingInfo;
  quality: QualityInfo;
  payment: PaymentInfo;
  notifications: NotificationItem[];
  history: HistoryItem[];
}
