import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Star, Wifi, Car, Coffee, Utensils } from 'lucide-react';
import '../css/Hotel-Listing.css'

const HotelListing = () => {
    const { id } = useParams();
    const [hotelData, setHotelData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        fetch('https://untrip-1.onrender.com/api/hotels/raw')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                const hotel = data.find(hotel => hotel._id === id || hotel.hotel_id.toString() === id);
                if (hotel) {
                    setHotelData(hotel);
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

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

    const price = priceBreakdown?.grossPrice?.value || 'N/A';
    const currency = priceBreakdown?.grossPrice?.currency || 'USD';

    const renderTabContent = () => {
        switch(activeTab) {
            case 'overview':
                return (
                    <div className="hotel-main-content">
                        <div className="hotel-vip-badge">VIP Access</div>
                        <h1 className="hotel-name-text">{name}</h1>
                        <div className="hotel-star-rating">
                            {[...Array(propertyClass || 5)].map((_, i) => (
                                <Star key={i} className="hotel-star-icon" />
                            ))}
                        </div>
                        <div className="hotel-features">
                            <div className="hotel-feature-item">
                                <span>Fully refundable</span>
                            </div>
                            <div className="hotel-feature-item">
                                <span>Reserve now, pay later</span>
                            </div>
                        </div>
                        <div className="hotel-rating-section">
                            <div className="hotel-rating">
                                <span className="hotel-rating-score">{reviewScore}</span>
                                <span className="hotel-rating-text">{reviewScoreWord}</span>
                            </div>
                            <a href="#" className="hotel-reviews-link">
                                See all {reviewCount} reviews
                            </a>
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
                        <div className="hotel-amenities-grid">
                            <div className="hotel-amenity-item">
                                <Wifi className="hotel-amenity-icon" />
                                <span>Free WiFi</span>
                            </div>
                            <div className="hotel-amenity-item">
                                <Car className="hotel-amenity-icon" />
                                <span>Free Parking</span>
                            </div>
                            <div className="hotel-amenity-item">
                                <Coffee className="hotel-amenity-icon" />
                                <span>Coffee Shop</span>
                            </div>
                            <div className="hotel-amenity-item">
                                <Utensils className="hotel-amenity-icon" />
                                <span>Restaurant</span>
                            </div>
                        </div>
                    </div>
                );
            case 'rooms':
                return (
                    <div className="hotel-rooms-section">
                        <h2 className="hotel-section-title">Available Rooms</h2>
                        <div className="hotel-rooms-grid">
                            {['Deluxe Room', 'Superior Room', 'Executive Suite'].map((room, index) => (
                                <div key={index} className="hotel-room-item">
                                    <h3 className="hotel-room-name">{room}</h3>
                                    <div className="hotel-room-amenities">
                                        <Wifi className="hotel-amenity-icon" />
                                        <Car className="hotel-amenity-icon" />
                                        <Coffee className="hotel-amenity-icon" />
                                    </div>
                                    <div className="hotel-room-price">
                                        <span className="hotel-price-amount">${100 + (index * 50)}</span>
                                        <button className="hotel-book-button">Book Now</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'accessibility':
                return (
                    <div className="hotel-accessibility-section">
                        <h2 className="hotel-section-title">Accessibility Features</h2>
                        <div className="hotel-accessibility-grid">
                            <div className="hotel-accessibility-item">
                                <h3 className="hotel-subsection-title">In the hotel</h3>
                                <ul className="hotel-feature-list">
                                    <li>Wheelchair-accessible parking</li>
                                    <li>Elevator</li>
                                    <li>Accessible bathroom</li>
                                    <li>Roll-in shower</li>
                                    <li>Braille signage</li>
                                </ul>
                            </div>
                            <div className="hotel-accessibility-item">
                                <h3 className="hotel-subsection-title">In the room</h3>
                                <ul className="hotel-feature-list">
                                    <li>Wheelchair-accessible doors</li>
                                    <li>Grab bars in bathroom</li>
                                    <li>Visual fire alarm</li>
                                    <li>Lowered electrical outlets</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            case 'policies':
                return (
                    <div className="hotel-policies-section">
                        <h2 className="hotel-section-title">Hotel Policies</h2>
                        <div className="hotel-policies-grid">
                            <div className="hotel-policy-item">
                                <h3 className="hotel-subsection-title">Check-in/Check-out</h3>
                                <div className="hotel-policy-details">
                                    <div>
                                        <p className="hotel-policy-label">Check-in time</p>
                                        <p className="hotel-policy-value">2:00 PM - 11:00 PM</p>
                                    </div>
                                    <div>
                                        <p className="hotel-policy-label">Check-out time</p>
                                        <p className="hotel-policy-value">11:00 AM</p>
                                    </div>
                                </div>
                            </div>
                            <div className="hotel-policy-item">
                                <h3 className="hotel-subsection-title">Important Information</h3>
                                <ul className="hotel-feature-list">
                                    <li>Government-issued photo ID required</li>
                                    <li>Credit card required for incidental charges</li>
                                    <li>Minimum check-in age is 18</li>
                                </ul>
                            </div>
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
                        className={`hotel-tab-item ${
                            activeTab === tab ? 'hotel-tab-active' : ''
                        }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            <div className="hotel-listing-content">
                {renderTabContent()}

                <div className="hotel-map-section">
                    <div className="hotel-price-section">
                        <h2 className="hotel-price-title">Price</h2>
                        <div className="hotel-price-amount">
                            {currency} {price}
                        </div>
                        <p className="hotel-price-description">Includes taxes and charges</p>
                        <button className="hotel-book-button">Reserve Now</button>
                    </div>

                    <h2 className="hotel-section-title">Explore the area</h2>
                    <div className="hotel-map-container">
                        <img
                            src={photoUrls?.[0] || "https://images.unsplash.com/photo-1566073771259-6a8506099945"}
                            alt="Hotel"
                            className="hotel-map-image"
                        />
                    </div>
                    <div className="hotel-location-info">
                        <p>{name}</p>
                        <a href="#" className="hotel-view-map-link">View in a map</a>
                    </div>

                    <div className="hotel-nearby-places">
                        <div className="hotel-place-item">
                            <div className="hotel-place-info">
                                <MapPin className="hotel-place-icon" />
                                <span>MIDC Industrial Estate</span>
                            </div>
                            <span className="hotel-drive-time">3 min drive</span>
                        </div>
                        <div className="hotel-place-item">
                            <div className="hotel-place-info">
                                <MapPin className="hotel-place-icon" />
                                <span>NMIMS Mumbai</span>
                            </div>
                            <span className="hotel-drive-time">4 min drive</span>
                        </div>
                        <div className="hotel-place-item">
                            <div className="hotel-place-info">
                                <MapPin className="hotel-place-icon" />
                                <span>Mumbai Airport</span>
                            </div>
                            <span className="hotel-drive-time">7 min drive</span>
                        </div>
                    </div>
                    <a href="#" className="hotel-see-more-link">See all about this area</a>
                </div>
            </div>
        </div>
    );
};

export default HotelListing;