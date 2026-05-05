import './App.css';
import Navbar from './components/navbar/Navbar.jsx';
import Footer from './components/footer/Footer.jsx';
import MediaCard from './components/mediacard/MediaCard.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Perfil from './components/Profile/Perfil.jsx';
import ResetPassword from './components/Profile/ResetPassword.jsx';
import Reviews from './components/Reviews/Reviews.jsx';

function App(){
  return (
    
    <div>
      <Navbar/>
      <div className='cards-container'>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
      </BrowserRouter>
      <Footer/>

    </div>
  );
}

export default App;