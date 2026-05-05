import { useState } from "react";
import edit_icon from '../imatges/edit_icon.png';

function Perfil() {
    // Dades simulades de l'usuari
    const [user] = useState({
        name: "Marcos",
        lastname: "Pérez",
        email: "marcos@hotmail.com",
        username: "marcPerez98",
        password: "******",
    });

    const resetPassword = () => {
        window.location.assign("/resetPassword");
    }




    return (
        <div>
            <div className="container-perfil">
                <div className="div-perfil">
                    <h1 className="titol-perfil">Perfil</h1>
                    <div className="container-img-perfil">
                        <div className="div-imatge-perfil"></div>
                        <button className="boto-pujar-img">Pujar</button>
                    </div>
                    <ul className="dades-perfil">
                        <li>Nom: {user.name}</li>
                        <li>Cognoms: {user.lastname}</li>
                        <li>Correu electrònic: {user.email}</li>
                        <li>Nom d'usuari: {user.username}</li>
                        <li>Contrasenya: {user.password}<img src={edit_icon} onClick={resetPassword} alt="edit" className="icona-editar"/></li>
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default Perfil;