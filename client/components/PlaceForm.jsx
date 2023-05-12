import React, {useState } from "react";
import { useNavigate } from "react-router-dom";
import  { useForm } from "react-hook-form"; 
import InfoFieldMultiple from "./InfoField";

const PlaceForm = ({ apiCities, placeTypes }) => { 
    const navigate = useNavigate(); 
    const  { register, handleSubmit } = useForm (); 

    const [title, setTitle] = useState(""); 
    const [description, setDescription] = useState(""); 
    const [type, setType] = useState(""); 
    const [history, setHistory] = useState(""); 
    const [contact, setContact] = useState(""); 
    const [city, setCity] = useState(""); 
    const [adress, setAdress] = useState([]); 
    const [formMsg, setFormMsg] = useState(""); 
    const [program, setProgram] = useState(""); 
    const [images, setImages] = useState([]); 

    const prepareArray = (array) => { 
        const result = []; 
        array.forEach(el => { 
            result.push(el.text); 
        }); 

        return result; 
    }

    const submitForm = async () => { 
        const adressData = [];
        adress.forEach(adress => { 
            adressData.push(adress.text); 
        })
        console.log("hellooooo");
        const formData = { 
            title, 
            description, 
            type, 
            photo: images, 
            history, 
            contact, 
            program, 
            city, 
            adress: adressData, 
        }; 

        console.log(formData)
        
        try { 
            const req = await fetch(
                "http://localhost:3000/api/places/create", 
                {
                    method: "POST", 
                    mode: "cors", 
                    body: JSON.stringify(formData), 
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

    const [ mainShowEdit, setMainShowEdit ] = useState(false); 

    const handleCancel = () => { 
        const adressEdit = [...adress]; 
        adressEdit.forEach(info => info.showEdit = false); 

        setMainShowEdit(false); 
        setAdress(adressEdit); 
    }

    const handleCancelOne = (info) => { 
        const adressEdit = [...adress]; 

        adressEdit.map(i => { 
            if (i == info) { 
                i.showEdit = false; 
            }
            return i; 
        })

        setAdress(adressEdit); 
    }

    const showEditHandler = (info) => { 
        const adressEdit = [...adress]; 
        const index = adressEdit.indexOf(info); 

        adressEdit[index].showEdit = true; 
        setAdress(adressEdit); 
    }

    const showMainEditHandler = () => { 
        const show = !mainShowEdit; 
        setMainShowEdit(show); 
    }; 

    const addMainInfoHandler = () => { 
        const adressEdit = [...adress];
        const input = document.getElementById("info-field-input").value; 
        const show = !mainShowEdit; 

        adressEdit.push({ id: adress.length + 1, text: input, showEdit: false }); 
        setAdress(adressEdit); 
        setMainShowEdit(show); 
    }; 

    const handleDelete = (counterId) => { 
        const infoFilter = adress.filter (info => info.id !== counterId ); 

        const adressEdit = infoFilter.map(info => { 
            info.id = infoFilter.indexOf(info) + 1; 
            return info; 
        }); 

        setAdress(adressEdit); 
    } 

    const handleEdit = (info, text) => { 
        const adressEdit = [...adress]; 
        console.log(adressEdit); 
        const index = adressEdit.indexOf(info); 

        console.log(index); 
        console.log(adressEdit[index]); 

        adressEdit[index].text = text; 
        adressEdit[index].showEdit = false;
        setAdress(adressEdit); 
    }
 

    return( 
        <section className="form">
            <form method="POST" action = "http://localhost:3000/api/places/create" className="main-form" encType="multipart/form-data" onSubmit={() => { handleSubmit(submitForm)}}>
            <article className="column">
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
                            { placeTypes.length > 0 && placeTypes.map(type => { 
                                return ( 
                                    <option key =  { type } value= { type }> {type } </option>
                                )
                            })}
                        </select>
                    </div>
                </article>

                <article className="column">
                    <div className="form-group">
                        <label htmlFor="history">Istoria atractiei (optional): </label>
                        <textarea {...register("history")} name="history" 
                            onChange = { e => setHistory(e.target.value )} 
                            id="history" cols="30"
                            rows="10"></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="contact">Date de contact (la alegere): </label>
                        <input
                            {...register("contact")}
                            onChange = { (e) => setContact(e.target.value)}
                            type="text" name = "contact" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="program">Program: </label>
                        <textarea {...register("program")}
                            onChange = { e => setProgram(e.target.value)} name="program" id="" cols="30" rows="10"></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="city">Selecteaza Orasul(optional): </label>
                        <input {...register("city")}
                            onChange = { e =>  { setCity(e.target.value)} }
                            name="city" id="city"/>
                    </div>

                    <div className="form-group"> 
                        <input type="hidden" {...register("adress")} value = { prepareArray(adress) } />
                        <InfoFieldMultiple 
                            name = "Adresa / Adresele locatiei: " 
                            description = "" 
                            informations = { adress } 
                            handleCancel = { handleCancel } 
                            handleCancelOne = { handleCancelOne } 
                            showEditHandler = { showEditHandler } 
                            showMainEditHandler = { showMainEditHandler }
                            handleDelete = { handleDelete }
                            addMainInfoHandler = { addMainInfoHandler }
                            handleEdit = { handleEdit }
                            mainShowEdit = { mainShowEdit } /> 
                    </div>

                    <div>
                            <input type="file" multiple onChange = { e => setImages(e.target.files)} name = "photo[]" />
                    </div>
                </article>

                <button type = "submit"> Adauga Atractie </button>
            </form>
        </section>
    )
}; 

export default PlaceForm; 