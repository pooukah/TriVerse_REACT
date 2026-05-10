import './App.css';
import Navbar from './components/navbar/Navbar.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AfegirReview from './components/Reviews/AfegirReview.jsx';
import Footer from './components/footer/Footer.jsx';
import { estaLogueado } from './utils'; 
import MediaCard from './components/mediacard/MediaCard.jsx';
import MediaPage from './components/MediaPage/MediaPage.jsx';
import Home from './components/home/Home.jsx';
import Reviews from './components/Reviews/Reviews.jsx';
import Perfil from './components/Profile/Perfil.jsx';
import AfegirDonacio from './components/Reviews/AfegirDonacio.jsx';
import ResetPassword from './components/Profile/ResetPassword.jsx';
function Games() {
  return <MediaPage title="Videojuegos" type="Game" />;
}

function Movies() {
  return <MediaPage title="Películas" type="Movie" />;
}

function Books() {
  return <MediaPage title="Libros" type="Book" />;
}


function App(){
  const isAuth = estaLogueado();
  return (
    <div>
      <Navbar />
      <div className="cards-container"></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reviews/:id" element={<Reviews />} />
        <Route path="/afegirReview/:id" element={<AfegirReview />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/videojuegos" element={<Games />} />
        <Route path="/peliculas" element={<Movies />} />
        <Route path="/libros" element={<Books />} />
        <Route path="/afegirDonacio" element={<AfegirDonacio />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;