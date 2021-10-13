import './Item.css';
import Edit from "./edit_pencil.png"
import {useState} from "react";

function Item(props) {
    // function handleChecked() {
    //     setChecked(!checked);
    //     props.onSelected(props.id, checked);
    // }
    return (<div>
        <input type={"checkbox"} className={"checkbox"} id={props.id} checked={props.isCompleted}
               onChange={(e) => props.onItemChange(props.id, "isCompleted", e.target.checked)}/>
        <label htmlFor={props.id} className="label" value={props.description}>{props.description}</label>
        <img type={"button"} src={Edit} height={"28"} width={"28"} alt={"edit-icon"} className={"edit"}/>

    </div>);
}

export default Item;