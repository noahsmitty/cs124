import {useState} from "react";
import './Alert.css';

function Alert(props) {
    const [newDesc, setNewDesc] = useState("");
    const [priority, setPriority] = useState("1");
    const [shareEmail, setShareEmail] = useState('');

    return (
        <div className={"backdrop"}>
            {props.type === "task" &&
            <div className="modal">
                Enter a new name for your item:
                <div className={"center text"}>
                    <input type={"text"} tabIndex={0} className={"enter_description"}
                           placeholder={"Enter New Description"}
                           aria-label={"Enter new task name"}
                           onChange={(e) => setNewDesc(e.currentTarget.value)}/>
                    <select className={"select"} onChange={(e) => setPriority(e.currentTarget.value)}>
                        <option value={1} aria-label={"High Priority"}>High</option>
                        <option value={2} aria-label={"Medium Priority"}>Medium</option>
                        <option value={3} aria-label={"Low Priority"}>Low</option>
                    </select>
                </div>

                <div className="alert-buttons">
                    <button className={"alert-button"} type={"button"}
                            onClick={props.onClose}>
                        Cancel
                    </button>
                    <button className={"alert-button"} type={"button"}
                            onClick={() => {
                                props.onClose();
                                props.onOK(newDesc, priority);
                            }}>
                        OK
                    </button>
                </div>
            </div>}
            {props.type === "list" &&
            <div className="modal">
                Enter a new name for your list:
                <div className={"center text"}>
                    <input type={"text"} tabIndex={0} className={"enter_description"}
                           placeholder={"Enter New Description"}
                           aria-label={"Enter a new name for your list"}
                           onChange={(e) => setNewDesc(e.currentTarget.value)}/>
                </div>

                <div className="alert-buttons">
                    <button className={"alert-button"} type={"button"}
                            onClick={props.onClose}>
                        Cancel
                    </button>
                    <button className={"alert-button"} type={"button"}
                            onClick={() => {
                                props.onClose();
                                props.onOK(newDesc, props.id);
                            }}>
                        OK
                    </button>
                </div>
            </div>}
            {props.type === "share" &&
            <div className="modal">
                Enter a new name for your list:
                <div className={"center text"}>
                    <input type={"text"} tabIndex={0} className={"enter_description"}
                           placeholder={"Enter New Email"}
                           aria-label={"Enter a email address to share the list with"}
                           onChange={(e) => setShareEmail(e.currentTarget.value)}/>
                </div>

                <div className="alert-buttons">
                    <button className={"alert-button"} type={"button"}
                            onClick={props.onClose}>
                        Cancel
                    </button>
                    <button className={"alert-button"} type={"button"}
                            onClick={() => {
                                props.onClose();
                                props.onShare(shareEmail, props.id);
                            }}>
                        OK
                    </button>
                </div>
            </div>}
            {props.type === "shared-with" &&
            <div className="modal">
                {props.sharedWith.length} users have access to this list
                <div className={"text"}>
                    <ul className={"shared-list"}>
                        {props.sharedWith.map(user =>
                            <li key={user}>{user}</li>)}
                    </ul>
                </div>

                <div className="alert-buttons">
                    <button className={"alert-button"} type={"button"}
                            onClick={() => {
                                props.onClose();
                            }}>
                        OK
                    </button>
                </div>
            </div>}
        </div>);
}

export default Alert;