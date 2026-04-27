import './App.css';
import Navbar from './components/navbar/Navbar.jsx';
import Footer from './components/footer/Footer.jsx';
import MediaCard from './components/mediacard/MediaCard.jsx';

function App(){
  return (
    <div>
      <Navbar/>
      <div className='cards-container'>
        <MediaCard/>
        <MediaCard/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;