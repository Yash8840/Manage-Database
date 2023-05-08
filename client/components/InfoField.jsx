import React, { useState } from "react";
import Form from "./Form";
import Overview from "./OverviewForm";


const InfoFieldMultiple = (props) => { 
    const { name, description  } = props; 
    const [ informations, setInformations ] = useState([]); 
    const [ mainShowEdit, setMainShowEdit ] = useState(false); 

    const handleCancel = () => { 
        const informationsEdit = [...informations]; 
        informationsEdit.forEach(info => info.showEdit = false); 

        setMainShowEdit(false); 
        setInformations(informationsEdit); 
    }

    const handleCancelOne = (info) => { 
        const informationsEdit = [...informations]; 

        informationsEdit.map(i => { 
            if (i == info) { 
                i.showEdit = false; 
            }
            return i; 
        })

        setInformations(informationsEdit); 
    }

    const showEditHandler = (info) => { 
        const informationsEdit = [...informations]; 
        const index = informationsEdit.indexOf(info); 

        informationsEdit[index].showEdit = true; 
        setInformations(informationsEdit); 
    }

    const showMainEditHandler = () => { 
        const show = !mainShowEdit; 
        setMainShowEdit(show); 
    }; 

    const addMainInfoHandler = () => { 
        const informationsEdit = [...informations];
        const input = document.getElementById("info-field-input").value; 
        const show = !mainShowEdit; 

        informationsEdit.push({ id: informations.length + 1, text: input, showEdit: false }); 
        setInformations(informationsEdit); 
        setMainShowEdit(show); 
    }; 

    const handleDelete = (counterId) => { 
        const infoFilter = informations.filter (info => info.id !== counterId ); 

        const informationsEdit = infoFilter.map(info => { 
            info.id = infoFilter.indexOf(info) + 1; 
            return info; 
        }); 

        setInformations(informationsEdit); 
    } 

    const handleEdit = (info, text) => { 
        const informationsEdit = [...informations]; 
        console.log(informationsEdit); 
        const index = informationsEdit.indexOf(info); 

        console.log(index); 
        console.log(informationsEdit[index]); 

        informationsEdit[index].text = text; 
        informationsEdit[index].showEdit = false;
        setInformations(informationsEdit); 
    }

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

            <button className="button add-info-multiple"
                onClick = { () => { showMainEditHandler () }}>Adauga</button>

            { mainShowEdit && 
                <>
                    <Form onAddInfo = { addMainInfoHandler } />
                    <button onClick = { handleCancel }> Anuleaza</button>
                </> 
            }
        </>
    )
}; 

export default InfoFieldMultiple; 