import List from './List'
import './App.css';
import {useState} from "react";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import AddTask from "./AddTask";
import AddCategory from "./AddCategory";
import firebase from "firebase/compat";
import {useCollection} from "react-firebase-hooks/firestore";
import ListItem from "./ListItem";
import TabList from "./TabList";
import TaskList from "./TaskList";
import Alert from "./Alert";
import {
    useAuthState,
    useCreateUserWithEmailAndPassword,
    useSignInWithEmailAndPassword
} from "react-firebase-hooks/auth";

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

const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
// const collectionName = "People-AuthenticationRequired";
const collectionName = "List";

//TODO: 1. Sign Up and Sign In for new users
//TODO: 2. Document sharing (Shared Task List) - Design Discussions required
// need to add rules to firebase for this

const FAKE_EMAIL = 'foo@bar.com';
const FAKE_PASSWORD = 'xyzzyxx';


function SignedInApp(props) {
    const collection = db.collection(collectionName);
    const query = collection.where('owner', "==", props.user.uid);
    const [value, loading, error] = useCollection(collection);
    const [listId, setListId] = useState("");
    const [page, setPage] = useState("home");
    const [showAlert, setShowAlert] = useState(false);
    const [alertId, setAlertId] = useState(null);

    let data = [];
    if (value) {
        data = value.docs.map((doc) => {
            return {...doc.data()}
        });
    }

    let listExists;
    listExists =! (alertId && data.filter((task) => task.id === alertId).length === 0);
    // if (alertId && data.filter((task) => task.id === alertId).length === 0) {
    //     listExists = false;
    // } else {
    //     listExists = true;
    // }

    function addData(list) {
        const item = {
            id: generateUniqueID(),
            listName: list,
            owner: props.user.uid
        };
        const docRef = collection.doc(item.id);
        docRef.set(item).catch((error) => console.log("Error occurred in add list: ", error));
    }

    function handleEditList(list, id) {
        const doc = collection.doc(id);
        doc.update({
            listName: list,
        })
    }

    function handleDeleteList(id) {
        collection.doc(id).delete();
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
                                      id={item.id} showAlert={showAlert}
                                      setAlertId={setAlertId}
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
            {page === "home" && showAlert && listExists &&
            <Alert onClose={toggleModal} onOK={handleEditList} type={"list"} id={alertId}/>}
        </div>
    )
}

function SignIn() {
    const [
        signInWithEmailAndPassword,
        userCredential, loading, error
    ] = useSignInWithEmailAndPassword(auth);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    if (userCredential) {
        // Shouldn't happen because App should see that
        // we are signed in.
        return <div>Unexpectedly signed in already</div>
    } else if (loading) {
        return <p>Logging in…</p>
    }
    return <div>
        {error && <p>"Error logging in: " {error.message}</p>}
        <input type={"text"} placeholder={"Enter Username"} onChange={(e) => setUsername(e.currentTarget.value)}/>
        <br/>
        <input type={"password"} placeholder={"Enter Password"} onChange={(e) => setPassword(e.currentTarget.value)}/>
        <br/>
        <button onClick={() =>
            signInWithEmailAndPassword(username, password)}>Login
        </button>
        <button onClick={() =>
            auth.signInWithPopup(googleProvider)}>Login with Google
        </button>
    </div>
}
// seems like it immediately signs you in after you sign up - do we want this?
function SignUp() {
    const [
        createUserWithEmailAndPassword,
        userCredential, loading, error
    ] = useCreateUserWithEmailAndPassword(auth);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    if (userCredential) {
        // Shouldn't happen because App should see that
        // we are signed in.
        return <div>Unexpectedly signed in already</div>
    } else if (loading) {
        return <p>Signing up…</p>
    }
    return <div>
        {error && <p>"Error signing up: " {error.message}</p>}

        <input type={"text"} placeholder={"Enter Username"} onChange={(e) => setUsername(e.currentTarget.value)}/>
        <br/>
        <input type={"password"} placeholder={"Enter Password"} onChange={(e) => setPassword(e.currentTarget.value)}/>
        <br/>
        <button onClick={() =>
            createUserWithEmailAndPassword(username, password)}>
            Sign Up
        </button>

    </div>
}

function App(props) {
    const [user, loading, error] = useAuthState(auth);

    function verifyEmail() {
        auth.currentUser.sendEmailVerification();
    }

    if (loading) {
        return <p>Checking...</p>;
    } else if (user) {
        return <div>
            {user.displayName || user.email}
            <SignedInApp {...props} user={user}/>
            <button type="button" onClick={() => auth.signOut()}>Logout</button>
            {!user.emailVerified && <button type="button" onClick={verifyEmail}>Verify email</button>}
        </div>
    } else {
        return <>
            {error && <p>Error App: {error.message}</p>}
            <TabList>
                <SignIn key="Sign In"/>
                <SignUp key="Sign Up"/>
            </TabList>
        </>
    }
}
export default App;
