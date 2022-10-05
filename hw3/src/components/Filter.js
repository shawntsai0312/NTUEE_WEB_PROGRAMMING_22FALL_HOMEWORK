import './styles.css';

function Filter(){
    return(
        <ul className='todo-app__view-buttons'>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
        </ul>
    )
}

export default Filter;