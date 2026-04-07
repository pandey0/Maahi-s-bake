/**
 * SERVICE: Live Data Fetcher
 * Strictly fetches data from Google Sheets CSV URLs defined in .env
 */

export interface Specialty {
  name: string;
  price: string;
  img: string;
  desc: string;
}

export interface MenuItem {
  category: string;
  name: string;
  price: string;
  description: string;
}

export interface Review {
  name: string;
  text: string;
  rating: number;
}

export interface BakeryData {
  location: {
    address: string;
    phone: string;
    whatsapp: string;
    maps_link: string;
  };
  specialties: Specialty[];
  menu: MenuItem[];
  reviews: Review[];
  gallery: string[];
}

/**
 * Parses a basic CSV string into an array of objects
 */
const parseCSV = (csvText: string) => {
  const lines = csvText.split('\n').filter(line => line.trim() !== '');
  if (lines.length === 0) return [];
  
  const headers = lines[0].split(',').map(h => h.trim());
  
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    return headers.reduce((obj, header, index) => {
      obj[header] = values[index] || "";
      return obj;
    }, {} as any);
  });
};

export const getBakeryData = async (): Promise<BakeryData> => {
  const specialtiesUrl = import.meta.env.VITE_SHEET_SPECIALTIES_URL;
  const menuUrl = import.meta.env.VITE_SHEET_MENU_URL;
  const reviewsUrl = import.meta.env.VITE_SHEET_REVIEWS_URL;
  const galleryUrl = import.meta.env.VITE_SHEET_GALLERY_URL;
  const locationUrl = import.meta.env.VITE_SHEET_LOCATION_URL;

  // Validation: Ensure all URLs are present in .env
  if (!specialtiesUrl || specialtiesUrl.includes("YOUR_ID")) {
    throw new Error("Google Sheet URLs are not configured in the .env file.");
  }

  try {
    // Fetch all sheets in parallel from Google
    const [specRes, menuRes, revRes, galRes, locRes] = await Promise.all([
      fetch(specialtiesUrl).then(r => r.text()),
      fetch(menuUrl).then(r => r.text()),
      fetch(reviewsUrl).then(r => r.text()),
      fetch(galleryUrl).then(r => r.text()),
      fetch(locationUrl).then(r => r.text())
    ]);

    const locationData = parseCSV(locRes)[0];

    return {
      specialties: parseCSV(specRes),
      menu: parseCSV(menuRes),
      reviews: parseCSV(revRes).map(r => ({ ...r, rating: Number(r.rating) })),
      gallery: parseCSV(galRes).map(g => g.img_url),
      location: {
        address: locationData.address,
        phone: locationData.phone,
        whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || locationData.whatsapp,
        maps_link: locationData.maps_link
      }
    };
  } catch (error) {
    console.error("Critical Data Fetch Error:", error);
    throw new Error("Could not connect to Google Sheets. Please check your internet or sheet permissions.");
  }
};

/**
 * Generates a pre-filled WhatsApp message link
 */
export const getWhatsAppLink = (phone: string, itemName?: string, price?: string): string => {
  const cleanPhone = phone.replace(/\D/g, '');
  let message = "Hi Maahi's Bake! I'd like to inquire about your cakes.";
  
  if (itemName) {
    message = `Hi Maahi's Bake! 🎂 I want to order the *${itemName}* (${price}). Please let me know the availability and delivery options for Abbigere.`;
  }
  
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};
