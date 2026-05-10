import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './MediaPage.css';
import MediaCard from '../mediacard/MediaCard';


const MediaPage = ({title, type}) =>{
    const [novedades, setNovedades] = useState([]);
    const [mejorValoradas, setMejorValoradas] = useState([]);
    const [todas, setTodas] = useState([]);

    const API_URL = "http://127.0.0.1:8000";


    async function getObjByType(){
        const url = `${API_URL}/api/objects/type/${type}/`;
        try{
            const response = await fetch(url, {method:"GET"});
            if(response.ok){
                console.log("tabien");
            }else{
                console.log("tamal");
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            console.log(title, data);

            const estrellitas = data.filter(item => item.rating >= 8).sort((a, b) => b.rating - a.rating);
            const nuevo = [...data].reverse().slice(0, 2);
            const toas = data;
            
            setNovedades(nuevo);
            setMejorValoradas(estrellitas);
            setTodas(toas);
        }catch(e){
            console.log("Error: ", e);
        }
    }

    useEffect(() => {
        getObjByType();
    }, [type]);
    const getFullImageUrl = (path) => path ? `${API_URL}${path}` : 'media/objects/avatar_upload.jpg';

    return(
        <div className='media-page'>
            <h1 className='page-title'>{title || "TITULONOSE"}</h1>

            <div className='section'>
                <h2 className='section-title'>Novedades</h2>
                <div className='cards-grid'>
                    {novedades.map((item, index) =>(
                    <Link to={`/reviews/${item.id}`} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <MediaCard title={item.title} rating={item.rating} image={getFullImageUrl(item.img_url)} />
                    </Link>                    
                    ))}
                </div>
            </div>

            <div className='section'>
          
                <h2 className='section-title'>Mejor Valoradas</h2>
                <div className='cards-grid'>
                    {mejorValoradas.map((item, index) =>(
                        <MediaCard key={index} title={item.title} rating={item.rating} image={getFullImageUrl(item.img_url)}/>
                    ))}
                </div>
            </div>

            <div className='section'>
                <h2 className='section-title'>Todas</h2>
                <div className='cards-grid'>
                    {todas.map((item, index) =>(
                        <MediaCard key={index} title={item.title} rating={item.rating} image={getFullImageUrl(item.img_url)}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MediaPage;