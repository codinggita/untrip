import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/home-header';
import Search from './components/Search';  
import Sale from './components/sale';  
import Hotel from './components/HotelList';
import Destination from './components/Destination';
import Resort from './components/resort';
import Footer from './components/Footer';
import Secure from './components/SecureBooking';  
import Page from './Pages/Page';
import HotelListing from './Pages/HotelListing';
import SignIn from './Userauth/Signin';
import ForgetPassword from './Userauth/ForgetPassword';
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
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/" element={
          <>
            <Search /> 
            <Sale />
            <Hotel />
            <Resort />
            <Destination />
          </>
        } />
        <Route path="/hotels" element={
        <>
        <PageFor />
        </>} />
        <Route path="/hotel/:id" element={<Page />} />
        <Route path="/HotelDetails/:id" element={<HotelListing />} />
        <Route path="/secure" element={<Secure />} />
      </Routes>
      {!isAuthPage && <Footer />}
    </>
  );
}

export default App;
