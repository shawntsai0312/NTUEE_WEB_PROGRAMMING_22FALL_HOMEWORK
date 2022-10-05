import './styles.css';
import x_pic from './img/x.png'
import {useState} from 'react'

function Task(props) {
    return (
        <li className="todo-app__item">
            <div className="todo-app__checkbox">
                <input id={props.elem.id} type="checkbox" onChange={()=>props.CompletedChange(props.elem.id)}></input>
                <label htmlFor={props.elem.id}></label>
            </div>
            <h1 className='todo-app__item-detail'>
                {props.elem.name}
            </h1>
            <img src={x_pic} className='todo-app__item-x' />
        </li>
    );
}

export default Task;