import React, { useEffect, useState } from "react";
import fetchData from "../helpers/fetchData";
import { useLocation } from "react-router-dom";
import Place from "../components/Place";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import generateRandomKey from "../helpers/randomKey";
import { Buffer } from "buffer"; 

const CityPage = () => { 
    const [data, setData] = useState({}); 
    const [ placeTypes, setPlaceTypes ] = useState([]); 
    const [ placesData, setPlacesData ] = useState({}); 
    const location = useLocation(); 
    const navigate = useNavigate(); 
    const [ images, setImages] = useState([]); 
    const [successDeleteMessage, setSuccessDeleteMessage] = useState(""); 

    const formatImages = (array) => { 
        const result = []; 
            array.forEach(dataBuffer => { 
                const base64image = Buffer.from(dataBuffer.data, 'base64').toString("base64"); 
                result.push(`data:image/jpeg;base64,${base64image}`); 
            }); 
        

        return result; 
    }

    useEffect( () => {
        const renderData = async () => { 
            try { 
                const res = await fetchData(`http://localhost:3000/api/${location.pathname}`); 
                const resTypes = await fetchData("http://localhost:3000/api/places/types"); 
                setPlaceTypes(resTypes); 
                setData(res.city); 
                setPlacesData(res.placesInCity);
                setImages(formatImages(res.city.photo.data)); 
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
                body: JSON.stringify(data.city) , 
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
                <NavLink to = {{pathname: `/cities/${data._id}/update`}}> Actualizeaza informatii </NavLink>
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

                {images.map(image => { 
                    return ( 
                        <img src= { image } alt="X" key={ generateRandomKey(20)} />
                    )
                })}
                       
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
                { placeTypes.length > 0 && 
                    placeTypes.map(type => { 
                        return ( 
                            <>
                                { placesData.some(t => t.type == type) && <p> { type } </p> }
                                { placesData.map(place => { 
                                    if(place.type == type) { 
                                        return ( 
                                            <article key = { place._id}>
                                                <Place id = { place._id} title = { place.title }/>
                                            </article>
                                        )
                                    }
                                })}
                            </>
                        )
                    })
                }
            </article>
        </section>
    )
};

export default CityPage; 