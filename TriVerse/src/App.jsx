import './App.css';
import Navbar from './components/navbar/Navbar.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Perfil from './components/Profile/Perfil.jsx';
import ResetPassword from './components/Profile/ResetPassword.jsx';
import Reviews from './components/Reviews/Reviews.jsx';
import AfegirReview from './components/Reviews/Reviews.jsx';

function App(){
  const isAuth = estaLogueado();
  return (
  
    <div>
      <Navbar/>
      <div className='cards-container'>
        <MediaCard/>
        <MediaCard/>
      </div>
      <Footer/>
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