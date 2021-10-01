import logo from './logo.svg';
import List from './List'
import './App.css';

const initialData = [
  {
    id: "1",
    description: "Text John about Bank Statements",
    isChecked: false
  },
  {
    id: "2",
    description: "Eat Lunch",
    isChecked: false
  },
  {
    id: "3",
    description: "Call Mom",
    isChecked: true
  },
  {
    id: "4",
    description: "Buy new John Grisham book",
    isChecked: false
  }
];

function App() {
  return (
      <List></List>
  );
}

export default App;
