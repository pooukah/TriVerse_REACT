import './App.css';
import Navbar from './components/navbar/Navbar.jsx';
import Footer from './components/footer/Footer.jsx';
import MediaCard from './components/mediacard/MediaCard.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Perfil from './components/Perfil.jsx';
import ResetPassword from './components/ResetPassword.jsx';
import Reviews from './components/Reviews.jsx';
import AfegirReview from './components/AfegirReview.jsx';

function App(){
  return (
    /*
    <div>
      <Navbar/>
      <div className='cards-container'>
        <MediaCard/>
        <MediaCard/>
      </div>
      <Footer/>*/
    <BrowserRouter>
        <Routes>
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/afegirReview" element={<AfegirReview />} />
        </Routes>
      </BrowserRouter>
    /*</div>*/
  );
}

export default App;