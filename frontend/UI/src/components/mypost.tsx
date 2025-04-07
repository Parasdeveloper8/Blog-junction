import axios, { AxiosResponse} from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const Mypost = () =>{
   interface ApiResponse {
      id: number;
      text: string;
      created_at: string;
      updated_at: string;
   }
     const [data,setData] = useState<null | ApiResponse []>(null);

     useEffect(()=>{
      async function fetch(){
      const response:AxiosResponse<{info : ApiResponse[] }| null>
       = 
       await axios.get(`http://localhost:8000/api/myposts/${localStorage.getItem('email')}`
         ,{
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`
             }
         }
      );
      if(response.data)
      setData(response.data.info);
      }
      fetch();
     },[]);
     return (
        <>
        <Link to="/" style={{paddingLeft:"5px"}}>Home</Link>
        <h1 className="text-center">Your Posts</h1>
        {data ? 
         data.map((dt) => {
            return(
            <div className="card mx-auto mt-2" style={{width: "36rem"}}>
               <div className="card-body" key={dt.id}>
                 <h5 className="card-title">You</h5>
                 <p className="card-text">{dt.text}</p>
                 <form><button>Delete</button></form>
               </div>
            </div>
            );
         }) : <p>Nothing to show</p>
      }
        </>
     )
}
export default Mypost