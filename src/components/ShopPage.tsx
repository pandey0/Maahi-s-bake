import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Star, Filter, Heart, Weight, Plus } from 'lucide-react';
import { MenuItem, getWhatsAppLink } from '../services/dataService';

interface Props {
  menu: MenuItem[];
  whatsapp: string;
}

const ShopPage: React.FC<Props> = ({ menu, whatsapp }) => {
  const navigate = useNavigate();
  const categories = ["All", ...Array.from(new Set(menu.map(item => item.category)))];
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Track selected weight for each item
  const [selectedWeights, setSelectedWeights] = useState<Record<string, number>>({});
  // Track if custom mode is active for an item
  const [customMode, setCustomMode] = useState<Record<string, boolean>>({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleWeightChange = (itemName: string, weight: number) => {
    setSelectedWeights(prev => ({ ...prev, [itemName]: weight }));
    setCustomMode(prev => ({ ...prev, [itemName]: false }));
  };

  const handleCustomWeight = (itemName: string, value: string) => {
    const weight = parseInt(value) || 0;
    setSelectedWeights(prev => ({ ...prev, [itemName]: weight }));
  };

  const toggleCustomMode = (itemName: string) => {
    setCustomMode(prev => ({ ...prev, [itemName]: true }));
    setSelectedWeights(prev => ({ ...prev, [itemName]: 3 })); // Default to 3kg for custom
  };

  const calculatePrice = (basePriceStr: string, weight: number, isCake: boolean) => {
    const numericPrice = parseFloat(basePriceStr.replace(/[^0-9.]/g, ''));
    if (isNaN(numericPrice)) return basePriceStr;
    
    const finalPrice = isCake ? numericPrice * weight : numericPrice;
    return `₹${Math.round(finalPrice)}`;
  };

  const filteredItems = menu.filter(item => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="shop-page">
      <header className="shop-header">
        <div className="shop-header-top">
          <button onClick={() => navigate('/')} className="back-btn">
            <ArrowLeft size={24} />
          </button>
          <div className="shop-logo">Maahi's <span>Bake Shop</span></div>
        </div>
        <div className="search-bar-container">
          <div className="search-input-wrapper">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search for your favorite treats..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <div className="shop-categories-scroll">
        {categories.map(cat => (
          <button 
            key={cat} 
            className={`cat-pill ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="shop-content">
        <div className="results-count">
          <span>{filteredItems.length} items found</span>
          <button className="filter-sort-btn"><Filter size={14} /> Filter</button>
        </div>

        <div className="shop-grid">
          {filteredItems.map((item, idx) => {
            const isCake = item.category.toLowerCase().includes('cake');
            const isCustom = customMode[item.name];
            const currentWeight = selectedWeights[item.name] || (isCake ? 0.5 : 1);
            const displayedPrice = calculatePrice(item.price, currentWeight, isCake);

            return (
              <div key={idx} className="shop-card">
                <div className="shop-img-wrapper">
                  <img src={item.img || "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500"} alt={item.name} />
                  <button className="wishlist-btn">
                    <Heart size={18} />
                  </button>
                  {isCake && <div className="shop-badge">Per Kg Pricing</div>}
                </div>
                
                <div className="shop-details">
                  <div className="shop-header-info">
                    <h3 className="shop-title">{item.name}</h3>
                    <div className="shop-rating">
                      <Star size={12} fill="var(--secondary)" color="var(--secondary)" />
                      <span>4.8</span>
                    </div>
                  </div>
                  
                  <p className="shop-desc">{item.description}</p>

                  {isCake && (
                    <div className="weight-selector">
                      <span className="weight-label"><Weight size={14} /> Select Weight:</span>
                      <div className="weight-options">
                        {[0.5, 1, 2].map(w => (
                          <button 
                            key={w}
                            className={`weight-btn ${!isCustom && currentWeight === w ? 'active' : ''}`}
                            onClick={() => handleWeightChange(item.name, w)}
                          >
                            {w}kg
                          </button>
                        ))}
                        <button 
                          className={`weight-btn ${isCustom ? 'active' : ''}`}
                          onClick={() => toggleCustomMode(item.name)}
                        >
                          <Plus size={12} /> Custom
                        </button>
                      </div>
                      
                      {isCustom && (
                        <div className="custom-weight-input">
                          <input 
                            type="number" 
                            min="1" 
                            step="1"
                            value={currentWeight}
                            onChange={(e) => handleCustomWeight(item.name, e.target.value)}
                            placeholder="Enter kg"
                          />
                          <span>kg</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="shop-footer">
                    <div className="shop-price">
                      <span className="shop-amount">{displayedPrice}</span>
                      {isCake && <span className="selected-w">/{currentWeight}kg</span>}
                    </div>
                    <a 
                      href={getWhatsAppLink(whatsapp, `${item.name} (${currentWeight}${isCake ? 'kg' : ' unit'})`, displayedPrice)}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="shop-buy-btn"
                    >
                      Order
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
