import {useState} from "react";
import './Alert.css';

function Alert(props) {
    const [newDesc, setNewDesc] = useState("");
    const [priority, setPriority] = useState("1");

    return <div className={"backdrop"}>
        <div className="modal">
            Enter a new name for your item:
            <div className={"center text"}>
                <input type={"text"} className={"enter_description"} placeholder={"Enter New Description"}
                       onChange={(e) => setNewDesc(e.currentTarget.value)}/>
                <select className={"select"} onChange={(e) => setPriority(e.currentTarget.value)}>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
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
        </div>
    </div>
}

export default Alert;