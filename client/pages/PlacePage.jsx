import React, { useState, useEffect } from "react";
import fetchData from "../helpers/fetchData";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Buffer } from "buffer"; 
import generateRandomKey from "../helpers/randomKey";

const PlacePage = () => { 
    const location = useLocation(); 
    const navigate = useNavigate(); 
    const [ data, setData ] = useState({}); 
    const [ city, setCity ] = useState({}); 
    const [ images, setImages ] = useState([]); 

    const formatImages = (array) => { 
        const result = []; 
            array.forEach(dataBuffer => { 
                const base64image = Buffer.from(dataBuffer.data, 'base64').toString("base64"); 
                result.push(`data:image/jpeg;base64,${base64image}`); 
            }); 
        

        return result; 
    }

    useEffect (() => {
        const renderData = async () => { 
            const res = await fetchData(`http://localhost:3000/api${location.pathname}`); 
            setData(res.place); 
            if(res.city) { 
                setCity(res.city[0])
                setImages(formatImages(res.place.photo.data)); 
            }
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
                return; 
            }

            navigate("/cities"); 
        } catch(err) { 
            console.log(err); 
        }
    }
    return ( 
        <section className="detail-page page">
            <h2> { data.title } </h2>
            <article className="developer">
                <button onClick={ handleDelete }>Sterge Locatie</button>
                <NavLink to = {{ pathname: `/places/${data._id}/update`}}>Actualizeaza atractie</NavLink>
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

                { data.city  && 
                    <NavLink to = { `/cities/${city._id}`}> { city.title } </NavLink> 
                }

                
                    {images.map(image => { 
                        return ( 
                            <img src= { image } alt="X" key={ generateRandomKey(20)} />
                        )
                    })}

                { data.program && 
                    <p className="info program"> PROGRAM: { data.program } </p>
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
}

export default PlacePage; 