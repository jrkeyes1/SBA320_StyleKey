import React, { useState } from 'react';

const UnsplashSearch = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=y0kg4frSMiwPeh2HR7PXKpJmfYNaCq3hp6KRez3M7lI`
      );
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setImages(data.results);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchImages();
  };

  return (
    <div>
      <h1>Search Unsplash Fashions</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for fashion images"
        />
        <button type="submit">Search</button>
      </form>
      {error && <p>Error: {error}</p>}
      <div className="images-grid">
        {images.map((image) => (
          <div key={image.id} className="image-item">
            <img src={image.urls.small} alt={image.alt_description} />
            <p>{image.description || ""}</p>
            <button onClick={() => saveToCloset(image)}>Save to Closet</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const saveToCloset = (image) => {
  const closet = JSON.parse(localStorage.getItem('closet')) || [];
  closet.push(image);
  localStorage.setItem('closet', JSON.stringify(closet));
  alert('Image saved to closet!');
};

export default UnsplashSearch;
