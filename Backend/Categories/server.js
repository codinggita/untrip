const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const hotelRoutes = require('./routes/hotel');

const app = express();
const PORT = 3000;

// MongoDB Connection
mongoose.connect('mongodb+srv://yasarkhancg:untrip321@cluster0.7pln3.mongodb.net/untrip', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Middleware
app.use(express.json());

// Enable CORS for all origins
app.use(cors());

// Routes
app.use('/api', hotelRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
