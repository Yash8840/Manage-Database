import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import fetchData from "../helpers/fetchData";
import InfoFieldMultiple from "../components/InfoField";

const UpdateCity = () => {
    const { register, handleSubmit } = useForm(); 
    const location = useLocation(); 
    const navigate = useNavigate(); 

    /* states */ 
    const [ defaultPath, setDefaultPath ] = useState(""); 
    const [title, setTitle] = useState(""); 
    const [components, setComponents] = useState([]); 
    const [description, setDescription] = useState(""); 
    const [surface, setSurface] = useState(0); 
    const [history, setHistory] = useState(""); 
    const [population, setPopulation] = useState(""); 
    const [message, setMessage] = useState(""); 

    const prepareArray = (array) => { 
        const result = []; 
        array.forEach(el => { 
            result.push(el.text); 
        }); 

        return result; 
    }

    const informationsForming = (array) => { 
        const result = []; 
        array.forEach(el => { 
            result.push({ id: array.indexOf(el) + 1 ,  text: el, showEdit: false }); 
        }); 

        return result; 
    }

    useEffect( () => { 
        console.log(location.pathname); 
        const renderData = async () => { 
            const res = await fetchData(`http://localhost:3000/api${location.pathname}`)
            await setDefaultPath(location.pathname); 
            await setTitle(res.title);
            await setComponents(informationsForming(res.components.split(","))); 
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

        console.log(formData); 

        try { 
            const req = await fetch(`http://localhost:3000/api${location.pathname}`, { 
                method: "put", 
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
        console.log("LINK: "); 
        console.log(`http://localhost:3000/api${location.pathname}`)
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

       /*  info field */
       const [ mainShowEdit, setMainShowEdit ] = useState(false); 

       const handleCancel = () => { 
           const componentsEdit = [...components]; 
           componentsEdit.forEach(info => info.showEdit = false); 
   
           setMainShowEdit(false); 
           setComponents(componentsEdit); 
       }
   
       const handleCancelOne = (info) => { 
           const componentsEdit = [...components]; 
   
           componentsEdit.map(i => { 
               if (i == info) { 
                   i.showEdit = false; 
               }
               return i; 
           })
   
           setComponents(componentsEdit); 
       }
   
       const showEditHandler = (info) => { 
           const componentsEdit = [...components]; 
           const index = componentsEdit.indexOf(info); 
   
           componentsEdit[index].showEdit = true; 
           setComponents(componentsEdit); 
       }
   
       const showMainEditHandler = () => { 
           const show = !mainShowEdit; 
           setMainShowEdit(show); 
       }; 
   
       const addMainInfoHandler = () => { 
           const componentsEdit = [...components];
           const input = document.getElementById("info-field-input").value; 
           const show = !mainShowEdit; 
   
           componentsEdit.push({ id: components.length + 1, text: input, showEdit: false }); 
           setComponents(componentsEdit); 
           setMainShowEdit(show); 
       }; 
   
       const handleDelete = (counterId) => { 
           const infoFilter = components.filter (info => info.id !== counterId ); 
   
           const componentsEdit = infoFilter.map(info => { 
               info.id = infoFilter.indexOf(info) + 1; 
               return info; 
           }); 
   
           setComponents(componentsEdit); 
       } 
   
       const handleEdit = (info, text) => { 
           const componentsEdit = [...components]; 
           console.log(componentsEdit); 
           const index = componentsEdit.indexOf(info); 
   
           console.log(index); 
           console.log(componentsEdit[index]); 
   
           componentsEdit[index].text = text; 
           componentsEdit[index].showEdit = false;
           setComponents(componentsEdit); 
       }
    
    return( 
        <section className="form">
            <form  method = "PUT" action = { `http://localhost:3000/api${location.pathname}` } onSubmit = { () => { () => { handleSubmit(submitForm)}}  } >
                <div className="form-group">
                    <label htmlFor="title">Numele Orasului: </label>
                    <input 
                        { ...register("title", { required: "required field"})}
                        onChange = { e => setTitle(e.target.value)}
                        value = { title }
                        type="text" name = "title" placeholder="Aa" />
                </div>

                <div className="form-group"> 
                    <input type="hidden" {...register("components")} value = { prepareArray(components) } />
                    <InfoFieldMultiple 
                        name = "Satele componente ale orasului(optional): " 
                        description = "" 
                        informations = { components } 
                        handleCancel = { handleCancel } 
                        handleCancelOne = { handleCancelOne } 
                        showEditHandler = { showEditHandler } 
                        showMainEditHandler = { showMainEditHandler }
                        handleDelete = { handleDelete }
                        addMainInfoHandler = { addMainInfoHandler }
                        handleEdit = { handleEdit }
                        mainShowEdit = { mainShowEdit } /> 
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

                    <button type = "submit">Actualizeaza Oras</button>
            </form>

            <button onClick = { () => { navigate(-1)}}>Inapoi</button>
            <button onClick = { testForm }> Testeaza </button>
        </section>
    )
}; 

export default UpdateCity; 