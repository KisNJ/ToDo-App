import React from 'react'
import SubForm from './SubForm'

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
        console.log(subTasks)
        let temp = [...subTasks]
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
    function whatColor() {

        if (priorityValue >= 2) {
            color = "red"
        } else if (priorityValue >= 1) {
            color = "orange"
        } else {
            color = "green"
        }
    }
    function increasePriority() {
        setPriorityValue(old => old + 1)
    }
    whatColor()

    return (
        <div className="project--name">
            <div>Your project's title:</div>
            <label htmlFor="project--title"></label>
            <input type="text" onChange={titleChange} id="project--title" />
            <div onClick={increasePriority}>
                {console.log(priorityValue)}
                <div id="three" style={priorityValue > 1 ? { opacity: "1", color: color } : { opacity: "0" }} >-||-</div>
                <div id="two" style={priorityValue > 0 ? { opacity: "1", color: color } : { opacity: "0" }}>-||-</div>
                <div id="one" style={{ opacity: "1", color: color }}>-||-</div>
            </div>
            <div id="sub--tasks">

                <form action="set">
                    {subTasks.map(x => <SubForm id={x.id} change={change} />)}
                    <button onClick={addSubTask}>Add sub task</button>
                    <button onClick={saveProject} type="submit">Save Project</button>
                </form>

            </div>
        </div>

    )
}