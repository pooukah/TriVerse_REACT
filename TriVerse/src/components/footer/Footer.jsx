import React from 'react';
import './Footer.css';

const Footer = () =>{
    return(
        <div className="footer">
      <div className="seccion">
        <h3>TriVerse</h3>
      </div>

      <div className="seccion">
        <h4>Creadores:</h4>
        <p>Kiara Reyes</p>
        <p>Ray Palacios</p>
        <p>Jose Barco</p>
      </div>

      <div className="seccion">
        <h4>Contacto:</h4>
        <p>TriVerse@gmail.com</p>
        <p>+34 987 654 321</p>
      </div>
    </div>
    );
}

export default Footer;