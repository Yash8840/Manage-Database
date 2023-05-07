import React, { useState, useEffect} from "react";
import NavBar from "../components/NavBar";
import Place from "../components/Place";

const Places = () =>  {
    const [data, setData] = useState( {}); 
    useEffect( () => { 
        const fetchData = async () => { 
            const result = await fetch("http://localhost:3000/api/places", { 
                method: "GET"
            });  

            const res = await result.json(); 
            setData(res); 
        }

        fetchData (); 
    }, [])

    return ( 
        <section className="page places-page">
            <pre> { JSON.stringify (data) } </pre>
        </section>
    )
}; 

export default Places;