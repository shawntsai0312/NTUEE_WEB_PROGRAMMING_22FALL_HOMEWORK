import './styles.css';

function Clear(props) {
    return (
        <div className='todo-app__clean'>
            <button onClick={() => props.ClearCompleted()}>Clear completed</button>
        </div>
    )
}

export default Clear;