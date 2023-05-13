import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SelectPlace from "../pages/SelectPlace";

const RoadForm = () => {
    const { register, handleSubmit } = useForm();

    const [ title, setTitle ] = useState(""); 
    const [ description, setDescription ] = useState(""); 
    const [ images, setImages ] = useState([]); 
    const [ placesInRoad, setPlacesInRoad ] = useState([]); 

    const [ showPlacesPage, setShowPlacesPage ] = useState(false);  
    const [ selectedPlaces, setSelectedPlaces ] = useState({}); 

    const handleSelectPlace = (place) => { 
        let selectedPlacesAdd = [...selectedPlaces]; 
        selectedPlacesAdd.push(place); 
        setSelectedPlaces(selectedPlacesAdd); 

        let placesInRoadAdd = [...placesInRoad]; 
        placesInRoadAdd.push(place._id); 
        setPlacesInRoad(placesInRoadAdd); 
    } 
    
    const submitForm = async () => { 

    }
    return( 
        <section>
            <form action="" method = "POST" encType="multipart/form-data" onSubmit = { () => { handleSubmit(submitForm)}}>
                <div className="form-group">
                    <label htmlFor="title">Alege un nume pentru traseu</label>
                    <input {...register("title", { required : "required field" } ) } type="text" 
                        name = "title" onChange = { e => setTitle(e.target.value) } />
                </div>

                <div className="form-group">
                    <label htmlFor="description"> Descrie traseul </label>
                    <textarea {...register("description", { required: "required field" })  } 
                        name="description" id="description" cols="30" rows="10" onChange = { e => setDescription(e.target.value)}></textarea>
                </div>

                <div className="form-group">
                    <button type = "button" onClick = { () => { setShowPlacesPage(true)}}>Adauga Atractie</button>

                    { showPlacesPage && 
                        <SelectPlace /> 
                    }
                </div>

                <div className="form-group">
                    <input type="file" multiple onChange = { e => setImages(e.target.files)} name = "photo" />
                </div>

                <article className="button-holder">
                    <button type = "submit"> Creeaza traseu </button>
                </article>
            </form>
        </section>
    )
}; 

export default RoadForm