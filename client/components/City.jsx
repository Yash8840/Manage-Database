import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { NavLink } from "react-router-dom";

const City = (props) => {
    const { id, title } = props;  
    const [data, setData] = useState({}); 

    return( 
        <section className="city">
            <h1>Oras: { title }</h1>
            <NavLink to = { `cities/${id}` }> View </NavLink>
        </section>
    )
}; 

export default City; 