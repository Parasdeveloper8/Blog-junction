import { useState,useEffect } from "react";
import axios, { AxiosResponse } from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import Loader from "../loader.tsx";
import Blank from "../blankComponent.tsx";

const Login = () =>{
   useEffect(()=>{
          document.title = "Login";
       });
     const [isSubmitting,setSubmitting] = useState(false);//Check if form is being submitted
     const [err,setErr] = useState("");  //if any error after form submission comes

     interface ApiResponse {
        success:boolean;
        info:string;
        token:string;
        email:string;
        name:string;
      }

      const navigate = useNavigate();

      const [formData,setFormData] = useState({
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
        const response: AxiosResponse<ApiResponse> = await axios.post("http://localhost:8000/api/login",{
           "email":formData.email,
           "password":formData.password
        });
  
        if(response.data.success){
           localStorage.setItem('token', response.data.token); //set token
           localStorage.setItem('email', response.data.email); //set email
           localStorage.setItem('name', response.data.name);   //set name
           navigate('/'); // Redirect to the homepage
        }
     }catch(error){
        console.error(error);
        setErr("An error occured during Login . Make sure Password is correct");
        setSubmitting(false);
     }
  }
    return (
        <>
        <h1 className="text-center">Login</h1>
        <div className="mx-auto mt-5" style={{width:"80vw"}}>
        <form onSubmit={handleSubmit}>
    <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={formData.email} onChange={handleChange} required/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    {isSubmitting ? <Loader/>: <Blank/>}
    <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" value={formData.password} name="password" onChange={handleChange} required/>
    </div>

    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? 'Logging' : 'Login' }</button>
    </form>
    <Link to="/reset-pass-send-link-page">Reset Password</Link>
    </div>
    {err ? <p className="fs-4"><b style={{color:"red"}}>error : </b>{err}</p> : ""}
        </>
    )
}
export default Login