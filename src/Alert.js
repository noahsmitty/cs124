import {useState} from "react";

function Alert(props) {
    const [newDesc, setNewDesc] = useState("");

    function handleOnChange(value) {
        setNewDesc(value);
    }

    return <div className={"backdrop"}>
        <div className="modal">
            Enter a new name for your item:
            <div className={"text"}>
                <input type={"text"} placeholder={"task description"}
                       onChange={(e) => handleOnChange(e.currentTarget.value)}/>
            </div>

            <div className="alert-buttons">
                <button className={"alert-button alert-cancel"} type={"button"}
                        onClick={props.onClose}>
                    Cancel
                </button>
                <button className={"alert-button alert-ok"} type={"button"}
                        onClick={() => {
                            props.onClose();
                            props.onOK("description", newDesc);
                        }}>
                    OK
                </button>
            </div>
        </div>
    </div>
}

export default Alert;