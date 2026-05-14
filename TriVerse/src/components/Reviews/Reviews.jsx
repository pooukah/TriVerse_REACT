import CardRessenya from './CardRessenya.jsx';
import CardDonacio from './CardDonacio.jsx';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AfegirReview from '../Reviews/AfegirReview.jsx';
import './Reviews.css';

const API_URL = "http://127.0.0.1:8000";

function Reviews() {
    const { id } = useParams();
    const [obj, setObj] = useState(null); 
    const [isOpen, setIsOpen] = useState(false);

    const getFullImageUrl = (path) => path ? `${API_URL}${path}` : `${API_URL}/media/objects/avatar_upload.jpg`;

    const handleSubmitDonacion = async () => {
        const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1];

        if (!token) {
            alert("Has d'iniciar sessió per fer una donació.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/addDonation/`, {
                method: "POST",
                headers: {
                    "Authorization": `Token ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    object: id 
                })
            });

            if (response.ok) {
                alert("Donació realitzada correctament!");
                window.location.reload(); // Recarreguem per actualitzar la llista de donacions
            } else {
                const errorData = await response.json();
                console.error("Error servidor:", errorData);
                alert("No s'ha pogut realitzar la donació.");
            }
        } catch (error) {
            console.error("Error de xarxa:", error);
            alert("Error de connexió amb el servidor.");
        }
    };

    async function getObject() {
        const url = `${API_URL}/api/object/${id}/`; 
        try {
            const response = await fetch(url, { method: "GET" });
            if (response.ok) {
                const data = await response.json();
                setObj(data); 
            } else {
                console.error("Error: No se encontró el objeto");
            }
        } catch (error) {
            console.log("Error de red:", error);
        }
    }

    useEffect(() => {
        if (id) {
            getObject();
        }
    }, [id]);

    if (!obj) {
        return <div style={{padding: "20px"}}>Carregant dades...</div>;
    }

    return (
        <div className="container-principal-reviews">
            <div className="container-descripcio">
                <div className="div-descripcio">
                    <h1 className="titol-review">{obj.title}</h1>
                    
                    <div className="img-review">
                        <img 
                            src={getFullImageUrl(obj.img_url)} 
                            alt={obj.title} 
                            style={{ width: '200px', borderRadius: '8px' }} 
                        />
                    </div>

                    <p className="sinopsis">{obj.sinopsis || "Sense sinopsi disponible"}</p>
                    
                    {/* Estructura corregida: div en lloc de p per evitar errors d'hidratació amb <hr> */}
                    <div className="plataforma">
                        <b>Plataforma:</b> {obj.platform}
                        <hr className="linia-reviews" />
                    </div>
                    
                    <div className="tipus">
                        <b>Tipus:</b> {obj.type}
                        <hr className="linia-reviews" />
                    </div>
                    
                    <div className="rating">
                        <b>Rating:</b> {obj.rating} / 10
                        <hr className="linia-reviews" />
                    </div>
                    
                    <div className="div-botons-review">
                        <button className="add-button" onClick={() => setIsOpen(true)}>
                            Afegir review
                        </button>
                        <button className="donation-button" onClick={handleSubmitDonacion}>
                            Afegir donació
                        </button>
                    </div>
                </div>
            </div> 

            {isOpen && (
                <div className="modal-afegir-review">
                    <AfegirReview id={id} onClose={() => setIsOpen(false)} />
                </div>
            )}

            <div className="subtitols-reviews">
                <h1 className="subtitol-review">Totes les reviews</h1>
                <h1 className="subtitol-donacions">Donacions</h1>
            </div>

            <section className="ressenyes-container">
                <CardRessenya objectId={id} />
                <CardDonacio objectId={id} />
            </section>
        </div>
    );
}

export default Reviews;