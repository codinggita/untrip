import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Heart } from "lucide-react";
import "../css/Hotel-Card.css"; 

const HotelDetail = () => {
    const { id } = useParams();
    const [hotels, setHotels] = useState([]);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchHotels = async () => {
          try {
              const response = await fetch(`https://untrip-1.onrender.com/api/hotels`);
              if (!response.ok) {
                  throw new Error("Failed to fetch hotel details");
              }
              const data = await response.json();

              const hotelWithId = data.find(hotel => hotel.id === id);
              const otherHotels = data.filter(hotel => hotel.id !== id).slice(0, 4);
              setSelectedHotel(hotelWithId);
              setHotels(otherHotels);
          } catch (err) {
              setError(err.message);
          } finally {
              setLoading(false);
          }
      };

      fetchHotels();
  }, [id]);  


    if (loading) return <h2>Loading hotel details...</h2>;
    if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

    return (
        <div className="hotel-card-container-wrapper">
            {selectedHotel && (
                <HotelCard
                    name={selectedHotel.name}
                    location={selectedHotel.city}
                    rating={selectedHotel.rating}
                    ratingText="Excellent"
                    reviews={selectedHotel.reviews || 0}
                    price={selectedHotel.price?.value || 0}
                    totalPrice={(selectedHotel.price?.value || 0) + 30}
                    imageUrl={selectedHotel.images?.[0] || "/default-hotel.jpg"}
                />
            )}

            {hotels.map((hotel) => (
                <HotelCard
                    key={hotel.id}
                    name={hotel.name}
                    location={hotel.city}
                    rating={hotel.rating}
                    ratingText="Very Good"
                    reviews={hotel.reviews || 0}
                    price={hotel.price?.value || 0}
                    totalPrice={(hotel.price?.value || 0) + 30}
                    imageUrl={hotel.images?.[0] || "/default-hotel.jpg"}
                />
            ))}
        </div>
    );
};

const HotelCard = ({
  name,
  location,
  rating,
  ratingText,
  reviews,
  price,
  totalPrice,
  imageUrl,
}) => {
  return (
      <div className="hotel-card-container">
          <div className="hotel-card-image-wrapper">
              <img src={imageUrl || "/placeholder.svg"} alt={name} className="hotel-card-image" />
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
                      <span className="hotel-card-review-count">{reviews} review{reviews !== 1 ? "s" : ""}</span>
                  </div>
              </div>

              <div className="hotel-card-price-section">
                  <p className="hotel-card-price-label">from</p>
                  
                  {/* Original Price with Strikethrough (Rounded to 2 Decimal Places) */}
                  <p className="hotel-card-original-price">
                      <del>${(price + 50).toFixed(2)}</del>
                  </p>

                  {/* Discounted Price (Rounded to 2 Decimal Places) */}
                  <p className="hotel-card-price-amount">${price.toFixed(2)}</p>

                  {/* Total Price (Rounded to 2 Decimal Places) */}
                  <p className="hotel-card-total-price">${totalPrice.toFixed(2)} total</p>

                  <p className="hotel-card-tax-info">Includes taxes & fees</p>

                  <button className="hotel-card-signin-btn">Sign in for extra savings</button>
                  <button className="hotel-card-select-room-btn">Select your room</button>
              </div>
          </div>
      </div>
  );
};

export default HotelDetail;
