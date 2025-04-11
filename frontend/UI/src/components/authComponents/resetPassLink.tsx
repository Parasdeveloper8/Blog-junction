import { useState ,useEffect} from "react"
import axios, { AxiosResponse } from 'axios';
import Blank from "../blankComponent";
const ResetPassLink = () =>{
    useEffect(()=>{
              document.title = "Reset Password send Mail";
           },[]);
    const [email,setEmail] = useState("");
    const [isMessage,setMessage] = useState("");
    const [isSubmitting,setSubmitting] = useState(false);
    const [isErr,setErr] = useState("");
    
    interface ApiResponse {
        success:boolean;
        info:string;
      }

    const handleSubmit = async (e: React.FormEvent) =>{
       try{
          e.preventDefault();
          setSubmitting(true);
           // send to backend
          const response: AxiosResponse<ApiResponse> = await axios.get(`http://localhost:8000/api/sendResetLink/${email}`);
          if(response.data.success){
             setMessage(response.data.info);
             setErr("");
             setSubmitting(false);
          }
        }catch(error){
        console.log(error);
        setErr("Something went wrong . Please try again .Make sure you are registered with this email");
        setMessage("");
       }finally{
        setSubmitting(false);
       }
    }
    return (
        <>
        <h1 className="text-center">Reset Password</h1>
         <form onSubmit={handleSubmit}>
    <div className="mb-3 mx-auto" style={{width:"60vw"}}>
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
    <div id="emailHelp" className="form-text">We'll Share you gmail to reset password</div>
    {isMessage ? <p style={{color:"green"}}>{isMessage}</p> : <Blank/>}
    {isErr ? <p style={{color:"red"}}>{isErr}</p> : <Blank/>}
    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Send</button>
    </div>
    </form>
        </>
    )
}
export default ResetPassLink