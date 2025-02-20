const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const db = mongoose.connection;

// ✅ GET Single Car Rental by ID
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

module.exports = router;
