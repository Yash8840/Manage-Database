import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const City = (props) => {
    const { id, title } = props;   

    return( 
        <section className="city">
            <h1>Oras: { title }</h1>
            <NavLink to = {{ pathname: `/cities/${id}` }}> View </NavLink>
        </section>
    )
}; 

export default City; 