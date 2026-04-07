import React from 'react';
import { Heart } from 'lucide-react';
import { Specialty, getWhatsAppLink } from '../services/dataService';

interface Props {
  items: Specialty[];
  whatsapp: string;
}

const Specialties: React.FC<Props> = ({ items, whatsapp }) => {
  return (
    <section id="specialties" className="specialties">
      <div className="container">
        <div className="section-header">
          <h2>Our <span>Specialties</span></h2>
          <p>The most loved flavors by our customers in Abbigere.</p>
        </div>
        
        <div className="specialties-grid">
          {items.map((item, idx) => (
            <div key={idx} className="spec-card">
              <div className="spec-image">
                <img src={item.img} alt={item.name} />
                <button className="favorite-btn">
                  <Heart size={20} />
                </button>
              </div>
              <div className="spec-info">
                <h3>{item.name}</h3>
                <p className="price">{item.price}</p>
                <p className="desc">{item.desc}</p>
                <a 
                  href={getWhatsAppLink(whatsapp, item.name, item.price)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-secondary order-btn"
                  style={{ textAlign: 'center' }}
                >
                  Order on WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specialties;
