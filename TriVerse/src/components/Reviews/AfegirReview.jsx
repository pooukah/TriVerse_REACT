import { useState } from 'react';

function AfegirReview({ id: propId, onClose }) {
    const id = propId;

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

        const url = "http://127.0.0.1:8000/api/createReview/";

        try {
            const response = await fetch(url, { 
                method: "POST",
                headers: {
                    "Authorization": `Token ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    description: description,
                    rating: parseFloat(rating),
                    object: parseInt(id)
                })
            });

            if (response.ok) {
                console.log("La consulta ha anat bé");
                window.location.reload(); 
            } else {
                console.log("La consulta ha tingut algun error");
                const errorData = await response.json();
                alert(`Error: ${errorData.error || response.statusText}`);
            }
        } catch (error) {
            console.log("Error en la petició:", error);
        } finally {
            console.log("Final de la consulta");
        }
    };

    return (
        <div className="modal-content-review">
            <form onSubmit={handleSubmit}>
                <div className="div-afegir-ressenya">
                    <h3 style={{marginBottom: '10px'}}>Tu opinión</h3>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={6} 
                        className="textarea-review"
                        placeholder="Qué te ha parecido?"
                    />
                    
                    <div className="rating-selector">
                        <label>
                            <b>Puntuación (1-10):</b>
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
                        <button type="submit" className="btn-add">
                            Añadir Review
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AfegirReview;