import React, { useState } from 'react';
import { Star, ShoppingCart, Info, TrendingUp } from 'lucide-react';
import { MenuItem, getWhatsAppLink } from '../services/dataService';

interface Props {
  menu: MenuItem[];
  whatsapp: string;
}

const Shop: React.FC<Props> = ({ menu, whatsapp }) => {
  const categories = ["All", ...Array.from(new Set(menu.map(item => item.category)))];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All" 
    ? menu 
    : menu.filter(item => item.category === activeCategory);

  return (
    <section id="shop" className="shop">
      <div className="container">
        <div className="section-header">
          <h2>Maahi's <span>Bake Shop</span></h2>
          <p>Freshly baked daily. Delivered to your doorstep in Abbigere.</p>
        </div>

        <div className="shop-filters">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filteredItems.map((item, idx) => (
            <div key={idx} className="product-card">
              <div className="product-image">
                <img 
                  src={item.img || "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500"} 
                  alt={item.name} 
                />
                {idx === 0 && (
                  <div className="product-badge best-seller">
                    <TrendingUp size={14} /> Best Seller
                  </div>
                )}
                {item.category === "Cakes" && (
                  <div className="product-badge category-tag">{item.category}</div>
                )}
              </div>
              
              <div className="product-details">
                <div className="product-header">
                  <h3 className="product-title">{item.name}</h3>
                  <div className="product-rating">
                    <Star size={14} fill="#FFD700" color="#FFD700" />
                    <span>4.8</span>
                  </div>
                </div>
                
                <p className="product-desc">{item.description}</p>
                
                <div className="product-footer">
                  <div className="product-price">
                    <span className="currency">₹</span>
                    <span className="amount">{item.price.replace('₹', '')}</span>
                  </div>
                  
                  <div className="product-actions">
                    <a 
                      href={getWhatsAppLink(whatsapp, item.name, item.price)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="buy-btn"
                    >
                      <ShoppingCart size={18} /> Buy Now
                    </a>
                  </div>
                </div>
                
                <div className="product-delivery">
                  <Info size={14} />
                  <span>Free delivery in Abbigere</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Shop;
