import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { estaLogueado } from '../../utils';
import Modal from '../auth/Modal';
import AuthContainer from '../auth/AuthContainer';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [logged, setLogged] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  // Estado para controlar el despliegue del menú
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
          <div className="profile-dropdown-container">
            <button 
              className="btn btn-profile" 
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Mi Cuenta <span className="arrow">{dropdownOpen ? '▲' : '▼'}</span>
            </button>

            {dropdownOpen && (
              <div className="dropdown-list">
                <div className="dropdown-item" onClick={() => window.location.href='/perfil'}>
                   Mi Perfil
                </div>
                <div className="dropdown-item logout-item" onClick={handleLogout}>
                  Logout
                </div>
              </div>
            )}
          </div>
        ) : (
          <button className="btn" onClick={() => setShowAuthModal(true)}>Registro</button>
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