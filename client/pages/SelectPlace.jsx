import React, { useState, useEffect} from "react";
import generateRandomKey from "../helpers/randomKey";
import RoadSelect from "../components/RoadSelect";

const SelectPlace = ( { onSelectPlace, onCancelShowPages }) =>  {
    const [ placeKeys, setPlaceKeys ] = useState([]); 
    const [ placeValues, setPlaceValues ] = useState([]); 

    useEffect( () => { 
        const fetchData = async () => { 
            const result = await fetch("http://localhost:3000/api/places", { 
                method: "GET"
            });  

            const res = await result.json(); 
            setPlaceKeys(Object.keys(res.place)); 
            setPlaceValues(Object.values(res.place)); 
        }

        fetchData (); 
    }, [])

    return ( 
        <section className="page places-page">
            { placeKeys.map(type => { 
                return( 
                    <article key = { generateRandomKey(20)}>
                        <h2 key = { generateRandomKey(20)}> { type } </h2>
                        { placeValues[ placeKeys.indexOf(type)].map(value => { 
                            return ( 
                                <article key = { value._id}>
                                    <RoadSelect onSelectPlace = { onSelectPlace } id = { value._id} title = { value.title }/>
                                </article>
                            ) 
                        })}

                        <hr />
                    </article>
                )
            })}

            <article className="button-holder">
                <button type = "button" onClick = { onCancelShowPages }> Anuleaza </button>
            </article>
        </section>
    )
}; 

export default SelectPlace;