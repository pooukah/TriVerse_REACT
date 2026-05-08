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
            {donation.map((donation)=> (
            <ul className="ul-donacions">
                <li>Nom d'usuari: {donation.username}</li>
                <li>Correu electrònic: {donation.email}</li>
                <li>Telèfon: {donation.phone_number}</li>
            </ul>
            ))}
        </div>

    )
}

export default CardDonacio;