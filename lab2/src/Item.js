import './Item.css';
import Edit from "./edit_pencil.png"
import {useState} from "react";

function Item(props) {
    return (<div>
        <input type={"checkbox"} className={"checkbox"} id={props.id} checked={props.isCompleted}
               onChange={(e) => props.onItemChange(props.id, "isCompleted", e.target.checked)}/>
        <label htmlFor={props.id} className="label" value={props.description}>{props.description}</label>
        {/*<img src={Edit} height={"28"} width={"28"} alt={"edit-icon"} className={"edit"}/>*/}
        <button><img src={Edit} height={"18"} width={"18"} alt={"edit-icon"} className={"edit"} onClick={() => {props.onButtonClick(); props.passID(props.id);}}/></button>

    </div>);
}

export default Item;