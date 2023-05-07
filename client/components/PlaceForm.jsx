import React, {useState, useEffect } from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import  { useForm } from "react-hook-form"; 

const PlaceForm = () => { 
    const navigate = useNavigate(); 
    const  { register, handleSubmit } = useForm (); 

    const [title, setTitle] = useState(""); 
    const [description, setDescription] = useState(""); 
    const [type, setType] = useState(""); 
    const [history, setHistory] = useState(""); 
    const [contact, setContact] = useState(""); 
    const [city, setCity] = useState(""); 
    const [adress, setAdress] = useState(""); 
    const [formMsg, setFormMsg] = useState(""); 

    const submitForm = async () => { 
        console.log("hellooooo");
        const formData = JSON.stringify({ 
            title, 
            description, 
            type, 
            history, 
            contact, 
            city, 
            adress
        }); 

        console.log(formData)
        
        try { 
            const req = await fetch(
                "http://localhost:3000/api/places/create", 
                {
                    method: "POST", 
                    mode: "cors", 
                    body: formData, 
                    headers: { 
                        "Content-Type": "application/json",
                    }
                }
            ); 
    
            if(req.status !== 200) {
                setFormMsg("Place added.") 
                return;
            }

            navigate("/general/places"); 
                
            console.log(`Place ${formData} added to places collection.`); 
        } catch (err) { 
            navigate("/general")
            setFormMsg("You have an error in the code."); 
            console.log(err); 
        }
    }

    const testFormData = () => { 
        const formData = JSON.stringify({ 
            title, 
            description, 
            type, 
            history, 
            contact, 
            city, 
            adress
        }); 

        console.log("TESTING FORM DATA: "); 
        console.log(formData); 
    }
    return( 
        <section className="form">
            <form method="POST" action = "http://localhost:3000/api/places/create" onSubmit={() => { handleSubmit(submitForm)}}>
                <div className="form-group">
                    <label htmlFor="title">Titlul Atractiei: </label>
                    <input {...register ("title", { required: "required field" })} type="text" name = "title" 
                        onChange = { (e) => setTitle(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Descrierea atractiei: </label>
                    <textarea {...register ("description", { required: "required field" })} name="description" id="description" cols="30" rows="10" 
                        onChange = { e => setDescription(e.target.value)}
                        required></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="type">Tipul atractiei</label>
                    <select {...register ("type", { required: "required field" })}
                        onChange = { e => { setType(e.target.value)}}
                        name="type" id="type">
                        {/* testing options*/}
                        <option value="manastire">Manastire</option>
                        <option value="lac">Lac</option>
                        <option value="constructie">Constructie</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="history">Istoria atractiei (optional): </label>
                    <textarea {...register("history")} name="history" 
                        onChange = { e => setHistory(e.target.value )} 
                        id="history" cols="30"
                        rows="10" required></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="contact">Date de contact (la alegere): </label>
                    <input
                        {...register("contact")}
                        onChange = { (e) => setContact(e.target.value)}
                        type="text" name = "contact" />
                </div>

                <div className="form-group">
                    <label htmlFor="city">Selecteaza Orasul(optional): </label>
                    <select {...register("city")}
                        onChange = { e =>  { setCity(e.target.value)} }
                        name="city" id="city">
                        <option value="Vaslui">Vaslui</option>
                        <option value="Husi">Husi</option>
                        <option value="Barlad">Barlad</option>
                        <option value="Negresti">Negresti</option>
                        <option value="Murgeni">Murgeni</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="adress">Selecteaza o adresa</label>
                    <input {...register("adress")}  type="text" 
                        onChange = { e => setAdress(e.target.value)}
                        name = "adress" />
                </div>

                <button type = "submit"> Adauga Atractie </button>
            </form>

            <button onClick = { testFormData } > Press </button>
        </section>
    )
}; 

export default PlaceForm; 