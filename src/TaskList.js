import {useState} from "react";
import {useCollection} from "react-firebase-hooks/firestore";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import AddTask from "./AddTask";
import List from "./List";
import Alert from "./Alert";
import App from "./App";


function TaskList(props) {
    const collectionName = props.collectionName;
    const db = props.db;
    const query = db.collection(collectionName);
    const [sortVal, setSortVal] = useState("description")
    const [value, loading, error] = useCollection(query.orderBy(sortVal, "asc"));
    const [isVisible, setVisibility] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [storeID, setStoreID] = useState("");

    let data = [];
    if (value) {
        data = value.docs.map((doc) => {
            return {...doc.data()}});
    }
    function addData(description, priority) {
        const item = {
            id: generateUniqueID(),
            description: description,
            isCompleted: false,
            creationDate: Date.now(),
            priority: priority,
        };
        const docRef = query.doc(item.id);
        docRef.set(item);
    }

    // handles checkboxes
    function handleItemChange(itemID, field, value) {
        const doc = db.collection(collectionName).doc(itemID);
        doc.update({
            [field]: value,
        })
    }

    // handles editing an item
    function handleEditItem(description, priority) {
        const doc = db.collection(collectionName).doc(storeID);
        doc.update({
            description: description,
            priority: priority,
        })
    }

    function handleDelete() {
        data.forEach((item) => item.isCompleted && db.collection(collectionName).doc(item.id).delete());
    }

    function toggleModal() {
        setShowAlert(!showAlert);
    }

    function onChangeID(itemID) {
        setStoreID(itemID);
    }

    return (
        <div>
            <div>

                <div className={isVisible ? "visible" : null}>
                    {data.filter((item) => item.isCompleted).length > 0 ? <button className={"button"} type={"button"} onClick={() => {
                        setVisibility(!isVisible);
                    }}>{isVisible ? "Hide Completed" : "Show Completed"}</button> : null}
                    {isVisible && data.filter((item) => item.isCompleted).length > 0 ? <button className={"button"} type={"button"} onClick={handleDelete}>Delete Completed</button> : null}
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
                               onItemChange={handleItemChange} onButtonClick={toggleModal} onPassID={onChangeID}></List>}
            </div>
            {showAlert && <Alert onClose={toggleModal} onOK={handleEditItem}/>}
        </div>
    );
}

export default TaskList;