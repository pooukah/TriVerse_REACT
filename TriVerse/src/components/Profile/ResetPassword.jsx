import eye_off_icon from '../../imatges/eye_off_icon.png';
import eye_visible from '../../imatges/eye_visible.png';
import React, { useState, useEffect } from 'react';

// Funció per activar i desactivar la visibilitat de la contrasenya
function mostrarPassword() {
    let x = document.querySelector(".input-password");
    let iconPassword = document.querySelector(".password-ocult");

    if(x.type === "password") {
        x.type = "text"; // Fer la contrasenya visible
        iconPassword.src= eye_visible;
    } else {
        x.type = "password"; // Ocultar contrasenya
        iconPassword.src = eye_off_icon;
    }
}


function ResetPassword() {
    const cancelarReset = () => {
        window.location.assign("/perfil");
    }

    

    const [password, setPassword] = useState('');

    const handlePassword = async () => {
        const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1];
        

        console.log('TOKEN:', token);
        
        if (!token) {
            console.log("No hi ha token");
            return;
        }

        const url = "http://127.0.0.1:8000/api/profilePassword/";

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token.trim()}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password
                }),
            });
           

            if (response.ok) {
                console.log("La resposta és ok");
                alert("Contrasenya canviada");
            } else {
                console.log("Error en la resposta");
                throw new Error("Error en la resposta");
            }

            const dades = await response.json();
            console.log("obtenim les dades", dades);
        } catch (error) {
            console.log(error);
        } finally {
            console.log("Codi final del fetch");
        }
    };

    
           
    return (
        <div>
            <div className="container-reset-password">
                <div className="div-reset-password">
                    <h1>Restablir contrasenya</h1>
                    <label>
                        Contrasenya: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="contrasenya" className="input-password" /><img src={eye_off_icon} onClick={mostrarPassword} alt="password ocult" className="password-ocult"/>
                        
                        <div className="botons-reset-password">
                            <button onClick={cancelarReset}>Cancel·lar</button>
                            <button onClick={handlePassword}>Restablir</button>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    )
}



export default ResetPassword;