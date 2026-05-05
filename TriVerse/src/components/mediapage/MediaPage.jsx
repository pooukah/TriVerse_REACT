import React from 'react';
import './MediaPage.css';
import MediaCard from '../mediacard/MediaCard';

const MediaPage = ({title, data}) =>{
     const novedades = data && data.length > 0 ? data : [
        {title: "Juego 1", rating: "9.0", image: "https://picsum.photos/id/237/200/300"},
        {title: "Juego 2", rating: "8.5", image: "https://picsum.photos/200/300?grayscale"}
    ];
    const mejoresValoradas = data && data.length > 0 ? data : [
        {title: "Juego 3", rating: "9.5", image: "https://picsum.photos/seed/picsum/200/300"},
        {title: "Juego 4", rating: "9.0", image: "https://picsum.photos/200/300/?blur"}
    ];
    const todas = data && data.length > 0 ? data : [
        {title: "Juego 5", rating: "7.5", image: "https://via.placeholder.com/200"},
        {title: "Juego 6", rating: "8.0", image: "https://via.placeholder.com/200"}
    ];
    return(
        <div className='media-page'>
            <h1 className='page-title'>{title || "TITULONOSE"}</h1>

            <div className='section'>
                <h2 className='section-title'>Novedades</h2>
                <div className='cards-grid'>
                    {novedades.map((item, index) =>(
                        <MediaCard key={index} title={item.title} rating={item.rating} image={item.image}/>
                    ))}
                </div>
            </div>

            <div className='section'>
                <h2 className='section-title'>Mejor Valoradas</h2>
                <div className='cards-grid'>
                    {mejoresValoradas.map((item, index) =>(
                        <MediaCard key={index} title={item.title} rating={item.rating} image={item.image}/>
                    ))}
                </div>
            </div>

            <div className='section'>
                <h2 className='section-title'>Todas</h2>
                <div className='cards-grid'>
                    {todas.map((item, index) =>(
                        <MediaCard key={index} title={item.title} rating={item.rating} image={item.image}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MediaPage;