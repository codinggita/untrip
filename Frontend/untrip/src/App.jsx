import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/home-header';
import Search from './components/Search';  
import Sale from './components/sale';  
import Hotel from './components/HotelList';
import Destination from './components/Destination';
import Resort from './components/resort';
import CarRental from './components/Car-Rental';
import Footer from './components/Footer';
import Secure from './components/SecureBooking';
import Car from './components/CarSearchPage';
import SearchCar from './components/CarSearch';
import NotFound from './components/Error';  
import Page from './Pages/Page';
import HotelListing from './Pages/HotelListing';
import SignIn from './Userauth/Signin';
import ForgotPassword from './Userauth/ForgetPassword';
import PageFor from './Pages/PageSearch';

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

function MainContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/signin" || location.pathname === "/forgot-password"; 
  return (
    <>
      {!isAuthPage && <Header />}
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={
          <>
            <Search /> 
            <Sale />
            <Hotel />
            <Resort />
            <Destination />
          </>
        } />
        <Route path="/hotels" element={<PageFor />} />
        <Route path="/hotel/:id" element={<Page />} />
        <Route path="/HotelDetails/:id" element={<HotelListing />} />
        <Route path="/secure" element={<Secure />} />
        <Route path="/cars" element={<SearchCar />} />
        <Route path="/car-rental/:carId" element={<CarRental />} />
        <Route path="/SearchCar" element={<SearchCar />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAuthPage && <Footer />}
    </>
  );
}

export default App;
