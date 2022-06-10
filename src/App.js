import './App.css';
import React from "react"
import done_all from "./svg/done_all.svg"
import AddTask from "./components/AddTask"
import AddProject from './components/AddProject';
import ShowAllProjects from "./components/ShowAllProjects"
import ShowAllTasks from './components/ShowAllTasks';
import DisplayProject from './components/DisplayProject';
import DisplayTask from './components/DisplayTask';
export default function App() {
  const [render, setRender] = React.useState([]);
  const [tasks, setTasks] = React.useState([]);
  const [projects, setProjects] = React.useState([]);
  const [deleted, setDeleted] = React.useState([]);
  React.useEffect(() => {
    let tempTasks = tasks
    for (let i = 0; i < tasks.length; i++) {
      tempTasks[i].id = i
    }
    setTasks(tempTasks)
  }, [tasks.length])

  function handleChange(data) {
    setTasks(old => [...old, data])
  }
  function changeProjects(title, subTasks, priority) {

    setProjects(old => [...old, { mainTitle: title, ...subTasks, id: projects.length, priority:priority }])
    setRender(<DisplayProject mainTitle={title} subTasks={{ mainTitle: title, ...subTasks, id: projects.length }} keyOfThis={projects.length} priority={priority} saveChanges={saveChanges} deleteProject={deleteProject} />)
  }

  React.useEffect(() => {
    let tempProjects = [...projects]
    for (let i = 0; i < tempProjects.length; i++) {
      if (parseInt(tempProjects[i].id) === parseInt(deleted.id)) {
        let data = { ...deleted.data }
        data.mainTitle = deleted.mainTitle.mainTitle
        tempProjects[i] = { id: deleted.id, mainTitle: deleted.mainTitle, ...data }
      }

    }
    setProjects([...tempProjects])
  }, [deleted])
  function saveChanges(id, data, mainTitle) {
    setDeleted({ id: id, data: data, mainTitle: mainTitle })
  }

  function add(id) {
    if (id === "add-task") {
      setRender([<AddTask handleChange={handleChange} />])
    } else {
      setRender([<AddProject changeProjects={changeProjects} />])
    }

  }
  function deleteTask(id) {
    let newTasks = tasks.filter(x => parseInt(x.id) !== parseInt(id))
    setTasks(newTasks)
  }
  function taskOnCLick(id) {
    let task = tasks.find(x => parseInt(x.id) === parseInt(id))
    const { title, description, dueDate, priority } = task;
    //const toRender = <div>Title:{title} description:{description} dueDate:{dueDate} priotity:{priority}</div>
    setRender(<DisplayTask title={title} description={description} dueDate={dueDate} priority={priority} id={id} edit={editTask} deleteT={deleteTask} />)
  }
  /*function handleEdit(data) {
    setTasks(old => old.map(x => x.id !== data.id ? old : data))
  }*/
  function editTask(id, { title, description, dueDate, priority }) {
    let temp = [...tasks]
    let changeThisOne = temp.filter(x => parseInt(x.id) === parseInt(id))
    let rest = temp.filter(x => parseInt(x.id) !== parseInt(id))
    changeThisOne = { id, title, description, dueDate, priority }
    setTasks([...rest, changeThisOne])
    setRender(<DisplayTask title={title} description={description} dueDate={dueDate} priority={priority} id={id} edit={editTask} deleteT={deleteTask} />)
  }
  function openProject(e) {
    let project = projects.find(x => x.id === parseInt(e.target.id))
    setRender(<DisplayProject mainTitle={project.mainTitle} subTasks={project} priority={project.priority} deleteProject={deleteProject} saveChanges={saveChanges} />)

  }
  function deleteProject(value, id) {
    setProjects(old => old.filter(x => x.id !== parseInt(id)))
  }
  function openTask(id) {
    let task = tasks.filter(x => parseInt(x.id) === parseInt(id))
    let t = task[0]
    let { title, description, dueDate, priority } = t
    setRender(<DisplayTask title={title} description={description} dueDate={dueDate} priority={priority} id={id} edit={editTask} deleteT={deleteTask} />)
  }
  return (
    <div id="app">
      <header>
        <img src={done_all} alt="Done all svg" />
        Todo list
      </header>

      <main>
        <nav>
          <button onClick={() => setRender(<ShowAllTasks openTask={openTask} tasks={tasks} />)} style={{ display: "block" }}>Tasks</button>
          <button onClick={(e) => add(e.target.id)} id="add-task">Add task</button>

          {tasks.length !== 0 ? tasks.map((x) => <div>
            <button id={x.id} onClick={() => taskOnCLick(x.id)}>{x.title}</button>
          </div>) : ""}
          <button style={{ display: "block" }} onClick={() => setRender(<ShowAllProjects openProject={openProject} projects={projects} />)}>Projects</button>
          <button onClick={(e) => add(e.target.id)} id="add-project">Add project</button>
          {projects.map(x => <button id={x.id} onClick={openProject}>{x.mainTitle}</button>)}
        </nav>
        <div id='content'>
          {render}
        </div>
      </main>
    </div >
  );
}
