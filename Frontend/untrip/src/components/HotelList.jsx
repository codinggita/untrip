import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import navigation hook
import axios from 'axios';
import '../css/hotel.css';
import ROW from '../img/ROW.png';

const Hotel = () => {
  const [hotelData, setHotelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await axios.get('https://untrip-1.onrender.com/api/hotels');
        setHotelData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message || 'Something went wrong!');
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchHotelData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="hotel">
      <div className="heading">
        <h1>The Big January Sale. Book by Jan 26</h1>
        <h3>Showing deals for: Mar 14 - Mar 16</h3>
      </div>

      <div className="hotel-container-background-img">
        <img src={ROW} alt="Background" />
      </div>

      <div className="hotel-container">
        {hotelData.slice(0, 4).map((hotel, index) => (
          <HotelCard key={index} hotelInfo={hotel} />
        ))}
      </div>
    </div>
  );
};

const HotelCard = ({ hotelInfo }) => {
  const navigate = useNavigate(); // React Router navigation

  return (
    <div className="container-hotel">
      <div
        className="container-hotel-main"
        onClick={() => navigate(`/hotel/${hotelInfo.id}`)} // Navigate to detail page
        style={{ cursor: "pointer" }} // Make it look clickable
      >
        <img src={hotelInfo.images[0]} alt="Hotel" className="hotel-image" />
        <div className="hotel-info">
          <h1>{hotelInfo.name}</h1>
          <p className="rating">{hotelInfo.rating}</p>
          <h2>Very Good</h2>
          <p className="price">{hotelInfo.price.value} {hotelInfo.price.currency}</p>
          <p>Per Night <br /> {hotelInfo.price.value * 3} {hotelInfo.price.currency} Total <br /> Includes Taxes & Fees</p>
        </div>
      </div>
    </div>
  );
};

export default Hotel;
