const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({}, { strict: false });

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
