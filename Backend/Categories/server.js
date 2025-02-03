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
app.use(cors({
  origin: ['http://localhost:5173', 'https://untrip-iuqz.onrender.com'], // Allow only requests from your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
}));
// Routes
app.use('/api', hotelRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
