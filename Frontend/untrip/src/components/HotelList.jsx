import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/hotel.css';
import ROW from '../img/ROW.png';
import Loader from './Loader';

const Hotel = () => {
  const [hotelData, setHotelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const conversionRate = 87.22;

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await axios.get('https://untrip-1.onrender.com/api/hotels');

        // Shuffle function to ensure different hotels on refresh
        const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

        setHotelData(shuffleArray([...response.data]));
      } catch (error) {
        setError(error.message || 'Something went wrong!');
        console.error("Error fetching hotel data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelData();
  }, []);

  if (loading) return <div style={{
    position: 'relative', top: 0, left: 0, width: '100%', height: '100%',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.6)', zIndex: 9999
  }}>
    <Loader />
  </div>;
  

  return (
    <div className="hotel">
      <div className="heading">
        <h1>The Big January Sale. Book by Jan 26</h1>
        <h3>Showing deals for: Mar 14 - Mar 16</h3>
      </div>

      <div className="hotel-container-background-img">
        <img src={ROW} alt="Travel Offer" />
      </div>

      <div className="hotel-container">
        {hotelData.slice(0, 4).map((hotel, index) => (
          <HotelCard key={hotel.id || index} hotelInfo={hotel} conversionRate={conversionRate} />
        ))}
      </div>
    </div>
  );
};

const HotelCard = ({ hotelInfo, conversionRate }) => {
  const navigate = useNavigate();

  const priceInINR = (hotelInfo?.price?.value ?? 0) * conversionRate * 0.1;
  const totalPriceInINR = priceInINR * 3;
  const hotelImage = hotelInfo?.images?.[0] ?? 'https://via.placeholder.com/300';

  return (
    <div className="container-hotel" onClick={() => navigate(`/hotel/${hotelInfo.id}`)}>
      <div className="container-hotel-main">
        <img src={hotelImage} alt={hotelInfo?.name || 'Hotel'} className="hotel-image" />
        <div className="hotel-info">
          <h1>{hotelInfo?.name ?? 'Unknown Hotel'}</h1>
          <p className="rating">⭐ {hotelInfo?.rating ?? 'N/A'}</p>
          <h2>Very Good</h2>
          <p className="price">₹ {priceInINR.toFixed(2)}</p>
          <p>
            Per Night <br />
            ₹ {totalPriceInINR.toFixed(2)} Total <br />
            Includes Taxes & Fees
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hotel;
