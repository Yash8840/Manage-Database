import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import fetchData from "../helpers/fetchData";

const UpdateCity = () => {
    const { register, handleSubmit } = useForm(); 
    const location = useLocation(); 
    const navigate= useNavigate(); 

    /* states */ 
    const [title, setTitle] = useState(""); 
    const [components, setComponents] = useState(""); 
    const [description, setDescription] = useState(""); 
    const [surface, setSurface] = useState(0); 
    const [history, setHistory] = useState(""); 
    const [population, setPopulation] = useState(""); 
    const [message, setMessage] = useState(""); 

    useEffect( () => { 
        const renderData = async () => { 
            const res = await fetchData(`http://localhost:3000/api/${location.pathname}`)
            await setTitle(res.title); 
            await setComponents(res.components); 
            await setDescription(res.description); 
            await setSurface(res.surface); 
            await setHistory(res.history); 
            await setPopulation(res.population); 
        }

        renderData(); 
    }, []); 

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
                method: "PUT", 
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

            console.log(`City ${title} updated`); 
            setMessage("Success updated"); 
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
            <form action="http://localhost:3000/api/cities/create" method="PUT" onSubmit = { () => { handleSubmit(submitForm)}} >
                <div className="form-group">
                    <label htmlFor="title">Numele Orasului: </label>
                    <input 
                        { ...register("title", { required: "requiredField"})}
                        onChange = { e => setTitle(e.target.value)}
                        value = { title }
                        type="text" name = "title" placeholder="Aa" />
                </div>

                <div className="form-group">
                    <label htmlFor="components">Sate Componente: </label>
                    <input type="text"
                        { ...register("components")}
                        onChange = { e => setComponents(e.target.value )}
                        value = { components }
                        name = "components" placeholder = "scrie aici lista satelor componente" />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Descrierea orasului: </label>
                    <textarea 
                        { ...register("description", { required: "required field"})}
                        onChange = { e => setDescription(e.target.value )}
                        value = { description }
                        name="description" id="description" cols="30" rows="10"></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="surface">Suprafata Orasului: </label>
                    <input 
                        { ...register("surface", { required: "required field"})}
                        onChange = { e => setSurface(e.target.value )}
                        value = { surface }
                        type="number" min =  { 0 } />
                </div>

                <div className="form-group">
                    <label htmlFor="history">Istoria orasului: </label>
                    <textarea 
                        { ...register("history")}
                        onChange =  { e => { setHistory(e.target.value)}}
                        value = { history }
                        name="history" id="history" cols="30" rows="10"></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="population">Populatia orasului</label>
                    <input 
                        {...register("population", { required: "required field "})}
                        onChange = { e => setPopulation(e.target.value )}
                        value =  { population }
                        type="number" min = { 100 } />
                </div>

                <article className="button-holder">
                    <button type = "submit">Actualizeaza Oras</button>
                </article>
            </form>

            <button onClick = { () => { navigate(-1)}}>Inapoi</button>
            <button onClick = { testForm }> Testeaza </button>
        </section>
    )
}; 

export default UpdateCity; 