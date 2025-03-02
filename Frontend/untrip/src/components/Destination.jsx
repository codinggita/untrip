import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, HelpCircle, Info } from "lucide-react";
import "../css/Destination.css";
import Loader from "./Loader";

const BASE_API_URL = "https://untrip-1.onrender.com/api/search-hotels?destination=";
const CONVERSION_RATE = 87.22; 
const DISCOUNT_FACTOR = 0.1; 

const DESTINATIONS = [
  "London", "Dubai", "Mumbai", "Paris", "Tokyo",
  "Selby", "Goole", "York", "Carlton", "Riccall",
  "Howden", "Wressell", "Snaith"
];

const DestinationExplorer = () => {
  const [activeCategory, setActiveCategory] = useState(DESTINATIONS[0]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  const fetchHotels = async (destination) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_API_URL}${destination}`);
      const data = await response.json();

      const hotelList = data.map((hotel) => {
        const priceInINR = parseFloat(hotel.price.value) * CONVERSION_RATE * DISCOUNT_FACTOR;
        return {
          id: hotel.id,
          name: hotel.name,
          region: hotel.city,
          price: priceInINR.toFixed(2), 
          image: hotel.images?.[0] || "/placeholder.svg",
        };
      });

      setHotels(hotelList);
    } catch (error) {
      console.error("Error fetching hotels:", error);
      setHotels([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHotels(activeCategory);
  }, [activeCategory]);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 330;
      const currentScroll = sliderRef.current.scrollLeft;
      const newScroll = direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount;
      sliderRef.current.scrollTo({ left: newScroll, behavior: "smooth" });
    }
  };

  return (
    <div className="explorer-container">
      <h1 className="explorer-title">Explore stays in popular destinations</h1>
      <p className="explorer-subtitle">Average prices based on current calendar month</p>

      <div className="categories-container">
        {DESTINATIONS.map((city) => (
          <button
            key={city}
            className={`category-tab ${activeCategory === city ? "active" : ""}`}
            onClick={() => setActiveCategory(city)}
          >
            {city}
          </button>
        ))}
      </div>

      <div className="slider-container">
        <button className="slider-button left" onClick={() => scroll("left")} aria-label="Previous destinations">
          <ChevronLeft />
        </button>

        <div className="slider-wrapper" ref={sliderRef}>
          {loading ? (
            <div style={{
              position: 'relative', width: '100%', height: '100%',
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.6)', zIndex: 9999
            }}>
              <Loader />
            </div>  
          ) : hotels.length > 0 ? (
            hotels.map((hotel) => (
              <div 
                key={hotel.id} 
                className="destination-card" 
                onClick={() => navigate(`/hotel/${hotel.id}`)}
                style={{ cursor: "pointer" }} 
              >
                <div className="image-container">
                  <img src={hotel.image} alt={hotel.name} className="destination-image" />
                  <button className="info-button" aria-label="More information">
                    <Info />
                  </button>
                </div>
                <div className="card-content">
                  <h3 className="destination-name">{hotel.name}</h3>
                  <p className="destination-region">{hotel.region}</p>
                  <p className="destination-price">
                    <span className="price-amount">₹ {hotel.price}</span>
                    <span className="price-text">avg. nightly price</span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-data">No hotels found</p>
          )}
        </div>

        <button className="slider-button right" onClick={() => scroll("right")} aria-label="Next destinations">
          <ChevronRight />
        </button>
      </div>

      <button className="help-button" aria-label="Help">
        <HelpCircle />
      </button>
    </div>
  );
};

export default DestinationExplorer;
