function AfegirReview() {
    return (
        <div>
            <div className="div-afegir-ressenya">
                <label>
                    <p>Escriu una ressenya:</p>
                    <textarea name="review" rows={20} cols={60} />
                </label>
                <div className="botons-afegir-review">
                    <button>Cancelar</button>
                    <button>Afegir</button>
                </div>
            </div>
        </div>

    )
}

export default AfegirReview;