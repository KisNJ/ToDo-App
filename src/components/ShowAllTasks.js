import React from 'react'
import SubCard from './SubCard'
import baby_owl from "../svg/baby_owl.webp"
export default function ShowAllTasks({ tasks,openTask,c }) {
    const[sorted,setSorted]=React.useState(false)
    const[tempTasks,setTempTasks]=React.useState([])
    const [isEveryCompleted,setIsEveryCompleted]=React.useState(false)
    function sort(){
        setSorted(old=>!old)
        if(!sorted){
            setTempTasks([...tasks])
            setTempTasks(old=>old.sort((a,b)=>b.priority-a.priority))
        }else{
            setTempTasks([])
        }
    }
    React.useEffect(()=>{
        let notCompleted=tasks.filter(x=>x.completed!=="yes")
        if(notCompleted.length>0){
            setIsEveryCompleted(false)
        }else{
            setIsEveryCompleted(true)
        }
    },tasks)
    function determine() {
        if(c==="yes"){
            if (tasks.length > 0) {
                return (
                    <div className='all-container'>
                        <button style={{marginBottom:"20px",marginLeft:"40px",marginTop:"20px"}}onClick={sort}>Sort By Priority</button>
                        <div className="card-container">{c==="yes"?tempTasks.length>0?tempTasks.map(x => <SubCard openTask={openTask} openProject={""} task={x} />):tasks.map(x => <SubCard openTask={openTask} openProject={""} task={x} />):tempTasks.length>0?tempTasks.map(x => x.completed!=="yes"?<SubCard openTask={openTask} openProject={""} task={x} />:""):tasks.map(x => x.completed!=="yes"?<SubCard openTask={openTask} openProject={""} task={x} />:"")}</div>
                        
                    </div>
                )
            }
            else {
                return <div className='no-container-text'><div className='no'>You have no tasks completed!</div></div>
            }
        }
        else{
        if (tasks.length > 0&&!isEveryCompleted) {
            return (
                <div className='all-container'>
                    <button style={{marginBottom:"20px",marginLeft:"40px",marginTop:"20px"}}onClick={sort}>Sort By Priority</button>
                    <div className="card-container">{c==="yes"?tempTasks.length>0?tempTasks.map(x => <SubCard openTask={openTask} openProject={""} task={x} />):tasks.map(x => <SubCard openTask={openTask} openProject={""} task={x} />):tempTasks.length>0?tempTasks.map(x => x.completed!=="yes"?<SubCard openTask={openTask} openProject={""} task={x} />:""):tasks.map(x => x.completed!=="yes"?<SubCard openTask={openTask} openProject={""} task={x} />:"")}</div>
                    
                </div>
            )
        }
        else {
            return <div className='no-container'><div className='no'>You have no tasks!</div><img className='owl'src={baby_owl} alt="baby_owl" /></div>
        }}
    }
    return (
        <>
            {determine()}
        </>

    )
}