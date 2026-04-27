import game from '../imatges/game.jpg';
import CardRessenya from './CardRessenya.jsx';

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
                <h1 className="subtitol-review">Totes les reviews</h1>
                <section className="ressenyes-container">
                    <CardRessenya />
                    <CardRessenya />
                    <CardRessenya />
                    <CardRessenya />
                    <CardRessenya />
                    <CardRessenya />
                </section>
            </div>
        </div>

    )
}

export default Reviews;