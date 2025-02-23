import React, { useState, useEffect, useRef } from "react";
import "../css/resort.css";

const ResortCarousel = () => {
  const [hotels, setHotels] = useState([]); // Store hotel data
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const carouselRef = useRef(null);

  // Fetch hotels from API
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch("https://untrip-1.onrender.com/api/hotels");
        const data = await response.json();
        setHotels(data.slice(0, 100));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hotels:", error);
        setError("Failed to load hotels");
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);


  const nextSlide = () => {
    if (index < hotels.length - 1) {
      setIndex(index + 1);
    }
  };

  const prevSlide = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Speed factor
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <h2>Loading hotels...</h2>
      </div>
    );
  }

  if (error) {
    return <h2 style={{ color: "red" }}>{error}</h2>;
  }

  return (
    <div className="resort-12">
      <div className="text-for-resort-12">
        <h1>Discover Your New Favorite Stay</h1>
      </div>

      <div
        className="carousel-12"
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="image-container-12"
          style={{ transform: `translateX(-${index * (280 + 26)}px)` }}
        >

          {hotels.map((hotel, i) => (
            <div className="image-box-12" key={hotel.id}>
              <img src={hotel.images[0]} alt={hotel.name} />
              <div className="image-text-12">
                <h3>Resort</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="prev-btn but" onClick={prevSlide} disabled={index === 0}>
        &#10094;
      </button>
      <button className="next-btn but" onClick={nextSlide} disabled={index === hotels.length - 1}>
        &#10095;
      </button>
    </div>
  );
};

export default ResortCarousel;
