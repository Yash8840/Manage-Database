import React, { useEffect, useState } from "react";
import fetchData from "../helpers/fetchData";
import { useLocation } from "react-router-dom";

const CityPage = () => { 
    const [data, setData] = useState({}); 
    const location = useLocation(); 

    useEffect( () => {
        const renderData = async () => { 
            try { 
                const res = await fetchData(`http://localhost:3000/api/${location.pathname}`); 
                console.log(res.city); 
                setData(res.city); 
            } catch(err) { 
                console.log(err); 
                console.log("in efect"); 
            }
        }

        renderData(); 
     }, []); 

    return( 
        <section className="detail-page page">
            <article className="developer-area">
                <h2> { data.title } </h2>
                <button> Sterge Oras </button>
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

                <p className="info surface"> Orasul are o suprafata de: { data.surface } </p>
                
                { data.history && 
                    <>
                        <p className="info history">Istoria orasului: </p>
                        <p className="info history"> { data.history } </p>
                    </>
                }

                <p className="info population"> Orasul are o populatie de: { data.population } </p>
            </article>
        </section>
    )
};

export default CityPage; 