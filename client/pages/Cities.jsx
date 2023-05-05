import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import NavBar from "../components/NavBar";
import City from "../components/City";

const Cities = () => { 
    const [data, setData] = useState({}); 

    useEffect( () => { 
        (async () => { 
            const dataSet = await useFetch("http://localhost:3000/api/cities"); 
            setData(dataSet); 
        })()
    }, []); 
    return(
        <section className="page cities-page">
            <pre> { JSON.stringify(data) } </pre>
        </section>
    )
}; 

export default Cities