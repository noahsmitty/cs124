import logo from './logo.svg';
import List from './List'
import './App.css';
import {useState} from "react";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import AddTask from "./AddTask";

const initialData = [
  {
    id: '1',
    description: "Text John about Bank Statements",
  },
  {
    id: '2',
    description: "Eat Lunch",
  },
  {
    id: '3',
    description: "Call Mom",
  },
  {
    id: '4',
    description: "Buy new John Grisham book",
  }
];

function App(props) {
  const [data, setData] = useState(initialData);
  function addData(description) {
    setData([...data, {
      id: generateUniqueID(),
      description: description,
    }])
  }

  return (
      <div>
        <h1>TO-DO LIST</h1>
      <List todo={data} ></List>
        <AddTask data={data} onSubmit={addData}/>
      </div>
  );
}

export default App;
