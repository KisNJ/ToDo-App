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
    return (<div id="item">
        <div className="title">Add Item</div>
        <form action="set" onSubmit={e => { handleSubmit(e) }}>
            <label htmlFor="title" >Title</label>
            <input onChange={handleChange} value={formData.title} required type="text" name="title" id="title" />
            <label htmlFor="description">Description</label>
            <input onChange={handleChange} value={formData.description} required type="text" name="description" id="description" />
            <label htmlFor="dueDate">Due Date</label>
            <input onChange={handleChange} value={formData.dueDate} required type="date" name="dueDate" id="dueDate" />
            <div>Priority</div>
            <div>pri</div>
            <button>submit</button>
        </form>
    </div>
    )
}