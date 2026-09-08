import { AppState } from '../types';

const API_BASE = '/api';

export const fetchState = async (): Promise<AppState | null> => {
  try {
    const res = await fetch(`${API_BASE}/state`);
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (err) {
    console.warn("Backend API not reachable, falling back to local sync", err);
    return null;
  }
};

export const advanceQueue = async () => {
  try {
    const res = await fetch(`${API_BASE}/queue/advance`, { method: 'POST' });
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

export const updateProcurementStep = async (stepId: number, note?: string) => {
  try {
    const res = await fetch(`${API_BASE}/procurement/update-step`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stepId, note })
    });
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

export const updateWeighing = async (actualWeightKg: number, machineNumber: string, grossBagsCount: number) => {
  try {
    const res = await fetch(`${API_BASE}/weighing/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ actualWeightKg, machineNumber, grossBagsCount })
    });
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

export const bookSlot = async (centreId: string, crop: string, slotTime: string) => {
  try {
    const res = await fetch(`${API_BASE}/token/book`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ centreId, crop, slotTime })
    });
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

export const toggleCentreStatus = async (centreId: string, status: 'OPEN' | 'BUSY' | 'CLOSED') => {
  try {
    const res = await fetch(`${API_BASE}/centre/toggle-status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ centreId, status })
    });
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

export const updateWeatherDemo = async (temp: number, condition: string, rainChance: number) => {
  try {
    const res = await fetch(`${API_BASE}/weather/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ temp, condition, rainChance })
    });
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

export const resetDemoState = async () => {
  try {
    const res = await fetch(`${API_BASE}/reset`, { method: 'POST' });
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};
