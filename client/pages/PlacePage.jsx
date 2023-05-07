import React, { useState, useEffect } from "react";
import fetchData from "../helpers/fetchData";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PlacePage = () => { 
    const location = useLocation(); 
    const navigate = useNavigate(); 
    const [ data, setData ] = useState({}); 
    const [ successDeleteMessage, setSuccessDeleteMessage ] = useState("");  

    useEffect (() => {
        const renderData = async () => { 
            const res = await fetchData(`http://localhost:3000/api/${location.pathname}`); 
            setData(res.place); 
            console.log(res); 
        }

        renderData(); 
     }, []) 

    const handleDelete = async () => { 
        try {  
            const res = await fetch( `http://localhost:3000/api${location.pathname}`, { 
                method: "delete", 
                mode: "cors", 
                body: JSON.stringify(data), 
                headers: { 
                    "Content-Type": "application/json", 
                }
            })

            if(res.status !== 200) { 
                setSuccessDeleteMessage("You have an error in your code - STATUS error."); 
                return; 
            }

            navigate("/cities"); 
        } catch(err) { 
            console.log(err); 
            setSuccessDeleteMessage("You have an error in your code."); 
        }
    }
    return ( 
        <section className="detail-page page">
            <h2> { data.title } </h2>
            <article className="developer">
                <button onClick={ handleDelete }>Sterge Locatie</button>
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