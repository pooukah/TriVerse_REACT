import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function AfegirReview() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [description, setDescription] = useState("");
    const [rating, setRating] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!description || !rating) {
            alert("Si us plau, omple tots els camps");
            return;
        }

        const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1];

        const reviewData = {
            description: description,
            rating: parseFloat(rating),
            object: parseInt(id)
        };

        try {
            const response = await fetch("http://127.0.0.1:8000/api/createReview/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Enviamos el token recuperado
                },
                body: JSON.stringify(reviewData)
            });

            if (response.ok) {
                console.log("Review creada correctament");
                navigate(0); 
            } else {
                const errorData = await response.json();
                console.error("Error 403 o similar:", errorData);
                alert("Error: No tens permís o el token ha caducat.");
            }
        } catch (error) {
            console.log("Error de xarxa", error);
        }
    };

    return (
        <div className="modal-content-review">
            <form onSubmit={handleSubmit}>
                <div className="div-afegir-ressenya">
                    <h3 style={{marginBottom: '10px'}}>La teva opinió</h3>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={6} 
                        className="textarea-review"
                        placeholder="Què t'ha semblat la pel·lícula?"
                    />
                    
                    <div className="rating-selector">
                        <label>
                            <b>Puntuació (1-10):</b>
                            <input
                                type="number"
                                min="1"
                                max="10"
                                value={rating}
                                className="input-rating"
                                onChange={(e) => setRating(e.target.value)}
                            />
                        </label>
                    </div>

                    <div className="botons-afegir-review">
                        <button type="button" onClick={() => navigate(-1)} className="btn-cancel">
                            Cancelar
                        </button>
                        <button type="submit" className="btn-add">
                            Afegir Review
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AfegirReview;