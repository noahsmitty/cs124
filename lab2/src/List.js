import './List.css'
import Item from './Item'
import {useState} from "react";

function List(props) {
    const [isSelected, setSelected] = useState([]);

    function handleSelected(id, isChecked) {
        if ((isSelected === []) || (isSelected.indexOf(id) === -1)) {
            if (isChecked) {
                setSelected([...isSelected, id])
            }
        } else {
            if (!isChecked) {
                setSelected(isSelected.filter((p) => {
                    return id == p
                }));
            }
        }
        console.log(isSelected);
    }
        return (<div>
                {props.todo.map(item =>
                    <Item id={item.id} description={item.description}
                          onSelected={handleSelected}
                    ></Item>)}
            </div>
        );
}

export default List;