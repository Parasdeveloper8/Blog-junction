import { useState ,useEffect } from "react"
import axios, { AxiosResponse } from 'axios';
import { useNavigate, Link} from 'react-router-dom';
import Loader from "./loader.tsx";
import Blank from "./blankComponent.tsx";
import "../assets/CSS/create.css"
const CreatePage = () =>{
  useEffect(()=>{
         document.title = "Create Post";
      });

    const [isHovered,setHovered] = useState(false);
    const [isSubmitting,setSubmitting] = useState(false);//Check if form is being submitted
    const [err,setErr] = useState("");  //if any error after form submission comes

    const token:string | null= localStorage.getItem('token');
    const email:string | null= localStorage.getItem('email');
    const name:string | null = localStorage.getItem('name');
    const navigate = useNavigate();

    const [formData,setFormData] = useState({
        text:'',
        title:''
     });
    interface ApiResponse{
        success:boolean;
        info:string;
    }
    
    //css styling
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
                "text":formData.text,
                "name":name,
                "title":formData.title
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
        <Link to="/" style={{paddingLeft:"5px"}}>Home</Link>
           <div style={{height:"100vh",width:"100%",backgroundColor:"white"}}>
           <h1 className="text-center" style={{color:"silver"}}>Create Post</h1>
           <div>
           {isSubmitting ? <Loader/>: <Blank/>}
            <form onSubmit={handleCreation}>
              <div className="div3">
            <input id="e" className="div2" value={formData.title} onChange={handleChange} name="title" placeholder="Title" required/>
            <input id="f"  className="mx-auto div1" value={formData.text} onChange={handleChange} name="text" placeholder="Write something here" required/>
              </div>
            <button style={buttonStyle} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} disabled={isSubmitting}>{isSubmitting ? 'Creating..' : 'Create Post' }</button>
            </form>
              </div>
             </div>
            {err ? <p className="fs-4"><b style={{color:"red"}}>error : </b>{err}</p> : ""}
            </>
    )
}
export default CreatePage