import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Place from "../components/Place";
import fetchData from "../helpers/fetchData";
import PlaceForm from "../components/PlaceForm";

const PlaceManage = () => { 
    const [ apiCities, setApiCities ] = useState([]); 
    const [ placeTypes, setPlaceTypes ] = useState(""); 

    useEffect( () => { 
        const renderData = async () => { 
            const res = await fetchData("http://localhost:3000/api/cities"); 
            setApiCities(res.cities); 
            console.log(res.cities); 

            const typeRes = await fetchData("http://localhost:3000/api/places/types") 
            setPlaceTypes(typeRes); 
            console.log(typeRes); 
        }

        renderData(); 
    }, []); 
    return( 
        <section className="manage place-manage page">
            <PlaceForm apiCities={apiCities} placeTypes = {placeTypes}/>
        </section>
    )
}; 

export default PlaceManage;