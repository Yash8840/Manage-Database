import React, { useState, useEffect} from "react";
import generateRandomKey from "../helpers/randomKey";
import Place from "../components/Place";

const Places = () =>  {
    const [ placeKeys, setPlaceKeys ] = useState([]); 
    const [ placeValues, setPlaceValues ] = useState([]); 
    const [ placeLoaded, setPlaceLoaded ] = useState(false); 

    useEffect( () => { 
        const fetchData = async () => { 
            const result = await fetch("http://localhost:3000/api/places", { 
                method: "GET"
            });  

            const res = await result.json(); 
            setPlaceKeys(Object.keys(res.place)); 
            setPlaceValues(Object.values(res.place)); 
            setPlaceLoaded(true); 
        }

        fetchData (); 
    }, [])

    return ( 
        <section className="page places-page">
            { !placeLoaded && 
                <p className="first"> Loading </p>
            }
            { placeLoaded && 
                <>
                    { placeKeys.map(type => { 
                        return( 
                            <>
                                <h2 key = { generateRandomKey(20)}> { type } </h2>
                                { placeValues[ placeKeys.indexOf(type)].map(value => { 
                                    return ( 
                                        <article key = { value._id}>
                                            <Place id = { value._id} place = { value }/>
                                        </article>
                                    ) 
                                })}

                                <hr />
                            </>
                        )
                    })}
                </>
            }
        </section>
    )
}; 

export default Places;