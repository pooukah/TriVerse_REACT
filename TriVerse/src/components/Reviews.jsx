import game from '../imatges/game.jpg';
import CardRessenya from './CardRessenya.jsx';
import CardDonacio from './CardDonacio.jsx';

function Reviews() {
    
    return (
        <div>
            <div className="container-principal-reviews">
                <div className="div-reviews">
                    <img src={game} alt="imatge d'un joc" />
                </div>
                <div className="container-descripcio">
                    <div className="div-descripcio">
                        <h1 className="titol-review">Titol</h1>
                        <p>Descripció</p>
                        <button>Afegir review</button>
                    </div>
                </div>
                <div className="subtitols-reviews">
                    <h1 className="subtitol-review">Totes les reviews</h1>
                    <h1 className="subtitol-donacions">Donacions</h1>
                </div>

                <section className="ressenyes-container">
                    <CardRessenya />
                </section>
                <section className="donacions-container">
                    <CardDonacio />
                    <CardDonacio />

                </section>
            </div>
        </div>

    )
}

export default Reviews;