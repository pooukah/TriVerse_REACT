import { useState, useEffect } from 'react';

function CardRessenya({ objectId }) { 
    const [reviews, setReviews] = useState([]);
    
    async function getReview() {
        const url = "http://127.0.0.1:8000/api/reviews/"; 
        try {
            const response = await fetch(url, { method: "GET" });
            if(response.ok) {
                const data = await response.json();
                
                const filtradas = data.filter(r => r.object == objectId);
                setReviews(filtradas);
            } else {
                console.error("Error 404: No se encuentra la ruta /api/reviews/");
            }
        } catch (error) {
            console.log("Error en la petición:", error);
        }
    }

    useEffect(() => {
        if (objectId) {
            getReview();
        }
    }, [objectId]);

    return (
        <div className="container-ressenya">
            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <div className="container-cardRessenya" key={review.id}>
                        <p>{review.description}</p>
                        <p><b>Nota:</b> {review.rating}/10</p>
                    </div>
                ))
            ) : (
                <p>Encara no hi ha ressenyes per a este objecte.</p>
            )}
        </div>
    );
}

export default CardRessenya;