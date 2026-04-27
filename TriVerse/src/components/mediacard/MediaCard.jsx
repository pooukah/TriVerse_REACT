import React from 'react';
import './MediaCard.css';

const MediaCard = ({title, rating, image}) =>{
    return(
        <div className="media-card">
            <div className="media-image">
                <img src={image}/>
            </div>
            <div className='media-info'>
                <h3 className='media-title'>{title || "titulo"}</h3>
                <p className='media-rating'>{rating || "8.5"}</p>
            </div>
        </div>
    );
}

export default MediaCard;