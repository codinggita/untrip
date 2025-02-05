import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home-header';
import Search from './components/Search';  
import Sale from './components/sale';  
import Hotel from './components/HotelList';
import Resort from './components/resort';
import Footer from './components/Footer';  
import Page from './components/Page';



// import HotelDetail from './components/HotelDetail';  

function App() {
  return (
    <Router>
      <Home />
      <Routes>
        {/* Home page with multiple components */}
        <Route path="/" element={
          <>
            <Search /> 
            <Sale />
            <Hotel />
            <Resort />

          </>
        } />

        {/* Dynamic route for hotel details */}
        <Route path="/hotel/:id" element={
          <>
            <Page />
            
          </>
        } />
        
        
         

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
