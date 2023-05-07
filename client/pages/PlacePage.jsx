import React, { useState, useEffect } from "react";

const PlacePage = () => { 
    const [ data, setData ] = useState({}); 
    return ( 
        <section className="detail-page page">
            <h2>Place</h2>
            <pre> { JSON.stringify(data) } </pre>
        </section>
    )
}; 

export default PlacePage; 