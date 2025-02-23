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
  const isSignInPage = location.pathname === "/signin"; 
  return (
    <>
      {!isSignInPage && <Header />}
      <Routes>
        <Route path="/signin" element={<SignIn />} />
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
      {!isSignInPage && <Footer />}
    </>
  );
}

export default App;
