import Edit from "./edit_pencil.png";
import Delete from "./trash_can.png";
import Alert from "./Alert";
import {useState} from "react";



function ListItem(props) {

    return (
        <div className={"item"}>
            <label htmlFor={props.id} className="label" value={props.listName}
                   onClick={() => props.onClickItem(props.listName, props.id)}>{props.listName}</label>
            <button className={"editButton"}
                    onClick={() => props.toggleModal()}><img
                src={Edit} height={"25"} width={"25"} alt={"edit-icon"} className={"edit"}/></button>
            <button className={"deleteButton"} id={props.id}
                    onClick={() => props.handleDeleteList(props.id)}><img src={Delete} height={"25"} width={"25"}
                                                                          alt={"delete-icon"} className={"edit"}/>
            </button>
            {props.showAlert && <Alert onClose={props.toggleModal} onOK={props.handleEditList} type={"list"} id={props.id}/>}
        </div>

    );

}

export default ListItem;