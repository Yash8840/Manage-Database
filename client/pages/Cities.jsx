import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import fetchData from "../helpers/fetchData";
import City from "../components/City";

const Cities = () => { 
    const [data, setData] = useState({}); 

    useEffect( () => { 
        const renderData = async () => { 
            const res = await fetchData("http://localhost:3000/api/cities"); 
            console.log(res); 
            setData(res); 
        }

        renderData(); 
    }, []); 
    return(
        <section className="page cities-page">
            <pre> { JSON.stringify(data) } </pre>
        </section>
    )
}; 

export default Cities