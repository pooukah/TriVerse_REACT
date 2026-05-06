import CardRessenya from './CardRessenya.jsx';
import CardDonacio from './CardDonacio.jsx';
import { useState, useEffect } from 'react';
import AfegirReview from '../Reviews/AfegirReview.jsx';

function Reviews() {

    const afegirReview = () => {
        window.location.assign("/afegirReview");
    }

    const [isOpen, setIsOpen] = useState(false);
    const [objects, setObjects] = useState([]);
        
        async function getObject() {
            const url = "http://127.0.0.1:8000/api/object/?format=json";
            try {
                const response = await fetch(url, { method: "GET" });
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
                setObjects(data);
                
            } catch (error) {
                console.log(error);
            } finally {
                console.log("Final de la consulta");
            }
        }
    
        useEffect(() => {
            getObject()
        },  [])
        
    
    return (
        <div>
            <div className="container-principal-reviews">
                {objects.map((obj) => (
                <div className="div-reviews">
                </div>
                ))}
                
                <div className="container-descripcio">
                    {objects.map((obj, index) =>(
                    <div className="div-descripcio">
                        <h1 className="titol-review" key={index}>{obj.title}</h1>
                        <p key={index} className="img-review">{obj.img_url}</p>
                        <p key={index} className="sinopsis">{obj.sinopsis}</p>
                        <p key={index} className="plataforma"><b>Plataforma:</b> {obj.platform}</p>
                        <p key={index} className="tipus"><b>Tipus:</b> {obj.type}</p>
                        <div className="div-botons-review">
                            <button className="add-button" onClick={()=> setIsOpen(true)} >Afegir review</button>
                            <button>Afegir donació</button>
                        </div>
                        
                    </div>
                    ))}
                </div>
                {isOpen && <div>
                    <AfegirReview /> 
                    </div>
                }
                <div className="subtitols-reviews">
                    <h1 className="subtitol-review">Totes les reviews</h1>
                    <h1 className="subtitol-donacions">Donacions</h1>
                </div>

                <section className="ressenyes-container">
                    <CardRessenya />
                </section>
                <section className="donacions-container">
                    <CardDonacio />
                    <CardDonacio />

                </section>
            </div>
        </div>

    )
}





export default Reviews;