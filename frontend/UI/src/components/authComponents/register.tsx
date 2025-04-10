import { useState ,useEffect } from "react";
import axios, { AxiosResponse } from 'axios';
import { useNavigate} from 'react-router-dom';
import Loader from "../loader.tsx";
import Blank from "../blankComponent.tsx";

const Register = () =>{
   useEffect(()=>{
          document.title = "Register";
       });
   const [isSubmitting,setSubmitting] = useState(false);//Check if form is being submitted
   const [err,setErr] = useState("");  //if any error after form submission comes
   interface ApiResponse {
      success:boolean;
      info:string;
    }
   const navigate = useNavigate();

   const [formData,setFormData] = useState({
      name:'',
      email:'',
      password:''
   });
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,//spread formData
        [e.target.name]: e.target.value, //get value of name attribute
      });
    };

   const handleSubmit = async (e: React.FormEvent) => {
      try{
      setSubmitting(true);
      e.preventDefault();
      
      // send to backend
      const response: AxiosResponse<ApiResponse> = await axios.post("http://localhost:8000/api/register",{
         "name":formData.name,
         "email":formData.email,
         "password":formData.password
      });

      if(response.data.success){
         navigate('/login'); // Redirect to the login page
      }
   }catch(error){
      console.error(error);
      setErr("An error occured during registration . Make sure you aren't registered");
      setSubmitting(false);
   }
}
     return (
        <>
        <h1 className="text-center">Register Yourself</h1>
        <div style={{width:"80vw"}} className="mx-auto mt-5">
          <form onSubmit={handleSubmit}>
    <div className="mb-3">
    <label htmlFor="exampleInputName" className="form-label">Your Name</label>
    <input type="text" className="form-control" id="exampleInputName" name="name" value={formData.name}  onChange={handleChange} required/>
    </div>
        {isSubmitting ? <Loader/>: <Blank/>}
    <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" value={formData.email}  onChange={handleChange} required/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>

    <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Set Password</label>
    <input type="password" className="form-control" name="password" id="exampleInputPassword1" value={formData.password}  onChange={handleChange} required/>
    </div>

    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? 'Registering' : 'Register' }</button>
           </form>
           </div>

      {err ? <p className="fs-4"><b style={{color:"red"}}>error : </b>{err}</p> : ""}
        </>
     )

}
export default Register