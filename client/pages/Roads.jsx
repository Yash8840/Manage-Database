import React,  { useState, useEffect } from "react";
import Road from "../components/Road";
import fetchData from "../helpers/fetchData";

const Roads = () => { 
    const [ roads, setRoads ] = useState([]); 
    const [ pageLoaded, setPageLoaded ] = useState(false); 

    useEffect ( () => { 
        async function renderData () { 
            const res = await fetchData("http://localhost:3000/api/roads"); 
            await setRoads(res.roads); 
            console.log(res); 
            setPageLoaded(true); 
        }

        renderData();  
    }, []); 
    return ( 
        <section className="roads-page oage">
            { !pageLoaded && 
                <p className="first">Loading</p>
            }
            { 
                pageLoaded && 
                <>
                    <h1>Trasee disponibile</h1>
                    <h2> { roads.length } trasee </h2>

                    { roads.map(road => { 
                        return( 
                            <article key = { road._id }>
                                <Road road = { road } id = { road._id} /> 
                            </article>
                        )
                    })}
                </>
            }
        </section>
    )
}; 

export default Roads; 