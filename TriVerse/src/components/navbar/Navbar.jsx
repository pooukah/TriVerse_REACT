import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { estaLogueado } from '../../utils';
import Modal from '../auth/Modal';
import AuthContainer from '../auth/AuthContainer';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [logged, setLogged] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLogged(estaLogueado());
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setLogged(false);
    setDropdownOpen(false);
    navigate("/");
    window.location.reload(); // Para asegurar que el estado de auth se limpie en toda la app
  };

  return (
    <nav className="navbar">
      <h2 className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        TriVerse
      </h2>

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
                <div 
                  className="dropdown-item" 
                  onClick={() => { navigate('/perfil'); setDropdownOpen(false); }}
                >
                  Mi Perfil
                </div>
                <div className="dropdown-item logout-item" onClick={handleLogout}>
                  Logout
                </div>
              </div>
            )}
          </div>
        ) : (
          <button className="btn" onClick={() => setShowAuthModal(true)}>
            Registro / Login
          </button>
        )}
      </div>

      {/* --- EL MODAL CON PORTAL --- */}
      {showAuthModal && (
        <Modal onClose={() => setShowAuthModal(false)}>
          <AuthContainer 
            onSuccess={() => {
              setShowAuthModal(false);
              setLogged(true);
            }} 
            onClose={() => setShowAuthModal(false)} // Pasamos también aquí si el componente interno tiene su propia X
          />
        </Modal>
      )}
    </nav>
  );
}

export default Navbar;