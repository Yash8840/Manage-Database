import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
const Place = (props) => {
    const { id, place } = props; 
    return( 
        <section className="place">
            <h1> { place.title } </h1>
            <NavLink to = {{ pathname: `/places/${id}`}}> Vezi </NavLink>
        </section>
    )
}; 

export default Place; 