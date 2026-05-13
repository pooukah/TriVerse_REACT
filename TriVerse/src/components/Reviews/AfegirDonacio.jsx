import { useState } from 'react';
import { useParams } from 'react-router-dom';

function AfegirDonacio() {
    const {id} = useParams();
    const tornarPageReviews = () => {
            window.history.back();
        }
    
        const [username, setUsername] = useState("");
        const [email, setEmail] = useState("");
        const [phone_number, setPhoneNumber] = useState("");
        const token = document.cookie
            .split("; ")
            .find(row =>row.startsWith("token="))
            ?.split("=")[1];

        console.log(token);
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            console.log(username);
            console.log(email);
    
            const DonationData = {
                username: username,
                email: email,
                phone_number: parseInt(phone_number, 10),
                object: Number(id)
            };
    
            try {
    
                const response = await fetch("http://127.0.0.1:8000/api/addDonation/",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(DonationData)
                });
    
                const data = await response.json();
                console.log("Donació creada", data);
            } catch (error) {
                console.log("Error al crear donació", error);
            }
    
        }
    
    return (
        <div className="container-donacio">
            <form onSubmit={handleSubmit}>
                <div className="div-afegir-donacio">
                    <label>
                        Username:
                        <br />
                            <input
                                value={username}
                                onChange={e => setUsername(e.target.value)}/>
                    </label>
                    <label>
                        Correu electrònic:
                        <br />
                        <input
                            value={email}
                            onChange={e => setEmail(e.target.value)}/>
                    </label>
                    <label>
                        Telèfon:
                        <br/>
                        <input
                            value={phone_number}
                            onChange={e => setPhoneNumber(e.target.value)}/>
                    </label>
                    <div className="botons-afegir-donacio">
                        <button type="button" onClick={tornarPageReviews}>Cancel·lar</button>
                        <button type="submit">Afegir</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AfegirDonacio;