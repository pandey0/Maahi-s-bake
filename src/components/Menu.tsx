import React, { useState } from 'react';
import { MenuItem, getWhatsAppLink } from '../services/dataService';

interface Props {
  menu: MenuItem[];
  whatsapp: string;
}

const Menu: React.FC<Props> = ({ menu, whatsapp }) => {
  const categories = Array.from(new Set(menu.map(item => item.category)));
  const [activeCategory, setActiveCategory] = useState(categories[0] || '');

  const filteredItems = menu.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="menu">
      <div className="container">
        <div className="section-header">
          <h2>Full <span>Menu</span></h2>
          <p>Browse our complete range of bakes and savories.</p>
        </div>

        <div className="category-tabs">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`tab-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="menu-list">
          {filteredItems.map((item, idx) => (
            <div key={idx} className="menu-item">
              <div className="menu-item-info">
                <h4>{item.name}</h4>
                <p>{item.description}</p>
              </div>
              <div className="menu-item-price">
                <span>{item.price}</span>
                <a 
                  href={getWhatsAppLink(whatsapp, item.name, item.price)} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-tiny"
                >
                  Order
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
