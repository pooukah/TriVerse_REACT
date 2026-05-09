import {useState, useEffect} from 'react';
import './MediaPage.css';
import MediaCard from '../mediacard/MediaCard';

const MediaPage = ({title, type}) =>{
    const [novedades, setNovedades] = useState([]);
    const [mejorValoradas, setMejorValoradas] = useState([]);
    const [todas, setTodas] = useState([]);

    async function getObjByType(){
        const url = `http://127.0.0.1:8000/api/objects/type/${type}/`;

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

            const estrellitas = [...data].sort((a, b) => b.rating - a.rating);
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

    return(
        <div className='media-page'>
            <h1 className='page-title'>{title || "TITULONOSE"}</h1>

            <div className='section'>
                <h2 className='section-title'>Novedades</h2>
                <div className='cards-grid'>
                    {novedades.map((item, index) =>(
                        <MediaCard key={index} title={item.title} rating={item.rating} image={item.img_url}/>
                    ))}
                </div>
            </div>

            <div className='section'>
                <h2 className='section-title'>Mejor Valoradas</h2>
                <div className='cards-grid'>
                    {mejorValoradas.map((item, index) =>(
                        <MediaCard key={index} title={item.title} rating={item.rating} image={item.img_url}/>
                    ))}
                </div>
            </div>

            <div className='section'>
                <h2 className='section-title'>Todas</h2>
                <div className='cards-grid'>
                    {todas.map((item, index) =>(
                        <MediaCard key={index} title={item.title} rating={item.rating} image={item.img_url}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MediaPage;