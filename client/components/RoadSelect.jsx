import React from "react";

const RoadSelect = ({ id, title, onSelectPlace }) => { 
    return( 
        <article className="road-select">
            <p> { title } </p>
            <button onClick = { () => { onSelectPlace({ id, title })}} type = "button"> Selecteaza </button>
        </article>
    )
}; 

export default RoadSelect 