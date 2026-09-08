import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initial Mock Data
let state = {
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
    status: "CONFIRMED", // GENERATED, AT_CENTRE, CROP_RECEIVED, WEIGHED, QUALITY_CHECKED, PAYMENT_PROCESSING, PAYMENT_COMPLETED
    createdAt: "2026-09-08 09:15 AM"
  },

  procurementJourney: {
    currentStep: 2, // 1: Token Generated, 2: Waiting, 3: At Centre, 4: Crop Received, 5: Quality Check, 6: Payment Processing, 7: Payment Completed
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
    status: "WAITING", // WAITING, IN_PROGRESS, COMPLETED
    machineNumber: "Weighing Machine #02",
    actualWeightKg: 450,
    grossBagsCount: 9,
    tareWeightKg: 18,
    netWeightKg: 432,
    officerName: "Officer S. Deshmukh",
    timestamp: "10:45 AM"
  },

  quality: {
    status: "PENDING", // PENDING, PASSED, REJECTED
    grade: "Grade A Superfine",
    moisturePercentage: 11.5,
    purityPercentage: 98.8,
    foreignMatterPercentage: 1.2,
    ratePerKg: 22.75,
    remarks: "Good grain shine and low moisture content."
  },

  payment: {
    status: "PENDING", // PENDING, VERIFYING, PROCESSING, COMPLETED
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

// API Endpoints
app.get('/api/state', (req, res) => {
  res.json(state);
});

// Demo / Officer: Advance queue token
app.post('/api/queue/advance', (req, res) => {
  state.currentTokenBeingServed += 1;
  
  const farmersAhead = Math.max(0, state.activeToken.tokenNumber - state.currentTokenBeingServed);
  
  // Trigger automatic smart notification when token is close
  if (farmersAhead === 3) {
    state.notifications.unshift({
      id: `n-${Date.now()}`,
      title: "Your Turn is Near! 🚨",
      message: `Token #${state.currentTokenBeingServed} is being served. Only 3 farmers ahead of you. Please head to ABC Procurement Centre.`,
      time: "Just now",
      type: "QUEUE",
      read: false
    });
  } else if (farmersAhead === 0 && state.procurementJourney.currentStep < 3) {
    state.procurementJourney.currentStep = 3; // At Centre
    state.procurementJourney.steps[2].completed = true;
    state.procurementJourney.steps[2].timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    state.notifications.unshift({
      id: `n-${Date.now()}`,
      title: "It's Your Turn! 🌾",
      message: `Token #27 is now being called at Counter #02.`,
      time: "Just now",
      type: "QUEUE",
      read: false
    });
  }

  res.json({ success: true, currentTokenBeingServed: state.currentTokenBeingServed, farmersAhead });
});

// Officer: Progress procurement step
app.post('/api/procurement/update-step', (req, res) => {
  const { stepId, note } = req.body;
  if (stepId >= 1 && stepId <= 7) {
    state.procurementJourney.currentStep = stepId;
    
    // Mark steps up to stepId as completed
    state.procurementJourney.steps.forEach(step => {
      if (step.id <= stepId) {
        step.completed = true;
        if (step.timestamp === "Pending") {
          step.timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
      }
    });

    if (note) {
      state.procurementJourney.steps[stepId - 1].note = note;
    }

    // Contextual updates based on step
    if (stepId === 4) { // Weighed
      state.weighing.status = "COMPLETED";
      state.notifications.unshift({
        id: `n-${Date.now()}`,
        title: "Crop Weighed Successfully",
        message: `Your crop weight is logged at ${state.weighing.netWeightKg} kg at ${state.weighing.machineNumber}.`,
        time: "Just now",
        type: "PROCUREMENT",
        read: false
      });
    } else if (stepId === 5) { // Quality Checked
      state.quality.status = "PASSED";
      state.notifications.unshift({
        id: `n-${Date.now()}`,
        title: "Quality Inspection Passed",
        message: `Grade: ${state.quality.grade}. Rate: ₹${state.quality.ratePerKg}/kg.`,
        time: "Just now",
        type: "PROCUREMENT",
        read: false
      });
    } else if (stepId === 6) { // Payment Processing
      state.payment.status = "PROCESSING";
    } else if (stepId === 7) { // Payment Completed
      state.payment.status = "COMPLETED";
      state.payment.completedAt = new Date().toLocaleString();
      state.notifications.unshift({
        id: `n-${Date.now()}`,
        title: "Payment Credited! 💳",
        message: `Final amount ₹${state.payment.finalAmount.toLocaleString('en-IN')} transferred to Bank account ${state.payment.accountMasked}.`,
        time: "Just now",
        type: "PAYMENT",
        read: false
      });
    }
  }

  res.json({ success: true, journey: state.procurementJourney });
});

// Officer / Demo: Update Weighing
app.post('/api/weighing/update', (req, res) => {
  const { actualWeightKg, machineNumber, grossBagsCount } = req.body;
  if (actualWeightKg) state.weighing.actualWeightKg = Number(actualWeightKg);
  if (machineNumber) state.weighing.machineNumber = machineNumber;
  if (grossBagsCount) state.weighing.grossBagsCount = Number(grossBagsCount);

  state.weighing.netWeightKg = Math.max(0, state.weighing.actualWeightKg - state.weighing.tareWeightKg);
  state.payment.weightKg = state.weighing.netWeightKg;
  state.payment.grossAmount = state.payment.weightKg * state.payment.ratePerKg;
  state.payment.finalAmount = state.payment.grossAmount - state.payment.deductions;
  state.weighing.status = "COMPLETED";

  res.json({ success: true, weighing: state.weighing, payment: state.payment });
});

// Book new slot
app.post('/api/token/book', (req, res) => {
  const { centreId, crop, slotTime } = req.body;
  const centre = state.centres.find(c => c.id === centreId) || state.centres[0];
  
  state.activeToken = {
    tokenNumber: Math.floor(Math.random() * 20) + 30,
    farmerName: state.farmer.name,
    farmerId: state.farmer.id,
    crop: crop || "Wheat",
    quantityEstKg: 450,
    centreId: centre.id,
    centreName: centre.name,
    bookedDate: "2026-09-10",
    bookedSlot: slotTime || "10:30 AM – 11:00 AM",
    status: "CONFIRMED",
    createdAt: new Date().toLocaleString()
  };

  // Reset steps
  state.procurementJourney.currentStep = 1;
  state.procurementJourney.steps.forEach((s, idx) => {
    s.completed = idx === 0;
    s.timestamp = idx === 0 ? "Just now" : "Pending";
  });

  res.json({ success: true, token: state.activeToken });
});

// Toggle Centre Open/Closed
app.post('/api/centre/toggle-status', (req, res) => {
  const { centreId, status } = req.body;
  const centre = state.centres.find(c => c.id === centreId);
  if (centre) {
    centre.status = status;
  }
  res.json({ success: true, centres: state.centres });
});

// Update Weather Demo
app.post('/api/weather/update', (req, res) => {
  const { temp, condition, rainChance } = req.body;
  if (temp) state.weather.temp = temp;
  if (condition) state.weather.condition = condition;
  if (rainChance) state.weather.rainChance = rainChance;

  res.json({ success: true, weather: state.weather });
});

// Reset full demo state
app.post('/api/reset', (req, res) => {
  state.currentTokenBeingServed = 19;
  state.procurementJourney.currentStep = 2;
  state.procurementJourney.steps[0].completed = true;
  state.procurementJourney.steps[1].completed = true;
  state.procurementJourney.steps[2].completed = false;
  state.procurementJourney.steps[3].completed = false;
  state.procurementJourney.steps[4].completed = false;
  state.procurementJourney.steps[5].completed = false;
  state.procurementJourney.steps[6].completed = false;
  state.weighing.status = "WAITING";
  state.quality.status = "PENDING";
  state.payment.status = "PENDING";
  state.payment.completedAt = null;
  res.json({ success: true, state });
});

app.listen(PORT, () => {
  console.log(`🌾 KisanSetu Express Backend running on port ${PORT}`);
});
