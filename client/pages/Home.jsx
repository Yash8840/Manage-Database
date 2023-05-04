import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

const HomePage = () => { 
    const [data, setData] = useState( {}); 
    useEffect( () => {
        (async () => {
            const dataSet = await useFetch("http://localhost:3000/api/cities"); 
            setData(dataSet); 
         })()
     }, [])
    return( 
        <section>
            <pre> {  JSON.stringify(data) } </pre>
        </section>
    )
}; 

export default HomePage; 