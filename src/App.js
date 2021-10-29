import List from './List'
import './App.css';
import {useState} from "react";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import AddTask from "./AddTask";
import Alert from "./Alert";
import firebase from "firebase/compat";
import {useCollection} from "react-firebase-hooks/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDcjlwvBtxAl8BKu_8evho99ks_6MBiWZo",
    authDomain: "nskr-124lab4.firebaseapp.com",
    projectId: "nskr-124lab4",
    storageBucket: "nskr-124lab4.appspot.com",
    messagingSenderId: "613050589081",
    appId: "1:613050589081:web:d234d16f271e4ebe1ffd08",
    measurementId: "G-6XSHMJM1HG"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const collectionName = "List";
function App(props) {
    const query = db.collection(collectionName);
    const [value, loading, error] = useCollection(query);
    const [isVisible, setVisibility] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [storeID, setStoreID] = useState("");

    let data = null;
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
        <div className={"todo"}>
            <div>
                <h1>TO-DO LIST</h1>

                <div className={isVisible ? "visible" : null}>
                    <button className={"button"} type={"button"} onClick={() => {
                        setVisibility(!isVisible);
                    }}>{isVisible ? "Hide Completed" : "Show Completed"}</button>
                    <button className={"button"} type={"button"} onClick={handleDelete}>Delete Completed</button>
                </div>
                <div>
                    <label htmlFor={"sort by"}>Sort By</label>
                    <select id={"sort by"}>
                        <option value={"priority"}>Priority</option>
                        <option value={"name"}>Name</option>
                        <option value={"creationDate"}>Creation Date</option>
                    </select>
                </div>
                <AddTask data={data} onSubmit={addData}/>
                {/*{[...data].sort((a, b) => a.priority - b.priority).map(item => (item.priority))}*/}
                {data && <List todo={isVisible ? data : data.filter(item => !(item.isCompleted))}
                      onItemChange={handleItemChange} onButtonClick={toggleModal} onPassID={onChangeID}></List>}
            </div>
            {showAlert && <Alert onClose={toggleModal} onOK={handleEditItem}/>}
        </div>
    );
}

export default App;
