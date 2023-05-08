import React from "react";
import Editor from "./EditorForm";

const Overview = (props) => { 
    const { informations, onDelete, onEditInfo, onShowEdit, onCancelOne } = props; 

    return( 
        <section className="overview">
            { informations.map(info => { 
                return ( 
                    <article key = { info.id } className = "over-view-element"> 
                        <p> <span> { info.id } </span> { info.text } </p>
                        <button className="delete-button-ov"
                            onClick = { () => { 
                                onDelete(info.id)
                            }}
                            >D</button>
                        <button className="show-edit-button-ov"
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