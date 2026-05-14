import { useState, useEffect } from 'react';

function CardDonacio({ objectId }) { 
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function getDonation() {
<<<<<<< HEAD
        const url = `http://127.0.0.1:8000/api/donations/${objectId}/`;
=======
        // 1. Extraemos el token por si el endpoint es privado
        const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1];

        const url = `http://127.0.0.1:8000/api/donation/${objectId}`;
>>>>>>> 229f7aa2b407ea66560842b722d9f59c9a9ce3c4
        
        try {
            setLoading(true);
            const response = await fetch(url, { 
                method: "GET",
                headers: {
<<<<<<< HEAD
=======
                    "Authorization": token ? `Bearer ${token}` : "",
>>>>>>> 229f7aa2b407ea66560842b722d9f59c9a9ce3c4
                    "Content-Type": "application/json"
                }
            });

            if(response.ok) {
                const data = await response.json();
<<<<<<< HEAD
=======
                // Filtramos las donaciones que pertenecen a este objeto
                // Asegúrate de que 'd.object' coincida con el tipo de dato de 'objectId'
                //const filtradas = data.filter(d => String(d.object) === String(objectId));
>>>>>>> 229f7aa2b407ea66560842b722d9f59c9a9ce3c4
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
                        <li><b>Usuari:</b> {d.username || 'Anònim'}</li>
                        <li><b>Email:</b> {d.email || 'No disponible'}</li>
                        <li><b>Telèfon:</b> {d.phone_number || 'No proporcionat'}</li>
                    </ul>
                ))
            ) : (
                <p style={{padding: "10px"}}>Encara no hi ha donacions per a aquest objecte.</p>
            )}
        </div>
    );
}

export default CardDonacio;