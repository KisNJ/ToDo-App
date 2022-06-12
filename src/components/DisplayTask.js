import React from 'react'
export default function DisplayTask({ title, description, dueDate, priority, id, edit, deleteT, CompletedTask, completed, removeFromCompletedTask }) {
    const [pressedEdit, setPressedEdit] = React.useState(false)
    const [completedValue, setCompletedValue] = React.useState(completed)

    console.log(completedValue)
    const [formData, setFormData] = React.useState({
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority
    })

    React.useEffect(() => {
        setFormData({
            title: title,
            description: description,
            dueDate: dueDate,
            priority: priority
        })
        setCompletedValue(completed)
    }, [title, description, priority, dueDate, id, completed])
    function editLocal() {
        setPressedEdit(true)
    }
    function deleteLocal() {
        deleteT(id)
    }
    function handleChange(e) {
        let { id, value } = e.target
        setFormData(old => ({ ...old, [id]: value }))
    }
    function saveChanges() {
        edit(id, formData, completedValue)
        setPressedEdit(false)
    }
    function increasePriority() {
        if (formData.priority > 1) {
            setFormData(old => ({ ...old, priority: 0 }))
        } else {
            setFormData(old => ({ ...old, priority: old.priority + 1 }))
        }

    }

    let color
    function whatColor() {

        if (formData.priority >= 2) {
            color = "red"
        } else if (formData.priority >= 1) {
            color = "orange"
        } else {
            color = "green"
        }
    }
    whatColor()
    function complete() {
        setCompletedValue("yes")
        CompletedTask({ title, description, dueDate, priority, id })
    }
    function handleGiveBack() {
        setCompletedValue("no")
        removeFromCompletedTask(id)
        //removeFromCompletedFullProject(subTasksLocal)
    }
    //console.log({ title, description, dueDate, priority, id,completedValue})
    function determine() {
        if (pressedEdit) {
            return (
                <div id="item">
                    <div className='add-form'>
                        <label htmlFor="title" >Title</label>
                        <input onChange={handleChange} value={formData.title} required type="text" name="title" id="title" />
                        <label htmlFor="description">Description</label>
                        <input onChange={handleChange} value={formData.description} required type="text" name="description" id="description" />
                        <label htmlFor="dueDate">Due Date</label>
                        <input onChange={handleChange} value={formData.dueDate} required type="date" name="dueDate" id="dueDate" />
                        <div className="priority-conatiner">
                            <div className='priority'>Priority</div>
                            <div className="priority-toggle" onClick={increasePriority}>
                                <div id="one" style={{ opacity: "1", color: color }}>-||-</div>
                                <div id="two" style={formData.priority > 0 ? { opacity: "1", color: color } : { opacity: "0" }}>-||-</div>
                                <div id="three" style={formData.priority > 1 ? { opacity: "1", color: color } : { opacity: "0" }} >-||-</div>
                            </div>
                        </div>
                        <button className="deleteBtn"onClick={deleteLocal}>Delete</button>
                        <button onClick={saveChanges}>Save changes</button>
                    </div>
                </div>
            )
        }
        else {

            return (

                <div id="item">
                    <div className="add-form">
                        <label htmlFor="title" >Title</label>
                        <input disabled onChange={handleChange} value={formData.title} required type="text" name="title" id="title" />
                        <label htmlFor="description">Description</label>
                        <input disabled onChange={handleChange} value={formData.description} required type="text" name="description" id="description" />
                        <label  htmlFor="dueDate">Due Date</label>
                        <input disabled onChange={handleChange} value={formData.dueDate} required type="date" name="dueDate" id="dueDate" />
                        <div className="priority-conatiner">
                            <div className='priority'>Priority</div>
                    <div className="priority-toggle">
                        <div id="three" style={formData.priority > 1 ? { opacity: "1", color: color } : { opacity: "0" }} >-||-</div>
                        <div id="two" style={formData.priority > 0 ? { opacity: "1", color: color } : { opacity: "0" }}>-||-</div>
                        <div id="one" style={{ opacity: "1", color: color }}>-||-</div>
                    </div>
                    </div>
                    <button  className="deleteBtn" onClick={deleteLocal}>Delete</button>
                    <button  className="editBtn" onClick={editLocal}>Edit</button>
                    {completedValue !== "yes" ? <button onClick={complete}>Completed</button> : <button onClick={handleGiveBack}>Give Back</button>}
                    </div>
                </div>
            )
        }
    }
    return (
        <>
            {determine()}
        </>

    )
}