import logo from './logo.svg';
import List from './List'
import './App.css';
import {useState} from "react";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import AddTask from "./AddTask";
import Alert from "./Alert";


const initialData = [
    {
        id: '1',
        description: "Text John about Bank Statements",
        isCompleted: false,
    },
    {
        id: '2',
        description: "Eat Lunch",
        isCompleted: false,
    },
    {
        id: '3',
        description: "Call Mom",
        isCompleted: true,
    },
    {
        id: '4',
        description: "Buy new John Grisham book",
        isCompleted: false,
    }
];

function App(props) {
    const [data, setData] = useState(initialData);
    const [isVisible, setVisibility] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [storeID, setStoreID] = useState("");

    function addData(description) {
        setData([...data, {
            id: generateUniqueID(),
            description: description,
            isCompleted: false,
        }])
    }

    function handleItemChange(itemID, field, value) {
        setData(data.map(item => item.id !== itemID ? item :
            {...item, [field]: value}
        ))
    }

    function handleEditItem(field, value) {
        setData(data.map(item => item.id !== storeID ? item :
            {...item, [field]: value}
        ))
    }

    function handleDelete() {
        setData(data.filter(item => !(item.isCompleted)));
    }

    function handleAlertOK(description) {
        console.log('the frob should be blitzened here');
    }

    function toggleModal(itemID) {
        setShowAlert(!showAlert);
    }

    function changeID(itemID) {
        setStoreID(itemID);
    }

    return (
        <div className={"App-container"}>

            <div>
                <h1>TO-DO LIST</h1>
                <div className={isVisible ? "visible" : null}>
                    <button type={"button"} onClick={() => {
                        setVisibility(!isVisible);
                    }}>{isVisible ? "Hide Completed" : "Show Completed"}</button>
                    <button type={"button"} onClick={handleDelete}>Delete Completed</button>
                </div>
                <List todo={isVisible ? data : data.filter(item => !(item.isCompleted))} onItemChange={handleItemChange}
                      onButtonClick={toggleModal} passID={changeID}/>
                <AddTask data={data} onSubmit={addData}/>
            </div>
            {showAlert && <Alert onClose={toggleModal} onOK={handleEditItem}/>}
        </div>
    );
}

export default App;
