import React, { useState, useEffect} from "react";
import useFetch from "../hooks/useFetch";
import NavBar from "../components/NavBar";
import Place from "../components/Place";

const Places = () =>  {
    const [data, setData] = useState( {}); 
    useEffect( () => { 
        (async () => {
            const dataSet = await useFetch(`http://localhost:3000/api/places`); 
            setData(dataSet); 
         })(); 
    }, [])

    return ( 
        <section className="page places-page">
            <pre> { JSON.stringify (data) } </pre>
        </section>
    )
}; 

export default Places;