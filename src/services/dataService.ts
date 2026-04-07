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
  price: string; // This will act as the base price (e.g. for 0.5kg or 1 unit)
  description: string;
  img?: string;
  isPerKg?: boolean; // New field to identify cakes
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
 * Robust CSV Parser that handles commas inside quotes
 */
const parseCSV = (csvText: string) => {
  const lines = csvText.split(/\r?\n/).filter(line => line.trim() !== '');
  if (lines.length === 0) return [];
  
  // Split headers and trim
  const headers = splitCSVLine(lines[0]).map(h => h.trim());
  
  return lines.slice(1).map(line => {
    const values = splitCSVLine(line).map(v => v.trim());
    return headers.reduce((obj, header, index) => {
      // Clean up quotes from Google Sheets
      let val = values[index] || "";
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.substring(1, val.length - 1).replace(/""/g, '"');
      }
      obj[header] = val;
      return obj;
    }, {} as any);
  });
};

/**
 * Helper to split CSV line while respecting quotes
 */
function splitCSVLine(line: string) {
  const result = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
      cur += char;
    } else if (char === ',' && !inQuotes) {
      result.push(cur);
      cur = "";
    } else {
      cur += char;
    }
  }
  result.push(cur);
  return result;
}

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
        address: locationData.address || "Address not set",
        phone: locationData.phone || "Phone not set",
        whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || locationData.whatsapp || "",
        maps_link: locationData.maps_link || "#"
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
