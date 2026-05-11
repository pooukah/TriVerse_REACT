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

    // 1. Definimos la función para la imagen
    const getFullImageUrl = (path) => path ? `${API_URL}${path}` : `${API_URL}/media/objects/avatar_upload.jpg`;

    const afegirDonacio = () => {
        window.location.assign("/afegirDonacio");
    }

    async function getObject() {
        const url = `${API_URL}/api/object/${id}/`; 
        try {
            const response = await fetch(url, { method: "GET" });
            if (response.ok) {
                const data = await response.json();
                console.log("Datos recibidos:", data);
                setObj(data); 
            } else {
                console.error("Error: No se encontró la película");
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
        return <div style={{padding: "20px"}}>Carregant dades de la pel·lícula...</div>;
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
                    
                    <p className="plataforma">
                        <b>Plataforma:</b> {obj.platform}
                    </p>
                    
                    <p className="tipus">
                        <b>Tipus:</b> {obj.type}
                    </p>
                    
                    <p className="rating">
                        <b>Rating:</b> {obj.rating} / 10
                    </p>
                    
                    <div className="div-botons-review">
                        <button className="add-button" onClick={() => setIsOpen(true)}>
                            Afegir review
                        </button>
                        <button onClick={afegirDonacio}>
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