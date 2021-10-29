import './List.css'
import Item from './Item'

function List(props) {
    return (<div className={"list"}>
            {props.todo.map(item =>
                <Item key={item.id} id={item.id} description={item.description} isCompleted={item.isCompleted}
                      date={item.creationDate} priority={item.priority} onItemChange={props.onItemChange}
                      onButtonClick={() => props.onButtonClick()}
                      onPassID={props.onPassID}/>)}
        </div>
    );
}

export default List;