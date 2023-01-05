import './styles.css';

function Filter(props){
    return(
        <ul className='todo-app__view-buttons'>
            <button onClick={()=>props.Status("all")}>All</button>
            <button onClick={()=>props.Status("active")}>Active</button>
            <button onClick={()=>props.Status("completed")}>Completed</button>
        </ul>
    )
}

export default Filter;