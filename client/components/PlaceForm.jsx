import React, {useState, useEffect } from "react";
import NavBar from "./NavBar";

const PlaceForm = () => { 
    return( 
        <section className="form">
            <form action="" method="POST">
                <div className="form-group">
                    <label htmlFor="title">Titlul Atractiei: </label>
                    <input type="text" name = "title" value = "" required />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Descrierea atractiei: </label>
                    <textarea name="description" id="description" cols="30" rows="10" required></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="type">Tipul atractiei</label>
                    <select name="type" id="type">
                        {/* testing options*/}
                        <option value="manastire">Manastire</option>
                        <option value="lac">Lac</option>
                        <option value="constructie">Constructie</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="history">Istoria atractiei (optional): </label>
                    <textarea name="history" id="history" cols="30" rows="10" required></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="contact">Date de contact (la alegere): </label>
                    <input type="text" name = "contact" value = { ""} />
                </div>

                <div className="form-group">
                    <label htmlFor="city">Selecteaza Orasul(optional): </label>
                    <select name="city" id="city">
                        <option value="Vaslui">Vaslui</option>
                        <option value="Husi">Husi</option>
                        <option value="Barlad">Barlad</option>
                        <option value="Negresti">Negresti</option>
                        <option value="Murgeni">Murgeni</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="adress">Selecteaza o adresa</label>
                    <input type="text" name = "adress" value = {  ""} />
                </div>

                <article className="button-holder">
                    <button type = "submit"> Adauga Atractie </button>
                </article>
            </form>
        </section>
    )
}; 

export default PlaceForm; 