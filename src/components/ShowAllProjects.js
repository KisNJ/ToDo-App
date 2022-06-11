import React from 'react'
import SubCard from './SubCard'

export default function ShowAllProjects({ projects,openProject,c }) {
    const[sorted,setSorted]=React.useState(false)
    const[tempProjects,setTempProjects]=React.useState([])
    function sort(){
        setSorted(old=>!old)
        if(!sorted){
            setTempProjects([...projects])
            setTempProjects(old=>old.sort((a,b)=>b.priority-a.priority))
        }else{
            setTempProjects([])
        }
    }
    function determine() {
        if (projects.length > 0) {
            return (

                <div>
                    <button onClick={sort}>Sort By Priority</button>
                    
                    
                    {c==="yes"?tempProjects.length>0?tempProjects.map(x=><SubCard openProject={openProject} project={x} />):projects.map(x=><SubCard openProject={openProject} project={x} />):tempProjects.length>0?tempProjects.map(x => x.completed!=="yes"?<SubCard openProject={openProject} project={x} />:""):projects.map(x => x.completed!=="yes"?<SubCard openProject={openProject} project={x} />:"")}
                </div>
            )
        }
        else {
            return <div>You have no projects!</div>
        }
    }
    return (
        <>
            {determine()}
        </>

    )
}