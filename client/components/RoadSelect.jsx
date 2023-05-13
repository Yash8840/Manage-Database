import React from "react";

const RoadSelect = ({ id, title }) => { 
    return( 
        <article className="road-select">
            <p> { title } </p>
            <button> Selecteaza </button>
        </article>
    )
}