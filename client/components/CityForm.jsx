import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

const CityForm = () => {
    return( 
        <section className="form">
            <form action="" method="POST">
                <div className="form-group">
                    <label htmlFor="title">Numele Orasului: </label>
                    <input type="text" name = "title" value = "" required placeholder="Aa" />
                </div>

                <div className="form-group">
                    <label htmlFor="components">Sate Componente: </label>
                    <input type="text" name = "components" value = "" required placeholder = "scrie aici lista satelor componente" />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Descrierea orasului: </label>
                    <textarea name="description" id="description" cols="30" rows="10"></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="surface">Suprafata Orasului: </label>
                    <input type="number" min =  { 0 } required />
                </div>

                <div className="form-group">
                    <label htmlFor="history">Istoria orasului: </label>
                    <textarea name="history" id="history" cols="30" rows="10"></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="population">Populatia orasului</label>
                    <input type="number" min = { 100 } required />
                </div>

                <article className="button-holder">
                    <button type = "submit">Creeaza Oras</button>
                </article>
            </form>
        </section>
    )
}; 

export default CityForm; 