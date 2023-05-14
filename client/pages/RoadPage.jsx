import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import fetchData from "../helpers/fetchData";
import { Buffer } from "buffer";
import generateRandomKey from "../helpers/randomKey";
import Place from "../components/Place";

const RoadPage = () => { 
    const location = useLocation(); 
    {/* res.json({ road: road, roadPlaces }) */}
    const [ road, setRoad ] = useState({}); 
    const [ roadPlaces, setRoadPlaces ] = useState([]); 
    const [ images, setImages ] = useState([]); 

    const handleDelete = () => { 
        console.log("Sterge traseu"); 
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
            console.log(res.road.photo.data); 
            setRoad(res.road); 
            setRoadPlaces(res.roadPlaces); 
            await setImages(formatImages(res.road.photo.data)); 

            console.log(formatImages(res.road.photo.data)); 
        }; 

        renderData(); 
     }, []); 


    return ( 
        <section className="road-page page">
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
        </section>
    )
}; 

export default RoadPage