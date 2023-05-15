import React, { useEffect, useState } from "react";
import City from "../components/City";

const HomePage = () => { 
    const [data, setData] = useState({});
    const [pageLoaded, setPageLoaded ] = useState(false); 
  
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:3000/api/cities");
            const dataSet = await response.json();
            setData(dataSet);
            setPageLoaded(true); 
          };

        fetchData(); 
    }, []);

    return( 
        <section className="page home-page">
            { !pageLoaded && 
                <p className="first"> Loading </p>
            }
            { pageLoaded && 
                <>
                    { data.cities?.map( c => { 
                        return( 
                            <article key = { c._id } >
                                <City id = { c._id } title = { c.title } />
                            </article>
                        )
                    })}
                </>
            }
        </section>
    )
}; 

export default HomePage; 