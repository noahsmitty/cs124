import './List.css'
import Item from './Item'

function List(props) {
    return (<div className={"list"}>
            {props.todo.map(item =>
                <Item key={item.id} id={item.id} description={item.description} isCompleted={item.isCompleted}
                      onItemChange={props.onItemChange} onButtonClick={() => props.onButtonClick()}
                      passID={(value) => props.passID(value)}/>)}
        </div>
    );
}

export default List;