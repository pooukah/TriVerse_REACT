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
        <div>
            <ul className="container-cardRessenya">
                {reviews.map((review) => (
                    <li className="div-ressenya">{review.user} : {review.description}</li>
                ))}
            </ul>
        </div>
    )
}

export default CardRessenya;