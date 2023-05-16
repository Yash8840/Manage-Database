import React, { useState, useEffect } from "react";
import fetchData from "../helpers/fetchData";
import City from "../components/City";

const Cities = () => { 
    const [data, setData] = useState({}); 
    const [ pageLoaded, setPageLoaded ] = useState(false); 

    useEffect( () => { 
        const renderData = async () => { 
            const res = await fetchData("http://localhost:3000/api/cities"); 
            console.log(res); 
            setData(res); 
            setPageLoaded(true) ;
        }

        renderData(); 
    }, []); 
    return(
        <section className="page cities-page">
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

export default Cities