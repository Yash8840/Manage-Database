import React, { useState, useEffect } from "react";
import Event from "../components/Event";
import fetchData from "../helpers/fetchData";

const Events = () => { 
    const [ events, setEvents ] = useState([]); 

    useEffect( () => {
        async function renderData () { 
            const res = await fetchData("http://localhost:3000/api/events"); 
            setEvents(res.events); 
            console.log(res.events); 
        }; 

        renderData(); 
    },  [])
    return( 
        <section className="events-page page">
            { events.map(event => { 
                return( 
                    <Event key = { event._id } id = { event._id } event = { event } /> 
                ); 
            })}
        </section>
    )
}; 

export default Events 