import { useState, useEffect } from 'react';

function CardDonacio({ objectId }) { 
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function getDonation() {
        const url = `http://127.0.0.1:8000/api/donations/${objectId}/`;
        
        try {
            setLoading(true);
            const response = await fetch(url, { 
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if(response.ok) {
                const data = await response.json();
                setDonations(data);
            } else {
                console.error("Error al obtener donaciones:", response.status);
                setError("No s'han pogut carregar les donacions.");
            }
        } catch (error) {
            console.log("Error en la petición:", error);
            setError("Error de connexió.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (objectId) {
            getDonation();
        }
    }, [objectId]);

    if (loading) return <p style={{padding: "20px"}}>Carregant donacions...</p>;
    if (error) return <p style={{padding: "20px", color: "red"}}>{error}</p>;

    return (
        <div className="container-donacio">
            {donations.length > 0 ? (
                donations.map((d) => (
                    <ul key={d.id} className="ul-donacions" style={{
                        borderBottom: '1px solid #ccc', 
                        padding: '10px',
                        listStyle: 'none'
                    }}>
                        <li><b>Usuario:</b> {d.username || 'Anònim'}</li>
                        <li><b>Correo electrónico:</b> {d.email || 'No disponible'}</li>
                        <li><b>Teléfono:</b> {d.phone_number || 'No proporcionado'}</li>
                    </ul>
                ))
            ) : (
                <p style={{padding: "10px"}}>Todavía no hay donaciones para este objeto</p>
            )}
        </div>
    );
}

export default CardDonacio;