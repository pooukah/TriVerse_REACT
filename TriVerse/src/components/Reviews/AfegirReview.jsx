import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function AfegirReview({ id: propId, onClose }) {
    const { id: paramsId } = useParams();
    const id = propId || paramsId;
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

        console.log("Token recuperat:", token ? token.substring(0, 20) + "..." : "NO TROBAT");

        const reviewData = {
            description: description,
            rating: parseFloat(rating),
            object: parseInt(id)
        };

        try {
            const token = localStorage.getItem('token');
            const response = await fetch("http://127.0.0.1:8000/api/createReview/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                credentials: 'include',
                body: JSON.stringify(reviewData)
            });

            if (response.ok) {
                console.log("Review creada correctament");
                navigate(0); 
            } else {
                const text = await response.text();
                console.error("Error", response.status, ":", text);
                alert(response.status === 401 || response.status === 403
                    ? "Error: No tens permís o el token ha caducat."
                    : `Error del servidor (${response.status})`);
            }
        } catch (error) {
            console.log("Error de xarxa", error);
            alert("Error de connexió: No s'ha pogut enviar la review.");
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
                        <button type="button" onClick={onClose} className="btn-cancel">
                            Cancelar
                        </button>
                        <button onClick={onClose} type="submit" className="btn-add">
                            Afegir Review
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AfegirReview;