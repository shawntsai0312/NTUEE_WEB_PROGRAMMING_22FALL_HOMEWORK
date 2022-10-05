import './styles.css';
import { useState } from 'react'

function AddTask(props) {
    const [note, setNote] = useState("")

    const noteChange = (e) => {
        setNote(e.target.value);
    }

    const addItem = (e) => {
        props.Add(note);
        setNote('');
    }

    const keyDown = (e) => {
        if (e.keyCode === 13 && note!=="") {
            addItem();
        }
    }

    return (
        <input
            className="todo-app__input"
            type="text"
            placeholder={"What needs to be done ?"}
            value={note}
            onChange={noteChange}
            onKeyDown={keyDown}
        />
    );
}

export default AddTask;
