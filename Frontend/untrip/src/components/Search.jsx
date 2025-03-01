import { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MapPin, Calendar, Clock, Plane, Ship, Package, Loader, Search, CarFront, Activity, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [activeTab, setActiveTab] = useState("Stays");
  const [dates, setDates] = useState({
    checkin: null,
    checkout: null,
    pickup: null,
    dropoff: null
  });
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);
  const [city, setCity] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Add state for checkboxes
  const [addCar, setAddCar] = useState(false);
  const [addFlight, setAddFlight] = useState(false);
  const dateInputRef = useRef(null);
  const datePopupRef = useRef(null);
  const navigate = useNavigate();

  // All the handlers and functionality remain the same
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

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

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handlePickupLocationChange = (event) => {
    setPickupLocation(event.target.value);
  };

  const handleDropoffLocationChange = (event) => {
    setDropoffLocation(event.target.value);
  };

  // Add checkbox handlers
  const handleAddCarChange = () => {
    setAddCar(!addCar);
  };

  const handleAddFlightChange = () => {
    setAddFlight(!addFlight);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    
    if (activeTab === "Stays") {
      if (!city) {
        alert("Please enter a city.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://untrip-1.onrender.com/api/search-hotels?city=${city}`);
        if (!response.ok) {
          throw new Error("Failed to fetch hotels");
        }
        const data = await response.json();
        navigate("/hotels", { state: { 
          city, 
          hotels: data,
          addCar,
          addFlight
        }});
      } catch (error) {
        console.error("Error fetching hotels:", error);
        alert("Failed to fetch hotels. Please try again.");
        setIsLoading(false);
      }
    } else if (activeTab === "Cars") {
      if (!pickupLocation) {
        alert("Please enter a pick-up location.");
        setIsLoading(false);
        return;
      }
      
      if (!dates.pickup) {
        alert("Please select a pick-up date.");
        setIsLoading(false);
        return;
      }

      try {
        const pickupDate = dates.pickup ? dates.pickup.toISOString().split('T')[0] : '';
        const dropoffDate = dates.dropoff ? dates.dropoff.toISOString().split('T')[0] : '';
        
        const params = new URLSearchParams({
          pickup_location: pickupLocation,
          dropoff_location: dropoffLocation || pickupLocation,
          pickup_date: pickupDate,
          dropoff_date: dropoffDate || pickupDate
        });

        const response = await fetch(`https://untrip-1.onrender.com/car/api/search-car?${params.toString()}`);
        if (!response.ok) {
          throw new Error("Failed to fetch cars");
        }
        const data = await response.json();
        navigate("/cars", { state: { 
          pickupLocation, 
          dropoffLocation: dropoffLocation || pickupLocation, 
          pickupDate, 
          dropoffDate: dropoffDate || pickupDate,
          cars: data
        }});
      } catch (error) {
        console.error("Error fetching cars:", error);
        alert("Failed to fetch cars. Please try again.");
        setIsLoading(false);
      }
    } else {
      alert("This feature is coming soon.");
      setIsLoading(false);
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

  useEffect(() => {
    return () => {
      if (isLoading) {
        setIsLoading(false);
      }
    };
  }, [isLoading]);

  const getTabIcon = (tab) => {
    switch(tab) {
      case "Stays": return <MapPin size={18} />;
      case "Flights": return <Plane size={18} />;
      case "Cars": return <CarFront size={18} />;
      case "Packages": return <Package size={18} />;
      case "Things to do": return <Activity size={18} />;
      case "Cruises": return <Ship size={18} />;
      default: return null;
    }
  };

  const renderStaysSection = () => (
    <div className="flex flex-col lg:flex-row w-full gap-4">
      <div className="relative w-full lg:w-2/5 group">
        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors" />
        <input 
          type="text" 
          placeholder="Where to?" 
          value={city} 
          onChange={handleCityChange} 
          className="w-full pl-12 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50 hover:bg-white focus:bg-white"
        />
      </div>

      <div className="relative w-full lg:w-2/5 group" id="date-picker-wrapper">
        <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors" />
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
          className="w-full pl-12 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50 hover:bg-white cursor-pointer"
        />

        {isDatePickerOpen && (
          <div className="absolute top-16 left-0 z-50 p-4 bg-white rounded-xl shadow-2xl border border-gray-100" ref={datePopupRef}>
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
                  dateFormat="yyyy/MM/dd"
                  className="w-full p-2 rounded-lg border border-gray-200"
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
                  dateFormat="yyyy/MM/dd"
                  className="w-full p-2 rounded-lg border border-gray-200"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <button 
        className="w-full lg:w-1/5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-4 px-6 rounded-xl shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transition transform hover:scale-105 active:scale-95"
        onClick={handleSearch}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader className="animate-spin" size={18} />
            <span>Searching...</span>
          </>
        ) : (
          <>
            <Search size={18} />
            <span>Search</span>
          </>
        )}
      </button>
    </div>
  );

  const renderCarSection = () => (
    <div className="w-full">
      <div className="flex gap-6 mb-6 border-b border-gray-100">
        <button className="text-blue-600 font-medium pb-2 border-b-2 border-blue-600">
          Rental cars
        </button>
        <button className="text-gray-500 hover:text-gray-700 pb-2 border-b-2 border-transparent hover:border-gray-200 transition-colors">
          Airport transportation
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="relative group">
          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Pick-up" 
            value={pickupLocation}
            onChange={handlePickupLocationChange}
            className="w-full pl-12 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50 hover:bg-white"
          />
        </div>

        <div className="relative group">
          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Same as pick-up" 
            value={dropoffLocation}
            onChange={handleDropoffLocationChange}
            className="w-full pl-12 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50 hover:bg-white"
          />
          <span className="absolute -top-2 left-10 px-1 text-xs font-medium text-gray-600 bg-white">Drop-off</span>
        </div>

        <div className="relative group">
          <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors" />
          <DatePicker
            selected={dates.pickup}
            onChange={(date) => setDates({ ...dates, pickup: date })}
            placeholderText="Pick-up date"
            className="w-full pl-12 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50 hover:bg-white"
            dateFormat="MMM d, yyyy"
          />
          <span className="absolute -top-2 left-10 px-1 text-xs font-medium text-gray-600 bg-white">Pick-up date</span>
        </div>

        <div className="relative group">
          <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors" />
          <DatePicker
            selected={dates.dropoff}
            onChange={(date) => setDates({ ...dates, dropoff: date })}
            placeholderText="Drop-off date"
            className="w-full pl-12 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50 hover:bg-white"
            dateFormat="MMM d, yyyy"
            minDate={dates.pickup}
          />
          <span className="absolute -top-2 left-10 px-1 text-xs font-medium text-gray-600 bg-white">Drop-off date</span>
        </div>

        <div className="relative group">
          <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors" />
          <select className="w-full pl-12 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50 hover:bg-white appearance-none">
            <option>10:30am</option>
            <option>11:00am</option>
            <option>11:30am</option>
            <option>12:00pm</option>
            <option>12:30pm</option>
          </select>
          <span className="absolute -top-2 left-10 px-1 text-xs font-medium text-gray-600 bg-white">Pick-up time</span>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>

        <div className="relative group">
          <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors" />
          <select className="w-full pl-12 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50 hover:bg-white appearance-none">
            <option>10:30am</option>
            <option>11:00am</option>
            <option>11:30am</option>
            <option>12:00pm</option>
            <option>12:30pm</option>
          </select>
          <span className="absolute -top-2 left-10 px-1 text-xs font-medium text-gray-600 bg-white">Drop-off time</span>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-2">
        <div className="flex gap-4">
          <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors flex items-center">
            Show AARP rates
          </button>
          <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors flex items-center gap-1">
            Discount codes
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>
        
        <button 
          className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-4 px-6 md:px-10 rounded-xl shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transition transform hover:scale-105 active:scale-95"
          onClick={handleSearch}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader className="animate-spin" size={18} />
              <span>Searching...</span>
            </>
          ) : (
            <>
              <Search size={18} />
              <span>Find Cars</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  // Placeholder renderers for other tabs
  const renderPlaceholderSection = () => (
    <div className="flex flex-col items-center justify-center w-full p-8">
      <div className="text-blue-600 mb-4">
        <Package size={48} className="opacity-80" />
      </div>
      <p className="text-gray-700 text-lg font-medium mb-2">Coming soon</p>
      <p className="text-gray-500 text-center max-w-md">We're working on making this feature available. Check back soon for updates!</p>
    </div>
  );

  return (
    <div className="relative w-full max-w-6xl mx-auto mt-12">
      {/* Enhanced Glassmorphism background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/80 via-indigo-50/70 to-purple-50/80 rounded-3xl border border-white/60 shadow-xl backdrop-blur-md"></div>
      
      {/* Decorative elements */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>

      <div className="relative z-10 p-6 md:p-8">
        {/* Tabs with improved visual design */}
        <div className="flex flex-wrap justify-center md:justify-start gap-[4.75rem] mb-8 bg-white/30 p-2 rounded-2xl backdrop-blur-sm">
          {["Stays", "Flights", "Cars", "Packages", "Things to do", "Cruises"].map((tab) => (
            <button
              key={tab}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                activeTab === tab
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium shadow-md"
                  : "bg-white/60 hover:bg-white text-gray-700 hover:shadow-sm"
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {getTabIcon(tab)}
              <span className="hidden md:inline">{tab}</span>
              {tab === activeTab && <span className="md:hidden">{tab}</span>}
            </button>
          ))}
          
          <button className="md:hidden flex items-center justify-center p-3 bg-white/60 rounded-xl text-gray-700">
            <Menu size={18} />
          </button>
        </div>

        {/* Search Box with enhanced glass effect */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white">
          {activeTab === "Stays" && renderStaysSection()}
          {activeTab === "Cars" && renderCarSection()}
          {(activeTab !== "Stays" && activeTab !== "Cars") && renderPlaceholderSection()}
        </div>

        {/* Additional Options - Modified checkboxes to work correctly */}
        {activeTab === "Stays" && (
          <div className="flex gap-6 mt-4 px-2">
            <label className="flex items-center gap-2 text-gray-700 hover:text-gray-900 cursor-pointer group">
              <div className="relative w-5 h-5 rounded-md border border-gray-300 group-hover:border-blue-500 transition-colors">
                <input 
                  type="checkbox" 
                  className="absolute opacity-0 w-full h-full cursor-pointer" 
                  id="add-car"
                  checked={addCar}
                  onChange={handleAddCarChange}
                />
                <div className={`absolute inset-0 flex items-center justify-center text-blue-600 transition-opacity ${addCar ? 'opacity-100' : 'opacity-0'}`}>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              Add a car
            </label>

            <label className="flex items-center gap-2 text-gray-700 hover:text-gray-900 cursor-pointer group">
              <div className="relative w-5 h-5 rounded-md border border-gray-300 group-hover:border-blue-500 transition-colors">
                <input 
                  type="checkbox" 
                  className="absolute opacity-0 w-full h-full cursor-pointer" 
                  id="add-flight"
                  checked={addFlight}
                  onChange={handleAddFlightChange}
                />
                <div className={`absolute inset-0 flex items-center justify-center text-blue-600 transition-opacity ${addFlight ? 'opacity-100' : 'opacity-0'}`}>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>
              Add a flight
            </label>
          </div>
        )}
        
        {/* Interactive badges */}
        <div className="flex justify-center mt-8 gap-2">
          <div className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            Best Price Guarantee
          </div>
          <div className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
            10% Off With Mobile App
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;

