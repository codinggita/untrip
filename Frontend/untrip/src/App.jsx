import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home-header';
import Search from './components/Search';  
import Sale from './components/sale';  
import Hotel from './components/HotelList';  
import HotelDetail from './components/HotelDetail';  // Import the new hotel detail page

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page with multiple components */}
        <Route path="/" element={
          <>
            <Home />
            <Search /> 
            <Sale />
            <Hotel />
          </>
        } />

        {/* Dynamic route for hotel details */}
        <Route path="/hotel/:id" element={<HotelDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
