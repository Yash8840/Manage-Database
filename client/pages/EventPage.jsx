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

    useEffect( () => { 
        async function renderData () { 
            const res = await fetchData(`http://localhost:3000/api${location.pathname}`); 
            setEvent(res.event); 

            console.log(res.event); 
        }; 

        renderData (); 
        console.log("HEllo "); 
        console.log(location.pathname); 
    }, [])
    return( 
        <section className="event-page page">
            EventPage
        </section>
    )
}; 

export default EventPage 