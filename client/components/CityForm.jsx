import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const CityForm = () => {
    const { register, handleSubmit } = useForm(); 

    /* states */ 
    const [title, setTitle] = useState(""); 
    const [components, setComponents] = useState(""); 
    const [description, setDescription] = useState(""); 
    const [surface, setSurface] = useState(0); 
    const [history, setHistory] = useState(""); 
    const [population, setPopulation] = useState(""); 
    const [message, setMessage] = useState(""); 

    const submitForm = async () => { 
        const formData = JSON.stringify({ 
            title, 
            components, 
            description, 
            surface, 
            history, 
            population 
        }); 

        try { 
            const req = await fetch("http://localhost:3000/api/cities/create", { 
                method: "POST", 
                mode: "cors", 
                body: formData, 
                headers: { 
                    "Content-Type": "application/json"
                }
            })

            if(req.status !== 200) { 
                setMessage(`You have an error: ${req.status}`); 
                return; 
            }

            console.log(`City ${title} addded`); 
            setMessage("Success added"); 
        } catch(err){ 
            setMessage("err");
        }
    }
 
    const testForm = () => { 
        const formData = JSON.stringify({ 
            title, 
            components, 
            description, 
            surface, 
            history, 
            population 
        }) 

        console.log(formData)
    }

    return( 
        <section className="form">
            <form action="http://localhost:3000/api/cities/create" method="POST" onSubmit = { () => { handleSubmit(submitForm)}} >
                <div className="form-group">
                    <label htmlFor="title">Numele Orasului: </label>
                    <input 
                        { ...register("title", { required: "requiredField"})}
                        onChange = { e => setTitle(e.target.value)}
                        type="text" name = "title" placeholder="Aa" />
                </div>

                <div className="form-group">
                    <label htmlFor="components">Sate Componente: </label>
                    <input type="text"
                        { ...register("components")}
                        onChange = { e => setComponents(e.target.value )}
                        name = "components" placeholder = "scrie aici lista satelor componente" />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Descrierea orasului: </label>
                    <textarea 
                        { ...register("description", { required: "required field"})}
                        onChange = { e => setDescription(e.target.value )}
                        name="description" id="description" cols="30" rows="10"></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="surface">Suprafata Orasului: </label>
                    <input 
                        { ...register("surface", { required: "required field"})}
                        onChange = { e => setSurface(e.target.value )}
                        type="number" min =  { 0 } />
                </div>

                <div className="form-group">
                    <label htmlFor="history">Istoria orasului: </label>
                    <textarea 
                        { ...register("history")}
                        onChange =  { e => { setHistory(e.target.value)}}
                        name="history" id="history" cols="30" rows="10"></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="population">Populatia orasului</label>
                    <input 
                        {...register("population", { required: "required field "})}
                        onChange = { e => setPopulation(e.target.value )}
                        type="number" min = { 100 } />
                </div>

                <article className="button-holder">
                    <button type = "submit">Creeaza Oras</button>
                </article>
            </form>

            <button onClick = { testForm }> Testeaza </button>
        </section>
    )
}; 

export default CityForm; 