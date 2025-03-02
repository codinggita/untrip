import React, { useState } from "react";
import { MapPin, Calendar, Clock, ChevronDown, Info, Loader, Car, Filter, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { DatePicker } from "@/components/ui/calendar";
import { format } from "date-fns";
import CarRentalCard from "./car-rental-card"; 

const sampleCarResults = [
  {
    car_info: {
      vehicle_id: "1",
      vehicle_info: {
        v_name: "Toyota Camry",
        image_thumbnail_url: "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&auto=format&fit=crop&q=60",
        group: "Sedan",
        seats: 5,
        transmission: "Automatic",
        mileage: "Unlimited"
      },
      pricing_info: {
        price: 45
      },
      supplier_info: {
        name: "Hertz",
        logo_url: "https://placeholder.com/logo",
        address: "Airport Terminal, Gate 4"
      },
      route_info: {
        pickup: {
          name: "Delhi",
          address: "Delhi International Airport"
        },
        dropoff: {
          name: "Delhi",
          address: "Delhi International Airport"
        }
      },
      content: {
        badges: [
          { text: "Free cancellation" },
          { text: "No credit card fees" },
          { text: "Air Conditioning" }
        ]
      }
    }
  },
  {
    car_info: {
      vehicle_id: "2",
      vehicle_info: {
        v_name: "Honda CR-V",
        image_thumbnail_url: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&auto=format&fit=crop&q=60",
        group: "SUV",
        seats: 7,
        transmission: "Automatic",
        mileage: "Unlimited"
      },
      pricing_info: {
        price: 65
      },
      supplier_info: {
        name: "Enterprise",
        logo_url: "https://placeholder.com/logo",
        address: "City Center, Main Street"
      },
      route_info: {
        pickup: {
          name: "Delhi",
          address: "Delhi International Airport"
        },
        dropoff: {
          name: "Sidhrawali",
          address: "Sidhrawali, Gurugram, Haryana"
        }
      },
      content: {
        badges: [
          { text: "All-Wheel Drive" },
          { text: "Backup Camera" },
          { text: "Navigation" }
        ]
      }
    }
  }
];

export default function CarRentalSearch() {
  const [showDropoff, setShowDropoff] = useState(false);
  const [pickupDate, setPickupDate] = useState(null);
  const [dropoffDate, setDropoffDate] = useState(null);
  const [pickupLocation, setPickupLocation] = useState({
    name: "Delhi",
    fullName: "Delhi (and vicinity), National Capital Territory"
  });
  const [dropoffLocation, setDropoffLocation] = useState({
    name: "Sidhrawali",
    fullName: "Sidhrawali, Gurugram, Haryana, India"
  });
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortOrder, setSortOrder] = useState("recommended");
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = () => {
    // Implement search functionality
    console.log("Searching with parameters:", {
      pickupLocation,
      dropoffLocation: showDropoff ? dropoffLocation : pickupLocation,
      pickupDate,
      dropoffDate,
      priceRange
    });
  };

  return (
    <div className="mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Find Your Perfect Rental Car</h1>
      
      <div className="grid gap-4">
        {/* Search Form */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <div className="relative lg:col-span-2">
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex items-center border rounded-lg p-3 bg-white cursor-pointer hover:border-blue-500">
                  <MapPin className="w-5 h-5 text-gray-500 mr-2" />
                  <div className="flex-1">
                    <div className="text-xs text-gray-600">Pick-up</div>
                    <div className="text-sm">{pickupLocation.fullName}</div>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-2">
                  <h3 className="font-medium">Popular Locations</h3>
                  {/* Add location selection options */}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex items-center border rounded-lg p-3 bg-white cursor-pointer hover:border-blue-500">
                  <Calendar className="w-5 h-5 text-gray-500 mr-2" />
                  <div className="flex-1">
                    <div className="text-xs text-gray-600">Pick-up date</div>
                    <div className="text-sm">
                      {pickupDate ? format(pickupDate, "MMM dd") : "Select date"}
                    </div>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <DatePicker
                  mode="single"
                  selected={pickupDate}
                  onSelect={setPickupDate}
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Select>
              <SelectTrigger className="w-full h-[62px]">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-gray-500 mr-2" />
                  <div className="flex-1 text-left">
                    <div className="text-xs text-gray-600">Pick-up time</div>
                    <div className="text-sm">10:30 am</div>
                  </div>
                </div>
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 24 }).map((_, i) => (
                  <SelectItem key={i} value={`${i}:00`}>
                    {i < 12 ? `${i || 12}:00 am` : `${i - 12 || 12}:00 pm`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Button 
              className="w-full h-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="different-dropoff"
            checked={showDropoff}
            onChange={(e) => setShowDropoff(e.target.checked)}
          />
          <label htmlFor="different-dropoff" className="text-sm">
            Return to a different location
          </label>
        </div>

        {showDropoff && (
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex items-center border rounded-lg p-3 bg-white cursor-pointer hover:border-blue-500">
                  <MapPin className="w-5 h-5 text-gray-500 mr-2" />
                  <div className="flex-1">
                    <div className="text-xs text-gray-600">Drop-off</div>
                    <div className="text-sm">{dropoffLocation.fullName}</div>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-2">
                  <h3 className="font-medium">Popular Drop-off Locations</h3>
                  {/* Add location selection options */}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}

        {/* Results Section */}
        <div className="grid md:grid-cols-[300px_1fr] gap-6 mt-6">
          {/* Filters Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium mb-4">Price Range</h3>
              <Slider
                defaultValue={[0, 200]}
                max={200}
                step={10}
                value={priceRange}
                onChange={setPriceRange}
                className="mb-4"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium mb-4">Car Type</h3>
              <div className="space-y-2">
                {["Economy", "Compact", "Midsize", "SUV", "Luxury"].map((type) => (
                  <div key={type} className="flex items-center">
                    <Checkbox id={type} />
                    <label htmlFor={type} className="ml-2 text-sm">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Results List */}
          <div>
            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
              <div className="space-y-1">
                <h2 className="font-medium">10 cars available</h2>
                <p className="text-sm text-gray-600">Prices include taxes and fees</p>
              </div>

              <Select 
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Customer Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Replace the car-results div with CarRentalCard component */}
            <div className="mt-4">
              <CarRentalCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}