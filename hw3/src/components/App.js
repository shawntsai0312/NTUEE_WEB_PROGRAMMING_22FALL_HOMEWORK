import TaskList from "./TaskList";
import AddTask from "./AddTask";
import LeftCount from "./LeftCount"
import Filter from "./Filter"
import Clear from "./Clear"
import './styles.css';
import { useState } from 'react'

function App() {
  const [uncompletd, setUncompleted] = useState(0);

  const [list, setList] = useState([]);
  const Add = (value) => {
    const len = list.length;
    setList([...list, { name: value, id: len, completed: false }]);
    setUncompleted(list.filter(task => { return task.completed === false }).length + 1)
  }

  const CompletedChange = (pos) => {
    let newList = list;
    for (var a = 0; a < newList.length; a++) {
      if (newList[a].id === pos) {
        newList[a].completed = !newList[a].completed;
        break;
      }
    }
    setUncompleted(newList.filter(task => { return task.completed === false }).length)
    setList(newList);
  }

  const DeleteTask = (pos) => {
    let deletedList = [];
    for (let a = 0; a < list.length; a++) {
      if (list[a].id !== pos) {
        console.log(list[a].id);
        deletedList.push(list[a]);
      }
    }
    setUncompleted(deletedList.filter(task => { return task.completed === false }).length);
    setList(deletedList);
    
  }

  if (list.length === 0) {
    return (
      <div id="root" className="todo-app__root">

        <header className="todo-app__header">
          <h1 className="todo-app__title">todos</h1>
        </header>

        <section className="todo-app__main">
          <AddTask Add={Add} />
        </section>

        <footer className="todo-app__footer" id="todo-footer">
        </footer>
      </div>
    );
  } else {
    return (
      <div id="root" className="todo-app__root">

        <header className="todo-app__header">
          <h1 className="todo-app__title">todos</h1>
        </header>

        <section className="todo-app__main">
          <AddTask Add={Add} />
          <TaskList list={list} CompletedChange={CompletedChange} DeleteTask={DeleteTask} />
        </section>

        <footer className="todo-app__footer" id="todo-footer">
          <LeftCount Count={uncompletd} />
          <Filter />
          <Clear />
        </footer>

      </div>
    );
  }


}

export default App;
