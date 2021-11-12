import "./App.css"
import {useState} from "react";
import TaskList from "./TaskList";


function AddCategory(props) {
    const [category, setCategory] = useState('');

    return (
        <div>
            <input type="text" id="task-description" placeholder="add category" value={category}
                   onChange={(e) => setCategory(e.currentTarget.value)}/>
            <input className={"button"} type={"submit"} onClick={() => {props.onSubmit(category); setCategory("")}}/>
        </div>
    );
}

export default AddCategory;
