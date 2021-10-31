import './Item.css';
import Edit from "./edit_pencil.png"

function Item(props) {
    return (<div className={"item"}>
        <input type={"checkbox"} className={"checkbox"} id={props.id} checked={props.isCompleted}
               onChange={(e) => props.onItemChange(props.id, "isCompleted", e.target.checked)}/>
        <label htmlFor={props.id} className="label" value={props.description}>{props.description}</label>
        <button className={"editButton"}><img src={Edit} height={"25"} width={"25"} alt={"edit-icon"} className={"edit"} onClick={() => {
            props.onButtonClick();
            props.onPassID(props.id);
        }}/></button>

    </div>);
}

export default Item;