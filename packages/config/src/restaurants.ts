export interface RestaurantMetadata {
  id: string;
  name: string;
  legalName: string;
  tagline: string;
  shortDescription: string;
  url: string;
  cuisine: string[];
  themeColor: string;
  whatsappNumber: string;
  phoneNumber: string;
  location: {
    address: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  features: {
    hasPhysicalMenu: boolean;
    hasOnlineOrdering: boolean;
    hasTableReservation: boolean;
    hasBanquetBooking: boolean;
    hasAdminDashboard: boolean;
  };
}

export const RESTAURANTS: Record<string, RestaurantMetadata> = {
  sampradaya: {
    id: "sampradaya",
    name: "Sampradaya",
    legalName: "Sampradaya Multicuisine Family Restaurant",
    tagline: "Authentic Multicuisine & Traditional Flavors",
    shortDescription: "Heritage Indian & Multicuisine Family Dining",
    url: "https://sampradaya-multicuisine-family-rest.vercel.app/",
    cuisine: ["South Indian", "North Indian", "Biryanis", "Tandoori", "Chinese"],
    themeColor: "#7F1D1D",
    whatsappNumber: "916303563242",
    phoneNumber: "+91 63035 63242",
    location: {
      address: "4th Floor, Kaloji Marg, Balasamudram",
      city: "Hanamkonda",
      state: "Telangana",
      pincode: "506001",
      country: "India",
    },
    features: {
      hasPhysicalMenu: true,
      hasOnlineOrdering: true,
      hasTableReservation: true,
      hasBanquetBooking: false,
      hasAdminDashboard: true,
    },
  },
  mandiwala: {
    id: "mandiwala",
    name: "Mandiwala",
    legalName: "Mandiwala Arabian Restaurant",
    tagline: "Authentic Arabian Flavors & Feast Experiences",
    shortDescription: "Authentic Arabian Mandi & Private Majlis Dining",
    url: "https://mandiwala-arabian-restaurant.vercel.app/",
    cuisine: ["Arabian Mandi", "Kabab", "Desserts", "Signature Platters"],
    themeColor: "#D4AF37",
    whatsappNumber: "918500371100",
    phoneNumber: "+91 85003 71100",
    location: {
      address: "Opposite Asian Sridevi Mall",
      city: "Hanamkonda",
      state: "Telangana",
      pincode: "506001",
      country: "India",
    },
    features: {
      hasPhysicalMenu: true,
      hasOnlineOrdering: true,
      hasTableReservation: true,
      hasBanquetBooking: false,
      hasAdminDashboard: true,
    },
  },
  aroma: {
    id: "aroma",
    name: "Aroma",
    legalName: "Aroma Fine Dine Restaurant & Banquet Hall",
    tagline: "Luxury Fine Dining & Grand Celebrations",
    shortDescription: "Fine Dine Atmosphere & Grand Celebrations Hall",
    url: "https://aroma-fine-dine-restaurant-banquet.vercel.app/",
    cuisine: ["Fine Dine Multicuisine", "Tandoori Specialties", "Continental", "Banquets"],
    themeColor: "#DFB15B",
    whatsappNumber: "917331122436",
    phoneNumber: "+91 73311 22436",
    location: {
      address: "Main Road, Naimnagar",
      city: "Hanamkonda",
      state: "Telangana",
      pincode: "506009",
      country: "India",
    },
    features: {
      hasPhysicalMenu: true,
      hasOnlineOrdering: true,
      hasTableReservation: true,
      hasBanquetBooking: true,
      hasAdminDashboard: true,
    },
  },
  majesty: {
    id: "majesty",
    name: "Majesty",
    legalName: "Majesty Mandi House",
    tagline: "Royalty in Every Grain of Mandi",
    shortDescription: "Premium Arabian Mandi & Signature Feast Platters",
    url: "https://majesty-mandi-house-eight.vercel.app/",
    cuisine: ["Authentic Mutton Mandi", "Chicken Mandi", "Fish Mandi", "Arabian Platters"],
    themeColor: "#DFB15B",
    whatsappNumber: "919502316909",
    phoneNumber: "+91 95023 16909",
    location: {
      address: "Near Kakatiya University Cross Roads",
      city: "Hanamkonda",
      state: "Telangana",
      pincode: "506009",
      country: "India",
    },
    features: {
      hasPhysicalMenu: true,
      hasOnlineOrdering: true,
      hasTableReservation: true,
      hasBanquetBooking: false,
      hasAdminDashboard: true,
    },
  },
};
