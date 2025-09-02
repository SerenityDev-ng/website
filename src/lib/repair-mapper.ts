import type { RepairService } from "@/hooks/useGetRepairServices";
import type { RepairItem } from "@/hooks/store/repair";

// Map backend RepairService to local RepairItem format
export function mapRepairServiceToItem(service: RepairService): RepairItem {
  return {
    id: service._id,
    name: service.service_type,
    description: service.description,
    price: parseInt(service.price, 10) || 0,
    category: service.category,
    selected: false, // Default to not selected
  };
}

// Group repair services by category
export function groupRepairServicesByCategory(services: RepairService[]) {
  const grouped: { [category: string]: RepairItem[] } = {};
  
  services.forEach((service) => {
    const item = mapRepairServiceToItem(service);
    const category = service.category.toLowerCase();
    
    if (!grouped[category]) {
      grouped[category] = [];
    }
    
    grouped[category].push(item);
  });
  
  return grouped;
}

// Get services for a specific category
export function getServicesForCategory(services: RepairService[], category: string): RepairItem[] {
  return services
    .filter(service => service.category.toLowerCase() === category.toLowerCase())
    .map(service => mapRepairServiceToItem(service));
}

// Get unique categories from repair services
export function getUniqueCategories(services: RepairService[]): string[] {
  const categories = services.map(service => service.category);
  return Array.from(new Set(categories));
}

// Filter services by search term
export function filterRepairServices(services: RepairService[], searchTerm: string): RepairService[] {
  if (!searchTerm.trim()) return services;
  
  const term = searchTerm.toLowerCase();
  return services.filter(service => 
    service.service_type.toLowerCase().includes(term) ||
    service.description.toLowerCase().includes(term) ||
    service.category.toLowerCase().includes(term)
  );
}