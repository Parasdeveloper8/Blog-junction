import { useState } from "react"

const CreatePage = () =>{
    const [isHovered,setHovered] = useState(false);
    //CSS styling 
    const divStyle:React.CSSProperties = {
              border:"2px solid black",
              width:"80vw",
              borderRadius:"5px",
              display:"flex",
              flexDirection:"column",
              height:"50vh",
              fontSize:"25px",
              fontStyle:"italic"
    }
    const buttonStyle:React.CSSProperties = {
        marginLeft:"20px",
        fontStyle:"italic",
        marginTop:"5px",
        border:"2px solid black",
        borderRadius:"5px",
        backgroundColor:isHovered ? "black" : "white",
        color:isHovered ? "white" : "black"
    }
    return (
           <div style={{height:"100vh",width:"100%",backgroundColor:"white"}}>
           <h1 className="text-center" style={{color:"silver"}}>Create Post</h1>
           <div>
            <form>
                 <label htmlFor="f" className="text-center" style={{color:"white"}}>Select File</label>
                 <textarea id="f" style={divStyle} className="mx-auto"></textarea>
                <button style={buttonStyle} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>Create</button>
            </form>
           </div>
           </div>
    )
}
export default CreatePage