import React from 'react';

interface Props {
  photos: string[];
}

const Gallery: React.FC<Props> = ({ photos }) => {
  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <div className="section-header">
          <h2>Cake <span>Gallery</span></h2>
          <p>Peek into our kitchen of sweet creations.</p>
        </div>
        
        <div className="gallery-grid">
          {photos.map((img, idx) => (
            <div key={idx} className="gallery-item">
              <img src={img} alt={`Gallery ${idx}`} loading="lazy" />
              <div className="overlay">
                <span>View Design</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
