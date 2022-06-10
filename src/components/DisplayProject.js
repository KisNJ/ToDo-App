import React from 'react'
import SubForm from './SubForm'
export default function DisplayProject({ subTasks, mainTitle, deleteProject, saveChanges, priority,keyOfThis }) {
    const notAllowed = ["mainTitle", "id"]
    const [subTasksLocal, setSubTasksLocal] = React.useState({ ...subTasks })
    const [tempTasks, setTempTasks] = React.useState();
    const [mainTitleValue, setMainTitleValue] = React.useState({ mainTitle: mainTitle });
    const [priorityValue, setPriorityValue] = React.useState(parseInt(priority));
    const [pressedEdit, setPressedEdit] = React.useState(false)
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
        setTempTasks([...temp])
    }, [subTasks, subTasks.id])
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

    function taskCard({ title, description, dueDate, priority, id }) {
        return (
            <div>
                <div>Title:{title} description:{description} dueDate:{dueDate}</div>
                <button id={id} onClick={deleteTask}>Delete Task</button>
            </div>
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
                temp[key]["continue"] = "yes"
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
            }
        }
        setSubTasksLocal({ ...temp })
        saveChanges(subTasks.id, subTasksLocal, mainTitleValue)
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
    whatColor()
    function increasePriority(){
        if (priorityValue > 1) {
            setPriorityValue(0)
        } else {
            setPriorityValue(old=>old+1)
        }        
    }
    
    function whatTitleToDisplay() {
        if (pressedEdit) {
            return (
                <div>
                    <label htmlFor="mainTitle">Title</label>
                    <input onChange={handleMainTitleChange} value={mainTitleValue.mainTitle} type="text" name="mainTitle" id="mainTitle" />
                    <div onClick={increasePriority}>
                        <div id="three" style={priorityValue > 1 ? { opacity: "1", color: color } : { opacity: "0" }} >-||-</div>
                        <div id="two" style={priorityValue > 0 ? { opacity: "1", color: color } : { opacity: "0" }}>-||-</div>
                        <div id="one" style={{ opacity: "1", color: color }}>-||-</div>
                    </div>
                </div>
            )
        }
        else {
            return <div><div>{mainTitleValue.mainTitle}</div><div>Priority:</div> <div>
                <div id="three" style={priorityValue > 1 ? { opacity: "1", color: color } : { opacity: "0" }} >-||-</div>
                <div id="two" style={priorityValue > 0 ? { opacity: "1", color: color } : { opacity: "0" }}>-||-</div>
                <div id="one" style={{ opacity: "1", color: color }}>-||-</div>
            </div></div>
        }

    }
    return (
        <div>
            {whatTitleToDisplay()}
            {tempTasks}
            <div id="buttons">
                <button id={subTasks.id} onClick={deleteThisProject}>Delete Project</button>
                <button onClick={Edit}>Edit</button>
                <button onClick={addSubTask}>Add sub task</button>
                {pressedEdit ? <button onClick={saveChangesLocal}>Save Changes</button> : ""}
                {/*pressedEdit?<button>Save Changes</button>:""*/}
            </div>
        </div>
    )

}