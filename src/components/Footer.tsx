import React from 'react';
import { Phone, MapPin, Camera, Share2, Mail } from 'lucide-react';

interface Props {
  location: {
    address: string;
    phone: string;
    maps_link: string;
  };
}

const Footer: React.FC<Props> = ({ location }) => {
  return (
    <footer id="contact" className="footer">
      <div className="container footer-grid">
        <div className="footer-info">
          <a href="#" className="logo">Maahi's <span>Bake</span></a>
          <p>
            The finest bakery in Abbigere, Bangalore. We specialize in making your 
            special moments even sweeter with our fresh, artisanal cakes.
          </p>
          <div className="social-links">
            <a href="#"><Camera size={20} /></a>
            <a href="#"><Share2 size={20} /></a>
            <a href="#"><Mail size={20} /></a>
          </div>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#specialties">Specialties</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#about">About Us</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Visit Us</h3>
          <ul className="contact-list">
            <li>
              <a href={location.maps_link} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', gap: '15px' }}>
                <MapPin size={24} color="var(--primary)" />
                <span>{location.address}</span>
              </a>
            </li>
            <li>
              <a href={`tel:${location.phone}`} style={{ display: 'flex', gap: '15px' }}>
                <Phone size={20} color="var(--primary)" />
                <span>{location.phone}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Maahi's Bake. Designed with ❤️ in Bangalore.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
