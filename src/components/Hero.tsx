import React from 'react';
import { ChevronRight, Star } from 'lucide-react';
import { getWhatsAppLink } from '../services/dataService';

interface Props {
  whatsapp: string;
}

const Hero: React.FC<Props> = ({ whatsapp }) => {
  return (
    <section id="home" className="hero">
      <div className="container hero-content">
        <div className="hero-text">
          <div className="badge">
            <Star size={16} fill="var(--secondary)" color="var(--secondary)" />
            <span>4.8 Rating in Abbigere</span>
          </div>
          <h1>Crafting Sweet <br /><span>Memories</span> with Love</h1>
          <p>
            Experience the finest cakes and pastries in Bangalore. 
            From signature butterscotch to custom celebration cakes, 
            we bake every bite with fresh ingredients and passion.
          </p>
          <div className="hero-btns">
            <a href="#specialties" className="btn btn-primary">View Menu</a>
            <a 
              href={getWhatsAppLink(whatsapp)} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-outline"
            >
              Order on WhatsApp <ChevronRight size={18} />
            </a>
          </div>
        </div>
        <div className="hero-image">
          <div className="image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=1089&q=80" 
              alt="Delicious Cake" 
            />
            <div className="floating-card c1">
              <span className="emoji">🍰</span>
              <div>
                <p className="label">Freshly Baked</p>
                <p className="val">Every Single Day</p>
              </div>
            </div>
            <div className="floating-card c2">
              <span className="emoji">🎂</span>
              <div>
                <p className="label">Custom Designs</p>
                <p className="val">1000+ Celebrations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
