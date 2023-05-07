import React, { useState, useEffect } from "react"
import City from "../components/City";
import CityForm from "../components/CityForm";
import NavBar from "../components/NavBar";

const CityManage = () => { 
    return( 
        <section className="manage city-mangep page">
            <CityForm/>
        </section>
    )
}; 

export default CityManage;