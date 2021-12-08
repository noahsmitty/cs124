import "./App.css"
import {useState} from "react";
import TaskList from "./TaskList";


function AddCategory(props) {
    const [category, setCategory] = useState('');

    function handleSubmit(category) {
        if (category === 'home') {
            alert(`Invalid Input. 'home' not allowed as category name`);
        }
        else {
            props.onSubmit(category);
            setCategory('');
        }
    }
    return (
        <div className={"center"} id={"list"}>
            <label id="sort">Enter List Name: </label>
            <input type="text" id="task-description" className={"taskinput"} placeholder="type list name" aria-label={"type the name of your new list"} value={category}
                   onChange={(e) => setCategory(e.currentTarget.value)}/>
            <input className={"button"} type={"button"} value={"Add List"} aria-label={"Add List button"} onClick={() => handleSubmit(category)}/>
        </div>
    );
}

export default AddCategory;
