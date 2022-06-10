import React from 'react'
export default function SubCard({ task, project,openProject,openTask }) {
    function determine() {
        if (task) {
            function openTaskLocal(){
                openTask(task.id)
            }
            return(
                <div onClick={openTaskLocal} style={{border:"1px solid black", margin:"10px", padding:"10px"}}>
                    <div>
                        <div style={{fontWeight:"bold", marginBottom:"5px"}}>{task.title}</div>
                        <div>{task.description}</div>
                        <div>Due date {task.dueDate}</div>
                        <div>Priority {task.priority+1}</div>
                    </div>
                </div>
            )
        } else {
            let minDueDate = 0
            const notAllowed = ["mainTitle", "id"]
            let subcards=[]
            let temp = { ...project }
            for (let key in temp) {
                if (!notAllowed.includes(key)) {
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
            let [month, day, year] = [minDueDate.getMonth(), minDueDate.getDate(), minDueDate.getFullYear()];
            let displaySubTasks=subcards.map(x=><div style={{paddingBottom:"10px"}}>{x.title} {x.description} {x.dueDate}</div>)
            function openProjectLocal(e){
                let k={target:{id:project.id}}
                openProject(k)
            }
            console.log(month)
            return (

               
                <div onClick={openProjectLocal} style={{border:"1px solid black", margin:"10px", padding:"10px"}}>
                    <div>
                        <div style={{fontWeight:"bold", marginBottom:"5px"}}>{project.mainTitle}</div>
                        <div>
                            Priority:
                            <div>
                                {project.priority+1}
                            </div>
                        </div>
                        <div>Due date {year}-{month+1}-{day}</div>
                    </div>
                    <div>
                        {displaySubTasks}
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