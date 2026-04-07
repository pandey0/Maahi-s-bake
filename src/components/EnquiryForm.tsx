import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

const EnquiryForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const scriptUrl = import.meta.env.VITE_ENQUIRY_SCRIPT_URL;

    if (!scriptUrl || scriptUrl.includes("YOUR_URL")) {
      // Simulate success if URL not set for demo
      setTimeout(() => setStatus('success'), 1500);
      return;
    }

    try {
      // We use URLSearchParams to send a 'simple request' which 
      // Google Apps Script handles better without CORS issues.
      const params = new URLSearchParams();
      params.append('name', formData.name);
      params.append('phone', formData.phone);
      params.append('date', formData.date);
      params.append('message', formData.message);

      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString()
      });
      
      setStatus('success');
      setFormData({ name: '', phone: '', date: '', message: '' });
    } catch (error) {
      console.error("Submission error:", error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="enquiry-success">
        <CheckCircle size={60} color="var(--primary)" />
        <h3>Enquiry Sent!</h3>
        <p>Maahi's Bake will get back to you shortly.</p>
        <button onClick={() => setStatus('idle')} className="btn btn-outline">Send Another</button>
      </div>
    );
  }

  return (
    <section id="enquiry" className="enquiry">
      <div className="container">
        <div className="enquiry-card">
          <div className="enquiry-info">
            <h2>Custom <span>Enquiry</span></h2>
            <p>Planning a special event? Tell us your requirements and we'll help you design the perfect cake.</p>
            <ul className="enquiry-benefits">
              <li>✓ Personalized Designs</li>
              <li>✓ Flavor Consultations</li>
              <li>✓ Safe Home Delivery in Abbigere</li>
            </ul>
          </div>
          
          <form className="enquiry-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Your Name</label>
              <input 
                type="text" 
                required 
                placeholder="Name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Phone Number</label>
                <input 
                  type="tel" 
                  required 
                  placeholder="Contact Number" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Event Date</label>
                <input 
                  type="date" 
                  required 
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Tell us more about the cake</label>
              <textarea 
                rows={4} 
                placeholder="Theme, flavors, weight (kg)..." 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="btn btn-primary submit-btn" 
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? 'Sending...' : 'Send Enquiry'} <Send size={18} />
            </button>
            {status === 'error' && <p className="error-msg">Something went wrong. Please try again.</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default EnquiryForm;
