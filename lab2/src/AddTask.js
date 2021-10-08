import {useState} from "react";

const defaultTask = {
    description: "",
    isChecked: false
}

export default function AddTask(props) {
    let description = ''
    function handleOnChange(value) {
        description = value;
    }
return (
    <div id="list">
        <input type="text" id="task-description" placeholder="task description" onChange={(e) => handleOnChange(e.currentTarget.value)}/>
            <input type="submit" id="submit-task" value="add task"
            onClick={() =>props.onSubmit(description)
            }/>
    </div>
);
};