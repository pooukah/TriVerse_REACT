import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Asegúrate de haber hecho: npm install jwt-decode
import { estaLogueado } from '../../utils';
import Modal from '../auth/Modal.jsx';
import AuthContainer from '../auth/AuthContainer';
import './Navbar.css';

const Navbar = () => {
  const [logged, setLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const tokenOk = estaLogueado();
    setLogged(tokenOk);

    if (tokenOk) {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

      if (token) {
        try {
          const decoded = jwtDecode(token);
          setIsAdmin(decoded.is_admin === true);

        } catch (error) {
          console.error("Error decodificando el token:", error);
          setIsAdmin(false);
        }
      }
    } else {
      setIsAdmin(false);
    }
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setLogged(false);
    setIsAdmin(false);
    setDropdownOpen(false);
    navigate("/");
    window.location.reload(); 
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

        {logged && isAdmin && (
          <Link to="/add-object" className="btn btn-admin">
            + Añadir Objeto
          </Link>
        )}

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

      {showAuthModal && (
        <Modal onClose={() => setShowAuthModal(false)}>
          <AuthContainer 
            onSuccess={() => {
              setShowAuthModal(false);
              setLogged(true);
            }} 
            onClose={() => setShowAuthModal(false)} 
          />
        </Modal>
      )}
    </nav>
  );
}

export default Navbar;