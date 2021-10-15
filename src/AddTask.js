import "./App.css"
import {useState} from "react";


export default function AddTask(props) {
    const [description, setDescription] = useState('');

    function handleOnChange(value) {
        setDescription(value);
    }

    return (
        <div id="list">
            <input type="text" id="task-description" placeholder="task description"
                   onChange={(e) => handleOnChange(e.currentTarget.value)}/>
            <input className={"button"} type="submit" id="submit-task" value="add task"
                   onClick={() => props.onSubmit(description)
                   }/>
        </div>
    );
};