import React, { useEffect, useState } from "react";
import fetchData from "../helpers/fetchData";
import { useLocation } from "react-router-dom";
import PlacePage from "./PlacePage";
import Place from "../components/Place";
import { useNavigate } from "react-router-dom";

const CityPage = () => { 
    const [data, setData] = useState({}); 
    const [placesData, setPlacesData] = useState({}); 
    const location = useLocation(); 
    const navigate = useNavigate(); 

    const [successDeleteMessage, setSuccessDeleteMessage] = useState(""); 

    useEffect( () => {
        const renderData = async () => { 
            try { 
                const res = await fetchData(`http://localhost:3000/api/${location.pathname}`); 
                setData(res.city); 
                setPlacesData(res.placesInCity); 
                console.log(res.placesInCity); 
            } catch(err) { 
                console.log(err); 
                console.log("in efect"); 
            }
        }

        renderData(); 
     }, []); 

    const handleDelete = async () => { 
        try { 
            const res = await fetch(`http://localhost:3000/api/${location.pathname}`, { 
                method: "DELETE", 
                mode: "cors", 
                body: data.city, 
                headers: { 
                    "Content-Type": "application/json", 
                }
            }); 
    
            if(res.status !== 200) { 
                setSuccessDeleteMessage("There is a problem in your code. ")
                return; 
            }

            navigate("/cities")
            setSuccessDeleteMessage("Deleted Successfully"); 
        } catch(err) { 
            setSuccessDeleteMessage("You have an error"); 
            console.log(err); 
        }
    }

    return( 
        <section className="detail-page page">
            <article className="developer-area">
                <h2> { data.title } </h2>
                <button onClick={ handleDelete }> Sterge Oras </button>
                <button> Actualizeaza informatii </button>
            </article>
            <hr />
            <article className="informations">
                <p className="info description"> { data.description } </p>

                { data.components && 
                <>
                    <p className="info components"> Urmatoarele sate apartin de acest oras: </p>
                    <p> { data.components } </p>
                </>
                }                
                { data.history && 
                    <>
                        <p className="info history">Istoria orasului: </p>
                        <p className="info history"> { data.history } </p>
                    </>
                }

                <hr />
                <p className="info population"> Populatie: { data.population } </p>
                <p className="info surface"> Suprafata: { data.surface } km ^ 2  </p>
                <hr />

                <h3>Atractii: </h3>
                { placesData.length > 0 && placesData.map(place => { 
                    return ( 
                        <article key = { place._id }> <Place id = { place._id } title = { place.title } /> </article>
                    )
                })}
            </article>
        </section>
    )
};

export default CityPage; 