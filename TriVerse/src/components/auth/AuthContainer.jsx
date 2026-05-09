import { useState, useEffect } from 'react';
import './auth.css'; 

const AuthContainer = ({ onSuccess, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  useEffect(() => {
    setUsername('');
    setPassword('');
    setEmail('');
    setName('');
    setSurname('');
  }, [isLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = isLogin ? 'http://127.0.0.1:8000/api/login/' : 'http://127.0.0.1:8000/api/register/';
    const datos = { username, password, email, name, surname };

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
          fecha.setTime(fecha.getTime() + (1 * 24 * 60 * 60 * 1000));
          document.cookie = `token=${data.token}; expires=${fecha.toUTCString()}; path=/; SameSite=Lax`;
          onSuccess();
          window.location.reload();
        } else {
          alert("¡Registrado con éxito!");
          setIsLogin(true);
        }
      } else {
        alert("Error: Revisa los datos");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <div className="tabs">
          <button 
            className={isLogin ? 'active' : ''} 
            onClick={() => setIsLogin(true)}
          >
            LOGIN
          </button>
          <button 
            className={!isLogin ? 'active' : ''} 
            onClick={() => setIsLogin(false)}
          >
            REGISTRO
          </button>
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
          <input 
            className="auth-input"
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          
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
          
          <button type="submit" className="btn-yellow">
            {isLogin ? 'Entrar' : 'Crear Usuario'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthContainer;