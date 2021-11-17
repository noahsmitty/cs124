import Edit from "./edit_pencil.png";


function ListItem(props) {

    return (
        <div className={"item"}>
            <div className="label" onClick={() => props.onClick(props.category)}>{props.category}</div>
            <button className={"editButton"}><img src={Edit} height={"25"} width={"25"} alt={"edit-icon"} className={"edit"}/></button>
        </div>

   );

}

export default ListItem;