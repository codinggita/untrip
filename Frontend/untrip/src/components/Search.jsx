import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for the date picker
import "../css/Search.css";

const SearchBox = () => {
  const [dates, setDates] = useState({ checkin: null, checkout: null });
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);
  const dateInputRef = useRef(null);
  const datePopupRef = useRef(null);

  // Handle opening the date picker when clicking the input
  const handleDateInputClick = () => {
    console.log("Date input clicked");
    setDatePickerOpen((prevState) => !prevState); // Toggle the state
  };

  // Handle date selection for check-in
  const handleCheckinChange = (date) => {
    console.log("Check-in date selected:", date);
    setDates({ ...dates, checkin: date });
  };

  // Handle date selection for checkout
  const handleCheckoutChange = (date) => {
    console.log("Checkout date selected:", date);
    setDates({ ...dates, checkout: date });
    setDatePickerOpen(false); // Close the popup after selecting both dates
  };

  // Close date picker when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datePopupRef.current &&
        !datePopupRef.current.contains(event.target) &&
        !dateInputRef.current.contains(event.target)
      ) {
        console.log("Clicked outside, closing date picker");
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
          <h3 key={index} className={index === 0 ? "active" : ""}>
            {tab}
          </h3>
        ))}
      </div>

      {/* Search Inputs */}
      <div className="search-box">
        <div className="input-wrapper">
          <input type="text" placeholder="Where to?" className="search-input" />
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
            <div
              id="date-picker-popup"
              ref={datePopupRef}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                border: "1px solid #ccc",
                padding: "10px",
                backgroundColor: "white",
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                position: "absolute",
                zIndex: 10,
              }}
            >
              {/* Check-in Date Picker */}
              <DatePicker
                selected={dates.checkin}
                onChange={handleCheckinChange}
                placeholderText="Select check-in date"
                selectsStart
                startDate={dates.checkin}
                endDate={dates.checkout}
                dateFormat="yyyy/MM/dd"
              />

              {/* Checkout Date Picker */}
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

        <button className="search-button">Search</button>
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
