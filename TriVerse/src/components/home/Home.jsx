import React from 'react';
import './Home.css';
import MediaCard from '../mediacard/MediaCard';

const Home = ({title, data}) =>{
     const novedades = data && data.length > 0 ? data : [
        {title: "Juego 1", rating: "9.0", image: "https://picsum.photos/id/237/200/300"},
        {title: "Juego 2", rating: "8.5", image: "https://picsum.photos/200/300?grayscale"}
    ];
    
    const mejoresValoradas = data && data.length > 0 ? data : [
        {title: "Juego 3", rating: "9.5", image: "https://picsum.photos/seed/picsum/200/300"},
        {title: "Juego 4", rating: "9.0", image: "https://picsum.photos/200/300/?blur"}
    ];
    
    const videojuegos = [
        {title: "Zelda", rating: "9.8", image: "https://picsum.photos/seed/zelda/200/300"},
        {title: "Mario", rating: "9.0", image: "https://picsum.photos/seed/mario/200/300"},
        {title: "Fortnite", rating: "7.5", image: "https://picsum.photos/seed/fortnite/200/300"}
    ];
     const peliculas = [
        {title: "Inception", rating: "9.0", image: "https://picsum.photos/seed/inception/200/300"},
        {title: "The Matrix", rating: "8.5", image: "https://picsum.photos/seed/matrix/200/300"}
    ];
    
    const libros = [
        {title: "El Quijote", rating: "9.5", image: "https://picsum.photos/seed/quijote/200/300"},
        {title: "Cien años", rating: "9.0", image: "https://picsum.photos/seed/cien/200/300"}
    ];
    return(
        <div className='home'>
            <h1 className='page-title'>{title || "HOME"}</h1>

            <div className='section'>
                <h2 className='section-title'>Novedades</h2>
                <div className='cards-grid'>
                    {novedades.map((item, index) =>(
                        <MediaCard key={index} title={item.title} rating={item.rating} image={item.image}/>
                    ))}
                </div>
            </div>
            <div className='section'>
                <h2 className='section-title'>Mejor valoradas</h2>
                <div className='cards-grid'>
                    {mejoresValoradas.map((item, index) =>(
                        <MediaCard key={index} title={item.title} rating={item.rating} image={item.image}/>
                    ))}
                </div>
            </div>

            <div className='section'>
                <h2 className='section-title'>Videojuegos</h2>
                <div className='cards-grid'>
                    {videojuegos.map((item, index) =>(
                        <MediaCard key={index} title={item.title} rating={item.rating} image={item.image}/>
                    ))}
                </div>
            </div>

            <div className='section'>
                <h2 className='section-title'>Películas</h2>
                <div className='cards-grid'>
                    {peliculas.map((item, index) =>(
                        <MediaCard key={index} title={item.title} rating={item.rating} image={item.image}/>
                    ))}
                </div>
            </div>
            <div className='section'>
                <h2 className='section-title'>Libros</h2>
                <div className='cards-grid'>
                    {libros.map((item, index) =>(
                        <MediaCard key={index} title={item.title} rating={item.rating} image={item.image}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;