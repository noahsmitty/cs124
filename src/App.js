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
const collectionName = "List-AuthenticationRequired";

//TODO: 1. Sign Up and Sign In for new users
//TODO: 2. Document sharing (Shared Task List) - Design Discussions required
// need to add rules to firebase for this

const FAKE_EMAIL = 'foo@bar.com';
const FAKE_PASSWORD = 'xyzzyxx';

// Design Decision For Shared List
// 1. Designate an owner for every list (whoever creates it)
// 2. If shared with another user, the other user can't delete the shared list
//   for this, before we delete we check if the user who is deleting is the owner
// 3. icon (a share button) that will pop up a modal to share it with another user,
// if that email doesn't exist
// 4. Only the owner can share lists to multiple people. IF A shares a list with B, B can't share that shared list
// to C but A can share the same list with C.
// shared lists array includes owner's email, if len > 1, then it's shared list
// 5. Shared lists distinguishable from unshared lists.
// shared w or shared to have an icon that implies that the list has been shared by or shared to the user
// 6. Click on icon would display the list of users who have access to that list
// 7. No need to accept sharing

function SignedInApp(props) {
    const collection = db.collection(collectionName);
    const query = collection.where('owner', "==", props.user.uid);
    const [value, loading, error] = useCollection(query);
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
    console.log("Data: ", data);

    let listExists;
    listExists =! (alertId && data.filter((task) => task.id === alertId).length === 0);
    // if (alertId && data.filter((task) => task.id === alertId).length === 0) {
    //     listExists = false;
    // } else {
    //     listExists = true;
    // }

    function addData(list) {
        console.log(props.user);
        const item = {
            id: generateUniqueID(),
            listName: list,
            owner: props.user.uid
        };
        const docRef = collection.doc(item.id);
        docRef.set(item).catch((error) => console.log("Error occurred in add list: ", error));
        console.log("item", item);
    }

    function handleEditList(list, id) {
        const doc = collection.doc(id);
        doc.update({
            listName: list,
        }).catch((error) => {
            console.error("Error updating List Name: ", error);
        })
    }

    function handleDeleteList(id) {
        collection.doc(id).delete().catch((error) => {
            console.error("Error deleting document: ", error);
        });
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
