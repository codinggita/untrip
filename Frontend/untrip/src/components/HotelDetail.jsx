import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/hotelDetail.css";

const HotelDetail = () => {
  const { id } = useParams(); // Get hotel ID from the URL
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await axios.get(`https://untrip-1.onrender.com/api/hotels/${id}`);
        setHotel(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching hotel details");
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="hotel-detail">
      <h1>{hotel.name}</h1>
      <img src={hotel.images[0]} alt={hotel.name} className="hotel-detail-image" />
      <p className="rating">Rating: {hotel.rating}</p>
      <h2>Price: {hotel.price.value} {hotel.price.currency}</h2>
      <p>Per Night | Includes Taxes & Fees</p>
    </div>
  );
};

export default HotelDetail;
