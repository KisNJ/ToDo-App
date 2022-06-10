import React from 'react'
export default function SubForm(props) {
    let data;
    if (props.basicData) {
        data={
            title: props.basicData.title,
            description: props.basicData.description,
            dueDate: props.basicData.dueDate,
            priority: props.basicData.priority
        }

    }
    else {
        data={
            title: "",
            description: "",
            dueDate: "",
            priority: 0
        }
    }
    
    const [formData, setFormData] = React.useState(data)


    const [display, setDisplay] = React.useState(true)
    /* const [re,setRe]=React.useState(true) */
    function handleChange(event) {
        const { id, value } = event.target
        setFormData((old) => ({ ...old, [id]: value }))
        props.change(props.id, formData, "not")
        /* setRe(old=>!old) */
    }
    React.useEffect(() => {
        props.change(props.id, formData, "not")
    }, [formData])
    function deleteSubTask(e) {
        e.preventDefault();
        setFormData({
            title: "",
            description: "",
            dueDate: "",
            priority: 0
        })
        //let id=e.target.id
        setDisplay(false)
        props.change(props.id, formData, "deleted")
    }
    let whatToDisplay;
    if (display) {
        whatToDisplay = <div id={props.id}>
            {props.id}
            <label htmlFor="title" >Title</label>
            <input onChange={handleChange} value={formData.title} type="text" name="title" id="title" />
            <label htmlFor="description">Description</label>
            <input onChange={handleChange} value={formData.description} type="text" name="description" id="description" />
            <label htmlFor="dueDate">Due Date</label>
            <input onChange={handleChange} value={formData.dueDate} type="date" name="dueDate" id="dueDate" />
            <button id={props.id} onClick={deleteSubTask}>Delete Sub Task</button>
        </div>
    }
    else {
        whatToDisplay = <></>
    }
    return (
        <div>
            {whatToDisplay}
        </div>


    )
}