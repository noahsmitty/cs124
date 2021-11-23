import {useState} from "react";
import {useCollection} from "react-firebase-hooks/firestore";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import AddTask from "./AddTask";
import List from "./List";
import Alert from "./Alert";

const collectionName = "List";

function TaskList(props) {
    const db = props.db;
    const task = db.collection(collectionName).doc(props.id).collection(props.id);
    // in usecollection, get everything without the last .doc().
    // the id is the listID, collection is "list", task would be what they input.
    const [sortVal, setSortVal] = useState("priority")
    const [value, loading, error] = useCollection(task.orderBy(sortVal, "asc"));
    const [isVisible, setVisibility] = useState(true);
    const [selectedTaskId, setSelectedTaskId] = useState("");

    let data = [];
    if (value) {
        data = value.docs.map((doc) => {
            return {...doc.data()}
        });
    }
    let selectedTask = data.filter((task) => task.id === selectedTaskId);
    let taskExists;
    if (selectedTaskId && selectedTask.length === 0) {
        taskExists = false;
    } else {
        taskExists = true;
    }

    function addData(description, priority) {
        const item = {
            id: generateUniqueID(),
            description: description,
            isCompleted: false,
            creationDate: Date.now(),
            priority: priority,
        };
        const docRef = task.doc(item.id);
        docRef.set(item);
    }

    // handles checkboxes
    function handleItemChange(itemID, field, value) {
        const doc = task.doc(itemID);
        doc.update({
            [field]: value,
        })
    }

    // handles editing an item
    function handleEditItem(description, priority) {
        const doc = task.doc(selectedTaskId);
        doc.update({
            description: description,
            priority: priority,
        })
        console.log("handle edit item called");
    }

    function handleDeleteCompleted() {
        data.forEach((item) => item.isCompleted && task.doc(item.id).delete());
    }

    function onChangeID(itemID) {
        console.log(itemID);
        setSelectedTaskId(itemID);
    }

    return (
        <div>
            <div>
                <button className={"button"} onClick={props.goBack} aria-label={"Back, click to go back to the overall list page"}>Back</button>
                <div className={isVisible ? "visible" : null}>
                    {data.filter((item) => item.isCompleted).length > 0 ?
                        <button className={"button"} type={"button"}
                                onClick={() => {setVisibility(!isVisible);
                        }}>{isVisible ? "Hide Completed" : "Show Completed"}</button> : null}
                    {isVisible && data.filter((item) => item.isCompleted).length > 0 ?
                        <button className={"button"} type={"button"} onClick={handleDeleteCompleted}>Delete
                            Completed</button> : null}
                </div>
                <div className={"sorting"}>
                    <label id="sort" htmlFor={"sort-by"}>Sort By</label>
                    <select id={"sort-by"} onChange={(e) => setSortVal(e.currentTarget.value)}>
                        <option value={"priority"} aria-label={"Sort by Priority"}>Priority</option>
                        <option value={"description"} aria-label={"Sort by Name"}>Name</option>
                        <option value={"creationDate"} aria-label={"Sort by Creation Date"}>Creation Date</option>
                    </select>
                </div>
                <AddTask data={data} onSubmit={addData}/>
                {data && <List todo={isVisible ? data : data.filter(item => !(item.isCompleted))}
                               onItemChange={handleItemChange} onButtonClick={props.toggleModal} onPassID={onChangeID}/>}
            </div>
            {props.showAlert && taskExists && <Alert type={"task"} task={selectedTask} onClose={props.toggleModal} onOK={handleEditItem}/>}
        </div>
    );
}

export default TaskList;