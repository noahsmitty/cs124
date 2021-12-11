import './App.css';
import './Alert.css';
import {useState} from "react";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
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
const collectionName = "List-AuthenticationRequired";


function SignedInApp(props) {
    const collection = db.collection(collectionName);
    const query = collection.where("owner", "==", props.user.uid);
    const sharedQuery = collection.where("usersWithAccess", "array-contains", props.user.email);
    const [value, loading, error] = useCollection(query);
    const[valueShared, loadingShared, errorShared] = useCollection(sharedQuery);
    const [listId, setListId] = useState("");
    const [page, setPage] = useState("home");
    const [showAlert, setShowAlert] = useState(false);
    const [alertId, setAlertId] = useState(null);
    const [modalType, setModalType] = useState(null);
    const [sharedList, setSharedList] = useState([]);

    let data = [];
    if (value) {
        data = value.docs.map((doc) => {
            return {...doc.data()}
        });
    }

    let sharedData = [];
    if (valueShared) {
        sharedData = valueShared.docs.map((doc) => {
            return {...doc.data()}
        });
    }

    if (data.length === 0 && sharedData.length !== 0) {
        data = sharedData;
    }
    else if (data.length !== 0 && sharedData.length !== 0) {
        data.concat(sharedData);
    }

    let listExists;
    listExists =! (alertId && data.filter((task) => task.id === alertId).length === 0);

    function addData(list) {
        const item = {
            id: generateUniqueID(),
            listName: list,
            owner: props.user.uid,
            usersWithAccess: [props.user.email]
        };
        const docRef = collection.doc(item.id);
        docRef.set(item).catch((error) => console.log("Error occurred in add list: ", error));
    }

    function handleEditList(list, id) {
        const doc = collection.doc(id);
        doc.update({
            listName: list,
        }).catch((error) => {
            console.error("Error updating List Name: ", error);
        })
    }

    function updateUserswithAccess(newUserEmail, id) {
        const doc = collection.doc(id);
        doc.update({
            usersWithAccess: firebase.firestore.FieldValue.arrayUnion(newUserEmail)
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

    function changeModalType(type) {
        setModalType(type);
    }

    function updateSharedList(sharedList) {
        setSharedList(sharedList);
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
                                      type={changeModalType}
                                      sharedWith={item.usersWithAccess}
                                      isShared={updateSharedList}
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
            <Alert onClose={toggleModal} onOK={handleEditList} onShare={updateUserswithAccess} type={modalType} id={alertId}
            sharedWith={sharedList}/>}
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
        return <div>Unexpectedly signed in already</div>
    } else if (loading) {
        return <p>Logging in…</p>
    }
    return <div>
        <div className={"signin"}>
        {error && <p>"Error logging in: " {error.message}</p>}
        <input type={"text"} placeholder={"Enter Username"} onChange={(e) => setUsername(e.currentTarget.value)}/>
        <br/>
        <input type={"password"} placeholder={"Enter Password"} onChange={(e) => setPassword(e.currentTarget.value)}/>
        <br/>
        </div>
        <div className={"center"}>
        <button className={"button"} onClick={() =>
            signInWithEmailAndPassword(username, password)}>Login
        </button>
        <button className={"button"} onClick={() =>
            auth.signInWithPopup(googleProvider)}>Login with Google
        </button>
        </div>
    </div>
}

function SignUp() {
    const [
        createUserWithEmailAndPassword,
        userCredential, loading, error
    ] = useCreateUserWithEmailAndPassword(auth);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    if (userCredential) {
        return <div>Unexpectedly signed in already</div>
    } else if (loading) {
        return <p>Signing up…</p>
    }
    return <div className={"signin"}>
        {error && <p>"Error signing up: " {error.message}</p>}

        <input type={"text"} placeholder={"Enter Username"} onChange={(e) => setUsername(e.currentTarget.value)}/>
        <br/>
        <input type={"password"} placeholder={"Enter Password"} onChange={(e) => setPassword(e.currentTarget.value)}/>
            <br/>
        <button className={"button"} onClick={() =>
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
            <button className={"button end"} type="button" onClick={() => auth.signOut()}>Logout</button>
            {!user.emailVerified && <button className={"button end"} type="button" onClick={verifyEmail}>Verify email</button>}
        </div>
    } else {
        return <>
            {error && <p>Error App: {error.message}</p>}
            <div className={"container center"}>
            <TabList>
                <SignIn key="Sign In"/>
                <SignUp key="Sign Up"/>
            </TabList>
            </div>
        </>
    }
}
export default App;
