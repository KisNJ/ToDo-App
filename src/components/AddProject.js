import React from 'react'
import SubForm from './SubForm'
import redCircle from '../svg/redCircle.svg'
import greenCircle from '../svg/greenCircle.svg'
import orangeCircle from '../svg/orangeCircle.svg'
export default function AddProject(props) {
    const [subTasks, setSubTasks] = React.useState([])
    const [title, setTitle] = React.useState("")
    const [priorityValue, setPriorityValue] = React.useState(0);
    function addSubTask(e) {
        e.preventDefault();
        if (subTasks.length > 0) {
            setSubTasks(old => [...old, {
                id: old[old.length - 1].id + 1, title: "",
                description: "",
                dueDate: "",
                priority: 0
            }])
        } else {
            setSubTasks(old => [...old, {
                id: 0, title: "",
                description: "",
                dueDate: "",
                priority: 0,
                deleted: false
            }])
        }

    }
    function change(id, data, deleted) {
        if (deleted !== "deleted") {
            let temp = [...subTasks]
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].id === parseInt(id)) {
                    temp[i] = { id: temp[i].id, ...data }
                }
            }
            setSubTasks([...temp])
        } else {
            let temp = [...subTasks]
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].id === parseInt(id)) {
                    temp[i] = { id: temp[i].id, ...data, title: "" }
                }
            }
            setSubTasks([...temp])
        }

    }
    function saveProject(e) {
        e.preventDefault();
        setSubTasks(old => old.filter(x => x.title !== ""))
        
        let temp = [...subTasks.filter(x => x.title !== "")]
        let dateObj = new Date();
        let month = dateObj.getUTCMonth() + 1; //months from 1-12
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].dueDate === "") {
                temp[i].dueDate =year + "-" + month + "-" + day
            }
        }
        if (title !== "") {
            props.changeProjects(title, temp, priorityValue)
        }
        //setRender2(<DisplayProject mainTitle={title} subTasks={subTasks}/>)
    }
    function titleChange(e) {
        setTitle(e.target.value)
    }
    let color
    let img
    function whatColor() {

        if (priorityValue >= 2) {
            color = "red"
            img=redCircle
        } else if (priorityValue >= 1) {
            color = "orange"
            img=orangeCircle
        } else {
            color = "green"
            img=greenCircle
        }
    }
    function increasePriority() {
        setPriorityValue(old => old>1?0:old + 1)
    }
    whatColor()

    return (
        <div id="item" className="project--name">
            <div className="title">Your project's title:</div>
            <div className="add-form">
            <label htmlFor="project--title"></label>
            <input type="text" onChange={titleChange} id="project--title" />
            

            <div className="priority-conatiner">
                <div className="priority">Priority:</div>
                <div onClick={increasePriority} className="priority-toggle pointer">
                <div id="one" style={{ opacity: "1", color: color }}><img src={img}/></div>
                <div id="two" style={priorityValue > 0 ? { opacity: "1", color: color } : { opacity: "0" }}><img src={img}/></div>
                <div id="three" style={priorityValue > 1 ? { opacity: "1", color: color } : { opacity: "0" }} ><img src={img}/></div>
                </div>
            </div>
            <div id="sub--tasks">

                <form action="set">
                    {subTasks.map(x => <SubForm id={x.id} change={change} />)}
                    <div className="set-form">
                    <button onClick={addSubTask}>Add sub task</button>
                    <button onClick={saveProject} type="submit">Save Project</button>
                    </div>
                </form>

            </div>
            </div>
        </div>

    )
}