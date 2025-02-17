const express = require('express');
const Hotel = require('../models/hotel');

const router = express.Router();


router.get('/hotels', async (req, res) => {
  try {
    const hotels = await Hotel.find({})
      .select({
        'property.name': 1,
        'property.photoUrls': 1,  // Select all images
        'property.wishlistName': 1,
        'property.reviewScore': 1,
        'property.priceBreakdown.grossPrice.value': 1,
        'property.priceBreakdown.grossPrice.currency': 1,
      })
      .limit(100);

    if (hotels.length === 0) {
      return res.status(404).json({ message: "No hotels found!" });
    }

    const formattedHotels = hotels.map(hotel => ({
      id: hotel._id,  // Include hotel ID
      name: hotel.property?.name || 'No name available',
      images: hotel.property?.photoUrls || [], // Include all images
      city: hotel.property?.wishlistName || 'No city available',
      rating: hotel.property?.reviewScore || 'No rating',
      price: {
        value: hotel.property?.priceBreakdown?.grossPrice?.value || 'N/A',
        currency: hotel.property?.priceBreakdown?.grossPrice?.currency || 'N/A',
      },
    }));

    res.json(formattedHotels);
  } catch (error) {
    console.error('Error fetching hotels:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//  NEW ROUTE: Fetch hotels by destination & dates with validation
router.get('/search-hotels', async (req, res) => {
  try {
    const { destination, checkinDate, checkoutDate } = req.query;

    // Check for valid destination
    const availableDestinations = await Hotel.distinct('property.wishlistName');
    if (destination && !availableDestinations.includes(destination)) {
      return res.status(404).json({ message: `No hotels available for the destination: ${destination}` });
    }

    // Build the query object for filtering
    let query = {};
    
    if (destination) {
      query['property.wishlistName'] = destination;  // Filter by destination
    }

    if (checkinDate) {
      query['property.checkinDate'] = checkinDate;  // Filter by check-in date
    }

    if (checkoutDate) {
      query['property.checkoutDate'] = checkoutDate;  // Filter by checkout date
    }

    console.log("Search Query:", query);  // Debugging

    const hotels = await Hotel.find(query)
      .select({
        'property.name': 1,
        'property.photoUrls': 1,
        'property.wishlistName': 1,
        'property.reviewScore': 1,
        'property.priceBreakdown.grossPrice.value': 1,
        'property.priceBreakdown.grossPrice.currency': 1,
      })
      .limit(100);

    if (hotels.length === 0) {
      return res.status(404).json({ message: "No hotels found for the selected filters!" });
    }

    const formattedHotels = hotels.map(hotel => ({
      id: hotel._id,
      name: hotel.property?.name || 'No name available',
      images: hotel.property?.photoUrls || [],
      city: hotel.property?.wishlistName || 'No city available',
      rating: hotel.property?.reviewScore || 'No rating',
      price: {
        value: hotel.property?.priceBreakdown?.grossPrice?.value || 'N/A',
        currency: hotel.property?.priceBreakdown?.grossPrice?.currency || 'N/A',
      },
    }));

    res.json(formattedHotels);
  } catch (error) {
    console.error('Error fetching hotels:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/hotels/raw', async (req, res) => {
  try {
    console.log("Fetching raw hotel data..."); 
    
    const hotels = await Hotel.find({}).limit(100);
    
    if (hotels.length === 0) {
      console.log("No hotels found!");
      return res.status(404).json({ message: "No hotels found!" });
    }

    console.log("Hotels fetched successfully!");
    res.json(hotels);
  } catch (error) {
    console.error('🔥 Error fetching raw hotel data:', error); 
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Fetch a single hotel by ID
router.get('/hotels/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findById(id).select({
      'property.name': 1,
      'property.photoUrls': 1,
      'property.wishlistName': 1,
      'property.reviewScore': 1,
      'property.priceBreakdown.grossPrice.value': 1,
      'property.priceBreakdown.grossPrice.currency': 1,
      'property.description': 1,  // Add description if available
    });

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found!" });
    }

    const formattedHotel = {
      id: hotel._id,
      name: hotel.property?.name || 'No name available',
      images: hotel.property?.photoUrls || [],
      city: hotel.property?.wishlistName || 'No city available',
      rating: hotel.property?.reviewScore || 'No rating',
      price: {
        value: hotel.property?.priceBreakdown?.grossPrice?.value || 'N/A',
        currency: hotel.property?.priceBreakdown?.grossPrice?.currency || 'N/A',
      },
      description: hotel.property?.description || 'No description available',
    };

    res.json(formattedHotel);
  } catch (error) {
    console.error('Error fetching hotel:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
