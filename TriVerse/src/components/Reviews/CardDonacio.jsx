import { useState, useEffect } from 'react';

function CardDonacio({ objectId }) { 
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getDonation() {
        // 1. Extraemos el token por si el endpoint es privado
        const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1];

        const url = "http://127.0.0.1:8000/api/donation/?format=json";
        
        try {
            setLoading(true);
            const response = await fetch(url, { 
                method: "GET",
                headers: {
                    "Authorization": token ? `Token ${token}` : "",
                    "Content-Type": "application/json"
                }
            });

            if(response.ok) {
                const data = await response.json();
                // Filtramos las donaciones que pertenecen a este objeto
                // Asegúrate de que 'd.object' coincida con el tipo de dato de 'objectId'
                const filtradas = data.filter(d => String(d.object) === String(objectId));
                setDonations(filtradas);
            } else {
                console.error("Error al obtener donaciones:", response.status);
            }
        } catch (error) {
            console.log("Error en la petición:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (objectId) {
            getDonation();
        }
    }, [objectId]);

    if (loading) return <p>Carregant donacions...</p>;

    return (
        <div className="container-donacio">
<<<<<<< Updated upstream
            {donation.map((d, i)=> (
            <ul key={i} className="ul-donacions">
                <li><b>Nom d'usuari:</b> {d.username}</li>
                <li><b>Correu electrònic:</b> {d.email}</li>
                <li><b>Telèfon:</b> {d.phone_number}</li>
            </ul>
            ))}
=======
            {donations.length > 0 ? (
                donations.map((d) => (
                    // Usamos d.id como key en lugar de 'i' para mejor rendimiento de React
                    <ul key={d.id} className="ul-donacions" style={{
                        borderBottom: '1px solid #ccc', 
                        padding: '10px',
                        listStyle: 'none'
                    }}>
                        {/* IMPORTANTE: Estos campos d.username, d.email, etc. 
                          deben existir en tu DonationSerializer de Django 
                        */}
                        <li><b>Usuari:</b> {d.username || 'Anònim'}</li>
                        <li><b>Email:</b> {d.email || 'No disponible'}</li>
                        <li><b>Telèfon:</b> {d.phone_number || 'No disponible'}</li>
                    </ul>
                ))
            ) : (
                <p>Encara no hi ha donacions per a aquest objecte.</p>
            )}
>>>>>>> Stashed changes
        </div>
    );
}

export default CardDonacio;