import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Perfil from './components/Perfil';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
