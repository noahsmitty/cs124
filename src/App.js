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
    function addData(description) {
        const item = {
            id: generateUniqueID(),
            description: description,
            isCompleted: false,
        };
        const docRef = query.doc(item.id);
        docRef.set(item);
    }

    function handleItemChange(itemID, field, value) {
        const doc = db.collection(collectionName).doc(itemID);
        doc.update({
            [field]: value,
        })
    }

    function handleEditItem(field, value) {
        const doc = db.collection(collectionName).doc(storeID);
        doc.update({
            [field]: value,
        })
    }

    function handleDelete(itemID) {
        data.forEach((item) => item.isCompleted && db.collection(collectionName).doc(item.id).delete());
    }

    function toggleModal() {
        setShowAlert(!showAlert);
    }

    function changeID(itemID) {
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

                {data && <List todo={isVisible ? data : data.filter(item => !(item.isCompleted))}
                      onItemChange={handleItemChange} onButtonClick={toggleModal} passID={changeID}></List>}
                <AddTask data={data} onSubmit={addData}/>
            </div>
            {showAlert && <Alert onClose={toggleModal} onOK={handleEditItem}/>}
        </div>
    );
}

export default App;
