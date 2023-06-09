import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import fetchData from "../helpers/fetchData";
import { Buffer } from "buffer";
import generateRandomKey from "../helpers/randomKey";
import Place from "../components/Place";
import { useNavigate } from "react-router-dom";

const RoadPage = () => { 
    const location = useLocation(); 
    const navigate = useNavigate(); 
    {/* res.json({ road: road, roadPlaces }) */}
    const [ road, setRoad ] = useState({}); 
    const [ roadPlaces, setRoadPlaces ] = useState([]); 
    const [ images, setImages ] = useState([]); 
    const [ pageLoaded, setPageLoaded ] = useState(false); 

    const handleDelete = async () => { 
        const res = await fetch(`http://localhost:3000/api${location.pathname}`, { 
            method: "delete", 
            mode: "cors", 
            headers: { 
                "Content-Type": "application/json", 
            }
         }); 

        if(res.status !== 200) { 
            return; 
        }; 

        navigate("/roads"); 
    }

    {/* Images */}
    const formatImages = (array) => { 
        const result = []; 
            array.forEach(dataBuffer => { 
                const base64image = Buffer.from(dataBuffer.data, 'base64').toString("base64"); 
                result.push(`data:image/jpg;base64,${base64image}`); 
            }); 
        

        return result; 
    }

    useEffect( () => {
        async function renderData () { 
            const res = await fetchData(`http://localhost:3000/api${location.pathname}`);  
            setRoad(res.road); 
            setRoadPlaces(res.roadPlaces); 
            await setImages(formatImages(res.road.photo.data)); 
            setPageLoaded(true); 
        }; 

        renderData(); 
        console.log(`http://localhost:3000/api${location.pathname}`)
     }, []); 


    return ( 
        <section className="road-page page">
            { !pageLoaded && 
                <p className="first"> Loading </p>
            }
            { pageLoaded && 
                <>
                    <h1> { road.title }</h1>
                    { images.map(image => { 
                        return( 
                            <img src= { image } width = "500px" height= "300px" alt="X" key = { generateRandomKey(20)} />
                        )
                    })}
                    <h2> { road.description } </h2>

                    <button onClick = { handleDelete }> Sterge Traseul </button>

                    <hr />
                    <p> Vezi atractiile pe care urmeaza sa le vizitezi: </p>
                    { roadPlaces.map(place => { 
                        return( 
                            <Place key = { place._id } id = { place._id } place = { place } /> 
                        )
                    })}
                </>
            }
        </section>
    )
}; 

export default RoadPage