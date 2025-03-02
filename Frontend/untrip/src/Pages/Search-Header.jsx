import React, { useState, useRef, useEffect } from "react";
import { Search, Users, Calendar, ChevronDown } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ModernSearchHeader = () => {
  const [dates, setDates] = useState({ checkin: null, checkout: null });
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);
  const [isGuestsOpen, setGuestsOpen] = useState(false);
  const dateInputRef = useRef(null);
  const datePopupRef = useRef(null);
  const guestsInputRef = useRef(null);
  const guestsPopupRef = useRef(null);

  // Guest count state
  const [guests, setGuests] = useState({
    adults: 2,
    children: 0,
    rooms: 1
  });

  const handleDateInputClick = () => {
    setDatePickerOpen((prevState) => !prevState);
    setGuestsOpen(false);
  };

  const handleGuestsInputClick = () => {
    setGuestsOpen((prevState) => !prevState);
    setDatePickerOpen(false);
  };

  const handleCheckinChange = (date) => {
    setDates({ ...dates, checkin: date });
  };

  const handleCheckoutChange = (date) => {
    setDates({ ...dates, checkout: date });
    setDatePickerOpen(false);
  };

  const updateGuests = (type, operation) => {
    const operations = {
      increment: (value) => value + 1,
      decrement: (value) => Math.max(type === 'rooms' ? 1 : 0, value - 1)
    };
    
    setGuests({
      ...guests,
      [type]: operations[operation](guests[type])
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close date picker when clicking outside
      if (
        datePopupRef.current &&
        !datePopupRef.current.contains(event.target) &&
        !dateInputRef.current.contains(event.target)
      ) {
        setDatePickerOpen(false);
      }
      
      // Close guests popup when clicking outside
      if (
        guestsPopupRef.current &&
        !guestsPopupRef.current.contains(event.target) &&
        !guestsInputRef.current.contains(event.target)
      ) {
        setGuestsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Format guest display text
  const getGuestsDisplayText = () => {
    const totalTravelers = guests.adults + guests.children;
    return `${totalTravelers} traveler${totalTravelers !== 1 ? 's' : ''}, ${guests.rooms} room${guests.rooms !== 1 ? 's' : ''}`;
  };

  return (
    <div className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3">
          <div className="flex flex-col lg:flex-row gap-3">
            
            <div className="flex flex-col md:flex-row gap-2 flex-1">
             
              <div className="relative flex-1 min-w-0">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Search size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Where to?"
                  defaultValue="FabHotel Liwa International"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
                />
              </div>

              {/* Date Picker */}
              <div className="relative flex-1 min-w-0">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Calendar size={18} />
                </div>
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
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
                />

                {isDatePickerOpen && (
                  <div
                    ref={datePopupRef}
                    className="absolute left-0 right-0 md:left-auto md:w-96 mt-2 p-4 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Check-in</p>
                        <DatePicker
                          selected={dates.checkin}
                          onChange={handleCheckinChange}
                          placeholderText="Select check-in date"
                          selectsStart
                          startDate={dates.checkin}
                          endDate={dates.checkout}
                          dateFormat="MMM d, yyyy"
                          className="w-full p-2 border border-gray-200 rounded-md"
                          monthsShown={1}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Check-out</p>
                        <DatePicker
                          selected={dates.checkout}
                          onChange={handleCheckoutChange}
                          placeholderText="Select checkout date"
                          selectsEnd
                          startDate={dates.checkin}
                          endDate={dates.checkout}
                          minDate={dates.checkin}
                          dateFormat="MMM d, yyyy"
                          className="w-full p-2 border border-gray-200 rounded-md"
                          monthsShown={1}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Guests Input */}
              <div className="relative flex-1 min-w-0">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Users size={18} />
                </div>
                <div 
                  ref={guestsInputRef}
                  onClick={handleGuestsInputClick}
                  className="flex items-center w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer focus:outline-none hover:border-gray-300 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
                >
                  <span className="truncate">{getGuestsDisplayText()}</span>
                  <ChevronDown size={16} className="ml-auto text-gray-400" />
                </div>

                {isGuestsOpen && (
                  <div
                    ref={guestsPopupRef}
                    className="absolute right-0 mt-2 p-4 bg-white rounded-lg shadow-xl border border-gray-200 z-50 w-64"
                  >
                    {/* Adults */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-medium">Adults</p>
                        <p className="text-sm text-gray-500">Ages 13+</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => updateGuests('adults', 'decrement')}
                          className={`w-8 h-8 flex items-center justify-center rounded-full border ${guests.adults > 1 ? 'border-gray-300 text-gray-700 hover:bg-gray-100' : 'border-gray-200 text-gray-300'}`}
                          disabled={guests.adults <= 1}
                        >
                          -
                        </button>
                        <span className="w-5 text-center">{guests.adults}</span>
                        <button 
                          onClick={() => updateGuests('adults', 'increment')}
                          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-medium">Children</p>
                        <p className="text-sm text-gray-500">Ages 0-12</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => updateGuests('children', 'decrement')}
                          className={`w-8 h-8 flex items-center justify-center rounded-full border ${guests.children > 0 ? 'border-gray-300 text-gray-700 hover:bg-gray-100' : 'border-gray-200 text-gray-300'}`}
                          disabled={guests.children <= 0}
                        >
                          -
                        </button>
                        <span className="w-5 text-center">{guests.children}</span>
                        <button 
                          onClick={() => updateGuests('children', 'increment')}
                          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Rooms */}
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium">Rooms</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => updateGuests('rooms', 'decrement')}
                          className={`w-8 h-8 flex items-center justify-center rounded-full border ${guests.rooms > 1 ? 'border-gray-300 text-gray-700 hover:bg-gray-100' : 'border-gray-200 text-gray-300'}`}
                          disabled={guests.rooms <= 1}
                        >
                          -
                        </button>
                        <span className="w-5 text-center">{guests.rooms}</span>
                        <button 
                          onClick={() => updateGuests('rooms', 'increment')}
                          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button 
                      onClick={() => setGuestsOpen(false)}
                      className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition duration-200 flex-shrink-0 flex items-center justify-center"
            >
              <Search size={18} className="mr-2" />
              <span>Search</span>
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="mt-3 flex justify-end items-center">
            <span className="text-sm text-gray-500 mr-2">Sort by:</span>
            <select
              className="w-48 p-2 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 hover:bg-white transition-all duration-200 text-sm"
              defaultValue="recommended"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernSearchHeader;