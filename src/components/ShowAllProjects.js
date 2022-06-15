import React from 'react'
import SubCard from './SubCard'
import baby_owl from "../svg/baby_owl.webp"
export default function ShowAllProjects({ projects,openProject,c }) {
    const[sorted,setSorted]=React.useState(false)
    const[tempProjects,setTempProjects]=React.useState([])
    const notAllowed = ["mainTitle", "id", "priority", "completed"]
    

    function sort(){
        setSorted(old=>!old)
        

        if(!sorted){

            setTempProjects([...projects.filter(x=>x.title!=="")])
            
            setTempProjects(old=>old.sort((a,b)=>b.priority-a.priority))
        }else{
            setTempProjects([])
        }
    }
    function determine() {
        if(c==="yes"){
        if (projects.length > 0) {
            return (

                <div className='all-container'>
                    <button style={{marginBottom:"20px",marginLeft:"40px",marginTop:"20px"}} onClick={sort}>Sort By Priority</button>
                    
                     
                    <div className="card-container">{c==="yes"?tempProjects.length>0?tempProjects.map(x=><SubCard openProject={openProject} project={x} />):projects.map(x=><SubCard openProject={openProject} project={x} />):tempProjects.length>0?tempProjects.map(x => x.completed!=="yes"?<SubCard openProject={openProject} project={x} />:""):projects.map(x => x.completed!=="yes"?<SubCard openProject={openProject} project={x} />:"")}</div>
                </div>
            )
        }
        else {
            return <div className='no-container-text'><div className='no'>You have no projects completed! </div></div>
        }}else{
            if (projects.length > 0) {
                return (
    
                    <div className='all-container'>
                        <button style={{marginBottom:"20px",marginLeft:"40px",marginTop:"20px"}} onClick={sort}>Sort By Priority</button>
                        
                       
                        <div className="card-container">{c==="yes"?tempProjects.length>0?tempProjects.map(x=><SubCard openProject={openProject} project={x} />):projects.map(x=><SubCard openProject={openProject} project={x} />):tempProjects.length>0?tempProjects.map(x => x.completed!=="yes"?<SubCard openProject={openProject} project={x}/>:"" ):projects.map(x => x.completed!=="yes"?<SubCard openProject={openProject} project={x} />:"")}</div>
                    </div>
                )
            }
            else {
                return <div className='no-container'><div className='no'>You have no projects! </div><img className='owl'src={baby_owl} alt="baby_owl" /></div>
            }
        }
    }
    return (
        <>
            {determine()}
        </>

    )
}