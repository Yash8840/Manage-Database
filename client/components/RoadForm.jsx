import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SelectPlace from "../pages/SelectPlace";

const RoadForm = () => {
    const { register, handleSubmit } = useForm();

    const [ title, setTitle ] = useState(""); 
    const [ description, setDescription ] = useState(""); 
    const [ images, setImages ] = useState([]); 
    const [ placesId, setPlacesId ] = useState([]); 

    const [ showPlacesPage, setShowPlacesPage ] = useState(false);  
    const [ selectedPlaces, setSelectedPlaces ] = useState([]); 

    const [ messagePlaceExists, setMessagePlaceExists ] = useState(""); 

    const handleSelectPlace = (place) => { 
        let selectedPlacesAdd = [...selectedPlaces]; 
        if(selectedPlacesAdd.includes(place.title)) { 
            setMessagePlaceExists("Atractia se afla deja in traseu"); 
        } else { 
            selectedPlacesAdd.push(place.title); 
            setSelectedPlaces(selectedPlacesAdd); 

            let placesInRoadAdd = [...placesId]; 
            placesInRoadAdd.push(place.id); 
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
            places: placesId, 
            photo: images, 
        }; 

        const req = await fetch("http://localhost:3000/api/roads/create", { 
            method: "post", 
            mode: "cors", 
            body: JSON.stringify(formData),
            headers: { 
                "Content-Type": "application/json", 
            }
        }); 

        if(req.status !== 200) { 
            return;  
        } 
    }

    const testRoadObjectInConsole = () => { 
        const roadDetails = { 
            title, 
            description, 
            places: placesId, 
            photo: images, 
        }; 

        console.log(roadDetails); 
    }
    return( 
        <section>
            <form action="http://localhost:3000/api/roads/create" method = "POST" encType="multipart/form-data" onSubmit = { () => { handleSubmit(submitForm)}}>
                <div className="form-group">
                    <label htmlFor="title">Alege un nume pentru traseu</label>
                    <input {...register("title", { required : "required field" } ) } type="text" 
                        name = "title" onChange = { e => setTitle(e.target.value) } />
                        <input type="hidden" name = { "places" } value = { placesId } />
                </div>

                <div className="form-group">
                    <label htmlFor="description"> Descrie traseul </label>
                    <textarea {...register("description", { required: "required field" })  } 
                        name="description" id="description" cols="30" rows="10" onChange = { e => setDescription(e.target.value)}></textarea>
                </div>

                <div className="form-group">
                    <button type = "button" onClick = { () => { setShowPlacesPage(true)}}>Adauga Atractie</button>

                    { showPlacesPage && 
                        <SelectPlace onCancelShowPages = { handleCancelShowPlaces } onSelectPlace = { handleSelectPlace } /> 
                    }
                </div>

                <div className="form-group">
                    <input type="file" multiple onChange = { e => setImages(e.target.files)} name = "photo[]" />
                </div>

                <article className="button-holder">
                    <button type = "submit"> Creeaza traseu </button>
                </article>
            </form>

            <article className = "test">
                <button onClick = { testRoadObjectInConsole }> Previzualizeaza </button>
            </article>
        </section>
    )
}; 

export default RoadForm