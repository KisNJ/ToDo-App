import React from 'react'
import SubForm from './SubForm'
import redCircle from '../svg/redCircle.svg'
import greenCircle from '../svg/greenCircle.svg'
import orangeCircle from '../svg/orangeCircle.svg'

export default function DisplayProject({ subTasks, mainTitle, deleteProject, saveChanges, priority, keyOfThis, completed, removeFromCompletedFullProject, completedYesOrNo }) {
    const notAllowed = ["mainTitle", "id", "priority", "completed","task"]
    const [subTasksLocal, setSubTasksLocal] = React.useState({ ...subTasks })
    const [tempTasks, setTempTasks] = React.useState();
    const [mainTitleValue, setMainTitleValue] = React.useState({ mainTitle: mainTitle });
    const [priorityValue, setPriorityValue] = React.useState(parseInt(priority));
    const [pressedEdit, setPressedEdit] = React.useState(false)
    const [completedValue, setCompletedValue] = React.useState(completedYesOrNo)
    console.log(completedValue)

    function deleteTask(e) {
        setPressedEdit(true)
        let temp = { ...subTasksLocal }
        for (let key in subTasksLocal) {
            if (!notAllowed.includes(key)) {
                if (temp[key].id === parseInt(e.target.id)) {
                    delete temp[key]
                }
            }
        }
        setSubTasksLocal({ ...temp })
    }
    React.useEffect(() => {
        setMainTitleValue({ mainTitle: mainTitle })
    }, [mainTitle])
    React.useEffect(() => {
        setSubTasksLocal({ ...subTasks })
        let temp = []
        for (let key in subTasksLocal) {
            if (!notAllowed.includes(key)) {

                if (subTasksLocal[key].title !== "") {
                    temp.push(taskCard(subTasksLocal[key]))
                }

            }

        }
        setPriorityValue(parseInt(priority))
        setTempTasks([...temp])
        setCompletedValue(completedYesOrNo)
    }, [subTasks, subTasks.id, priority, completedYesOrNo])
    React.useEffect(() => {

        let temp = []
        for (let key in subTasksLocal) {
            if (!notAllowed.includes(key)) {
                if (subTasksLocal[key].title === "" || subTasksLocal[key].continue) {
                    setPressedEdit(true)
                    temp.push(<SubForm id={subTasksLocal[key].id} change={change} basicData={subTasksLocal[key]} />)
                } else {
                    temp.push(taskCard(subTasksLocal[key]))

                }
            }
        }
        setTempTasks([...temp])
    }, [subTasksLocal])
    /*function handleIndividualComplete(id, task) {

        if (task === "completed") {
            let temp = { ...subTasksLocal }
            for (let key in subTasksLocal) {
                if (!notAllowed.includes(key)) {
                    if (temp[key].id === parseInt(id)) {
                        temp[key].completed = "yes"
                    }
                }
            }
            console.log(temp)
            setSubTasksLocal({ ...temp })
        } else {
            let temp = { ...subTasksLocal }
            for (let key in subTasksLocal) {
                if (!notAllowed.includes(key)) {
                    if (temp[key].id === parseInt(id)) {
                        temp[key].completed = "no"
                    }
                }
            }
            setSubTasksLocal({ ...temp })
        }
    }*/

    function taskCard({ title, description, dueDate, priority, id, completed }) {
        return (
            title!==""?
            <div id="item" style={{boxShadow:"1px 2px 4px #0f172a"}}>

                <div>
                    <div className='add-form'>
                        <label htmlFor="title" >Title</label>
                        <input disabled value={title} required type="text" name="title" id="title" />
                        <label htmlFor="description">Description</label>
                        <input disabled value={description} required type="text" name="description" id="description" />
                        <label htmlFor="dueDate">Due Date</label>
                        <input disabled value={dueDate} required type="date" name="dueDate" id="dueDate" />
                        <button id={id} onClick={deleteTask} className="deleteBtn">Delete Task</button>
                        {/*completed !== "yes" ? <button onClick={() => handleIndividualComplete(id, "completed")}>Completed</button> : <button onClick={() => handleIndividualComplete(id, "giveBack")}>Give Back</button>*/}
                        
                    </div>
                </div>
            </div>:""
        )
    }
    function deleteThisProject(e) {
        deleteProject(e.target.value, e.target.id, keyOfThis)
    }
    function handleMainTitleChange(e) {
        setMainTitleValue({ mainTitle: e.target.value })
    }
    function Edit() {
        setPressedEdit(true)
        let temp = { ...subTasksLocal }
        for (let key in temp) {
            if (!notAllowed.includes(key)) {
                if("continue" in temp[key]){
                    temp[key].continue = "yes"
                }else{
                    temp[key]["continue"] = "yes"
                }
                
            }
        }
        setSubTasksLocal({ ...temp })
    }

    function saveChangesLocal() {
        setPressedEdit(false)
        let temp = { ...subTasksLocal }
        for (let key in temp) {
            if (!notAllowed.includes(key)) {
                if (temp[key].continue === "yes") {
                    delete temp[key].continue
                }
                if (temp[key].title === "") {
                    delete temp[key]
                }
            }
        }
       
        setSubTasksLocal({ ...temp })
        saveChanges(subTasks.id, subTasksLocal, mainTitleValue, priorityValue)
    }
    function addSubTask(e) {
        let ids = []
        let temp = { ...subTasksLocal }
        let keys = []
        for (let key in temp) {
            if (!notAllowed.includes(key)) {
                keys.push(key)
                ids.push(temp[key].id)
            }
        }
        ids.sort()
        keys.sort()
        let idId = isNaN(ids[ids.length - 1] + 1) ? 0 : ids[ids.length - 1] + 1
        let keyId = isNaN(parseInt(keys[keys.length - 1]) + 1) ? 0 : keys[keys.length - 1] + 1
        let basic = {
            id: idId, title: "",
            description: "",
            dueDate: "",
            priority: 0
        }
        setSubTasksLocal(old => ({ ...old, [keyId]: basic }))
    }
    function change(id, data, deleted) {
        if (deleted !== "deleted") {
            let temp = { ...subTasksLocal }
            for (let key in temp) {
                if (!notAllowed.includes(key)) {
                    if (temp[key].id === parseInt(id)) {
                        temp[key] = { id: parseInt(temp[key].id), ...data, continue: "yes" }
                    }
                }
            }
            setSubTasksLocal({ ...temp })
        } else {
            let temp = { ...subTasksLocal }
            for (let key in temp) {
                if (!notAllowed.includes(key)) {
                    if (temp[key].id === parseInt(id)) {
                        temp[key] = { id: parseInt(temp[key].id), ...data, title: "", continue: "yes" }
                    }
                }
            }
            setSubTasksLocal({ ...temp })
        }
    }
    function handleComplete() {
        setCompletedValue("yes")
        completed("project", { mainTitleValue, subTasksLocal })
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
    whatColor()
    function increasePriority() {
        if (priorityValue > 1) {
            setPriorityValue(0)
        } else {
            setPriorityValue(old => old + 1)
        }
    }

    function whatTitleToDisplay() {
        if (pressedEdit) {
            return (
                <div className='add-form'>
                    <label htmlFor="mainTitle">Title</label>
                    <input onChange={handleMainTitleChange} value={mainTitleValue.mainTitle} type="text" className='main-title' name="mainTitle" id="mainTitle" />
                    <div className="priority-conatiner">
                        <div className='priority'>Priority</div>
                        <div onClick={increasePriority} className="priority-toggle pointer">
                            <div id="one" style={{ opacity: "1", color: color,border:"none" }}><img src={img} alt="" /></div>
                            <div id="two" style={priorityValue > 0 ? { opacity: "1", color: color } : { opacity: "0" }}><img src={img} alt="" /></div>
                            <div id="three" style={priorityValue > 1 ? { opacity: "1", color: color } : { opacity: "0" }} ><img src={img} alt="" /></div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return <div>
                <div className='main-title'>{mainTitleValue.mainTitle}</div>
                <div className="priority-conatiner">
                    <div className='priority'>Priority</div>
                    <div  className="priority-toggle">
                        <div id="one" style={{ opacity: "1", color: color }}><img src={img} alt="" /></div>
                        <div id="two" style={priorityValue > 0 ? { opacity: "1", color: color } : { opacity: "0" }}><img src={img} alt="" /></div>
                        <div id="three" style={priorityValue > 1 ? { opacity: "1", color: color } : { opacity: "0" }} ><img src={img} alt="" /></div>
                    </div></div>
            </div>
        }

    }
    function handleGiveBack() {
        setCompletedValue("no")
        removeFromCompletedFullProject(subTasksLocal)
    }

    return (
        <div className='all-container'>
            {whatTitleToDisplay()}
            {tempTasks}
            <div id="buttons">
                <button id={subTasks.id} onClick={deleteThisProject} className='deleteBtn'>Delete Project</button>
                <div className='subs'>
                
                <button onClick={addSubTask}>Add sub task</button>
                {completedValue !== "yes" ? <button onClick={handleComplete}>Completed</button> : <button onClick={handleGiveBack}>Give back</button>}
                {pressedEdit ? <button onClick={saveChangesLocal}>Save Changes</button> : ""}
                {!pressedEdit&&completedValue!=="yes"?<button onClick={Edit}>Edit</button>:""}
                </div>
            </div>
        </div>
    )

}