import './List.css'
import Item from './Item'
import {useState} from "react";

function List(props) {
    const [isSelected, setSelected] = useState([]);

    // function handleSelected(id, isChecked) {
    //     if ((isSelected === []) || (isSelected.indexOf(id) === -1)) {
    //         if (isChecked) {
    //             setSelected([...isSelected, id])
    //         }
    //     } else {
    //         if (!isChecked) {
    //             setSelected(isSelected.filter((p) => {
    //                 return id === p;
    //             }));
    //         }
    //     }
    //     console.log(isChecked, isSelected);
    // }
        return (<div>
                {props.todo.map(item =>
                    <Item id={item.id} description={item.description} isCompleted={item.isCompleted}
                          onItemChange={props.onItemChange}
                    ></Item>)}
            </div>
        );
}

export default List;