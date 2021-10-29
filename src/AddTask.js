import "./App.css"
import {useState} from "react";


export default function AddTask(props) {
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState(1);

    return (
        <div id="list">
            <input type="text" id="task-description" placeholder="task description"
                   onChange={(e) => setDescription(e.currentTarget.value)}/>
            <select onChange={(e) => setPriority(e.currentTarget.value)}>
                <option value={1}>High</option>
                <option value={2}>Medium</option>
                <option value={3}>Low</option>
            </select>
            <input className={"button"} type="submit" id="submit-task" value="add task"
                   onClick={() => props.onSubmit(description, priority)
                   }/>
        </div>
    );
};