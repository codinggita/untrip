import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CarRentalCard from "./car-rental-card";

const CarSearchPage = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.state) {
      setSearchParams(location.state);
    }
  }, [location]);

  if (!searchParams) {
    return <div className="car-search-page">No search parameters provided.</div>;
  }

  return (
    <div className="car-search-page">
      <div className="car-search-header">
        <h1>Car Rental Results</h1>
        <div className="search-summary">
          <p>
            <strong>Pick-up:</strong> {searchParams.pickupLocation}
            {searchParams.pickupDate && ` (${searchParams.pickupDate})`}
          </p>
          <p>
            <strong>Drop-off:</strong> {searchParams.dropoffLocation}
            {searchParams.dropoffDate && ` (${searchParams.dropoffDate})`}
          </p>
        </div>
      </div>

      {searchParams.cars && searchParams.cars.data && searchParams.cars.data.length > 0 ? (
        <CarRentalCard cars={searchParams.cars.data} />
      ) : (
        <div className="no-results">
          <p>No cars available for your search criteria. Please try different dates or locations.</p>
        </div>
      )}
    </div>
  );
};

export default CarSearchPage;