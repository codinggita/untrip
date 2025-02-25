# Untrip

## 🌟 Project Overview
Untrip is an advanced travel website designed to simplify the trip-planning experience. It integrates hotel listings, flight details, car rentals, and destination insights, ensuring travelers can plan their trips efficiently without switching between multiple platforms.

---

## 🔗 Links
- **[Design (Figma)](https://www.figma.com/design/gQcM2hxRY0cqrN2irhow0u/Untrip?node-id=0-3&t=fF01wc2Z4w8VOQER-1)**
- **[Postman API Documentation](https://documenter.getpostman.com/view/39189780/2sAYXFgc6j)**
- **[Frontend Deployment](https://untrip-iuqz.onrender.com/)**

### 🚀 Backend Services:
- **Authentication**: [Live API](https://untrip.onrender.com/)
- **Hotels**: [Live API](https://untrip-1.onrender.com/api/hotels)
- **Flights**: [Live API](https://untrip-flights-backend.onrender.com)
- **Car Rentals**: [Live API](https://untrip-1.onrender.com/car/api/car-rentals)

---

## 🔒 Authentication API Routes
| Endpoint                 | Method | Description  |
|--------------------------|--------|--------------|
| `/api/auth/register`       | POST   | Create an account |
| `/api/auth/login`       | POST   | User login |
| `/api/auth/forgot-password`       | POST   | Forgot-Password |
| `/api/auth/verify-otp`       | POST   | Verify-otp |
| `/api/auth/reset-password`       | POST   | Reset-Password |

---

## 🏨 Hotels API Routes
| Endpoint               | Method | Description |
|------------------------|--------|-------------|
| `/api/hotels`         | GET    | Fetch all hotels |
| `/api/hotel/:id`      | GET    | Fetch specific hotel details |
| `/api//search-hotels`      | GET    | Fetch hotels by destination & dates with validation |
| `/api/hotels/raw`      | GET    | Fetch Raw Hotel Data |


---

## ✈️ Flights API Routes
| Endpoint              | Method | Description |
|-----------------------|--------|-------------|
| `/api/flights`        | GET    | Fetch flight listings |
| `/api/flight/:id`     | GET    | Fetch specific flight details |

---

## 🚗 Car Rentals API Routes
| Endpoint            | Method | Description |
|---------------------|--------|-------------|
| `/car/api/car-rentals`        | GET    | Fetch available cars |
| `/car/api/car-rental/:id`     | GET    | Fetch specific car details |
| `/car/car/api/car-rentals`     | GET    | Fetch hotels by destination |


---

## 🎯 Problem Statement
**What problem does this project solve?**  
Many travelers struggle with booking hotels, flights, and car rentals across different platforms. Untrip centralizes all these services in one place for a seamless experience.

---

## 🔍 Existing Solutions
Existing platforms like **Expedia** and **Booking.com** offer similar services but often lack an integrated and user-friendly approach tailored for seamless trip planning.

---

## 💡 Proposed Solution
A well-structured, intuitive travel website that provides:
- Real-time hotel, flight, and car rental listings
- AI-powered recommendations based on user preferences
- Interactive destination insights and travel tips

---

## 🌟 Features
- Smart hotel search with filtering options
- Flight booking and price comparison
- Car rental services
- Interactive destination guides
- AI-powered trip suggestions
- Secure booking process

---

## 🌍 Target Audience
- Frequent travelers
- Business professionals
- Families planning vacations
- Solo adventurers looking for easy booking solutions

---

## 🔥 Unique Selling Point (USP)
- One-stop platform for hotels, flights, and car rentals
- AI-powered personalized travel recommendations
- Secure and seamless booking experience

---

## 🛠️ Tools & Technologies
### Resources:
- High-quality travel-related images & content
- Extensive hotel and flight databases

### Tech Stack:
- **Frontend:** React, Tailwind CSS  
- **Backend:** Node.js, Express, MongoDB  
- **Design:** Figma  
- **Hosting:** Render  

---

## 📊 Success Metrics
### Key Metrics:
- Number of website visitors
- Number of completed bookings

### Feedback Collection:
- User reviews and ratings
- Direct feedback via surveys

---

## 🛠️ Risks & Challenges
| Risk | Solution |
|------|----------|
| Real-time booking delays | Optimize API performance and caching |
| High competition from established platforms | Offer unique AI-based trip planning features |
| Securing user payment information | Implement top-tier encryption and security measures |

---

## 🚀 Future Plans
- Add a **travel itinerary planner**
- Implement a **loyalty program for frequent users**
- Introduce **multi-currency support and local language translations**

---

## 🤝 Partnerships
Potential collaborations with airlines, hotel chains, and car rental services to enhance user experience and provide exclusive deals.

---

## 📌 Conclusion
Untrip is an all-in-one travel planner designed to simplify trip booking with real-time hotel, flight, and car rental listings. It ensures a seamless and personalized travel experience for users worldwide.

---

🌎 **Travel Smarter, Travel Better with Untrip!**
