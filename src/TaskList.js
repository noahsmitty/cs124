import {useState} from "react";
import {useCollection} from "react-firebase-hooks/firestore";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import AddTask from "./AddTask";
import List from "./List";
import Alert from "./Alert";
import App from "./App";

const collectionName = "List";

function TaskList(props) {
    const db = props.db;
    const task = db.collection(collectionName).doc(props.id).collection(props.id);
    // in usecollection, get everything without the last .doc().
    // the id is the listID, collection is "list", task would be what they input.
    // const query = db.collection(collectionName);
    const [sortVal, setSortVal] = useState("description")
    const [value, loading, error] = useCollection(task.orderBy(sortVal, "asc"));
    const [isVisible, setVisibility] = useState(true);
    // const [showAlert, setShowAlert] = useState(false);
    const [storeID, setStoreID] = useState("");

    let data = [];
    if (value) {
        data = value.docs.map((doc) => {
            return {...doc.data()}
        });
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
        const doc = db.collection(collectionName).doc(props.id).collection(props.listName).doc(itemID);
        doc.update({
            [field]: value,
        })
    }

    // handles editing an item
    function handleEditItem(description, priority) {
        const doc = db.collection(collectionName).doc(props.id).collection(props.listName).doc(storeID);
        doc.update({
            description: description,
            priority: priority,
        })
    }

    function handleDelete() {
        data.forEach((item) => item.isCompleted && db.collection(collectionName).doc(props.id).collection(props.listName).doc(item.id).delete());
    }

    // function toggleModal() {
    //     setShowAlert(!showAlert);
    // }

    function onChangeID(itemID) {
        setStoreID(itemID);
    }

    return (
        <div>
            <div>
                <button className={"button"} onClick={props.goBack}>Back</button>
                <div className={isVisible ? "visible" : null}>
                    {data.filter((item) => item.isCompleted).length > 0 ?
                        <button className={"button"} type={"button"} onClick={() => {
                            setVisibility(!isVisible);
                        }}>{isVisible ? "Hide Completed" : "Show Completed"}</button> : null}
                    {isVisible && data.filter((item) => item.isCompleted).length > 0 ?
                        <button className={"button"} type={"button"} onClick={handleDelete}>Delete
                            Completed</button> : null}
                </div>
                <div className={"sorting"}>
                    <label id="sort" htmlFor={"sort-by"}>Sort By</label>
                    <select id={"sort-by"} onChange={(e) => setSortVal(e.currentTarget.value)}>
                        <option value={"priority"}>Priority</option>
                        <option value={"description"}>Name</option>
                        <option value={"creationDate"}>Creation Date</option>
                    </select>
                </div>
                <AddTask data={data} onSubmit={addData}/>
                {data && <List todo={isVisible ? data : data.filter(item => !(item.isCompleted))}
                               onItemChange={handleItemChange} onButtonClick={props.toggleModal} onPassID={onChangeID}/>}
            </div>
            {props.showAlert && <Alert type={"task"} onClose={props.toggleModal} onOK={handleEditItem} id={null}/>}
        </div>
    );
}

export default TaskList;