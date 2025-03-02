import React, { useState } from "react";
import { 
  Search, 
  MapPin, 
  Coffee, 
  Wifi,  
  Umbrella, 
  Star, 
  Moon, 
  Utensils, 
  Dumbbell, 
  Car, 
  BedDouble, 
  Check, 
  ChevronDown, 
  Layers,
  X
} from "lucide-react";

const MapComponent = () => {
  // Map component code unchanged
  return (
    <div className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
      <img 
        src="/api/placeholder/800/600" 
        alt="Map view of hotels" 
        className="w-full h-full object-cover"
      />
      
      {/* Map Markers */}
      <div className="absolute top-1/4 left-1/4">
        <div className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm font-medium shadow-md">
          $179
        </div>
      </div>
      
      <div className="absolute top-1/3 left-1/2">
        <div className="bg-blue-600 text-white px-2 py-1 rounded-md text-sm font-medium shadow-md">
          $215
        </div>
      </div>
      
      <div className="absolute top-2/3 left-1/3">
        <div className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm font-medium shadow-md">
          $163
        </div>
      </div>
      
      {/* Map Controls */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md">
        <button className="p-2 hover:bg-gray-100 text-gray-700">
          <Layers size={18} />
        </button>
      </div>
      
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 text-gray-700">
          +
        </button>
        <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 text-gray-700">
          -
        </button>
      </div>
      
      {/* Location Info */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-2 text-sm">
        <p className="font-medium">Downtown, 3 properties</p>
      </div>
    </div>
  );
};

const ModernSidebar = () => {
  const [showMap, setShowMap] = useState(false);
  const [priceRange, setPriceRange] = useState([50, 750]);
  const [expanded, setExpanded] = useState({
    popular: true,
    amenities: true,
    rating: false,
    propertyType: false,
    neighborhood: false,
  });

  const toggleSection = (section) => {
    setExpanded({
      ...expanded,
      [section]: !expanded[section],
    });
  };

  const handlePriceChange = (e, index) => {
    const newValue = parseInt(e.target.value);
    if (index === 0) {
      // Ensure min doesn't exceed max
      setPriceRange([Math.min(newValue, priceRange[1] - 10), priceRange[1]]);
    } else {
      // Ensure max doesn't go below min
      setPriceRange([priceRange[0], Math.max(newValue, priceRange[0] + 10)]);
    }
  };

  const formatPrice = (price) => {
    return price >= 1000 ? `$${price / 1000}k` : `$${price}`;
  };

  // Calculate percentage positions for the slider
  const minPosition = (priceRange[0] / 1000) * 100;
  const maxPosition = (priceRange[1] / 1000) * 100;

  // Define filter options arrays
  const popularFilters = [
    { label: "Free breakfast", icon: <Coffee size={16} /> },
    { label: "Free WiFi", icon: <Wifi size={16} /> },
    { label: "Beach access", icon: <Umbrella size={16} /> }
  ];

  const amenityFilters = [
    { label: "Restaurant", icon: <Utensils size={16} /> },
    { label: "Room service", icon: <BedDouble size={16} /> },
    { label: "Fitness center", icon: <Dumbbell size={16} /> },
    { label: "Free parking", icon: <Car size={16} /> },
    { label: "24-hour front desk", icon: <Moon size={16} /> }
  ];

  const propertyTypes = [
    "Hotel", 
    "Resort",
    "Apartment",
    "Villa",
    "Hostel"
  ];

  const neighborhoods = [
    "Downtown",
    "Beach Area",
    "Business District",
    "Historic Center",
    "Airport Area"
  ];

  return (
    <div className="w-full md:w-80 flex-shrink-0 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Map View Toggle */}
      <div className="p-4 border-b border-gray-100">
        {showMap ? (
          <div className="relative">
            <MapComponent />
            <button 
              onClick={() => setShowMap(false)} 
              className="absolute top-2 left-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button 
              onClick={() => setShowMap(true)}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium p-3 rounded-lg transition"
            >
              <MapPin size={18} />
              View on map
            </button>
            <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-800 font-medium p-3 rounded-lg transition">
              Compare properties
            </button>
          </div>
        )}
      </div>

      <div className="p-4 max-h-screen overflow-y-auto sidebar-content">
        {/* Search Input */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search hotels, landmarks..." 
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>

        {/* Price Range - FIXED VERSION */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-800">Price range</h3>
            <span className="text-sm text-gray-500">per night</span>
          </div>
          
          <div className="relative pt-5 pb-8">
            {/* Track background */}
            <div className="h-1 bg-gray-200 rounded-full"></div>
            
            {/* Active track portion */}
            <div 
              className="absolute h-1 bg-blue-500 rounded-full top-5"
              style={{
                left: `${minPosition}%`,
                width: `${maxPosition - minPosition}%`
              }}
            ></div>
            
            {/* Minimum thumb */}
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(e, 0)}
              className="absolute w-full top-4 h-3 appearance-none bg-transparent cursor-pointer"
              style={{
                WebkitAppearance: "none",
                pointerEvents: "auto",
              }}
            />
            
            {/* Maximum thumb */}
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(e, 1)}
              className="absolute w-full top-4 h-3 appearance-none bg-transparent cursor-pointer"
              style={{
                WebkitAppearance: "none",
                pointerEvents: "auto",
              }}
            />
            
            {/* Thumb styling */}
            <style jsx>{`
              input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background: white;
                border: 2px solid #3b82f6;
                cursor: pointer;
                box-shadow: 0 1px 3px rgba(0,0,0,0.2);
                position: relative;
                z-index: 2;
              }
              
              input[type="range"]::-moz-range-thumb {
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background: white;
                border: 2px solid #3b82f6;
                cursor: pointer;
                box-shadow: 0 1px 3px rgba(0,0,0,0.2);
                position: relative;
                z-index: 2;
              }
            `}</style>
            
            {/* Price displays */}
            <div className="flex justify-between mt-4">
              <div className="px-3 py-1 border border-gray-200 rounded bg-white text-sm">
                {formatPrice(priceRange[0])}
              </div>
              <div className="px-3 py-1 border border-gray-200 rounded bg-white text-sm">
                {formatPrice(priceRange[1])}
              </div>
            </div>
          </div>
        </div>

        {/* Popular Filters */}
        <div className="filter-section mb-6">
          <button 
            className="w-full flex items-center justify-between mb-3"
            onClick={() => toggleSection('popular')}
          >
            <h3 className="font-semibold text-gray-800">Popular filters</h3>
            <ChevronDown 
              size={18} 
              className={`text-gray-500 transition-transform ${expanded.popular ? 'rotate-180' : ''}`} 
            />
          </button>
          
          {expanded.popular && (
            <div className="space-y-3">
              {popularFilters.map((filter) => (
                <div key={filter.label} className="flex items-center">
                  <input 
                    type="checkbox" 
                    id={filter.label} 
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" 
                  />
                  <label htmlFor={filter.label} className="ml-3 flex items-center text-sm text-gray-700">
                    <span className="mr-2 text-gray-500">{filter.icon}</span>
                    {filter.label}
                  </label>
                </div>
              ))}
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2">
                Show more options
              </button>
            </div>
          )}
        </div>

        {/* Hotel Amenities */}
        <div className="filter-section mb-6">
          <button 
            className="w-full flex items-center justify-between mb-3"
            onClick={() => toggleSection('amenities')}
          >
            <h3 className="font-semibold text-gray-800">Amenities</h3>
            <ChevronDown 
              size={18} 
              className={`text-gray-500 transition-transform ${expanded.amenities ? 'rotate-180' : ''}`} 
            />
          </button>
          
          {expanded.amenities && (
            <div className="space-y-3">
              {amenityFilters.map((filter) => (
                <div key={filter.label} className="flex items-center">
                  <input 
                    type="checkbox" 
                    id={filter.label} 
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" 
                  />
                  <label htmlFor={filter.label} className="ml-3 flex items-center text-sm text-gray-700">
                    <span className="mr-2 text-gray-500">{filter.icon}</span>
                    {filter.label}
                  </label>
                </div>
              ))}
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2">
                Show all amenities
              </button>
            </div>
          )}
        </div>

        {/* Star Rating */}
        <div className="filter-section mb-6">
          <button 
            className="w-full flex items-center justify-between mb-3"
            onClick={() => toggleSection('rating')}
          >
            <h3 className="font-semibold text-gray-800">Star rating</h3>
            <ChevronDown 
              size={18} 
              className={`text-gray-500 transition-transform ${expanded.rating ? 'rotate-180' : ''}`} 
            />
          </button>
          
          {expanded.rating && (
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((stars) => (
                <button 
                  key={stars} 
                  className="px-3 py-2 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 text-sm font-medium flex items-center gap-1"
                >
                  {stars} <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  {stars === 1 ? '' : '+'}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Property Type */}
        <div className="filter-section mb-6">
          <button 
            className="w-full flex items-center justify-between mb-3"
            onClick={() => toggleSection('propertyType')}
          >
            <h3 className="font-semibold text-gray-800">Property type</h3>
            <ChevronDown 
              size={18} 
              className={`text-gray-500 transition-transform ${expanded.propertyType ? 'rotate-180' : ''}`} 
            />
          </button>
          
          {expanded.propertyType && (
            <div className="space-y-3">
              {propertyTypes.map((type) => (
                <div key={type} className="flex items-center">
                  <input 
                    type="checkbox" 
                    id={type} 
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" 
                  />
                  <label htmlFor={type} className="ml-3 text-sm text-gray-700">
                    {type}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Neighborhood */}
        <div className="filter-section mb-6">
          <button 
            className="w-full flex items-center justify-between mb-3"
            onClick={() => toggleSection('neighborhood')}
          >
            <h3 className="font-semibold text-gray-800">Neighborhood</h3>
            <ChevronDown 
              size={18} 
              className={`text-gray-500 transition-transform ${expanded.neighborhood ? 'rotate-180' : ''}`} 
            />
          </button>
          
          {expanded.neighborhood && (
            <div className="space-y-3">
              {neighborhoods.map((area) => (
                <div key={area} className="flex items-center">
                  <input 
                    type="checkbox" 
                    id={area} 
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" 
                  />
                  <label htmlFor={area} className="ml-3 text-sm text-gray-700">
                    {area}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Apply Filters Button */}
        <div className="sticky bottom-0 pt-2 pb-4 bg-white">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition flex items-center justify-center">
            <Check size={18} className="mr-2" />
            Apply filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModernSidebar;
