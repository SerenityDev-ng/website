"use client";

import { create } from "zustand";

// Types for repair items
export interface RepairItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  selected: boolean;
}

// Repair service store interface
interface RepairServiceStore {
  // State
  selectedServices: RepairItem[];
  totalAmount: number;
  selectedCategory: string | null;
  
  // Actions
  addService: (service: RepairItem) => void;
  removeService: (serviceId: string) => void;
  toggleService: (service: RepairItem) => void;
  clearServices: () => void;
  setSelectedCategory: (category: string | null) => void;
  calculateTotal: () => void;
  
  // Getters
  isServiceSelected: (serviceId: string) => boolean;
  getSelectedServicesCount: () => number;
}

// Create the repair service store
export const useRepairService = create<RepairServiceStore>((set, get) => ({
  // Initial state
  selectedServices: [],
  totalAmount: 0,
  selectedCategory: null,
  
  // Actions
  addService: (service: RepairItem) => {
    const { selectedServices } = get();
    const exists = selectedServices.find(s => s.id === service.id);
    
    if (!exists) {
      set(state => ({
        selectedServices: [...state.selectedServices, { ...service, selected: true }]
      }));
      get().calculateTotal();
    }
  },
  
  removeService: (serviceId: string) => {
    set(state => ({
      selectedServices: state.selectedServices.filter(service => service.id !== serviceId)
    }));
    get().calculateTotal();
  },
  
  toggleService: (service: RepairItem) => {
    const { selectedServices } = get();
    const exists = selectedServices.find(s => s.id === service.id);
    
    if (exists) {
      get().removeService(service.id);
    } else {
      get().addService(service);
    }
  },
  
  clearServices: () => {
    set({ selectedServices: [], totalAmount: 0 });
  },
  
  setSelectedCategory: (category: string | null) => {
    set({ selectedCategory: category });
  },
  
  calculateTotal: () => {
    const { selectedServices } = get();
    const total = selectedServices.reduce((sum, service) => sum + service.price, 0);
    set({ totalAmount: total });
  },
  
  // Getters
  isServiceSelected: (serviceId: string) => {
    const { selectedServices } = get();
    return selectedServices.some(service => service.id === serviceId);
  },
  
  getSelectedServicesCount: () => {
    const { selectedServices } = get();
    return selectedServices.length;
  },
}));