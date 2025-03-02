import { useEffect, useState } from "react";
import "../css/car-rental-card.css";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const CarRentalCard = ({ cars: propsCars }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const usdToInrRate = 87.22; 
  const discountPercentage = 90;

  useEffect(() => {
    if (propsCars && propsCars.length > 0) {
      setCars(propsCars);
      setLoading(false);
      return;
    }

    fetch("https://untrip-1.onrender.com/car/api/car-rentals")
      .then((response) => response.json())
      .then((data) => {
        if (data.status && data.data.length > 0) {
          setCars(data.data);
        } else {
          setError("No cars available.");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch data.");
        setLoading(false);
      });
  }, [propsCars]);

  // Function to handle reservation button click
  const handleReserveClick = (carId) => {
    navigate(`/car-rental/${carId}`);
  };

  if (loading) return <div style={{
    position: 'relative', top: 0, left: 0, width: '100%', height: '100%',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.6)', zIndex: 9999
  }}>
    <Loader />
  </div>;
  if (error) return <p>{error}</p>;

  return (
    <div className="car-list">
      {cars.map((car) => {
        const pickupLocation = car.car_info.route_info?.pickup?.name || "John F Kennedy International Airport";
        const dropoffLocation = car.car_info.route_info?.dropoff?.name || "John F Kennedy International Airport";

        const today = new Date().toISOString().split("T")[0]; 
        const defaultDropoffDate = new Date();
        defaultDropoffDate.setDate(defaultDropoffDate.getDate() + 3); 
        const dropoffDate = defaultDropoffDate.toISOString().split("T")[0];

        const originalPriceInInr = (car.car_info.pricing_info.price * usdToInrRate).toFixed(0);
        const discountedPriceInInr = (originalPriceInInr * (1 - discountPercentage / 100)).toFixed(0);

        return (
          <div className="card" key={car.car_info.vehicle_id}>
            <div className="card-container">
              {/* Left side with image */}
              <div className="image-container1">
                <img src={car.car_info.vehicle_info.image_thumbnail_url} alt={car.car_info.vehicle_info.v_name} className="car-image" />
                <button className="favorite-button">
                  <svg viewBox="0 0 24 24" className="heart-icon" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
              </div>

              {/* Middle section with car details */}
              <div className="details-container">
                <div className="header-section">
                  <div>
                    <span className="deal-badge">90% OFF!</span>
                    <h2 className="car-title">{car.car_info.vehicle_info.group}</h2>
                    <p className="car-subtitle">{car.car_info.vehicle_info.v_name} or similar</p>
                  </div>
                </div>

                <div className="car-features">
                  <div className="feature">
                    <span>{car.car_info.vehicle_info.seats} seats</span>
                  </div>
                  <div className="feature">{car.car_info.vehicle_info.transmission}</div>
                  <div className="feature">{car.car_info.vehicle_info.mileage}</div>
                </div>

                <div className="location-info">
                  <div className="location-item">
                    <svg className="iconn" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <div>
                      <p className="location-title">Pick-up at {pickupLocation}</p>
                      <p className="location-subtitle">{car.car_info.supplier_info.address}</p>
                      <p className="date-info">Pickup Date: {today}</p>
                    </div>
                  </div>
                </div>

                <div className="benefits-section">
                  <div className="benefits">
                    {car.car_info.content.badges.map((badge, index) => (
                      <p key={index} className="benefit-item">{badge.text}</p>
                    ))}
                  </div>
                  <div className="company-info">
                    <img src={car.car_info.supplier_info.logo_url} alt={car.car_info.supplier_info.name} className="company-logo" />
                    <div className="dropoff-locationn">
                      <svg className="iconn" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <div>
                        <p className="location-title">Drop-off at {dropoffLocation}</p>
                        <p className="location-subtitle">{car.car_info.route_info.dropoff.address}</p>
                        <p className="date-info">Drop-off Date: {dropoffDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side with price and button */}
              <div className="price-section">
                <div className="price-container">
                  <span className="original-price" style={{ textDecoration: 'line-through', color: '#888', fontSize: '0.9em' }}>₹{originalPriceInInr}</span>
                  <span className="price">₹{discountedPriceInInr}</span>
                  <p className="price-total">₹{discountedPriceInInr} total</p>
                </div>
                <button 
                  className="reserve-button"
                  onClick={() => handleReserveClick(car.car_info.vehicle_id)}
                >
                  Reserve
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CarRentalCard;