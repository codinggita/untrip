import React from "react";
import SearchHeader from "./Search-Header";
import Sidebar from "./Sidebar";
import HotelCard from "./HotelCard";
import '../css/Page.css'


const HOTELS = Array(1).fill({
  name: "FabHotel Liwa International",
  location: "Andheri East",
  rating: 8.0,
  ratingText: "Very Good",
  reviews: 1,
  price: 47,
  totalPrice: 105,
  imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%20224-Xdq6jtNbDnQk52bGVxfipnVaejsclg.png",
});

const Page = () => {
  return (
    <div className="page-container">
      <SearchHeader />
      <div className="page-content">
        <Sidebar />
        <main className="main-content">
          <div className="hotel-list">
            {HOTELS.map((hotel, i) => (
              <HotelCard key={i} {...hotel} />
            ))}
          </div>
          <div className="button-container">
            <button className="show-more-button">Show More</button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Page;
