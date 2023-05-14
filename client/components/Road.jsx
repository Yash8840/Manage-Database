import React from "react";
import { NavLink } from "react-router-dom";

const Road = ({ road, id }) => { 
    return  ( 
        <section>
            <h3> { road.title } </h3>
            <NavLink to = {{ pathname:`/roads/${id}`}}> Vezi Traseu </NavLink>
        </section>
    )
}; 

export default Road; 