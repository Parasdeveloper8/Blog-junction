import { useEffect, useState} from "react"
import Blank from "../blankComponent";
import { useParams ,useNavigate} from "react-router-dom";
import axios, { AxiosResponse } from 'axios';
const ResetPassPage = () =>{
    const { email } = useParams();

    const navigate = useNavigate();

    const [password,setPassword] = useState("");
    const [isSubmitting,setSubmitting] = useState(false);
    const [isErr,setErr] = useState("");

    interface ApiResponse {
        success:boolean;
        info:string;
      }

     useEffect(()=>{
                  document.title = "Reset Password Page";
               },[]);

    const handleSubmit = async(e: React.FormEvent) =>{
        try{
           e.preventDefault();
           setSubmitting(true);
           // send to backend
          const response: AxiosResponse<ApiResponse> = await axios.patch(`http://localhost:8000/api/resetPass/${email}/${password}`);
          if(response.data.success){
             setErr("");
             setSubmitting(false);
             navigate('/login'); // Redirect to the login page
          }
        }catch(error){
            console.log(error);
            setErr("Failed to change Password");
           
        }finally{
            setSubmitting(false);
        }
    }
      return (
        <>
        <h1 className="text-center">Reset Password</h1>
         <form onSubmit={handleSubmit}>
    <div className="mb-3 mx-auto" style={{width:"60vw"}}>
    <label htmlFor="pass" className="form-label">Create New Password</label>
    <input type="password" className="form-control" id="pass" name="n-password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
    
    {isErr ? <p style={{color:"red"}}>{isErr}</p> : <Blank/>}
    <br/>
    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Replace password</button>
    </div>
    </form>
        </>
      )
}
export default ResetPassPage