import { useState } from 'react';

const AuthContainer = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

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
          onSuccess(); // Cierra el modal
          window.location.reload(); // Recarga para actualizar Navbar
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
    <div className="auth-container">
      <div className="tabs">
        <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>LOGIN</button>
        <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>REGISTRO</button>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        {!isLogin && (
          <>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
            <input type="text" placeholder="Nombre" onChange={(e) => setName(e.target.value)} required />
            <input type="text" placeholder="Apellido" onChange={(e) => setSurname(e.target.value)} required />
          </>
        )}
        <button type="submit">{isLogin ? 'Entrar' : 'Crear Usuario'}</button>
      </form>
    </div>
  );
};

export default AuthContainer;