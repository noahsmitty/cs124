import "./App.css"
import {useState} from "react";
import TaskList from "./TaskList";


function AddCategory(props) {
    const [category, setCategory] = useState('');

    return (
        <div id={"list"}>
            <input type="text" id="task-description" placeholder="add category" aria-label={"type the name of your new list"} value={category}
                   onChange={(e) => setCategory(e.currentTarget.value)}/>
            <input className={"button"} type={"button"} value={"Add List"} aria-label={"Add List button"} onClick={() => {props.onSubmit(category); setCategory("")}}/>
        </div>
    );
}

export default AddCategory;
