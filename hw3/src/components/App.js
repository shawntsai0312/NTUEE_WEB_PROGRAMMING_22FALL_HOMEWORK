import TaskList from "./TaskList";
import AddTask from "./AddTask";
import LeftCount from "./LeftCount"
import Filter from "./Filter"
import Clear from "./Clear"
import './styles.css';
import { useState, useEffect,useId } from 'react'

function App() {
  //state variable
  const [uncompletd, setUncompleted] = useState(0);
  const [filterStatus, setFilterStatus] = useState("all");
  const [list, setList] = useState([]);
  const [filterList, setFilterList] = useState([]);

  const Add = (value) => {
    const newId = Math.random();
    setList([...list, { name: value, id: newId, completed: false }]);
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
    let newList = [];
    for (let a = 0; a < list.length; a++) {
      if (list[a].id !== pos) {
        newList.push(list[a]);
      }
    }
    setUncompleted(newList.filter(task => { return task.completed === false }).length);
    setList(newList);
  }

  const ClearCompleted = () => {
    let newList = [];
    for (let a = 0; a < list.length; a++) {
      if (list[a].completed === false) {
        newList.push(list[a]);
      }
    }
    setUncompleted(newList.filter(task => { return task.completed === false }).length);
    setList(newList);
  }

  const HandleStatus = (value) => {
    // console.log(value);
    setFilterStatus(value);
  }

  useEffect(() => {
    HandleFilter();
  }, [list, filterStatus]);

  const HandleFilter = () => {
    switch (filterStatus) {
      case 'active': {
        console.log("active mode");
        setFilterList(list.filter(task => task.completed === false));
        break;
      }

      case 'completed': {
        console.log("completed mode");
        setFilterList(list.filter(task => task.completed === true));
        break;
      }
      default: {
        console.log("default mode");
        setFilterList(list);
        break;
      }
    }
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
    if (list.length - uncompletd === 0) {
      return (
        <div id="root" className="todo-app__root">

          <header className="todo-app__header">
            <h1 className="todo-app__title">todos</h1>
          </header>

          <section className="todo-app__main">
            <AddTask Add={Add} />
            <TaskList FilterList={filterList} List={list} CompletedChange={CompletedChange} DeleteTask={DeleteTask} />
          </section>

          <footer className="todo-app__footer" id="todo-footer">
            <LeftCount Count={uncompletd} />
            <Filter Status={HandleStatus} />
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
            <TaskList FilterList={filterList} List={list} CompletedChange={CompletedChange} DeleteTask={DeleteTask} />
          </section>

          <footer className="todo-app__footer" id="todo-footer">
            <LeftCount Count={uncompletd} />
            <Filter Status={HandleStatus} />
            <Clear ClearCompleted={ClearCompleted} />
          </footer>

        </div>
      );
    }

  }


}

export default App;
