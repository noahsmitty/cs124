import Edit from "./edit_pencil.png";


function ListItem(props) {

    return (
        <div className={"item"}>
            <div className="label" onClick={() => props.onClick(props.taskName, props.id)}>{props.taskName}</div>
            <input type={"checkbox"} className={"checkbox"} id={props.id} checked={props.isCompleted}
                   onChange={(e) => props.handleItemChange(props.id, "isCompleted", e.target.checked)}/>
            <label htmlFor={props.id} className="label" value={props.taskName}>{props.taskName}</label>
            <button className={"editButton"}><img src={Edit} height={"25"} width={"25"} alt={"edit-icon"} className={"edit"}/></button>
        </div>

   );

}

export default ListItem;