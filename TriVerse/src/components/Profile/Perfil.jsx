import { useState, useEffect } from "react";
import edit_icon from '../../imatges/edit_icon.png';

function Perfil() {
    // Dades simulades de l'usuari
    
    const resetPassword = () => {
        window.location.assign("/resetPassword");
    }

    const [profileData, setProfileData] = useState([]);
        
        async function getProfileData() {
            const url = `http://127.0.0.1:8000/profile/`;
        const token = document.cookie
                .split('; ')
                .find(row => row.startsWith('token='))
                ?.split('=')[1];
                try {
                const response = await fetch(url, { 
                    method: "GET" ,
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                     }
                });
                if(response.ok) {
                    console.log("La consulta ha anata bé");
                } else {
                    console.log("La consulta a tingut algun error");
                    throw new Error(
                        `Error: ${response.status} - ${response.statusText}`
                    );
                }
                const data = await response.json();
                console.log(data);
                setProfileData(data);
                
            } catch (error) {
                console.log(error);
            } finally {
                console.log("Final de la consulta");
            }
        }
    
    
        useEffect(() => {
            getProfileData()
        },  [])
      
    return (
        <div>
            <div className="container-perfil">
                <div className="div-perfil">
                    <h1 className="titol-perfil">Perfil</h1>
                {profileData ? (
                    <ul className="dades-perfil">
                        <li>
                            <b>Nom d'usuari:</b> {profileData.username}
                        </li>
                        <li>
                            <b>Correu electrònic:</b> {profileData.email}
                        </li>
                        <li>
                            <b>Nom:</b> {profileData.first_name || profileData.name}
                        </li>
                        <li>
                            <b>Cognoms:</b> {profileData.last_name || profileData.surname}
                        </li>
    
                        <li>
                        <button className="boto-reset-password" onClick={resetPassword}>
                                Canviar contrasenya
                        </button>                        
                        </li>
                    </ul>
                ) : (
                    <p>Carregant dades...</p>
                )}                  
                </div>
            </div>
        </div>
    )
}

export default Perfil;