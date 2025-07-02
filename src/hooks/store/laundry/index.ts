import { create } from "zustand";

export type LaundryItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

interface LaundryService {
  // Services arrays
  menServices: LaundryItem[];
  womenServices: LaundryItem[];
  childrenServices: LaundryItem[];
  extraServices: LaundryItem[];
  total: number;
  
  // Actions
  updateMenService: (id: number, quantity: number) => void;
  updateWomenService: (id: number, quantity: number) => void;
  updateChildrenService: (id: number, quantity: number) => void;
  updateExtraService: (id: number, quantity: number) => void;
  setMenServices: (services: LaundryItem[]) => void;
  setWomenServices: (services: LaundryItem[]) => void;
  setChildrenServices: (services: LaundryItem[]) => void;
  setExtraServices: (services: LaundryItem[]) => void;
  calculateTotal: () => void;
}

export const useLaundryService = create<LaundryService>((set, get) => ({
  menServices: [],
  womenServices: [],
  childrenServices: [],
  extraServices: [],
  total: 0,
  
  updateMenService: (id: number, quantity: number) => {
    set((state) => ({
      menServices: state.menServices.map((service) => 
        service.id === id ? { ...service, quantity } : service
      )
    }));
    get().calculateTotal();
  },
  
  updateWomenService: (id: number, quantity: number) => {
    set((state) => ({
      womenServices: state.womenServices.map((service) => 
        service.id === id ? { ...service, quantity } : service
      )
    }));
    get().calculateTotal();
  },
  
  updateChildrenService: (id: number, quantity: number) => {
    set((state) => ({
      childrenServices: state.childrenServices.map((service) => 
        service.id === id ? { ...service, quantity } : service
      )
    }));
    get().calculateTotal();
  },
  
  updateExtraService: (id: number, quantity: number) => {
    set((state) => ({
      extraServices: state.extraServices.map((service) => 
        service.id === id ? { ...service, quantity } : service
      )
    }));
    get().calculateTotal();
  },
  
  setMenServices: (services: LaundryItem[]) => {
    set({ menServices: services });
    get().calculateTotal();
  },
  
  setWomenServices: (services: LaundryItem[]) => {
    set({ womenServices: services });
    get().calculateTotal();
  },
  
  setChildrenServices: (services: LaundryItem[]) => {
    set({ childrenServices: services });
    get().calculateTotal();
  },
  
  setExtraServices: (services: LaundryItem[]) => {
    set({ extraServices: services });
    get().calculateTotal();
  },
  
  calculateTotal: () => {
    const { menServices, womenServices, childrenServices, extraServices } = get();
    
    const menTotal = menServices.reduce(
      (acc, service) => acc + service.price * service.quantity, 0
    );
    
    const womenTotal = womenServices.reduce(
      (acc, service) => acc + service.price * service.quantity, 0
    );
    
    const childrenTotal = childrenServices.reduce(
      (acc, service) => acc + service.price * service.quantity, 0
    );
    
    const extraTotal = extraServices.reduce(
      (acc, service) => acc + service.price * service.quantity, 0
    );
    
    set({ total: menTotal + womenTotal + childrenTotal + extraTotal });
  }
}));
