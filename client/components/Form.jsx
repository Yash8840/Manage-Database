import React from "react";

const Form = (props) => { 
    const { onAddInfo } = props; 

    return( 
        <form className="multiple form">
            <input type="text" className="multiple-input" name = "multiple-input" id = { `info-field-input` } />
            <button
                onClick={ () => { onAddInfo(document.getElementById("info-field-input").value)}}
                type = "reset"
                className = "multiple-button"> Adauga </button>
        </form>
    )
}; 

export default Form; 