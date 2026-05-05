import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { estaLogueado } from '../../utils';
import Modal from '../auth/Modal';
import AuthContainer from '../auth/AuthContainer';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [logged, setLogged] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    setLogged(estaLogueado());
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setLogged(false);
    window.location.assign("/");
  };

  return (
    <div className="navbar">
      <h2 className="logo" onClick={() => window.location.href='/'} style={{cursor:'pointer'}}>TriVerse</h2>

      <div className="botones">
            <Link to="/" className="btn">Home</Link>
            <Link to="/videojuegos" className="btn">Videojuegos</Link>
            <Link to="/peliculas" className="btn">Películas</Link>
            <Link to="/libros" className="btn">Libros</Link>
          

        {logged ? (
          <>
            <button className="btn" onClick={() => window.location.href='/perfil/me'}>Mi Perfil</button>
            <button className="btn" onClick={handleLogout} style={{color: '#ff4b4b'}}>Logout</button>
          </>
        ) : (
          <button className="btn" onClick={() => setShowAuthModal(true)}>Login / Registro</button>
        )}
      </div>

      {showAuthModal && (
        <Modal onClose={() => setShowAuthModal(false)}>
          <AuthContainer onSuccess={() => setShowAuthModal(false)} />
        </Modal>
      )}
    </div>
  );
}


export default Navbar;