import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SelectPlace from "../pages/SelectPlace";
import Place from "./Place";

const EventForm = () => { 
    const { register, handleSubmit } = useForm(); 
    const [ title, setTitle ] = useState(""); 
    const [ description, setDescription ] = useState(""); 
    const [ images, setImages ] = useState([]); 
    const [ placesId, setPlacesId ] = useState(''); 
    const [ startDate, setStartDate ] = useState(''); 
    const [ stopDate, setStopDate ] = useState(''); 

    const [ showPlacesPage, setShowPlacesPage ] = useState(false);  
    const [ selectedPlaces, setSelectedPlaces ] = useState([]); 

    const handleSelectPlace = ({ id, place }) => { 
        let selectedPlacesAdd = [...selectedPlaces]; 
        let placesInRoadAdd = placesId; 
        if(placesInRoadAdd.includes(id)) { 
            setMessagePlaceExists("Atractia se afla deja in traseu"); 
        } else { 
            selectedPlacesAdd.push(place); 
            setSelectedPlaces(selectedPlacesAdd); 

            placesInRoadAdd += `${id},`;  
            setPlacesId(placesInRoadAdd); 

            setShowPlacesPage(false); 
        }
    } 

    const handleCancelShowPlaces = () => { 
        setShowPlacesPage(false); 
    }
    
    const submitForm = async () => { 
        const formData = { 
            title, 
            description, 
            startDate: new Date(startDate), 
            stopDate: new Date(stopDate), 
            places: placesId,  
            photo: images, 
        }

        const res = await fetch("http://localhost:3000/api/events/create",  { 
            method: "POST", 
            mode: 'cors', 
            body: JSON.stringify(formData), 
            headers: { 
                "Content-Type": "application/json"
            }
        }); 

        if(res.status !== 200) { 
            return; 
        }
    }; 

    const testFormData = () => { 
        const formData = { 
            title, 
            description,
            startDate: new Date(startDate), 
            stopDate: new Date(stopDate),  
            places: placesId,  
            photo: images, 
        }; 

        console.log(formData); 
    }
    return ( 
        <section className = "form">
            <form action="http://localhost:3000/api/events/create" method = "POST" encType="multipart/form-data"
                onChange = { () => handleSubmit(submitForm)}>
                <div className="form-group">
                    <label htmlFor="title"> Numele evenimentului: </label>
                    <input {...register("title", { required: "required field" })} type="text" name = "title"
                        onChange = { (e) => { setTitle(e.target.value)}} />
                    <input type="hidden" name = { "places" } value = { placesId } />
                </div>

                <div className="form-group">
                    <label htmlFor="description"> Descrierea evenimentului</label>
                    <textarea cols = "30" rows = "10" { ...register("description", { required: "required field" })} type="text" name = "description"
                        onChange =  { e => setDescription (e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="startDate"> Data si ora inceperii evenimentului: </label>
                    <input {...register("startDate") } type="datetime-local" name = "startDate"
                        onChange = { e => setStartDate(e.target.value)} />
                </div>

                <div className = "form-group">
                    <label htmlFor="stopDate"> Data si ora sfarsitului evenimentului </label>
                    <input {...register("stopDate")} type="datetime-local" name = "stopDate"
                        onChange = { e => setStopDate(e.target.value)  } />
                </div>

                <div className="form-group">
                    <label htmlFor="photo[]"> Selecteaza fotografii pentru eveniment </label>
                    <input type="file" name = "photo[]"  multiple onChange = { e => setImages(e.target.files)} />
                </div>

                <div className="form-group"> 
                    <button type = "button" onClick = { () => { setShowPlacesPage(true)}}>Adauga Atractie</button>

                    { showPlacesPage && 
                        <SelectPlace onCancelShowPages = { handleCancelShowPlaces } onSelectPlace = { handleSelectPlace } /> 
                    }
                </div>

                    <hr />

                <section className="selected-roads">
                    { selectedPlaces.map(place => { 
                        return( 
                            <article key = { place._id }>
                                <Place id = { place._id } place = { place } /> 
                            </article>
                        )
                    })}
                </section>

                    <hr />

                <article className="button-holder">
                    <button type = "submit"> Adauga eveniment </button>
                </article>
            </form>

            <button onClick = { testFormData }> Testeaza </button>
        </section>
    )
}; 

export default EventForm 