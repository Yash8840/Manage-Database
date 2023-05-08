import React, { useState } from "react";
import Form from "./Form";
import Overview from "./OverviewForm";


const InfoFieldMultiple = (props) => { 
    const { name, description, informations, handleCancel, handleCancelOne, 
        showEditHandler, showMainEditHandler, handleDelete, addMainInfoHandler, handleEdit, mainShowEdit } = props; 

    return ( 
        <>
            <h3> { name } </h3>
            <p> { description } </p>
            <Overview 
            informations = { informations } 
            onDelete = { handleDelete } 
            onCancelOne = { handleCancelOne }
            onShowEdit = { showEditHandler } 
            onEditInfo = { handleEdit }/>

            <button type = "button" className="button add-info-multiple"
                onClick = { () => { showMainEditHandler () }}>Adauga</button>

            { mainShowEdit && 
                <>
                    <Form onAddInfo = { addMainInfoHandler } />
                    <button type = "button" onClick = { handleCancel }> Anuleaza</button>
                </> 
            }
        </>
    )
}; 

export default InfoFieldMultiple; 