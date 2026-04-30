import './App.css';
import Navbar from './components/navbar/Navbar.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Perfil from './components/Perfil.jsx';
import ResetPassword from './components/ResetPassword.jsx';
import Reviews from './components/Reviews.jsx';
import AfegirReview from './components/AfegirReview.jsx';
import Footer from './components/footer/Footer.jsx';
import { estaLogueado } from './utils'; // Importamos tu función

function App(){
  const isAuth = estaLogueado();
  return (
    
    <div>
      <Navbar/>
      <div className='cards-container'>
      <BrowserRouter>
        <Routes>
          <Route path="/perfil/:id" element={<Perfil />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/afegirReview" element={<AfegirReview />} />
        </Routes>
      </BrowserRouter>
      </div>
      <Footer/>

    </div>
  );
}

export default App;