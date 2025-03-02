import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
    MapPin, Star, Wifi, Car, Coffee, Utensils, 
    Phone, Mail, Globe, Camera, Check, X,
    Sun, Moon, Bed, Bath, Users, Key
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../css/Hotel-Listing.css';

const HotelListing = () => {
    const { id } = useParams();
    const [hotelData, setHotelData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedDates, setSelectedDates] = useState({ checkIn: null, checkOut: null });
    const [guestCount, setGuestCount] = useState(1);
    const [showGallery, setShowGallery] = useState(false);
    const navigate = useNavigate();
    const [selectionError, setSelectionError] = useState(null);
    const [activeRoom, setActiveRoom] = useState(null);
    const [showAllAmenities, setShowAllAmenities] = useState(false);
    
    const usdToInrRate = 87.22;
    
    const discountPercentage = 90;

    // Convert USD to INR and apply discount
    const convertAndDiscount = (usdPrice) => {
        if (usdPrice === 'N/A') return 'N/A';
        const inrPrice = usdPrice * usdToInrRate;
        const discountedPrice = inrPrice * (1 - discountPercentage / 100);
        return Math.round(discountedPrice);
    };

    useEffect(() => {
        fetch('https://untrip-1.onrender.com/api/hotels/raw')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                const hotel = data.find(hotel => hotel._id === id || hotel.hotel_id.toString() === id);
                if (hotel) {
                    // Initialize with empty arrays/objects to prevent rendering errors
                    setHotelData({
                        ...hotel,
                        roomTypes: [],
                        additionalAmenities: [],
                        policies: {
                            checkIn: { from: '', to: '' },
                            checkOut: { until: '' },
                            cancellation: '',
                            children: '',
                            pets: ''
                        }
                    });
                    
                    // Simulate loading additional hotel details
                    setTimeout(() => {
                        setHotelData(prev => ({
                            ...prev,
                            additionalAmenities: [
                                { icon: 'spa', name: 'Spa Services', description: 'Full-service spa available' },
                                { icon: 'gym', name: 'Fitness Center', description: '24/7 access' },
                                { icon: 'pool', name: 'Swimming Pool', description: 'Outdoor heated pool' }
                            ],
                            roomTypes: [
                                {
                                    name: 'Deluxe Room',
                                    price: 200,
                                    amenities: ['King Bed', 'City View', 'Mini Bar'],
                                    maxOccupancy: 2,
                                    size: '35m²'
                                },
                                {
                                    name: 'Executive Suite',
                                    price: 350,
                                    amenities: ['Living Room', 'Ocean View', 'Kitchenette'],
                                    maxOccupancy: 3,
                                    size: '55m²'
                                },
                                {
                                    name: 'Presidential Suite',
                                    price: 500,
                                    amenities: ['Multiple Rooms', 'Panoramic View', 'Private Butler'],
                                    maxOccupancy: 4,
                                    size: '85m²'
                                }
                            ],
                            policies: {
                                checkIn: { from: '15:00', to: '23:00' },
                                checkOut: { until: '11:00' },
                                cancellation: '24 hours before check-in',
                                children: 'Welcome - special amenities available',
                                pets: 'Pet-friendly with additional fee'
                            }
                        }));
                    }, 1000);
                } else {
                    setError("Hotel not found with ID: " + id);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching hotel data:', error);
                setError(error.message);
                setLoading(false);
            });
    }, [id]);

    const handleReserveNow = () => {
        // Clear any previous error messages
        setSelectionError(null);
        
        // Check if dates are selected
        if (!selectedDates.checkIn || !selectedDates.checkOut) {
            setSelectionError("Please select check-in and check-out dates before reserving.");
            return;
        }
        
        // Check if a room is selected
        if (!activeRoom) {
            setSelectionError("Please select a room before reserving.");
            return;
        }
        
        // If all validations pass, proceed with reservation
        navigate('/secure', { 
            state: { 
                price: hotelData?.property?.priceBreakdown?.grossPrice?.value ? 
                    convertAndDiscount(hotelData.property.priceBreakdown.grossPrice.value) : 'N/A', 
                currency: 'INR',
                dates: selectedDates,
                guests: guestCount,
                roomType: activeRoom
            } 
        });
    };

    if (loading) return (
        <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading hotel information...</p>
        </div>
    );
    
    if (error) return (
        <div className="error-container">
            <X className="error-icon" />
            <h2>Error Loading Hotel</h2>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
    );

    // Check if all required data is loaded
    if (!hotelData || !hotelData.property) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading hotel details...</p>
            </div>
        );
    }

    const { property } = hotelData;
    const {
        name,
        reviewScore,
        reviewScoreWord,
        photoUrls,
        accessibilityLabel,
        reviewCount,
        propertyClass,
        priceBreakdown
    } = property;

    const originalPrice = priceBreakdown?.grossPrice?.value || 'N/A';
    const price = convertAndDiscount(originalPrice);
    const currency = 'INR'; 

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <div className="hotel-main-content">
                        <div className="hotel-header">
                            <div className="hotel-vip-badge">VIP Access</div>
                            <div className="hotel-quick-info">
                                <Check className="check-icon" /> Best Price Guarantee
                            </div>
                        </div>
                        
                        <h1 className="hotel-name-text">{name}</h1>
                        
                        <div className="hotel-star-rating">
                            {[...Array(propertyClass || 5)].map((_, i) => (
                                <Star key={i} className="hotel-star-icon" />
                            ))}
                            <span className="hotel-class-label">{propertyClass}-Star Property</span>
                        </div>

                        <div className="hotel-gallery-preview">
                            <div className="main-image">
                                <img src={photoUrls?.[0]} alt={name} />
                            </div>
                            <div className="thumbnail-grid">
                                {photoUrls?.slice(1, 5).map((url, index) => (
                                    <div key={index} className="thumbnail">
                                        <img src={url} alt={`${name} - ${index + 2}`} />
                                    </div>
                                ))}
                                <button 
                                    className="view-all-photos"
                                    onClick={() => setShowGallery(true)}
                                >
                                    <Camera /> View All Photos
                                </button>
                            </div>
                        </div>

                        <div className="hotel-features">
                            <div className="hotel-feature-item">
                                <Check className="feature-icon" />
                                <span>Fully refundable</span>
                            </div>
                            <div className="hotel-feature-item">
                                <Check className="feature-icon" />
                                <span>Reserve now, pay later</span>
                            </div>
                            <div className="hotel-feature-item">
                                <Check className="feature-icon" />
                                <span>Price Match Guarantee</span>
                            </div>
                        </div>

                        <div className="hotel-rating-section">
                            <div className="hotel-rating">
                                <span className="hotel-rating-score">{reviewScore}</span>
                                <div className="rating-details">
                                    <span className="hotel-rating-text">{reviewScoreWord}</span>
                                    <span className="review-count">{reviewCount} verified reviews</span>
                                </div>
                            </div>
                            <div className="rating-breakdown">
                                <div className="rating-category">
                                    <span>Cleanliness</span>
                                    <div className="rating-bar" style={{width: '95%'}}></div>
                                    <span>9.5</span>
                                </div>
                                <div className="rating-category">
                                    <span>Service</span>
                                    <div className="rating-bar" style={{width: '90%'}}></div>
                                    <span>9.0</span>
                                </div>
                                <div className="rating-category">
                                    <span>Location</span>
                                    <div className="rating-bar" style={{width: '85%'}}></div>
                                    <span>8.5</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'about':
                return (
                    <div className="hotel-about-section">
                        <h2 className="hotel-section-title">About this property</h2>
                        <p className="hotel-property-description">
                            {accessibilityLabel}
                        </p>

                        <div className="hotel-highlights">
                            <h3>Property Highlights</h3>
                            <div className="highlights-grid">
                                <div className="highlight-item">
                                    <Sun className="highlight-icon" />
                                    <h4>Perfect for longer stays</h4>
                                    <p>Self-service laundry, fully-equipped kitchen, and free WiFi</p>
                                </div>
                                <div className="highlight-item">
                                    <Users className="highlight-icon" />
                                    <h4>Family friendly</h4>
                                    <p>Kids stay free, children's pool, and family rooms available</p>
                                </div>
                            </div>
                        </div>

                        <div className="hotel-amenities-section">
                            <h3>Popular Amenities</h3>
                            <div className="hotel-amenities-grid">
                                <div className="hotel-amenity-item">
                                    <Wifi className="hotel-amenity-icon" />
                                    <div className="amenity-details">
                                        <span>Free WiFi</span>
                                        <small>Available throughout the property</small>
                                    </div>
                                </div>
                                <div className="hotel-amenity-item">
                                    <Car className="hotel-amenity-icon" />
                                    <div className="amenity-details">
                                        <span>Free Parking</span>
                                        <small>On-site secure parking</small>
                                    </div>
                                </div>
                                <div className="hotel-amenity-item">
                                    <Coffee className="hotel-amenity-icon" />
                                    <div className="amenity-details">
                                        <span>Coffee Shop</span>
                                        <small>24/7 coffee and snacks</small>
                                    </div>
                                </div>
                                <div className="hotel-amenity-item">
                                    <Utensils className="hotel-amenity-icon" />
                                    <div className="amenity-details">
                                        <span>Restaurant</span>
                                        <small>International cuisine</small>
                                    </div>
                                </div>
                            </div>
                            
                            {!showAllAmenities ? (
                                <button 
                                    className="show-more-amenities"
                                    onClick={() => setShowAllAmenities(true)}
                                >
                                    Show all amenities
                                </button>
                            ) : (
                                <div className="all-amenities-grid">
                                    {/* Additional amenities would be listed here */}
                                </div>
                            )}
                        </div>

                        <div className="hotel-contact-section">
                            <h3>Contact Information</h3>
                            <div className="contact-grid">
                                <div className="contact-item">
                                    <Phone className="contact-icon" />
                                    <span>+1 (555) 123-4567</span>
                                </div>
                                <div className="contact-item">
                                    <Mail className="contact-icon" />
                                    <span>contact@hotel.com</span>
                                </div>
                                <div className="contact-item">
                                    <Globe className="contact-icon" />
                                    <span>www.hotel.com</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'rooms':
                // Check if roomTypes array exists and has data
                if (!hotelData.roomTypes || hotelData.roomTypes.length === 0) {
                    return (
                        <div className="loading-room-data">
                            <div className="loading-spinner"></div>
                            <p>Loading room information...</p>
                        </div>
                    );
                }

                return (
                    <div className="hotel-rooms-section">
                        <h2 className="hotel-section-title">Available Rooms</h2>
                        
                        <div className="room-filters">
                            <div className="date-picker">
                                <input 
                                    type="date" 
                                    value={selectedDates.checkIn || ''} 
                                    onChange={(e) => setSelectedDates(prev => ({
                                        ...prev,
                                        checkIn: e.target.value
                                    }))}
                                    min={new Date().toISOString().split('T')[0]}
                                />
                                <span>to</span>
                                <input 
                                    type="date"
                                    value={selectedDates.checkOut || ''}
                                    onChange={(e) => setSelectedDates(prev => ({
                                        ...prev,
                                        checkOut: e.target.value
                                    }))}
                                    min={selectedDates.checkIn || new Date().toISOString().split('T')[0]}
                                />
                            </div>
                            
                            <div className="guest-counter">
                                <button 
                                    onClick={() => setGuestCount(prev => Math.max(1, prev - 1))}
                                    disabled={guestCount <= 1}
                                >-</button>
                                <span>{guestCount} {guestCount === 1 ? 'Guest' : 'Guests'}</span>
                                <button 
                                    onClick={() => setGuestCount(prev => Math.min(4, prev + 1))}
                                    disabled={guestCount >= 4}
                                >+</button>
                            </div>
                        </div>

                        <div className="hotel-rooms-grid">
                            {hotelData.roomTypes.map((room, index) => (
                                <div 
                                    key={index} 
                                    className={`hotel-room-item ${activeRoom === room.name ? 'active' : ''}`}
                                    onClick={() => setActiveRoom(room.name)}
                                >
                                    <div className="room-header">
                                        <h3 className="hotel-room-name">{room.name}</h3>
                                        <span className="room-size">{room.size}</span>
                                    </div>

                                    <div className="room-details">
                                        <div className="room-amenities">
                                            <div className="amenity">
                                                <Users className="amenity-icon" />
                                                <span>Up to {room.maxOccupancy} guests</span>
                                            </div>
                                            <div className="amenity">
                                                <Bed className="amenity-icon" />
                                                <span>{room.amenities[0]}</span>
                                            </div>
                                            <div className="amenity">
                                                <Bath className="amenity-icon" />
                                                <span>Private Bathroom</span>
                                            </div>
                                        </div>

                                        <div className="room-features">
                                            {room.amenities.map((amenity, i) => (
                                                <span key={i} className="feature-tag">{amenity}</span>
                                            ))}
                                        </div>

                                        <div className="room-price-section">
                                            <div className="price-details">
                                                <span className="room-price">₹{convertAndDiscount(room.price)}</span>
                                                <span className="price-period">per night</span>
                                                <span className="original-price">₹{Math.round(room.price * usdToInrRate)}</span>
                                                <span className="discount-badge">90% OFF</span>
                                            </div>
                                            <button 
                                                className="select-room-button"
                                                onClick={() => {
                                                    setActiveRoom(room.name);
                                                    handleReserveNow();
                                                }}
                                            >
                                                Select Room
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Check if policies exist before accessing them */}
                        {hotelData.policies && (
                            <div className="room-policies">
                                <h3>Room Policies</h3>
                                <div className="policy-grid">
                                    <div className="policy-item">
                                        <Key className="policy-icon" />
                                        <div className="policy-content">
                                            <h4>Check-in/Check-out</h4>
                                            <p>Check-in from {hotelData.policies.checkIn.from}</p>
                                            <p>Check-out until {hotelData.policies.checkOut.until}</p>
                                        </div>
                                    </div>
                                    <div className="policy-item">
                                        <Users className="policy-icon" />
                                        <div className="policy-content">
                                            <h4>Children</h4>
                                            <p>{hotelData.policies.children}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );

            case 'accessibility':
                return (
                    <div className="hotel-accessibility-section">
                        <h2 className="hotel-section-title">Accessibility Features</h2>
                        
                        <div className="accessibility-overview">
                            <p>We are committed to providing accessible accommodations and services to all our guests. Our property features various accessibility options to ensure a comfortable stay for everyone.</p>
                        </div>

                        <div className="hotel-accessibility-grid">
                            <div className="hotel-accessibility-item">
                                <h3 className="hotel-subsection-title">Property Accessibility</h3>
                                <ul className="hotel-feature-list">
                                    <li>
                                        <Check className="feature-icon" />
                                        <span>Wheelchair-accessible parking</span>
                                    </li>
                                    <li>
                                        <Check className="feature-icon" />
                                        <span>Elevator</span>
                                    </li>
                                    <li>
                                        <Check className="feature-icon" />
                                        <span>Accessible bathroom</span>
                                    </li>
                                    <li>
                                        <Check className="feature-icon" />
                                        <span>Roll-in shower</span>
                                    </li>
                                    <li>
                                        <Check className="feature-icon" />
                                        <span>Braille signage</span>
                                    </li>
                                    <li>
                                        <Check className="feature-icon" />
                                        <span>Visual alarms in hallways</span>
                                    </li>
                                    <li>
                                        <Check className="feature-icon" />
                                        <span>Accessible reception desk</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="hotel-accessibility-item">
                                <h3 className="hotel-subsection-title">Room Accessibility</h3>
                                <ul className="hotel-feature-list">
                                    <li>
                                        <Check className="feature-icon" />
                                        <span>Wheelchair-accessible doors</span>
                                    </li>
                                    <li>
                                        <Check className="feature-icon" />
                                        <span>Grab bars in bathroom</span>
                                    </li>
                                    <li>
                                        <Check className="feature-icon" />
                                        <span>Visual fire alarm</span>
                                    </li>
                                    <li>
                                        <Check className="feature-icon" />
                                        <span>Lowered electrical outlets</span>
                                    </li>
                                    <li>
                                        <Check className="feature-icon" />
                                        <span>Height-adjusted amenities</span>
                                    </li>
                                    <li>
                                        <Check className="feature-icon" />
                                        <span>Emergency cord in bathroom</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="accessibility-contact">
                            <h3>Need Additional Assistance?</h3>
                            <p>Please contact our accessibility coordinator at least 24 hours before arrival to ensure we can best accommodate your needs.</p>
                            <button className="contact-button">
                                <Phone className="button-icon" />
                                Contact Accessibility Coordinator
                            </button>
                        </div>
                    </div>
                );

            case 'policies':
                // Check if policies exist before rendering the content
                if (!hotelData.policies) {
                    return (
                        <div className="loading-policies-data">
                            <div className="loading-spinner"></div>
                            <p>Loading policy information...</p>
                        </div>
                    );
                }

                return (
                    <div className="hotel-policies-section">
                        <h2 className="hotel-section-title">Hotel Policies</h2>

                        <div className="policies-grid">
                            <div className="policy-card">
                                <h3>Check-in/Check-out</h3>
                                <div className="time-details">
                                    <div className="time-item">
                                        <Sun className="time-icon" />
                                        <div>
                                            <h4>Check-in</h4>
                                            <p>{hotelData.policies.checkIn.from} - {hotelData.policies.checkIn.to}</p>
                                        </div>
                                    </div>
                                    <div className="time-item">
                                        <Moon className="time-icon" />
                                        <div>
                                            <h4>Check-out</h4>
                                            <p>Until {hotelData.policies.checkOut.until}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="policy-card">
                                <h3>Cancellation Policy</h3>
                                <p>Free cancellation up to {hotelData.policies.cancellation}</p>
                                <ul className="policy-details">
                                    <li>Full refund if cancelled within the specified time</li>
                                    <li>Changes to booking also available</li>
                                    <li>Contact hotel directly for late cancellations</li>
                                </ul>
                            </div>

                            <div className="policy-card">
                                <h3>Payment Options</h3>
                                <ul className="payment-methods">
                                    <li>Major credit cards accepted</li>
                                    <li>Digital payment methods available</li>
                                    <li>Cash accepted</li>
                                </ul>
                            </div>

                            <div className="policy-card">
                                <h3>House Rules</h3>
                                <div className="rules-grid">
                                    <div className="rule-item">
                                        <Users className="rule-icon" />
                                        <span>Age restriction: 18+</span>
                                    </div>
                                    <div className="rule-item">
                                        <Check className="rule-icon" />
                                        <span>{hotelData.policies.pets}</span>
                                    </div>
                                    <div className="rule-item">
                                        <Coffee className="rule-icon" />
                                        <span>Breakfast available</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="additional-info">
                            <h3>Additional Information</h3>
                            <ul>
                                <li>Government-issued photo ID required at check-in</li>
                                <li>Credit card required for incidental charges</li>
                                <li>Special requests cannot be guaranteed</li>
                            </ul>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="hotel-listing-container">
            <div className="hotel-tabs">
                {['overview', 'about', 'rooms', 'accessibility', 'policies'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`hotel-tab-item ${activeTab === tab ? 'hotel-tab-active' : ''}`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            <div className="hotel-listing-content">
                {renderTabContent()}

                <div className="hotel-map-section">
                    <div className="hotel-price-section">
                        <h2 className="hotel-price-title">Price Details</h2>
                        <div className="hotel-price-amount">
                            {currency} {price}
                            <span className="per-night">per night</span>
                        </div>
                        <div className="original-price-display">
                            <span>Original Price: {currency} {Math.round(originalPrice * usdToInrRate)}</span>
                            <span className="discount-label">90% OFF</span>
                        </div>
                        <div className="price-breakdown">
                            <div className="breakdown-item">
                                <span>Room rate</span>
                                <span>{currency} {Math.round(price * 0.8)}</span>
                            </div>
                            <div className="breakdown-item">
                                <span>Taxes and fees</span>
                                <span>{currency} {Math.round(price * 0.2)}</span>
                            </div>
                        </div>
                        <p className="hotel-price-description">Includes all taxes and charges</p>
                        
                        {/* Display error message if there's a selection error */}
                        {selectionError && (
                            <div className="selection-error-message">
                                <X className="error-icon" size={16} />
                                {selectionError}
                            </div>
                        )}
                        
                        <button 
                            className="hotel-book-button" 
                            onClick={handleReserveNow}
                        >
                            Reserve Now
                        </button>
                        <p className="booking-note">Free cancellation available</p>
                    </div>

                    <div className="location-section">
                        <h2 className="hotel-section-title">Location</h2>
                        <div className="hotel-map-container">
                            <img
                                src={photoUrls?.[0] || "https://images.unsplash.com/photo-1566073771259-6a8506099945"}
                                alt="Hotel"
                                className="hotel-map-image"
                            />
                            <button className="view-map-button">
                                <MapPin className="map-icon" />
                                View Full Map
                            </button>
                        </div>
                        
                        <div className="hotel-location-info">
                            <h3>{name}</h3>
                            <p className="location-address">123 Hotel Street, City, Country</p>
                        </div>

                        <div className="hotel-nearby-places">
                            <h3>Points of Interest</h3>
                            <div className="place-item">
                                <div className="place-info">
                                    <MapPin className="place-icon" />
                                    <div>
                                        <span>MIDC Industrial Estate</span>
                                        <p className="place-description">Business hub with multiple offices</p>
                                    </div>
                                </div>
                                <span className="drive-time">3 min drive</span>
                            </div>
                            <div className="place-item">
                                <div className="place-info">
                                    <MapPin className="place-icon" />
                                    <div>
                                        <span>NMIMS Mumbai</span>
                                        <p className="place-description">Premier educational institution</p>
                                    </div>
                                </div>
                                <span className="drive-time">4 min drive</span>
                            </div>
                            <div className="place-item">
                                <div className="place-info">
                                    <MapPin className="place-icon" />
                                    <div>
                                        <span>NMIMS Mumbai</span>
                                        <p className="place-description">Premier educational institution</p>
                                    </div>
                                </div>
                                <span className="drive-time">4 min drive</span>
                            </div>
                            <div className="place-item">
                                <div className="place-info">
                                    <MapPin className="place-icon" />
                                    <div>
                                        <span>Mumbai Airport</span>
                                        <p className="place-description">International terminal</p>
                                    </div>
                                </div>
                                <span className="drive-time">7 min drive</span>
                            </div>
                        </div>
                        <button className="see-more-button">
                            See all nearby attractions
                        </button>
                    </div>
                </div>
            </div>

            {showGallery && (
                <div className="gallery-modal">
                    <button className="close-gallery" onClick={() => setShowGallery(false)}>
                        <X />
                    </button>
                    <div className="gallery-grid">
                        {photoUrls?.map((url, index) => (
                            <div key={index} className="gallery-item">
                                <img src={url} alt={`${name} - ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HotelListing;