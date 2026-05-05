import { useState, useEffect } from 'react';

function CardRessenya() {
    const [reviews, setReviews] = useState([]);
    
        async function getReview() {
            const url = "http://127.0.0.1:8000/api/reviews/?format=json";
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
                setReviews(data);
                
            } catch (error) {
                console.log(error);
            } finally {
                console.log("Final de la consulta");
            }
        }

        useEffect(() => {
            getReview()
        },  [])
  
        
    return (
        <div className="container-ressenya">
            {reviews.map((review) => (
                <div className="container-cardRessenya">
                    <h1>{review.user}</h1>
                    <p>{review.description}</p>
                </div>
            ))}
        </div>
    )
}

export default CardRessenya;