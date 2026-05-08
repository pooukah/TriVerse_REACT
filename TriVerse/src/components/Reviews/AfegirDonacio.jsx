import { useState } from 'react';

function AfegirDonacio() {
    const tornarPageReviews = () => {
            window.location.replace("/reviews");
        }
    
        const [username, setUsername] = useState("");
        const [email, setEmail] = useState("");
        const [phone_number, setPhoneNumber] = useState("");
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            console.log(username);
            console.log(email);
    
            const DonationData = {
                username: username,
                email: email,
                phone_number: parseInt(phone_number, 10)
            };
    
            try {
    
                const response = await fetch("http://127.0.0.1:8000/api/addDonation/",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
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
                        <br />
                        <input
                            value={phone_number}
                            onChange={e => setPhoneNumber(e.target.value)}/>
                    </label>
                    <div className="botons-afegir-donacio">
                        <button type="button" onClick={tornarPageReviews}>Cancel·lar</button>
                        <button type="submit" onClick={tornarPageReviews}>Afegir</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AfegirDonacio;