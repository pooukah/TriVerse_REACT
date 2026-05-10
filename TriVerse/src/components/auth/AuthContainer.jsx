import { useState, useEffect } from 'react';
import './auth.css';

const AuthContainer = ({ onSuccess, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  
  // Estado para mensajes de error de validación local
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setUsername('');
    setPassword('');
    setEmail('');
    setName('');
    setSurname('');
    setErrors({});
  }, [isLogin]);

  // --- FUNCIONES DE TEST/VALIDACIÓN ---
  
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (pass) => {
    // Requisitos: Mínimo 8 caracteres, 1 Mayúscula, 1 Número
    const hasNumber = /\d/.test(pass);
    const hasUpper = /[A-Z]/.test(pass);
    const hasMinLength = pass.length >= 8;
    
    return hasNumber && hasUpper && hasMinLength;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let localErrors = {};

    if (!isLogin) {
      if (!validateEmail(email)) {
        localErrors.email = "El correo no tiene un formato válido.";
      }
      if (!validatePassword(password)) {
        localErrors.password = "La contraseña requiere: 8+ caracteres, una mayúscula y un número.";
      }
    }

    if (Object.keys(localErrors).length > 0) {
      setErrors(localErrors);
      return; 
    }

    const url = isLogin ? 'http://127.0.0.1:8000/api/login/' : 'http://127.0.0.1:8000/api/register/';
    const datos = isLogin 
      ? { username, password } 
      : { username, password, email, name, surname };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });
      
      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          const fecha = new Date();
          fecha.setTime(fecha.getTime() + (24 * 60 * 60 * 1000));
          document.cookie = `token=${data.token}; expires=${fecha.toUTCString()}; path=/; SameSite=Lax`;
          onSuccess();
          window.location.reload();
        } else {
          alert("¡Registrado con éxito!");
          setIsLogin(true);
        }
      } else {
        console.error("Errores del servidor:", data);
        // Si el servidor devuelve errores de campos específicos (ej: el usuario ya existe)
        setErrors(typeof data === 'object' ? data : { server: "Error en la petición" });
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      setErrors({ connection: "No se pudo conectar con el servidor" });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <div className="tabs">
          <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>LOGIN</button>
          <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>REGISTRO</button>
        </div>

        <form onSubmit={handleSubmit}>
          <input 
            className="auth-input" 
            type="text" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
          {errors.username && <span className="error-text">{errors.username}</span>}

          <input 
            className="auth-input" 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          {errors.password && <span className="error-text">{errors.password}</span>}
          
          {!isLogin && (
            <>
              <input 
                className="auth-input" 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
              {errors.email && <span className="error-text">{errors.email}</span>}

              <input 
                className="auth-input" 
                type="text" 
                placeholder="Nombre" 
                value={name}
                onChange={(e) => setName(e.target.value)} 
                required 
              />
              <input 
                className="auth-input" 
                type="text" 
                placeholder="Apellido" 
                value={surname}
                onChange={(e) => setSurname(e.target.value)} 
                required 
              />
            </>
          )}

          {errors.non_field_errors && <div className="error-text">{errors.non_field_errors}</div>}
          {errors.connection && <div className="error-text">{errors.connection}</div>}
          
          <button type="submit" className="btn-yellow">
            {isLogin ? 'Entrar' : 'Crear Usuario'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthContainer;