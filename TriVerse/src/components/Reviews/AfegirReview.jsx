import { useState } from 'react';

function AfegirReview() {


    const tornarPageReviews = () => {
        window.location.replace("/reviews");
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
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={8} cols={40} 
                        placeholder="Escriu una review..."
                    />
                    <label>
                        Puntuació:
                        <input
                            type="number"
                            value={rating}
                            className="input-rating"
                            onChange={(e) => setRating(e.target.value)}
                        />
                    </label>
                    <div className="botons-afegir-review">
                        <button type="button" onClick={tornarPageReviews}>Cancelar</button>
                        <button type="submit" onClick={tornarPageReviews}>Afegir</button>
                    </div>
                </div>
            </form>
        </div>

    )
}

export default AfegirReview;