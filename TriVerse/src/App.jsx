import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Perfil from './components/Perfil';
import ResetPassword from './components/ResetPassword';
import Reviews from './components/Reviews';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/reviews" element={<Reviews />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
