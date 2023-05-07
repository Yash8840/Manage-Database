import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import NavBar from "../components/NavBar";
import Place from "../components/Place";
import PlaceForm from "../components/PlaceForm";

const PlaceManage = () => { 
    return( 
        <section className="manage place-manage page">
            <PlaceForm />
        </section>
    )
}; 

export default PlaceManage;