const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const db = mongoose.connection;

router.get("/api/car-rental/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Requested ObjectId:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: false, message: "Invalid ObjectId format" });
    }

    const carRental = await db.collection("CarRentals").findOne({ _id: new mongoose.Types.ObjectId(id) });

    console.log("Query Result:", carRental);

    if (!carRental) {
      return res.status(404).json({ status: false, message: "Car rental not found" });
    }

    return res.json({ status: true, message: "Success", data: carRental });
  } catch (error) {
    console.error("Error fetching car:", error);
    return res.status(500).json({ status: false, message: "Internal Server Error" });
  }
});

router.get("/api/car-rentals", async (req, res) => {
  try {
    console.log("Fetching all car rentals...");

    const carRentals = await db.collection("CarRentals").find({}).toArray();

    console.log("Total Cars Found:", carRentals.length);

    if (carRentals.length === 0) {
      return res.status(404).json({ status: false, message: "No car rentals found" });
    }

    return res.json({ status: true, message: "Success", data: carRentals });
  } catch (error) {
    console.error("Error fetching all cars:", error);
    return res.status(500).json({ status: false, message: "Internal Server Error" });
  }
});

router.get("/api/search-car", async (req, res) => {
  try {
    const { pickup, dropoff, car_name, min_price, max_price } = req.query;
    let query = {};

    if (pickup) {
      query["car_info.route_info.pickup.name"] = { $regex: new RegExp(pickup, "i") };
    }
    if (dropoff) {
      query["car_info.route_info.dropoff.name"] = { $regex: new RegExp(dropoff, "i") };
    }
    if (car_name) {
      query["car_info.vehicle_info.v_name"] = { $regex: new RegExp(car_name, "i") };
    }
    if (min_price || max_price) {
      query["car_info.pricing_info.price"] = {};
      if (min_price) query["car_info.pricing_info.price"].$gte = parseFloat(min_price);
      if (max_price) query["car_info.pricing_info.price"].$lte = parseFloat(max_price);
    }

    console.log("Search Query:", query);

    const carRentals = await db.collection("CarRentals").find(query).toArray();

    console.log("Cars Found:", carRentals.length);

    if (carRentals.length === 0) {
      return res.status(404).json({ status: false, message: "No cars found matching criteria" });
    }

    return res.json({ status: true, message: "Success", data: carRentals });
  } catch (error) {
    console.error("Error searching cars:", error);
    return res.status(500).json({ status: false, message: "Internal Server Error" });
  }
});

module.exports = router;
