import React from "react";

const Editor = (props) => { 
    const { info, onEditInfo } = props;

    return( 
        <form action="" className="editor-form">
            <input type="text" className="editor-input" id = "editor-input"  name = "editor-input" />
            <button
                type = "button"
                onClick={ () => { onEditInfo(info, document.getElementById(`editor-input`).value)}}
                className = "editor-button button">
                    Actualizeaza
                </button>
        </form>
    )
}; 

export default Editor; 