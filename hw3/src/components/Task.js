import './styles.css';
import x_pic from './img/x.png'

function Task(props) {
    if (props.elem.completed === true) {
        return (
            <li className="todo-app__item">
                <div className="todo-app__checkbox">
                    <input id={props.elem.id} type="checkbox" onChange={() => props.CompletedChange(props.elem.id)}></input>
                    <label htmlFor={props.elem.id} style={{ background: "#26ca299b" }}></label>
                </div>
                <h1 className='todo-app__item-detail' style={{ textDecoration: "line-through", opacity: "0.5" }}>
                    {props.elem.name}
                </h1>
                <img src={x_pic} className='todo-app__item-x' onClick={() => props.DeleteTask(props.elem.id)} />
            </li>
        );
    } else {
        return (
            <li className="todo-app__item">
                <div className="todo-app__checkbox">
                    <input id={props.elem.id} type="checkbox" onChange={() => props.CompletedChange(props.elem.id)}></input>
                    <label htmlFor={props.elem.id} style={{ background: "rgba(99, 99, 99, 0.698)" }}></label>
                </div>
                <h1 className='todo-app__item-detail'>
                    {props.elem.name}
                </h1>
                <img src={x_pic} className='todo-app__item-x' onClick={() => props.DeleteTask(props.elem.id)} />
            </li>
        );
    }


}

export default Task;