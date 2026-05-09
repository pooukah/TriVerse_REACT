import { useState, useEffect } from "react";
import edit_icon from '../../imatges/edit_icon.png';

function Perfil() {
    // Dades simulades de l'usuari
    
    const resetPassword = () => {
        window.location.assign("/resetPassword");
    }

    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
        
        async function getProfileData() {
           
        const url = "http://127.0.0.1:8000/api/profile/?format=json";
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"

                 });
                if(response.ok) {
                    console.log("La consulta ha anat bé");
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
                    <div className="container-img-perfil">
                        <div className="div-imatge-perfil"></div>
                        <button className="boto-pujar-img">Pujar</button>
                    </div>
                    {profileData && (
                        <ul className="dades-perfil">
                            <li><b>Nom:</b> {profileData.username}</li>
                            
                        </ul>
                    )}    
                </div>
            </div>
        </div>
    )
}

export default Perfil;