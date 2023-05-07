import React, { useState, useEffect } from "react";
import fetchData from "../helpers/fetchData";
import { useLocation } from "react-router-dom";

const PlacePage = () => { 
    const location = useLocation(); 
    const [ data, setData ] = useState({}); 

    useEffect (() => {
        const renderData = async () => { 
            const res = await fetchData(`http://localhost:3000/api/${location.pathname}`); 
            setData(res.place); 
            console.log(res); 
        }

        renderData(); 
     }, []) 
    return ( 
        <section className="detail-page page">
            <h2> { data.title } </h2>
            <article className="developer">
                <button>Sterge Locatie</button>
                <button>Actualizeaza Locatie</button>
            </article>

            <article className="informations">
                <p className="description"> { data.description } </p>
                <p className="type">Tipul atractiei: { data.type } </p>

                { data.history && 
                    <>
                        <p className="info hostory"> Istorie: </p>
                        <p className="info history"> { data.history } </p>
                    </>
                }
                <hr />

                { data.contact && 
                    <p className="info contact">Contact: { data.contact } </p>
                }

                { data.adress && 
                    <p className="info adress">Adresa: { data.adress } </p>
                }
            </article>

        </section>
    )
}; 

export default PlacePage; 