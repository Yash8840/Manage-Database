import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

const PlacePage = () => { 
    const [ data, setData ] = useState({}); 
    useEffect( () => { 
        (async () => { 
            const dataSet = await useFetch(`http://localhost:3000/api/places/${req.params.id}`); 
        })()
    }, []); 
    return ( 
        <section className="detail-page page">
            <h2>Place</h2>
            <pre> { JSON.stringify(data) } </pre>
        </section>
    )
}; 

export default PlacePage; 