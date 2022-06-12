import React from "react"

export default function Add(props) {
    const [formData, setFormData] = React.useState({
        title: "",
        description: "",
        dueDate: "",
        priority: 0
    })
    function handleChange(event) {
        const { id, value } = event.target
        setFormData((old) => ({ ...old, [id]: value }))
    }
    function handleSubmit(e) {
        e.preventDefault();
        props.handleChange(formData)
        setFormData({
            title: "",
            description: "",
            dueDate: "",
            priority: 0
        })
    }
    function increasePriority() {
        setFormData(old => ({ ...old, priority: old.priority > 1 ? 0 : old.priority + 1 }))
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
    return (<div id="item">
        <div className="title">Add Item</div>
        <form className="add-form"action="set" onSubmit={e => { handleSubmit(e) }}>
            
            <label htmlFor="title" >Title:</label>
            <input onChange={handleChange} value={formData.title} required type="text" name="title" id="title" />
            
            <label htmlFor="description">Description:</label>
            <input onChange={handleChange} value={formData.description} required type="text" name="description" id="description" />
            
           
           <label htmlFor="dueDate">Due Date:</label>
            <input onChange={handleChange} value={formData.dueDate} required type="date" name="dueDate" id="dueDate" />
           
            
            <div className="priority-conatiner">
                <div className="priority">Priority:</div>
                <div className="priority-toggle" onClick={increasePriority}>
                    <div id="one" style={{ opacity: "1", color: color }}>-||-</div>
                    <div id="two" style={formData.priority > 0 ? { opacity: "1", color: color } : { opacity: "0" }}>-||-</div>
                    <div id="three" style={formData.priority > 1 ? { opacity: "1", color: color } : { opacity: "0" }} >-||-</div>


                </div>
            </div>
            <button>Submit</button>
        </form>
    </div>
    )
}