import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for the date picker
import "../css/Search.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const SearchBox = () => {
  const [activeTab, setActiveTab] = useState("Stays"); // Active tab track karega
  const [dates, setDates] = useState({ checkin: null, checkout: null });
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);
  const [city, setCity] = useState(""); // State for city input
  const dateInputRef = useRef(null);
  const datePopupRef = useRef(null);
  const navigate = useNavigate(); // Hook for navigation

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleDateInputClick = () => {
    setDatePickerOpen((prevState) => !prevState); // Toggle the state
  };

  const handleCheckinChange = (date) => {
    setDates({ ...dates, checkin: date });
  };

  const handleCheckoutChange = (date) => {
    setDates({ ...dates, checkout: date });
    setDatePickerOpen(false); // Close the popup after selecting both dates
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearch = async () => {
    if (!city) {
      alert("Please enter a city.");
      return;
    }

    try {
      const response = await fetch(
        `https://untrip-1.onrender.com/api/search-hotels?city=${city}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch hotels");
      }
      const data = await response.json();
      navigate("/hotels", { state: { city, hotels: data } }); // Navigate to hotels page with data
    } catch (error) {
      console.error("Error fetching hotels:", error);
      alert("Failed to fetch hotels. Please try again.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datePopupRef.current &&
        !datePopupRef.current.contains(event.target) &&
        !dateInputRef.current.contains(event.target)
      ) {
        setDatePickerOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="search-container">
      {/* Tabs */}
      <div className="search-tabs">
        {["Stays", "Flights", "Cars", "Packages", "Cruises"].map((tab, index) => (
          <h3
            key={index}
            className={activeTab === tab ? "active" : ""}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </h3>
        ))}
      </div>

      {/* Search Inputs Based on Active Tab */}
      <div className="search-box">
        {activeTab === "Stays" && (
          <>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Where to?"
                value={city}
                onChange={handleCityChange}
                className="search-input"
              />
              <i className="icon-location"></i>
            </div>

            <div className="input-wrapper" id="date-picker-wrapper">
              <input
                type="text"
                id="date-input"
                placeholder="Check-in → Check-out"
                readOnly
                value={
                  dates.checkin && dates.checkout
                    ? `${dates.checkin.toLocaleDateString()} → ${dates.checkout.toLocaleDateString()}`
                    : "Check-in → Check-out"
                }
                onClick={handleDateInputClick}
                ref={dateInputRef}
              />
              <i className="icon-calendar"></i>

              {/* Date Picker Popup */}
              {isDatePickerOpen && (
                <div id="date-picker-popup" ref={datePopupRef}>
                  <DatePicker
                    selected={dates.checkin}
                    onChange={handleCheckinChange}
                    placeholderText="Select check-in date"
                    selectsStart
                    startDate={dates.checkin}
                    endDate={dates.checkout}
                    dateFormat="yyyy/MM/dd"
                  />

                  <DatePicker
                    selected={dates.checkout}
                    onChange={handleCheckoutChange}
                    placeholderText="Select checkout date"
                    selectsEnd
                    startDate={dates.checkin}
                    endDate={dates.checkout}
                    minDate={dates.checkin}
                    dateFormat="yyyy/MM/dd"
                  />
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === "Flights" && (
          <>
            <div className="input-wrapper">
              <input type="text" placeholder="From" className="search-input" />
            </div>
            <div className="input-wrapper">
              <input type="text" placeholder="To" className="search-input" />
            </div>
            <div className="input-wrapper">
              <DatePicker placeholderText="Departure Date" />
            </div>
          </>
        )}

        {activeTab === "Cars" && (
          <>
            <div className="input-wrapper">
              <input type="text" placeholder="Pick-up Location" className="search-input" />
            </div>
            <div className="input-wrapper">
              <input type="text" placeholder="Drop-off Location" className="search-input" />
            </div>
          </>
        )}

        {activeTab === "Packages" && (
          <>
            <div className="input-wrapper">
              <input type="text" placeholder="Destination" className="search-input" />
            </div>
            <div className="input-wrapper">
              <DatePicker placeholderText="Start Date" />
            </div>
            <div className="input-wrapper">
              <DatePicker placeholderText="End Date" />
            </div>
          </>
        )}

        {activeTab === "Cruises" && (
          <>
            <div className="input-wrapper">
              <input type="text" placeholder="Cruise Destination" className="search-input" />
            </div>
            <div className="input-wrapper">
              <DatePicker placeholderText="Departure Date" />
            </div>
          </>
        )}

        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Search Options */}
      <div className="search-options">
        <label>
          <input type="checkbox" id="add-car" /> Add Car
        </label>
        <label>
          <input type="checkbox" id="add-flight" /> Add Flight
        </label>
      </div>
    </div>
  );
};

export default SearchBox;
