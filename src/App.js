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
  const [tasks, setTasks] = React.useState(localStorage.getItem("tasks")?JSON.parse(localStorage.getItem("tasks")):[]);
  const [projects, setProjects] = React.useState(localStorage.getItem("projects")?JSON.parse(localStorage.getItem("projects")):[]);
  const [deleted, setDeleted] = React.useState([]);
  const [completedProjects, setCompletedProjects] = React.useState([]);
  const [completedTasks, setCompletedTasks] = React.useState([]);
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

    setProjects(old => [...old, { mainTitle: title, ...subTasks, id: projects.length, priority: priority }])
    setRender(<DisplayProject removeFromCompletedFullProject={removeFromCompletedFullProject} completedYesOrNo={subTasks.completed} completed={addToCompleted} mainTitle={title} subTasks={{ mainTitle: title, ...subTasks, id: projects.length }} keyOfThis={projects.length} priority={priority} saveChanges={saveChanges} deleteProject={deleteProject} />)
  }
  React.useEffect(()=>{
    localStorage.setItem("tasks",JSON.stringify(tasks))
  },[tasks])
  React.useEffect(()=>{
    localStorage.setItem("projects",JSON.stringify(projects))
  },[projects])
  React.useEffect(() => {
    let tempProjects = [...projects]
    for (let i = 0; i < tempProjects.length; i++) {
      if (parseInt(tempProjects[i].id) === parseInt(deleted.id)) {
        let data = { ...deleted.data }
        data.mainTitle = deleted.mainTitle.mainTitle
        tempProjects[i] = { id: deleted.id, mainTitle: deleted.mainTitle, ...data, priority: deleted.priority }
      }

    }
    setProjects([...tempProjects])
  }, [deleted])
  function saveChanges(id, data, mainTitle, priority) {
    setDeleted({ id: id, data: data, mainTitle: mainTitle, priority: priority })
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
    const { title, description, dueDate, priority,completed } = task;
    //const toRender = <div>Title:{title} description:{description} dueDate:{dueDate} priotity:{priority}</div>
    setRender(<DisplayTask removeFromCompletedTask={removeFromCompletedTask}CompletedTask={CompletedTask} completed={completed}title={title} description={description} dueDate={dueDate} priority={priority} id={id} edit={editTask} deleteT={deleteTask} />)
  }
  /*function handleEdit(data) {
    setTasks(old => old.map(x => x.id !== data.id ? old : data))
  }*/
  function editTask(id, { title, description, dueDate, priority},completed) {
    let temp = [...tasks]
    let changeThisOne = temp.filter(x => parseInt(x.id) === parseInt(id))
    let rest = temp.filter(x => parseInt(x.id) !== parseInt(id))
    changeThisOne = { id, title, description, dueDate, priority,completed }
    setTasks([...rest, changeThisOne])
    setRender(<DisplayTask removeFromCompletedTask={removeFromCompletedTask}CompletedTask={CompletedTask} title={title} completed={completed} description={description} dueDate={dueDate} priority={priority} id={id} edit={editTask} deleteT={deleteTask} />)
  }
  
  React.useEffect(() => {
   
    let temp = [...tasks]

    for (let i = 0; i < temp.length; i++) {
      if (temp[i].id === completedTasks.id) {
        temp[i]["completed"] = "yes"
      }
    }

    setTasks([...temp])
  }, [completedTasks])
  function CompletedTask(data) {
    setCompletedTasks(data)
  }
  function openProject(e) {
    let project = projects.find(x => x.id === parseInt(e.target.id))
    setRender(<DisplayProject removeFromCompletedFullProject={removeFromCompletedFullProject} completedYesOrNo={project.completed} completed={addToCompleted} mainTitle={project.mainTitle} subTasks={project} priority={project.priority} deleteProject={deleteProject} saveChanges={saveChanges} />)

  }
  function deleteProject(value, id) {
    setProjects(old => old.filter(x => x.id !== parseInt(id)))
  }
  function openTask(id) {
    let task = tasks.filter(x => parseInt(x.id) === parseInt(id))
    let t = task[0]
    let { title, description, dueDate, priority,completed } = t
    setRender(<DisplayTask removeFromCompletedTask={removeFromCompletedTask}CompletedTask={CompletedTask} completed={completed}title={title} description={description} dueDate={dueDate} priority={priority} id={id} edit={editTask} deleteT={deleteTask} />)
  }

  React.useEffect(() => {
    let temp = [...projects]

    for (let i = 0; i < temp.length; i++) {
      if (temp[i].id === completedProjects.id) {
        temp[i]["completed"] = "yes"
        temp[i]["task"] = "yes"
      }
    }

    setProjects([...temp])
  }, [completedProjects])
  function removeFromCompletedTask(id){
    let temp=[...tasks]
    for(let i=0;i<temp.length;i++){
      if(temp[i].id===parseInt(id)){
        temp[i].completed="no"
      }
    }
    setTasks([...temp])
  }
  function addToCompleted(what, data) {
    if (what === "project") {

      let { mainTitle, subTasksLocal } = data

      let id = subTasksLocal.id


      setCompletedProjects({ id, subTasksLocal })

    } else {

    }
  }
  function seeCompleted() {
    let ps = []
    projects.forEach(x => x.completed === "yes" ? ps.push(x) : "")
    let ts=[]
    tasks.forEach(x => x.completed === "yes" ? ts.push(x) : "")
    setRender(<div><div style={{marginBottom:"20px",marginLeft:"40px",marginTop:"20px"}}>Completed Projects</div><ShowAllProjects openProject={openProject} projects={ps} c={"yes"} /><div style={{marginBottom:"20px",marginLeft:"40px",marginTop:"20px"}}>Completed Tasks</div><ShowAllTasks c={"yes"}tasks={ts} openTask={openTask}/></div>)
  }
  function removeFromCompletedFullProject(sub) {
    let temp = [...projects]
    let id = sub.id
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].id === id) {
        temp[i].completed = "no"
      }
    }
    
    setProjects([...temp])
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
          
          {tasks.map((x) => x.completed !== "yes" ? <>
            <button className="sub-buttons"id={x.id} onClick={() => taskOnCLick(x.id)}>{x.title}</button>
          </>:"")}
          <button style={{ display: "block" }} onClick={() => setRender(<ShowAllProjects openProject={openProject} projects={projects} />)}>Projects</button>
          <button onClick={(e) => add(e.target.id)} id="add-project">Add project</button>
          {projects.map(x => x.completed !== "yes" ? <button className="sub-buttons" id={x.id} onClick={openProject}>{x.mainTitle}</button> : "")}
          <button onClick={seeCompleted}>Completed Tasks/Projects</button>
          
        </nav>
        <div id='content'>
          {render}
        </div>
      </main>
    </div >
  );
}
