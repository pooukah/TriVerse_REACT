import { useState, useEffect } from 'react';

function CardDonacio() {
    const [donation, setDonation] = useState([]);

    async function getDonation() {
        const url = "http://127.0.0.1:8000/api/donation/?format=json";
        try {
            const response = await fetch(url, { method: "GET"});
            if(response.ok) {
                console.log("La consulta ha anat bé");
            } else {
                console.log("La consulta ha tingut algun error");
                throw new Error(
                    `ERROR: ${response.status} - ${response.statusText}`
                );
            }
            const data = await response.json();
            console.log(data);
            setDonation(data);

        } catch (error) {
            console.log(error);
        } finally {
            console.log("Final de la consulta");
        }
    }

    useEffect(() => {
        getDonation()
        
    }, [])
    return (
        <div className="container-donacio">
            {donation.map((d, i)=> (
            <ul key={i} className="ul-donacions">
                <li><b>Nom d'usuari:</b> {d.username}</li>
                <li><b>Correu electrònic:</b> {d.email}</li>
                <li><b>Telèfon:</b> {d.phone_number}</li>
            </ul>
            ))}
        </div>

    )
}

export default CardDonacio;