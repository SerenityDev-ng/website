import type { LaundryService } from "@/hooks/useBookLaundry";
import type { LaundryItem } from "@/hooks/store/laundry";

// Map backend LaundryService to local LaundryItem format
export function mapLaundryServiceToItem(service: LaundryService, index: number): LaundryItem {
  return {
    id: index + 1, // Generate sequential ID
    name: service.wear,
    price: parseInt(service.price, 10) || 0,
    quantity: 0, // Default quantity
  };
}

// Group services by customer type and laundry type
export function groupLaundryServices(services: LaundryService[]) {
  const grouped = {
    men: {
      washedIroned: [] as LaundryItem[],
      ironedOnly: [] as LaundryItem[],
      washedOnly: [] as LaundryItem[],
    },
    women: {
      washedIroned: [] as LaundryItem[],
      ironedOnly: [] as LaundryItem[],
      washedOnly: [] as LaundryItem[],
    },
    children: {
      washedIroned: [] as LaundryItem[],
      ironedOnly: [] as LaundryItem[],
      washedOnly: [] as LaundryItem[],
    },
    extra: {
      washedIroned: [] as LaundryItem[],
      ironedOnly: [] as LaundryItem[],
      washedOnly: [] as LaundryItem[],
    },
  };

  services.forEach((service, index) => {
    const item = mapLaundryServiceToItem(service, index);
    const customerType = service.customer_type.toLowerCase();
    const laundryType = service.laundry_type;

    // Determine customer category
    let customerCategory: 'men' | 'women' | 'children' | 'extra';
    if (customerType.includes('men') || customerType.includes('male')) {
      customerCategory = 'men';
    } else if (customerType.includes('women') || customerType.includes('female')) {
      customerCategory = 'women';
    } else if (customerType.includes('children') || customerType.includes('child') || customerType.includes('kid')) {
      customerCategory = 'children';
    } else {
      customerCategory = 'extra';
    }

    // Determine service type and add to appropriate array
    switch (laundryType) {
      case 'WASHED_IRONED':
        grouped[customerCategory].washedIroned.push(item);
        break;
      case 'IRONED':
        grouped[customerCategory].ironedOnly.push(item);
        break;
      case 'WASHED_FOLDED':
        grouped[customerCategory].washedOnly.push(item);
        break;
      default:
        // Default to washedIroned if type is unclear
        grouped[customerCategory].washedIroned.push(item);
        break;
    }
  });

  return grouped;
}

// Get services for a specific service type across all customer categories
export function getServicesForType(services: LaundryService[], serviceType: 'WASHED_IRONED' | 'IRONED' | 'WASHED_FOLDED') {
  const grouped = groupLaundryServices(services);
  
  switch (serviceType) {
    case 'WASHED_IRONED':
      return {
        men: grouped.men.washedIroned,
        women: grouped.women.washedIroned,
        children: grouped.children.washedIroned,
        extra: grouped.extra.washedIroned,
      };
    case 'IRONED':
      return {
        men: grouped.men.ironedOnly,
        women: grouped.women.ironedOnly,
        children: grouped.children.ironedOnly,
        extra: grouped.extra.ironedOnly,
      };
    case 'WASHED_FOLDED':
      return {
        men: grouped.men.washedOnly,
        women: grouped.women.washedOnly,
        children: grouped.children.washedOnly,
        extra: grouped.extra.washedOnly,
      };
    default:
      return {
        men: [],
        women: [],
        children: [],
        extra: [],
      };
  }
}