import { useState } from "react";
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () =>{
   interface ApiResponse {
      success:boolean;
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
      e.preventDefault();
      // send to backend
      const response: AxiosResponse<ApiResponse> = await axios.post("http://localhost:8000/api/register",{
         "name":formData.name,
         "email":formData.email,
         "password":formData.password
      });
      if(response.data.success == true){
         navigate('/'); // Redirect to the homepage
      }
    };
     return (
        <>
        <h1 className="text-center">Register Yourself</h1>
        <div style={{width:"80vw"}} className="mx-auto mt-5">
          <form onSubmit={handleSubmit}>
    <div className="mb-3">
    <label htmlFor="exampleInputName" className="form-label">Your Name</label>
    <input type="text" className="form-control" id="exampleInputName" name="name" value={formData.name}  onChange={handleChange}/>
    </div>

    <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" value={formData.email}  onChange={handleChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>

    <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Set Password</label>
    <input type="password" className="form-control" name="password" id="exampleInputPassword1" value={formData.password}  onChange={handleChange}/>
    </div>

    <button type="submit" className="btn btn-primary">Register</button>
           </form>
           </div>
        </>
     )
}
export default Register