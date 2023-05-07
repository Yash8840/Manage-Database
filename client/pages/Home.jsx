import React, { useEffect, useState } from "react";
import City from "../components/City";

const HomePage = () => { 
    const [data, setData] = useState({});
  
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:3000/api/cities");
            const dataSet = await response.json();
            setData(dataSet);
          };

        fetchData(); 
    }, []);

    return( 
        <section className="page home-page">
            {data.cities && <p> { JSON.stringify(data.cities) }</p> } 
            { data.cities?.map( c => { 
                return( 
                    <article key = { c._id } >
                        <City id = { c._id } title = { c.title } />
                    </article>
                )
            })}
        </section>
    )
}; 

export default HomePage; 