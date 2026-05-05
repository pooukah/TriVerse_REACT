import './App.css';
import Navbar from './components/navbar/Navbar.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Perfil from './components/Perfil.jsx';
import ResetPassword from './components/resetpassword/ResetPassword.jsx';
import Reviews from './components/Reviews.jsx';
import AfegirReview from './components/AfegirReview.jsx';
import Footer from './components/footer/Footer.jsx';
import { estaLogueado } from './utils'; 
import MediaCard from './components/mediacard/MediaCard.jsx';
import MediaPage from './components/MediaPage/MediaPage.jsx';
import Home from './components/home/Home.jsx';

function Games() {
  return <MediaPage title="Videojuegos" data={[]} />;
}

function Movies() {
  return <MediaPage title="Películas" data={[]} />;
}

function Books() {
  return <MediaPage title="Libros" data={[]} />;
}

function App(){
  const isAuth = estaLogueado();
  return (
    <div>
      <Navbar/>
      <div className='cards-container'>
        <Routes>
          <Route path="/perfil/:id" element={<Perfil />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/afegirReview" element={<AfegirReview />} />
          <Route path="/" element={<Home />} />
          <Route path="/videojuegos" element={<Games />} />
          <Route path="/peliculas" element={<Movies />} />
          <Route path="/libros" element={<Books />} />
        </Routes>
      </div>
      <Footer/>
      
    </div>
  );
}

export default App;