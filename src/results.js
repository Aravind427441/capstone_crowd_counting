import React, { useEffect, useState } from 'react';
import './Results.css';

const Results = () => {
  const [images, setImages] = useState([]);
  const [texts, setTexts] = useState({});

  useEffect(() => {
    fetch('http://localhost:5001/api/images')
      .then(response => response.json())
      .then(data => {
        setImages(data);
        data.forEach(imageName => {
          fetch(`http://localhost:5001/api/text/${imageName}`)
            .then(response => response.text())
            .then(text => {
              setTexts(prevTexts => ({ ...prevTexts, [imageName]: text }));
            })
            .catch(error => console.error('Error fetching text:', error));
        });
      })
      .catch(error => console.error('Error fetching images:', error));
  }, []);

  return (
    <div className="results-container">
      <h1 className="gallery-title">
        Results
      </h1>
      <div className="image-grid">
        {images.length > 0 ? (
          images.map((imageName, index) => (
            <div key={index} className="image-card">
              <div className="image-wrapper">
                <img
                  className="gallery-image"
                  src={`http://localhost:5001/output/${imageName}`}
                  alt={`Result ${index + 1}`}
                />
              </div>
              <div className="image-description">
              <h3 className="image-title">
  {index % 2 === 0 ? 'Original Image' : 'Upscaled Image'}
</h3>
                <p className="image-text">{texts[imageName] || 'Loading description...'}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-images-text">No images found in the output folder.</p>
        )}
      </div>
    </div>
  );
};

export default Results;
