import React from "react";
import Editor from "./EditorForm";
import generateRandomKey from "../helpers/randomKey";

const Overview = (props) => { 
    const { informations, onDelete, onEditInfo, onShowEdit, onCancelOne } = props; 

    return( 
        <section className="overview">
            { informations.map(info => { 
                return ( 
                    <article key = { generateRandomKey(20) } className = "over-view-element"> 
                        <p> <span> { info.id } </span> { info.text || info } </p>
                        <button className="delete-button-ov"
                            type = "button"
                            onClick = { () => { 
                                onDelete(info.id)
                            }}
                            >D</button>
                        <button className="show-edit-button-ov"
                            type = "button"
                            onClick = { () => { onShowEdit(info)}}>✎</button>

                        { 
                            info.showEdit && 
                            <>
                                <Editor info = { info } onEditInfo = { onEditInfo }/> 
                                <button onClick = { () => onCancelOne(info)} > Anuleaza Editarea </button>
                            </>
                        }
                    </article>
                ) 
            })}
        </section>
    )
}; 

export default Overview; 