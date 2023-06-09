import React, { useState } from "react";
import InfoFieldMultiple from "./InfoField";
import { useForm } from "react-hook-form";

const CityForm = () => {
    const { register, handleSubmit } = useForm(); 

    /* states */ 
    const [title, setTitle] = useState(""); 
    const [components, setComponents] = useState([]); 
    const [description, setDescription] = useState(""); 
    const [surface, setSurface] = useState(0); 
    const [history, setHistory] = useState(""); 
    const [population, setPopulation] = useState(""); 
    const [images, setImages] = useState([]); 
    
    const prepareArray = (array) => { 
        const result = []; 
        array.forEach(el => { 
            result.push(el.text); 
        }); 

        return result; 
    }

    const submitForm = async () => { 
        const formData = { 
            title, 
            components,  
            description, 
            photo: images, 
            surface, 
            history, 
            population 
        }; 

        try { 
            const req = await fetch("http://localhost:3000/api/cities/create", { 
                method: "POST", 
                mode: "cors", 
                body: JSON.stringify(formData), 
                headers: { 
                    "Content-Type": "application/json"
                }
            })

            if(req.status !== 200) { 
                return; 
            }

            console.log(`City ${title} addded`); 
        } catch(err){ 
            console.log(err); 
        }
    }
 
    const testForm = () => { 
        const formData = { 
            title, 
            components, 
            description, 
            photo: images, 
            surface, 
            history, 
            population 
        }

        console.log(formData); 
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
            <form action="http://localhost:3000/api/cities/create" 
                encType="multipart/form-data" className="main-form" method="POST" onSubmit = { () => { handleSubmit(submitForm)}} >
                <div className="form-group">
                    <label htmlFor="title">Numele Orasului: </label>
                    <input 
                        { ...register("title", { required: "requiredField"})}
                        onChange = { e => setTitle(e.target.value)}
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

                <div className = "form-group">
                    <input type="file" name = "photo[]"
                        multiple onChange = { (e) => {  setImages(e.target.files);   console.log(images)}  }/>
                </div>

                <article className="button-holder">
                    <button type = "submit">Creeaza Oras</button>
                </article>
                <button type = "button" onClick = { testForm }> Testeaza </button>
            </form>

        </section>
    )
}; 

export default CityForm; 