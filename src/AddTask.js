import "./App.css"
import {useState} from "react";


export default function AddTask(props) {
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState("1");

    return (
        <div className={"center"} id="list">
            <input type="text" id="task-description" className={"taskinput"} placeholder="task description" value={description}
                   aria-label={"Enter the name of your new task here"}
                   onChange={(e) =>
                       setDescription(e.currentTarget.value)}/>
            <select id="priority" onChange={(e) => setPriority(e.currentTarget.value)}>
                <option value={1} aria-label={"High Priority"}>High</option>
                <option value={2} aria-label={"Medium Priority"}>Medium</option>
                <option value={3} aria-label={"Low Priority"}>Low</option>
            </select>
            <input className={"button"} type="submit" id="submit-task" value="Add Task"
                   aria-label={"Add Task, click to add your new task"}
                   onClick={() => {props.onSubmit(description, priority);
                       setDescription('');}
                   }/>
        </div>
    );
};