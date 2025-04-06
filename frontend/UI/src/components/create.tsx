import { useState } from "react"
import axios, { AxiosResponse } from 'axios';
import { useNavigate} from 'react-router-dom';
import Loader from "./loader.tsx";
import Blank from "./blankComponent.tsx";

const CreatePage = () =>{
    const [isHovered,setHovered] = useState(false);
    const [isSubmitting,setSubmitting] = useState(false);//Check if form is being submitted
    const [err,setErr] = useState("");  //if any error after form submission comes

    const token:string | null= localStorage.getItem('token');
    const email:string | null= localStorage.getItem('email');

    const navigate = useNavigate();

    const [formData,setFormData] = useState({
        text:''
     });
    interface ApiResponse{
        success:boolean;
        info:string;
    }

    //CSS styling 
    const divStyle:React.CSSProperties = {
              border:"2px solid black",
              width:"80vw",
              borderRadius:"5px",
              display:"flex",
              flexDirection:"column",
              height:"20vh",
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
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
          ...formData,//spread formData
          [e.target.name]: e.target.value, //get value of name attribute
        });
      };

    const handleCreation = async(e: React.FormEvent)=>{
        try{
            e.preventDefault();
            setSubmitting(true);
            // send to backend
           await axios.get('/sanctum/csrf-cookie'); // important
           const response: AxiosResponse<ApiResponse> = await axios.post("http://localhost:8000/api/save-blog",{
                "email":email,
                "text":formData.text
           },{
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          if(response.data.success){
              navigate('/'); // Redirect to the homepage
         }
        }catch(error){
            console.error(error);
          setErr("An error occured during creating post. Retry");
          setSubmitting(false);
        }
    }
    return (
        <>
           <div style={{height:"100vh",width:"100%",backgroundColor:"white"}}>
           <h1 className="text-center" style={{color:"silver"}}>Create Post</h1>
           <div>
           {isSubmitting ? <Loader/>: <Blank/>}
            <form onSubmit={handleCreation}>
                 <label htmlFor="f" className="text-center" style={{color:"white"}}>Write Something</label>
                 <input id="f" style={divStyle} className="mx-auto" value={formData.text} onChange={handleChange} name="text" required/>
                <button style={buttonStyle} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} disabled={isSubmitting}>{isSubmitting ? 'Creating..' : 'Create Post' }</button>
            </form>
              </div>
             </div>
            {err ? <p className="fs-4"><b style={{color:"red"}}>error : </b>{err}</p> : ""}
            </>
    )
}
export default CreatePage