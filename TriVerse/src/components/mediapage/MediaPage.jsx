import React from 'react';
import './MediaPage.css';
import MediaCard from '../components/mediacard/MediaCard';

const MediaPage = ({title, data}) =>{
    return(
        <div className='media-page'>
            <h1 className='page-title'>{title || "TITULONOSE"}</h1>

            <div className='section'>
                
            </div>
        </div>
    );
}

export default MediaPage;