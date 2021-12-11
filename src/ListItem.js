import Edit from "./edit_pencil.png";
import Delete from "./trash_can.png";
import Share from "./index.png";
import SharedWith from "./shared.png";
import './Item.css'


function ListItem(props) {

    return (
        <div className={"item"}>
            <button className={"listButton"} htmlFor={props.id} value={props.listName}
                    aria-label={props.listName + " List, click to view this list"}
                    onClick={() => props.onClickItem(props.listName, props.id)}>{props.listName}</button>
            <button className={"editButton"} aria-label={"Edit List Name, click to edit the name of this list"}
                    onClick={() => {
                        props.setAlertId(props.id);
                        props.toggleModal();
                        props.type("list");
                    }}><img
                src={Edit} height={"25"} width={"25"} alt={"edit-icon"} className={"edit"}/></button>
            <button className={"deleteButton"} id={props.id} aria-label={"Delete List, click to delete this list"}
                    onClick={() => props.handleDeleteList(props.id)}><img src={Delete} height={"25"} width={"25"}
                                                                          alt={"delete-icon"} className={"edit"}/>
            </button>
            <button className={"deleteButton"} id={props.id} aria-label={"Share List, click to share this list"}
                    onClick={() => {
                        props.setAlertId(props.id);
                        props.toggleModal();
                        props.type("share");
                    }}><img src={Share} height={"25"} width={"25"}
                                                                          alt={"share-icon"} className={"edit"}/>
            </button>
            {props.sharedWith.length > 1 &&
            <button className={"deleteButton"} id={props.id} aria-label={"Shared With Indicator, click to share see the list of emails this item is shared with"}
                    onClick={() => {
                        props.setAlertId(props.id);
                        props.toggleModal();
                        props.type("shared-with");
                        props.isShared(props.sharedWith);
                    }}><img src={SharedWith} height={"25"} width={"25"}
                            alt={"sharedWith-icon"} className={"edit"}/>
            </button>}

        </div>

    );

}

export default ListItem;