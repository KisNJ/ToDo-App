import React from 'react'
import SubForm from './SubForm'
export default function DisplayProject({ subTasks, mainTitle, deleteProject, saveChanges, priority, keyOfThis, completed, removeFromCompletedFullProject, completedYesOrNo }) {
    const notAllowed = ["mainTitle", "id", "priority", "completed"]
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
    function handleIndividualComplete(id, task) {
        
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
    }

    function taskCard({ title, description, dueDate, priority, id, completed }) {
        return (
            <div style={completed === "yes" ? { backgroundColor: "gray" } : {}}>
                <div>Title:{title} description:{description} dueDate:{dueDate}</div>
                {completed !== "yes" ? <button onClick={() => handleIndividualComplete(id, "completed")}>Completed</button> : <button onClick={() => handleIndividualComplete(id, "giveBack")}>Give Back</button>}
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
    function handleGiveBack() {
        setCompletedValue("no")
        removeFromCompletedFullProject(subTasksLocal)
    }

    return (
        <div>
            {whatTitleToDisplay()}
            {tempTasks}
            <div id="buttons">
                <button id={subTasks.id} onClick={deleteThisProject}>Delete Project</button>
                <button onClick={Edit}>Edit</button>
                <button onClick={addSubTask}>Add sub task</button>
                {completedValue !== "yes" ? <button onClick={handleComplete}>Completed</button> : <button onClick={handleGiveBack}>Give back</button>}
                {pressedEdit ? <button onClick={saveChangesLocal}>Save Changes</button> : ""}
                {/*pressedEdit?<button>Save Changes</button>:""*/}
            </div>
        </div>
    )

}