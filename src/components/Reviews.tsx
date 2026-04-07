import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Review } from '../services/dataService';

interface Props {
  reviews: Review[];
}

const Reviews: React.FC<Props> = ({ reviews }) => {
  return (
    <section id="reviews" className="reviews">
      <div className="container">
        <div className="section-header">
          <h2>Customer <span>Reviews</span></h2>
          <p>Don't just take our word for it—here's what our patrons say.</p>
        </div>
        
        <div className="reviews-grid">
          {reviews.map((review, idx) => (
            <div key={idx} className="review-card">
              <Quote className="quote-icon" size={40} />
              <div className="stars">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="var(--secondary)" color="var(--secondary)" />
                ))}
              </div>
              <p className="review-text">"{review.text}"</p>
              <h4 className="reviewer-name">- {review.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
