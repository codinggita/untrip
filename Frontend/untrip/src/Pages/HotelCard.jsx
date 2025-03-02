import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";  
import { Heart } from "lucide-react";
import "../css/Hotel-Card.css"; 
import Loader from '../components/Loader'


const CONVERSION_RATE = 87.22; 
const DISCOUNT_FACTOR = 0.1;
const HotelDetail = () => {
    const { id } = useParams();
    const [hotels, setHotels] = useState([]);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHotelDetails = async () => {
            try {
                // Fetch ALL hotels (for finding selected hotel)
                const response = await fetch(`https://untrip-1.onrender.com/api/hotels`);
                if (!response.ok) {
                    throw new Error("Failed to fetch hotel details");
                }
                const data = await response.json();
                console.log("Fetched Hotels:", data); // ✅ Debugging 

                // Find the selected hotel by ID
                const hotelWithId = data.find(hotel => hotel.id == id);
                if (!hotelWithId) {
                    throw new Error(`No hotel found with ID: ${id}`);
                }
                setSelectedHotel(hotelWithId);

                // ✅ Now fetch hotels for the correct city using city-based API
                const cityResponse = await fetch(
                    `https://untrip-1.onrender.com/api/search-hotels?destination=${hotelWithId.city}`
                );
                if (!cityResponse.ok) {
                    throw new Error("Failed to fetch hotels for this city");
                }
                const cityHotels = await cityResponse.json();

                // Remove the selected hotel from the list
                const filteredHotels = cityHotels.filter(hotel => hotel.id != id).slice(0, 4);
                setHotels(filteredHotels);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHotelDetails();
    }, [id]);  

    if (loading) return <div style={{
        position: 'relative', top: 0, left: 0, width: '100%', height: '100%',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.6)', zIndex: 9999
      }}>
        <Loader />
      </div>;
    if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

    return (
        <div className="hotel-card-container-wrapper">
            {selectedHotel && (
                <HotelCard
                    id={selectedHotel.id}   
                    name={selectedHotel.name}
                    location={selectedHotel.city} // ✅ City will be displayed here
                    rating={selectedHotel.rating}
                    ratingText="Excellent"
                    reviews={selectedHotel.reviews || 0}
                    price={selectedHotel.price?.value || 0}
                    totalPrice={(selectedHotel.price?.value || 0) + 30}
                    imageUrl={selectedHotel.images?.[0] || "/default-hotel.jpg"}
                />
            )}

            <h3 style={{ margin: "20px 0", fontSize: "1.5rem" }}>
                More Hotels in {selectedHotel?.city}
            </h3>

            {hotels.map((hotel) => (
                <HotelCard
                    key={hotel.id}
                    id={hotel.id}  
                    name={hotel.name}
                    location={hotel.city} // ✅ Ensure city is displayed
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

  const priceInINR = price * CONVERSION_RATE * DISCOUNT_FACTOR;
  const totalPriceInINR = priceInINR + 250; 

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
                      <del>₹{(price * CONVERSION_RATE).toFixed(2)}</del>
                  </p>

                  {/* Discounted Price (Rounded to 2 Decimal Places) */}
                  <p className="hotel-card-price-amount">₹{priceInINR.toFixed(2)}</p>

                  {/* Total Price (Rounded to 2 Decimal Places) */}
                  <p className="hotel-card-total-price">₹{totalPriceInINR.toFixed(2)} total</p>

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

export default HotelDetail;
