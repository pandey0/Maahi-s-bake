import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { getWhatsAppLink } from '../services/dataService';

interface Props {
  whatsapp: string;
}

const Header: React.FC<Props> = ({ whatsapp }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-content">
        <a href="#" className="logo">
          Maahi's <span>Bake</span>
        </a>

        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li><a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a></li>
            <li><a href="#specialties" onClick={() => setIsMenuOpen(false)}>Specialties</a></li>
            <li><a href="#about" onClick={() => setIsMenuOpen(false)}>About Us</a></li>
            <li>
              <a 
                href={getWhatsAppLink(whatsapp)} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary" 
                onClick={() => setIsMenuOpen(false)}
              >
                Chat Now
              </a>
            </li>
          </ul>
        </nav>

        <div className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>
    </header>
  );
};

export default Header;
