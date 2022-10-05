import './styles.css';
import Task from './Task';

function TaskList(props) {
    
    return (
        <ul className="todo-app__list" id="todo-list">
            {
                props.list.map(item => { return <Task elem={item} CompletedChange={props.CompletedChange}/> })
            }
        </ul>
    );
    
}

export default TaskList;
