import React from 'react'
import SubCard from './SubCard'
export default function ShowAllTasks({ tasks,openTask }) {
    const[sorted,setSorted]=React.useState(false)
    const[tempTasks,setTempTasks]=React.useState([])
    
    function sort(){
        setSorted(old=>!old)
        if(!sorted){
            setTempTasks([...tasks])
            setTempTasks(old=>old.sort((a,b)=>b.priority-a.priority))
        }else{
            setTempTasks([])
        }
    }
    function determine() {
        if (tasks.length > 0) {
            return (
                <div>
                    <button onClick={sort}>Sort By Priority</button>
                    {tempTasks.length>0?tempTasks.map(x => <SubCard openTask={openTask} openProject={""} task={x} />):tasks.map(x => <SubCard openTask={openTask} openProject={""} task={x} />)}
                </div>
            )
        }
        else {
            return <div>You have no tasks!</div>
        }
    }
    return (
        <>
            {determine()}
        </>

    )
}