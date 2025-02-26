import { useState, useRef, useEffect } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { MapPin, Calendar, Clock, Plane, Ship, Package, Loader } from "lucide-react"
import "../css/Search.css"
import { useNavigate } from "react-router-dom"

const SearchBox = () => {
  const [activeTab, setActiveTab] = useState("Stays")
  const [dates, setDates] = useState({ 
    checkin: null, 
    checkout: null,
    pickup: null,
    dropoff: null
  })
  const [isDatePickerOpen, setDatePickerOpen] = useState(false)
  const [city, setCity] = useState("")
  const [pickupLocation, setPickupLocation] = useState("")
  const [dropoffLocation, setDropoffLocation] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const dateInputRef = useRef(null)
  const datePopupRef = useRef(null)
  const navigate = useNavigate()

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }

  const handleDateInputClick = () => {
    setDatePickerOpen((prevState) => !prevState)
  }

  const handleCheckinChange = (date) => {
    setDates({ ...dates, checkin: date })
  }

  const handleCheckoutChange = (date) => {
    setDates({ ...dates, checkout: date })
    setDatePickerOpen(false)
  }

  const handleCityChange = (event) => {
    setCity(event.target.value)
  }

  const handlePickupLocationChange = (event) => {
    setPickupLocation(event.target.value)
  }

  const handleDropoffLocationChange = (event) => {
    setDropoffLocation(event.target.value)
  }

  const handleSearch = async () => {
    // Set loading state to true when search starts
    setIsLoading(true)
    
    if (activeTab === "Stays") {
      if (!city) {
        alert("Please enter a city.")
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch(`https://untrip-1.onrender.com/api/search-hotels?city=${city}`)
        if (!response.ok) {
          throw new Error("Failed to fetch hotels")
        }
        const data = await response.json()
        navigate("/hotels", { state: { city, hotels: data } })
      } catch (error) {
        console.error("Error fetching hotels:", error)
        alert("Failed to fetch hotels. Please try again.")
        setIsLoading(false)
      }
    } else if (activeTab === "Cars") {
      if (!pickupLocation) {
        alert("Please enter a pick-up location.")
        setIsLoading(false)
        return
      }
      
      if (!dates.pickup) {
        alert("Please select a pick-up date.")
        setIsLoading(false)
        return
      }

      try {
        // Format dates for the API request
        const pickupDate = dates.pickup ? dates.pickup.toISOString().split('T')[0] : '';
        const dropoffDate = dates.dropoff ? dates.dropoff.toISOString().split('T')[0] : '';
        
        // Build the query parameters
        const params = new URLSearchParams({
          pickup_location: pickupLocation,
          dropoff_location: dropoffLocation || pickupLocation,
          pickup_date: pickupDate,
          dropoff_date: dropoffDate || pickupDate
        });

        const response = await fetch(`https://untrip-1.onrender.com/car/api/search-car?${params.toString()}`)
        if (!response.ok) {
          throw new Error("Failed to fetch cars")
        }
        const data = await response.json()
        navigate("/cars", { state: { 
          pickupLocation, 
          dropoffLocation: dropoffLocation || pickupLocation, 
          pickupDate, 
          dropoffDate: dropoffDate || pickupDate,
          cars: data
        }})
      } catch (error) {
        console.error("Error fetching cars:", error)
        alert("Failed to fetch cars. Please try again.")
        setIsLoading(false)
      }
    } else {
      // For other tabs that don't have functionality yet
      alert("This feature is coming soon.")
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datePopupRef.current &&
        !datePopupRef.current.contains(event.target) &&
        !dateInputRef.current.contains(event.target)
      ) {
        setDatePickerOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  // Navigation will not reset the loading state after component unmounts
  // This ensures loading state is reset if navigation occurs
  useEffect(() => {
    return () => {
      if (isLoading) {
        setIsLoading(false)
      }
    }
  }, [isLoading])

  const renderStaysSection = () => (
    <>
      <div className="input-wrapper">
        <MapPin className="icon" />
        <input type="text" placeholder="Where to?" value={city} onChange={handleCityChange} className="search-input" />
      </div>

      <div className="input-wrapper" id="date-picker-wrapper">
        <Calendar className="icon" />
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
  )

  const renderFlightsSection = () => (
    <>
      <div className="input-wrapper">
        <Plane className="icon" />
        <input type="text" placeholder="From" className="search-input" />
      </div>
      <div className="input-wrapper">
        <Plane className="icon" />
        <input type="text" placeholder="To" className="search-input" />
      </div>
      <div className="input-wrapper">
        <Calendar className="icon" />
        <DatePicker placeholderText="Departure Date" className="search-input" />
      </div>
    </>
  )

  const renderCarSection = () => (
    <>
      <div className="car-section">
        <div className="car-nav">
          <a href="#rental" className="active">
            Rental cars
          </a>
          <a href="#airport">Airport transportation</a>
        </div>

        <div className="car-search-form">
          <div className="form-row">
            <div className="input-wrapper">
              <MapPin className="icon" />
              <input 
                type="text" 
                placeholder="Pick-up" 
                className="car-input" 
                value={pickupLocation}
                onChange={handlePickupLocationChange}
              />
            </div>

            <div className="input-wrapper">
              <MapPin className="icon" />
              <input 
                type="text" 
                placeholder="Same as pick-up" 
                className="car-input" 
                value={dropoffLocation}
                onChange={handleDropoffLocationChange}
              />
              <span className="input-label">Drop-off</span>
            </div>

            <div className="input-wrapper">
              <Calendar className="icon" />
              <DatePicker
                selected={dates.pickup}
                onChange={(date) => setDates({ ...dates, pickup: date })}
                placeholderText="Pick-up date"
                className="car-input"
                dateFormat="MMM d, yyyy"
              />
              <span className="input-label">Pick-up date</span>
            </div>

            <div className="input-wrapper">
              <Calendar className="icon" />
              <DatePicker
                selected={dates.dropoff}
                onChange={(date) => setDates({ ...dates, dropoff: date })}
                placeholderText="Drop-off date"
                className="car-input"
                dateFormat="MMM d, yyyy"
                minDate={dates.pickup} 
              />
              <span className="input-label">Drop-off date</span>
            </div>

            <div className="input-wrapper">
              <Clock className="icon" />
              <select className="car-input">
                <option>10:30am</option>
                <option>11:00am</option>
                <option>11:30am</option>
                <option>12:00pm</option>
                <option>12:30pm</option>
              </select>
              <span className="input-label">Pick-up time</span>
            </div>

            <div className="input-wrapper">
              <Clock className="icon" />
              <select className="car-input">
                <option>10:30am</option>
                <option>11:00am</option>
                <option>11:30am</option>
                <option>12:00pm</option>
                <option>12:30pm</option>
              </select>
              <span className="input-label">Drop-off time</span>
            </div>
          </div>

          <div className="car-options">
            <button className="option-btn">Show AARP rates</button>
            <button className="option-btn">
              Discount codes
              <span className="chevron">▼</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )

  const renderPackagesSection = () => (
    <>
      <div className="input-wrapper">
        <Package className="icon" />
        <input type="text" placeholder="Destination" className="search-input" />
      </div>
      <div className="input-wrapper">
        <Calendar className="icon" />
        <DatePicker placeholderText="Start Date" className="search-input" />
      </div>
      <div className="input-wrapper">
        <Calendar className="icon" />
        <DatePicker placeholderText="End Date" className="search-input" />
      </div>
    </>
  )

  const renderThingsToDoSection = () => (
    <>
      <div className="input-wrapper">
        <MapPin className="icon" />
        <input type="text" placeholder="Things to do in" className="search-input" />
      </div>
      <div className="input-wrapper">
        <Calendar className="icon" />
        <DatePicker placeholderText="From" className="search-input" />
      </div>
      <div className="input-wrapper">
        <Calendar className="icon" />
        <DatePicker placeholderText="To" className="search-input" />
      </div>
    </>
  )

  const renderCruisesSection = () => (
    <>
      <div className="input-wrapper">
        <Ship className="icon" />
        <input type="text" placeholder="Cruise Destination" className="search-input" />
      </div>
      <div className="input-wrapper">
        <Calendar className="icon" />
        <DatePicker placeholderText="Departure Date" className="search-input" />
      </div>
    </>
  )

  return (
    <div className="search-container">
      <div className="search-tabs">
        {["Stays", "Flights", "Cars", "Packages", "Things to do", "Cruises"].map((tab) => (
          <h3 key={tab} className={activeTab === tab ? "active" : ""} onClick={() => handleTabClick(tab)}>
            {tab}
          </h3>
        ))}
      </div>

      <div className="search-box">
        {activeTab === "Stays" && renderStaysSection()}
        {activeTab === "Flights" && renderFlightsSection()}
        {activeTab === "Cars" && renderCarSection()}
        {activeTab === "Packages" && renderPackagesSection()}
        {activeTab === "Things to do" && renderThingsToDoSection()}
        {activeTab === "Cruises" && renderCruisesSection()}

        <button className="search-button" onClick={handleSearch} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader className="spinnerr" size={16} />
              <span>Searching...</span>
            </>
          ) : (
            "Search"
          )}
        </button>
      </div>

      {activeTab === "Stays" && (
        <div className="search-options">
          <label>
            <input type="checkbox" id="add-car" /> Add Car
          </label>
          <label>
            <input type="checkbox" id="add-flight" /> Add Flight
          </label>
        </div>
      )}
    </div>
  )
}

export default SearchBox