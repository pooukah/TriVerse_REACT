import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import eye_off_icon from '../../imatges/eye_off_icon.png';
import eye_visible from '../../imatges/eye_visible.png';
import './Profile.css';
function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const togglePassword = () => setShowPassword(!showPassword);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];
    if (!token) {
      setError('No has iniciat sessió');
      return;
    }
    try {
      const response = await fetch('http://127.0.0.1:8000/api/profilePassword/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      if (response.ok) {
        alert('Contrasenya canviada');
        navigate('/perfil');
      } else {
        const text = await response.text();
        let msg = 'Error en canviar la contrasenya';
        try { msg = JSON.parse(text).error || msg; } catch {}
        setError(msg);
      }
    } catch {
      setError('No s\'ha pogut connectar amb el servidor');
    }
  };
  return (
    <div className="container-reset-password">
      <div className="div-reset-password">
        <h1>Restablir contrasenya</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Contraseña:
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-password"
                required
              />
              <img
                src={showPassword ? eye_visible : eye_off_icon}
                onClick={togglePassword}
                alt="mostrar contrasenya"
                className="password-ocult"
              />
            </div>
          </label>
          {error && <p className="error-text">{error}</p>}
          <div className="botons-reset-password">
            <button type="button" onClick={() => navigate('/perfil')}>
              Cancel·lar
            </button>
            <button type="submit">Restablecer</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;