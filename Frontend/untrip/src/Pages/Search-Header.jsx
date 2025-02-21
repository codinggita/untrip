import React, { useState, useRef, useEffect } from "react";
import { Search, Users } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../css/SearchHeader.css"; 

const SearchHeader = () => {
  const [dates, setDates] = useState({ checkin: null, checkout: null });
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);
  const dateInputRef = useRef(null);
  const datePopupRef = useRef(null);

  const handleDateInputClick = () => {
    setDatePickerOpen((prevState) => !prevState);
  };

  const handleCheckinChange = (date) => {
    setDates({ ...dates, checkin: date });
  };

  const handleCheckoutChange = (date) => {
    setDates({ ...dates, checkout: date });
    setDatePickerOpen(false);
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
    <div className="header-container">
      <div className="header-inner">
        <div className="header-search-fields">
          <div className="header-input-group">
            <Search className="header-input-icon" />
            <input type="text" placeholder="Where to?" defaultValue="FabHotel Liwa International" className="header-input-field" />
          </div>

          <div className="header-input-group">
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

          <div className="header-input-group">
            <Users className="header-input-icon" />
            <input type="text" placeholder="Guests" defaultValue="2 travelers, 1 room" className="header-input-field" />
          </div>

          <button type="submit" className="header-search-button">Search</button>
        </div>

        <select className="header-sort-dropdown" defaultValue="recommended">
          <option value="recommended">Recommended</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>
    </div>
  );
};

export default SearchHeader;