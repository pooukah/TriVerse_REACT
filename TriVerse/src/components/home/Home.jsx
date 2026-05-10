import {useState, useEffect} from 'react';
import './Home.css';
import MediaCard from '../mediacard/MediaCard';

const API_URL = "http://127.0.0.1:8000";

const Home = ({title, data}) =>{
    const [novedades, setNovedades] = useState([]);
    const [mejorValoradas, setMejorValoradas] = useState([]);
    const [videojuegos, setVideojuegos] = useState([]);
    const [peliculas, setPeliculas] = useState([]);
    const [libros, setLibros] = useState([]);

    async function getAll(){
        const url = `${API_URL}/api/object/`;

        try{
            const response = await fetch(url, {method: "GET"});

            if(!response.ok){
                throw new Error("Error", response.status)
            }

            const data = await response.json();
            console.log(data);

            const games = data.filter(item => item.type === "Game");
            const movies = data.filter(item => item.type === "Movie");
            const books = data.filter(item => item.type === "Book");

            const estrellitas = [...data].sort((a, b) => b.rating - a.rating);
            const nuevo = [...data].reverse().slice(0, 2);

            setNovedades(nuevo);
            setMejorValoradas(estrellitas);
            setVideojuegos(games);
            setPeliculas(movies);
            setLibros(books);
        }catch(e){
            console.log("error: ", e);
        }
    }

    useEffect(() => {
        getAll();
    }, []);
    const getFullImageUrl = (path) => path ? `${API_URL}${path}` : 'objects/avatar_upload.jpg';
    
    return(
        <div className='home'>
            <h1 className='page-title'>{"HOME"}</h1>

            <div className='section'>
                <h2 className='section-title'>Novedades</h2>
                <div className='cards-grid'>
                    {novedades.map((item, index) =>(
                        <MediaCard key={index} title={item.title} rating={item.rating} image={getFullImageUrl(item.img_url)}/>
                    ))}
                </div>
            </div>
            <div className='section'>
                <h2 className='section-title'>Mejor valoradas</h2>
                <div className='cards-grid'>
                    {mejorValoradas.map((item, index) =>(
                        <MediaCard key={index} title={item.title} rating={item.rating} image={getFullImageUrl(item.img_url)}/>
                    ))}
                </div>
            </div>

            <div className='section'>
                <h2 className='section-title'>Videojuegos</h2>
                <div className='cards-grid'>
                    {videojuegos.map((item, index) =>(
                        <MediaCard key={index} title={item.title} rating={item.rating} image={item.img_url}/>
                    ))}
                </div>
            </div>

            <div className='section'>
                <h2 className='section-title'>Películas</h2>
                <div className='cards-grid'>
                    {peliculas.map((item, index) =>(
                        <MediaCard key={index} title={item.title} rating={item.rating} image={item.img_url}/>
                    ))}
                </div>
            </div>
            <div className='section'>
                <h2 className='section-title'>Libros</h2>
                <div className='cards-grid'>
                    {libros.map((item, index) =>(
                        <MediaCard key={index} title={item.title} rating={item.rating} image={item.img_url}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;