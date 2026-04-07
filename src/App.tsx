import { useState, useEffect } from 'react';
import Header from './components/Header'
import Hero from './components/Hero'
import Specialties from './components/Specialties'
import Menu from './components/Menu'
import Gallery from './components/Gallery'
import About from './components/About'
import Reviews from './components/Reviews'
import EnquiryForm from './components/EnquiryForm'
import Footer from './components/Footer'
import { getBakeryData, BakeryData } from './services/dataService'
import { AlertCircle, RefreshCcw } from 'lucide-react';
import './App.css'

function App() {
  const [data, setData] = useState<BakeryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedData = await getBakeryData();
      setData(fetchedData);
    } catch (err: any) {
      setError(err.message || "Failed to load bakery data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <p>Baking your fresh menu...</p>
        <span>Connecting to Maahi's Live Kitchen</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-screen">
        <AlertCircle size={48} color="var(--primary)" />
        <h2>Setup Required</h2>
        <p>{error}</p>
        <div className="error-actions">
          <button onClick={fetchData} className="btn btn-primary">
            <RefreshCcw size={18} /> Retry Connection
          </button>
          <a href="https://github.com/your-repo/blob/main/GOOGLE_SHEET_FORMAT.md" className="btn btn-outline" target="_blank">
            Read Setup Guide
          </a>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="app">
      <Header whatsapp={data.location.whatsapp} />
      <main>
        <Hero whatsapp={data.location.whatsapp} />
        <Specialties items={data.specialties} whatsapp={data.location.whatsapp} />
        <Menu menu={data.menu} whatsapp={data.location.whatsapp} />
        <Gallery photos={data.gallery} />
        <About />
        <Reviews reviews={data.reviews} />
        <EnquiryForm />
      </main>
      <Footer location={data.location} />
    </div>
  )
}

export default App
