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
    const [category, setCategory] = useState("List");

    let data = [];
    if (value) {
        data = value.docs.map((doc) => {
            return {...doc.data()}
        });
    }

    function addData(cat) {
        const item = {
            id: generateUniqueID(),
            category: cat
        };
        const docRef = query.doc(item.id);
        docRef.set(item);
    }

    function changeCategory(cat) {
        setCategory(cat);
        console.log(cat);
    }

    return (


        <div className={"todo"}>
            <div></div>
            <h1>TO-DO LIST</h1>
            <AddCategory onSubmit={addData}></AddCategory>

            {category === "List" ?
                data.map(item => <ListItem category={item.category} onClick={changeCategory}></ListItem>)
             : <TaskList collectionName={category} db={db}></TaskList>}
            {/*<TaskList collectionName={proxps.category} db={props.db}></TaskList>*/}
        </div>
    )
}

export default App;
