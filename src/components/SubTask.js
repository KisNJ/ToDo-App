import React from 'react'
export default function SubTask(props){
    
    const [formData, setFormData] = React.useState({
        id:props.id,
        title: props.data.title,
        description:  props.data.description,
        dueDate: props.data.dueDate,
        priority: 0
    })
    function handleChange(event) {
        const { id, value } = event.target
        setFormData((old) => ({ ...old, [id]: value }))
        //props.change(props.id,formData)
    }
    
    function deleteSubTask(e){
        e.preventDefault();
        props.removeSubTask(props.id)
    }
    return(
        <div id={props.id}>
        <label htmlFor="title" >Title</label>
        <input onChange={handleChange} value={formData.title} required type="text" name="title" id="title" />
        <label htmlFor="description">Description</label>
        <input onChange={handleChange} value={formData.description} required type="text" name="description" id="description" />
        <label htmlFor="dueDate">Due Date</label>
        <input onChange={handleChange}  value={formData.dueDate} required type="date" name="dueDate" id="dueDate" />
        <div>Priority</div>
        <div>pri</div>
        <button onClick={deleteSubTask}>Delete Sub Task</button>
    </div>
    )
}