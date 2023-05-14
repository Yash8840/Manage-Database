import React from "react";

const RoadSelect = ({ id, place, onSelectPlace }) => { 
    return( 
        <article className="road-select">
            <p> { place.title } </p>
            <button onClick = { () => { onSelectPlace({ id, place })}} type = "button"> Selecteaza </button>
        </article>
    )
}; 

export default RoadSelect 