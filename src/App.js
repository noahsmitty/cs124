import List from './List'
import './App.css';
import {useState} from "react";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import AddTask from "./AddTask";
import AddCategory from "./AddCategory";
import firebase from "firebase/compat";
import {useCollection} from "react-firebase-hooks/firestore";
import ListItem from "./ListItem";
import Edit from "./edit_pencil.png";
import TaskList from "./TaskList";

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

// Need to add functionalities for multiple list and support for mobile/desktop/portrait, landscape

// tabs for multiple lists (categories)
// different collectionNames according to categories
// all other functionalities are the same

function App() {
    const query = db.collection(collectionName);
    const [value, loading, error] = useCollection(query);
    // const [category, setCategory] = useState("List");
    const [listId, setListId] = useState("");
    const [task, setTask] = useState("home");

    let data = [];
    if (value) {
        data = value.docs.map((doc) => {
            return {...doc.data()}
        });
    }

    function addData(cat) {
        const item = {
            id: generateUniqueID(),
            taskName: cat,
            isSelected: false,
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

    function handleEditList(cat) {
        const doc = db.collection(collectionName).doc(listId);
        doc.update({
            category: cat,
        })
    }

    function changeCategory(task, listId) {
        setListId(listId);
        setTask(task);
        console.log(listId);
    }


    return (


        <div className={"todo"}>
            <h1>TO-DO LIST</h1>


            {task === "home" ?
                <div>
                    <AddCategory onSubmit={addData}/>
                    {data.map(item =>
                        <div>
                            <ListItem taskName={item.category} onClick={changeCategory} handleItemChange={handleItemChange}/>

                        </div>)}
                </div>
             : <TaskList taskName={task} db={db} goBack={() => setTask("home")}/>}
            {console.log(task)}
            {/*goBack={() => setCategory("List")}*/}
        </div>
    )
}

export default App;
