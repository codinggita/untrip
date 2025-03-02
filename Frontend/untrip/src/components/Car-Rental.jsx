import { useEffect, useState } from "react";
import { ArrowLeft, Calendar, Check, Clock, Heart, MapPin, Star, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loader from "./Loader";

export default function CarRental() {
  const { carId } = useParams(); // Get the car ID from URL
  const navigate = useNavigate(); // Add useNavigate hook to handle navigation
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Constants for calculations
  const usdToInrRate = 87.22;
  const discountPercentage = 90;

  // Handle back navigation
  const handleGoBack = () => {
    navigate(-1); // This will navigate back to the previous page
  };

  useEffect(() => {
    // Fetch data for the specific car
    if (!carId) {
      setError("No car ID provided");
      setLoading(false);
      return;
    }

    fetch("https://untrip-1.onrender.com/car/api/car-rentals")
      .then((response) => response.json())
      .then((data) => {
        if (data.status && data.data.length > 0) {
          const foundCar = data.data.find(item => item.car_info.vehicle_id === carId);
          if (foundCar) {
            setCar(foundCar);
          } else {
            setError("Car not found");
          }
        } else {
          setError("No cars available");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, [carId]);

  if (loading) return <div style={{
    position: 'relative', top: 0, left: 0, width: '100%', height: '100%',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.6)', zIndex: 9999
  }}>
    <Loader />
  </div>;
  if (error) return <div className="min-h-screen flex items-center justify-center">Error: {error}</div>;
  if (!car) return <div className="min-h-screen flex items-center justify-center">Car not found</div>;

  // Format dates
  const today = new Date().toISOString().split("T")[0];
  const defaultDropoffDate = new Date();
  defaultDropoffDate.setDate(defaultDropoffDate.getDate() + 3);
  const dropoffDate = defaultDropoffDate.toISOString().split("T")[0];
  
  // Format pickup and dropoff locations
  const pickupLocation = car.car_info.route_info?.pickup?.name || "John F Kennedy International Airport";
  const dropoffLocation = car.car_info.route_info?.dropoff?.name || "John F Kennedy International Airport";
  
  // Calculate prices
  const pricePerDay = car.car_info.pricing_info.price;
  const originalPriceInInr = (pricePerDay * usdToInrRate).toFixed(0);
  const discountedPriceInInr = (originalPriceInInr * (1 - discountPercentage / 100)).toFixed(0);
  const totalPrice = (pricePerDay * 2).toFixed(2); // 2 days

  // Get supplier rating details
  const supplierRating = car.car_info.rating_info || {};
  const ratingCategories = [
    { name: "Overall", value: supplierRating.average || 0 },
    { name: "Value", value: supplierRating.value_for_money || 0 },
    { name: "Cleanliness", value: supplierRating.cleanliness || 0 },
    { name: "Pickup Time", value: supplierRating.pickup_time || 0 },
    { name: "Dropoff Time", value: supplierRating.dropoff_time || 0 },
    { name: "Efficiency", value: supplierRating.efficiency || 0 },
    { name: "Location", value: supplierRating.location || 0 },
    { name: "Condition", value: supplierRating.condition || 0 },
  ];

  // Extract fees and policies
  const feeBreakdown = car.car_info.pricing_info.fee_breakdown || {};
  const knownFees = feeBreakdown.known_fees || [];
  const fuelPolicy = feeBreakdown.fuel_policy || { type: "RETURN_SAME" };
  const mileageInfo = knownFees.find(fee => fee.type === "MILEAGE");
  const depositInfo = knownFees.find(fee => fee.type === "DEPOSIT");
  const damageExcess = knownFees.find(fee => fee.type === "DAMAGE_EXCESS");

  // Handle reservation button click
  const handleReserve = () => {
    // Navigate to secure page with required booking information
    navigate('/secure', {
      state: {
        price: discountedPriceInInr * 2, // Total price for 2 days
        currency: 'INR',
        dates: { pickup: today, dropoff: dropoffDate },
        guests: car.car_info.vehicle_info.seats,
        roomType: car.car_info.vehicle_info.v_name
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="flex items-center justify-between p-4">
          <button 
            onClick={handleGoBack}
            className="flex items-center text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>See All Cars</span>
          </button>
          <Button variant="ghost" size="icon">
            <Heart className="h-5 w-5" />
            <span className="sr-only">Save</span>
          </Button>
        </div>
        <Tabs defaultValue="overview" className="px-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="insurance">Insurance</TabsTrigger>
            <TabsTrigger value="policies">Policies</TabsTrigger>
          </TabsList>
        </Tabs>
      </header>

      <main className="container grid gap-6 px-4 py-6 md:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-lg border bg-card p-6">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <div className="inline-block rounded-md bg-green-800 px-3 py-1 text-sm text-white">90% OFF!</div>
                <h1 className="mt-4 text-2xl font-bold">{car.car_info.vehicle_info.group}</h1>
                <p className="text-sm text-muted-foreground">{car.car_info.vehicle_info.v_name} or similar</p>
              </div>
              <img
                src={car.car_info.vehicle_info.image_thumbnail_url}
                alt={car.car_info.vehicle_info.v_name}
                width={200}
                height={120}
                className="object-contain"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">👤 <span>{car.car_info.vehicle_info.seats} Passengers</span></div>
              <div className="flex items-center gap-2">🚪 <span>{car.car_info.vehicle_info.doors} Doors</span></div>
              <div className="flex items-center gap-2">❄️ <span>{car.car_info.vehicle_info.aircon ? "Air Conditioning" : "No A/C"}</span></div>
              <div className="flex items-center gap-2">⚙️ <span>{car.car_info.vehicle_info.transmission}</span></div>
              <div className="flex items-center gap-2">🛣️ <span>{car.car_info.vehicle_info.mileage}</span></div>
              <div className="flex items-center gap-2">⛽ <span>Fuel: {car.car_info.vehicle_info.fuel_policy}</span></div>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <img
                src={car.car_info.supplier_info.logo_url}
                alt={car.car_info.supplier_info.name}
                width={60}
                height={20}
                className="object-contain"
              />
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="ml-1 font-semibold">{supplierRating.average || "N/A"}</span>
                <span className="ml-2 text-sm text-muted-foreground">
                  {supplierRating.average_text || ""} ({supplierRating.no_of_ratings || 0} reviews)
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <div className="flex gap-4">
              <div className="h-12 w-12 shrink-0 rounded-lg border bg-blue-50 p-3">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="font-semibold">Free cancellation</h2>
                <p className="text-sm text-muted-foreground">
                  Lock in this price today, cancel free of charge anytime. Reserve now and pay at {car.car_info.pricing_info.pay_when === "PAY_NOW" ? "the time of booking" : "pick-up"}.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Car rental location</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <p>{today} - {dropoffDate}</p>
              </div>
              <div className="flex gap-4">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{car.car_info.supplier_info.name} - {pickupLocation}</p>
                  <p className="text-sm text-muted-foreground">{car.car_info.supplier_info.address}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Hours of operation</p>
                  <p className="text-sm text-muted-foreground">Mon-Sun: 24/7</p>
                </div>
              </div>
            </div>
            {car.car_info.supplier_info.pickup_instructions && (
              <div className="mt-4 rounded-lg bg-blue-50 p-4 text-sm">
                <h3 className="font-medium">Pickup Instructions:</h3>
                <p className="text-muted-foreground">{car.car_info.supplier_info.pickup_instructions}</p>
              </div>
            )}
            {car.car_info.supplier_info.dropoff_instructions && (
              <div className="mt-2 rounded-lg bg-blue-50 p-4 text-sm">
                <h3 className="font-medium">Dropoff Instructions:</h3>
                <p className="text-muted-foreground">{car.car_info.supplier_info.dropoff_instructions}</p>
              </div>
            )}
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Supplier Ratings</h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              {ratingCategories.map(category => (
                <div key={category.name} className="flex items-center justify-between">
                  <span className="text-sm">{category.name}</span>
                  <div className="flex items-center">
                    <span className="mr-2 font-medium">{category.value.toFixed(1)}</span>
                    <div className="h-2 w-16 rounded-full bg-gray-200">
                      <div 
                        className="h-2 rounded-full bg-green-500" 
                        style={{ width: `${(category.value / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border bg-card p-6">
            <div className="mb-6">
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-bold">₹{discountedPriceInInr}</span>
                <span className="text-muted-foreground">per day</span>
              </div>
              <p className="text-sm text-green-500">Free cancellation</p>
              <p className="text-sm text-muted-foreground">
                {car.car_info.pricing_info.pay_when === "PAY_NOW" ? "Pay at booking" : "Pay at pick-up"}
              </p>
              {car.car_info.pricing_info.deposit > 0 && (
                <p className="text-sm text-muted-foreground">
                  Deposit required: ${car.car_info.pricing_info.deposit.toFixed(2)}
                </p>
              )}
            </div>
            <div className="mb-4">
              <h3 className="font-medium">Included with this car rental</h3>
              
              {/* Included features */}
              <div className="mt-2 flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">{car.car_info.vehicle_info.unlimited_mileage ? "Unlimited mileage" : "Limited mileage"}</span>
              </div>
              
              {car.car_info.vehicle_info.free_cancellation && (
                <div className="mt-2 flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Free cancellation</span>
                </div>
              )}
              
              {car.car_info.freebies && car.car_info.freebies.map((freebie, index) => (
                <div key={index} className="mt-2 flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{freebie}</span>
                </div>
              ))}
              
              {car.car_info.content.badges && car.car_info.content.badges.map((badge, index) => (
                <div key={index} className="mt-2 flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Rental Policies</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <h3 className="font-medium">Fuel Policy</h3>
                  <p className="text-sm text-muted-foreground">
                    {fuelPolicy.type === "RETURN_SAME" ? "Return with the same amount of fuel" : "Specific fuel policy applies"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h3 className="font-medium">Mileage</h3>
                  <p className="text-sm text-muted-foreground">
                    {car.car_info.vehicle_info.unlimited_mileage ? "Unlimited mileage included" : "Limited mileage - see terms"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h3 className="font-medium">Insurance</h3>
                  <p className="text-sm text-muted-foreground">
                    Damage excess: {damageExcess?.amount === 0 ? "Fully covered" : `$${damageExcess?.amount || "N/A"}`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Price details</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <div>
                  <p>Car rental fee x 2 days</p>
                  <p className="text-sm text-muted-foreground">₹{discountedPriceInInr} per day</p>
                </div>
                <p>₹{discountedPriceInInr * 2}</p>
              </div>
              <div className="flex justify-between">
                <p>Taxes and fees</p>
                <p>included</p>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-medium">
                  <p>Total</p>
                  <p>₹{discountedPriceInInr * 2}</p>
                </div>
              </div>
              <Button className="w-full" size="lg" onClick={handleReserve}>
                Reserve
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}