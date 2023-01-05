import './styles.css';

function LeftCount(props) {
    
    return (
        <div className='todo-app__total'>
            {props.Count} left
        </div>
    )
}

export default LeftCount;