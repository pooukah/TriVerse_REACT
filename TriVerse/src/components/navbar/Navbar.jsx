import React from 'react';
import './Navbar.css';

const Navbar = () =>{
    return(
        <div className="navbar">
            <h2 className="logo">TriVerse</h2>

            <div className="botones">
                <button className="btn">Home</button>
                <button className="btn">Videojuegos</button>
                <button className="btn">Películas</button>
                <button className="btn">Libros</button>
            </div>
        </div>
    );
}

export default Navbar;