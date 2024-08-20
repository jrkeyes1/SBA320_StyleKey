import React, { useState, useEffect } from 'react';

const Closet = () => {
  const [closet, setCloset] = useState([]);

  useEffect(() => {
    const savedCloset = JSON.parse(localStorage.getItem('closet')) || [];
    setCloset(savedCloset);
  }, []);

  return (
    <div>
      <h1>Your Closet</h1>
      <div className="images-grid">
        {closet.map((image, index) => (
          <div key={index} className="image-item">
            <img src={image.urls.small} alt={image.alt_description} />
            <p>{image.description || "No description"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Closet;
