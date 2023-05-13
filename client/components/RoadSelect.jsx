import React from "react";

const RoadSelect = ({ id, title }) => { 
    return( 
        <article className="road-select">
            <p> { title } </p>
            <button type = "button"> Selecteaza </button>
        </article>
    )
}; 

export default RoadSelect 