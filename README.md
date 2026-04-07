# 🎂 Maahi's Bake Website

A modern, vibrant, and fully automated website for **Maahi's Bake** in Abbigere, Bangalore. This site is designed to be managed entirely through Google Sheets, allowing the owner to update the menu, prices, and gallery without touching any code.

## 🚀 Key Features

- **Google Sheets CMS:** All content (Specialties, Full Menu, Reviews, Gallery) is fetched live from Google Sheets.
- **Smart WhatsApp Ordering:** Every item includes an "Order" button that pre-fills a professional WhatsApp message.
- **Automatic Enquiry Form:** Customer enquiries are sent directly to a Google Sheet via Google Apps Script.
- **Mobile-First Design:** Optimized for a seamless experience on smartphones and tablets.
- **Vibrant Aesthetics:** Custom "Dopamine" color palette (Sweet Pink & Butterscotch Gold).

## 🛠️ Technical Stack

- **Frontend:** React + TypeScript + Vite
- **Styling:** Vanilla CSS (Custom properties for easy theming)
- **Icons:** Lucide React
- **Data Fetching:** Native Fetch API with CSV Parsing

## ⚙️ Setup & Configuration

### 1. Environment Variables
Create a `.env` file in the root directory and add your unique Google Sheet CSV URLs:

```env
VITE_WHATSAPP_NUMBER=919876543210
VITE_SHEET_SPECIALTIES_URL=your_csv_url_here
VITE_SHEET_MENU_URL=your_csv_url_here
VITE_SHEET_REVIEWS_URL=your_csv_url_here
VITE_SHEET_GALLERY_URL=your_csv_url_here
VITE_SHEET_LOCATION_URL=your_csv_url_here
VITE_ENQUIRY_SCRIPT_URL=your_apps_script_url_here
```

### 2. Google Sheets Structure
Follow the detailed guide in [GOOGLE_SHEET_FORMAT.md](./GOOGLE_SHEET_FORMAT.md) to set up your sheets correctly.

### 3. Development
```bash
npm install
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

## 📝 Maintenance
To update the website content:
1. Open your Google Sheet.
2. Edit the rows/prices/images.
3. The changes will reflect on the live website instantly!

---
Designed with ❤️ for Maahi's Bake.
