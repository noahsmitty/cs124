import Edit from "./edit_pencil.png";
import Delete from "./trash_can.png";
import Alert from "./Alert";


function ListItem(props) {

    return (
        <div className={"item"}>
            <button className={"listButton"} htmlFor={props.id} value={props.listName}
                    aria-label={props.listName + " List, click to view this list"}
                    onClick={() => props.onClickItem(props.listName, props.id)}>{props.listName}</button>
            <button className={"editButton"} aria-label={"Edit List Name, click to edit the name of this list"}
                    onClick={() => {
                        props.setAlertId(props.id);
                        props.toggleModal()
                    }}><img
                src={Edit} height={"25"} width={"25"} alt={"edit-icon"} className={"edit"}/></button>
            <button className={"deleteButton"} id={props.id} aria-label={"Delete List, click to delete this list"}
                    onClick={() => props.handleDeleteList(props.id)}><img src={Delete} height={"25"} width={"25"}
                                                                          alt={"delete-icon"} className={"edit"}/>
            </button>
        </div>

    );

}

export default ListItem;