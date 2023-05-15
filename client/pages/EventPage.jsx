import React, { useState, useEffect } from "react";
import { Buffer } from "buffer";
import fetchData from "../helpers/fetchData";
import Place from "../components/Place";
import generateRandomKey from "../helpers/randomKey";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EventPage = () => { 
    const location = useLocation (); 
    const navigate = useNavigate (); 

    const [ event, setEvent ] = useState({}); 
    const [ images, setImages ] = useState([]); 
    const [ places, setPlaces ] = useState([]);  
    const [ startDate, setStartDate ] = useState(''); 
    const [ stopDate, setStopDate ] = useState(''); 

    const handleDelete = async () => { 
        const res = await fetch(`http://localhost:3000/api${location.pathname}`, { 
            method: "DELETE", 
            mode: "cors", 
            headers: { 
                "Content-Type": "application/json", 
            }
        }); 

        if(res.status !== 200) { 
            return; 
        } else { 
            navigate("/events"); 
        }
    }

    const formatImages = (array) => { 
        const result = []; 
            array.forEach(dataBuffer => { 
                const base64image = Buffer.from(dataBuffer.data, 'base64').toString("base64"); 
                result.push(`data:image/jpg;base64,${base64image}`); 
            }); 
        

        return result; 
    }

    useEffect( () => { 
        async function renderData () { 
            const res = await fetchData(`http://localhost:3000/api${location.pathname}`); 
            setEvent(res.event); 
            await setImages(formatImages(res.event.photo.data)); 
            setPlaces(res.event.places);
            setStartDate(new Date(`${res.event.startDate}`).toLocaleString('en-GB', { 
                day: "numeric", month: "numeric", hour: "2-digit", minute: "2-digit"
            })) 
            setStopDate(new Date(`${res.event.stopDate}`).toLocaleDateString('en-GB', { 
                day: "numeric", month: "numeric", hour: "2-digit", minute: "2-digit"
            })); 
        }; 

        renderData (); 
    }, [])
    return( 
        <section className="event-page page">
            <h1> { event.title } </h1>
            <article className = "button-holder"> 
                <button onClick = { handleDelete }> Sterge Eveniment </button>
                <p> Data sustinerii evenimentului: { startDate } </p>
                <p> Data sfarsitului evenimentului: { stopDate } </p>
            </article>
            { images.map(image => { 
                return ( 
                    <img src= { image } key = { generateRandomKey(20)} alt=" X " />
                )
            })}
            <p> { event.description } </p>

            <hr />
            { places.length > 0 && places.map(place => { 
                return ( 
                    <Place key = { place._id } id = { place._id } place = { place } /> 
                )
            })}

        </section>
    )
}; 

export default EventPage 