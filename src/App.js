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
import Alert from "./Alert";

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
    const [listId, setListId] = useState("");
    const [page, setPage] = useState("home");
    const [showAlert, setShowAlert] = useState(false);

    let data = [];
    if (value) {
        data = value.docs.map((doc) => {
            return {...doc.data()}
        });
    }

    function addData(list) {
        const item = {
            id: generateUniqueID(),
            listName: list,
        };
        const docRef = query.doc(item.id);
        docRef.set(item);
    }

    function handleEditList(list, id) {
        console.log(id);
        const doc = db.collection(collectionName).doc(id);
        doc.update({
            listName: list,
        })
    }

    function handleDeleteList(id) {
       db.collection(collectionName).doc(id).delete();
       console.log('delete called');
    }

    function changeList(listName, id) {
        setListId(id);
        setPage(listName);
    }


    function toggleModal() {
        setShowAlert(!showAlert);
    }

    return (
        <div className={"todo"}>

            {page === "home" ?
                <div>
                    <h1>TO-DO LIST</h1>
                    <AddCategory onSubmit={addData}/>
                    {data.map(item =>
                        <div>
                            <ListItem listName={item.listName} onClickItem={changeList}
                                      handleDeleteList={handleDeleteList} toggleModal={toggleModal}
                                      id={item.id} handleEditList={handleEditList} showAlert={showAlert}
                            />
                        </div>)}
                </div>
                :
                <div>
                    <h1>{page}</h1>
                    <TaskList listName={page} db={db} goBack={() => setPage("home")} id={listId}
                                toggleModal={toggleModal} modalType={"task"} showAlert={showAlert}
                    />
                </div>}
        </div>
)
}

export default App;
