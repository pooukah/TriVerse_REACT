import eye_off_icon from '../imatges/eye_off_icon.png';
import eye_visible from '../imatges/eye_visible.png';

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

    return (
        <div>
            <div className="container-reset-password">
                <div className="div-reset-password">
                    <h1>Restablir contrasenya</h1>
                    <label>
                        Contrasenya: <input type="password" name="contrasenya" className="input-password" /><img src={eye_off_icon} onClick={mostrarPassword} alt="password ocult" className="password-ocult"/>
                        <div className="botons-reset-password">
                            <button onClick={cancelarReset}>Cancel·lar</button>
                            <button>Restablir</button>
                        </div>
                    </label>
                </div>
            </div>
        </div>

    )
}

export default ResetPassword;