import { useState } from 'react';

function AfegirReview() {
    const tornarPageReviews = () => {
        window.location.assign("/reviews");
    }

    const [description, setDescription] = useState("");
    const [rating, setRating] = useState("");
    const objectId = 1;

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(description);
        console.log(rating);

        const reviewData = {
            description: description,
            rating: parseFloat(rating),
            object: objectId
        };

        try {


            const response = await fetch("http://127.0.0.1:8000/api/createReview/",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reviewData)
            });

            const data = await response.json();
            console.log("Review creada", data);
        } catch (error) {
            console.log("Error al crear review", error);
        }

    }

      
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="div-afegir-ressenya">
                    <label>
                        <p>Escriu una ressenya:</p>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={20} cols={60} 
                            placeholder="Introdueix la review"
                        />
                    </label>
                    <label>
                        Puntuació:
                        <input
                            type="number"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        />
                    </label>
                    <div className="botons-afegir-review">
                        <button type="button" onClick={tornarPageReviews}>Cancelar</button>
                        <button type="submit">Afegir</button>
                    </div>
                </div>
            </form>
        </div>

    )
}

export default AfegirReview;