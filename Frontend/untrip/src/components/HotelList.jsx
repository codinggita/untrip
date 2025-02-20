import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

        // Shuffle function to ensure different hotels on refresh
        const shuffleArray = (array) => {
          return array.sort(() => Math.random() - 0.5);
        };

        // Storing original data & shuffling before displaying
        const shuffledHotels = shuffleArray([...response.data]);
        setHotelData(shuffledHotels);

      } catch (error) {
        setError(error.message || 'Something went wrong!');
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelData();
  }, []);

  if (loading) return <div className="loader"></div>;
  if (error) return <div className="error-message">{error}</div>;

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
  const navigate = useNavigate();

  return (
    <div className="container-hotel" onClick={() => navigate(`/hotel/${hotelInfo.id}`)}>
      <div className="container-hotel-main">
        <img src={hotelInfo.images[0]} alt="Hotel" className="hotel-image" />
        <div className="hotel-info">
          <h1>{hotelInfo.name}</h1>
          <p className="rating">⭐ {hotelInfo.rating}</p>
          <h2>Very Good</h2>
          <p className="price">
            {hotelInfo.price.currency} {hotelInfo.price.value.toFixed(2)}
          </p>
          <p>
            Per Night <br />
            {hotelInfo.price.currency} {(hotelInfo.price.value * 3).toFixed(2)} Total <br />
            Includes Taxes & Fees
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hotel;
