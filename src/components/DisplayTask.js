import React from 'react'
export default function DisplayTask({ title, description, dueDate, priority, id, edit, deleteT }) {
    const [pressedEdit, setPressedEdit] = React.useState(false)
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
    }, [title, description, priority, dueDate, id])
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
        edit(id, formData)
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
    function complete(){
        
    }
    function determine() {
        if (pressedEdit) {
            return (
                <div>
                    <label htmlFor="title" >Title</label>
                    <input onChange={handleChange} value={formData.title} required type="text" name="title" id="title" />
                    <label htmlFor="description">Description</label>
                    <input onChange={handleChange} value={formData.description} required type="text" name="description" id="description" />
                    <label htmlFor="dueDate">Due Date</label>
                    <input onChange={handleChange} value={formData.dueDate} required type="date" name="dueDate" id="dueDate" />
                    <div>Priority</div>
                    <div onClick={increasePriority}>
                        <div id="three" style={formData.priority > 1 ? { opacity: "1", color: color } : { opacity: "0" }} >-||-</div>
                        <div id="two" style={formData.priority > 0 ? { opacity: "1", color: color } : { opacity: "0" }}>-||-</div>
                        <div id="one" style={{ opacity: "1", color: color }}>-||-</div>
                    </div>
                    <button>Edit</button>
                    <button onClick={deleteLocal}>Delete</button>
                    <button onClick={saveChanges}>Save changes</button>
                </div>
            )
        }
        else {

            return (

                <div>
                    <div>Title:{title} description:{description} dueDate:{dueDate} priotity:{priority}</div>
                    <div>
                        <div id="three" style={formData.priority > 1 ? { opacity: "1", color: color } : { opacity: "0" }} >-||-</div>
                        <div id="two" style={formData.priority > 0 ? { opacity: "1", color: color } : { opacity: "0" }}>-||-</div>
                        <div id="one" style={{ opacity: "1", color: color }}>-||-</div>
                    </div>
                    <button onClick={deleteLocal}>Delete</button>
                    <button onClick={editLocal}>Edit</button>
                    <button onClick={complete}>Completed</button>
                </div>
            )
        }
    }
    return (
        <div>
            {determine()}
        </div>

    )
}