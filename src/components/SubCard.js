import React from 'react'
export default function SubCard({ task, project, openProject, openTask,}) {
    
    function determine() {
        if (task) {
            function openTaskLocal() {
                openTask(task.id)
            }
            return (
                <div onClick={openTaskLocal} id="item" className='card'>
                    <div className='add-form'>
                        <div style={{ textTransform: "capitalize", fontWeight: "bold", marginBottom: "5px" }}>{task.title}</div>
                        <div style={{ marginTop: "15px", marginBottom: "15px" }}>{task.description}</div>
                        <div><span style={{ fontWeight: "bold" }}>Due date:</span> {task.dueDate}</div>
                        <div><span style={{ fontWeight: "bold" }}>Priority </span>{task.priority + 1}</div>
                    </div>
                </div>
            )
        } else {
            let minDueDate = 0
            const notAllowed = ["mainTitle", "id", "priority", "completed"]
            let subcards = []
            let temp = { ...project }
            let everyCompleted = true
            for (let key in temp) {
                if (!notAllowed.includes(key)) {
                    
                    if (temp[key].completed !== "yes") {
                        
                        everyCompleted = false
                    }
                    subcards.push(temp[key])
                    if (minDueDate === 0) {
                        let date = new Date(temp[key].dueDate)
                        let [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
                        minDueDate = new Date(year, month, day)
                    } else {
                        let date = new Date(temp[key].dueDate)
                        let [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
                        let temp2 = new Date(year, month, day)
                        if (minDueDate > temp2) {
                            minDueDate = new Date(temp[key].dueDate)
                        }
                    }
                }
            }

            if (minDueDate === 0) {
                minDueDate = new Date()
            }
            let [month, day, year] = [minDueDate.getMonth(), minDueDate.getDate(), minDueDate.getFullYear()];
            
            let displaySubTasks = subcards.map(x => (
                x.title!==""&&x.title!==undefined?
                <div id="item">
                    
                        <div >
                            {x.title}
                        </div>
                        <div>
                            {x.description}
                        </div>
                        <div>
                            {x.dueDate}
                        </div>
                        {x.completed === "yes" ?<div>completed"</div>:""}
            
                </div>:"")
            )
            function openProjectLocal(e) {
                let k = { target: { id: project.id } }
                openProject(k)
            }
            if (isNaN(year)) {
                minDueDate = new Date();
                [month, day, year] = [minDueDate.getMonth(), minDueDate.getDate(), minDueDate.getFullYear()];
            }
            
            return (

                
                <div onClick={openProjectLocal} id="item" className='card'>
                    <div className='add-form'>
                        <div style={{ textTransform: "capitalize", fontWeight: "bold", marginBottom: "5px" }}>{project.mainTitle}</div>
                        <div>
                            <span style={{ fontWeight: "bold" }}>Priority: </span>
                            {project.priority + 1}
                        </div>
                        <div>{everyCompleted ? "Everything is completed" : <div><span style={{ fontWeight: "bold" }}>Due date:</span> {year}-{month + 1}-{day}</div>}</div>
                    </div>
                    
                        {displaySubTasks}
                    
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