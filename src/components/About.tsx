import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="about">
      <div className="container about-content">
        <div className="about-image">
          <img 
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" 
            alt="Baker working" 
          />
        </div>
        <div className="about-text">
          <div className="section-header">
            <h2>Our <span>Story</span></h2>
            <p>Baking memories since we first opened in Abbigere.</p>
          </div>
          <p>
            Maahi's Bake started with a simple passion: to bring high-quality, 
            freshly baked goods to the heart of Bangalore. Our journey in 
            Abbigere has been one of love, laughter, and a whole lot of butter!
          </p>
          <p>
            Whether it's a first birthday, a golden anniversary, or just a 
            Tuesday craving, we believe every occasion deserves a cake that 
            looks as good as it tastes.
          </p>
          <div className="stats">
            <div className="stat-item">
              <h4>1000+</h4>
              <p>Happy Customers</p>
            </div>
            <div className="stat-item">
              <h4>50+</h4>
              <p>Flavor Options</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
