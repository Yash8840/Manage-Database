import React from "react";
import { NavLink } from "react-router-dom";

const Event = ({ id, event }) => { 
    return ( 
        <article className = "event">
            <h3> { event.title } </h3>
            <NavLink  to = {{ pathname: `/events/${id}`}}> Vezi </NavLink>
        </article>
    )
}; 

export default Event; 