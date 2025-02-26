import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import "../css/Hotel-Card.css";

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation(); // To access navigation state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const city = location.state?.city; // Get the city from navigation state
        console.log("City Received:", city); 

        if (!city) {
          throw new Error("No city provided");
        }

        // Corrected API URL (Uses `destination` instead of `city`)
        const response = await fetch(
          `https://untrip-1.onrender.com/api/search-hotels?destination=${city}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch hotels");
        }

        const data = await response.json();
        console.log("Fetched Hotels:", data); // ✅ Debugging Log
        setHotels(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [location.state]); // Re-fetch if the city changes

  if (loading) return <h2>Loading hotels...</h2>;
  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

  return (
    <div className="hotel-card-container-wrapper">
      <h3 style={{ margin: "20px 0", fontSize: "1.5rem" }}>
        Hotels in {location.state?.city}
      </h3>

      {hotels.length > 0 ? (
        hotels.map((hotel) => (
          <HotelCard
            key={hotel.id}
            id={hotel.id}
            name={hotel.name}
            location={hotel.city}
            rating={hotel.rating}
            ratingText="Very Good"
            reviews={hotel.reviews || 0}
            price={hotel.price?.value || 0}
            totalPrice={(hotel.price?.value || 0) + 30}
            imageUrl={hotel.images?.[0] || "/default-hotel.jpg"}
          />
        ))
      ) : (
        <p>No hotels found for {location.state?.city}.</p>
      )}
    </div>
  );
};

const HotelCard = ({
  id,
  name,
  location,
  rating,
  ratingText,
  reviews,
  price,
  totalPrice,
  imageUrl,
}) => {
  const navigate = useNavigate();

  
  const usdToInrRate = 87.22;
  const discountPercentage = 90;

  
  const convertAndDiscount = (usdPrice) => {
    if (usdPrice === 'N/A') return 'N/A';
    const inrPrice = usdPrice * usdToInrRate;
    const discountedPrice = inrPrice * (1 - discountPercentage / 100);
    return Math.round(discountedPrice);
  };

  
  const originalPriceInINR = price * usdToInrRate;
  const discountedPriceInINR = convertAndDiscount(price);
  const totalPriceInINR = convertAndDiscount(totalPrice);
  
  return (
    <div className="hotel-card-container">
      <div className="hotel-card-image-wrapper">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          className="hotel-card-image"
        />
        <button className="hotel-card-favorite-btn">
          <Heart className="hotel-card-heart-icon" />
        </button>
      </div>

      <div className="hotel-card-details">
        <div className="hotel-card-info">
          <h3 className="hotel-card-name">{name}</h3>
          <p className="hotel-card-location">{location}</p>
          <span className="hotel-card-refundable-badge">Fully Refundable</span>
          <div className="hotel-card-rating">
            <span className="hotel-card-rating-badge">{rating}</span>
            <span className="hotel-card-rating-text">{ratingText}</span>
            <span className="hotel-card-review-count">
              {reviews} review{reviews !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <div className="hotel-card-price-section">
          <p className="hotel-card-price-label">from</p>

          
          <p className="hotel-card-original-price">
            <del>₹{originalPriceInINR.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</del>
            <span style={{ color: 'green', fontWeight: 'bold', marginLeft: '8px' }}>{discountPercentage}% OFF</span>
          </p>

          
          <p className="hotel-card-price-amount">₹{discountedPriceInINR.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>

          
          <p className="hotel-card-total-price">₹{totalPriceInINR.toLocaleString('en-IN', { maximumFractionDigits: 0 })} total</p>

          <p className="hotel-card-tax-info">Includes taxes & fees</p>

          <button className="hotel-card-signin-btn">Sign in for extra savings</button>
          <button
            className="hotel-card-select-room-btn"
            onClick={() => navigate(`/HotelDetails/${id}`)}
          >
            Select your room
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelList;
