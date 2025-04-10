import axios, { AxiosResponse} from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Mypost = () =>{
   const [isHovered,setHovered] = useState(false);
   interface ApiResponse {
      id: number;
      text: string;
      created_at: string;
      updated_at: string;
   }

   interface DelResponse{
      success:boolean;
      info:string;
   }
     const [data,setData] = useState<null | ApiResponse []>(null);

     const handleDeletion = async (id:number,e: React.FormEvent) =>{
      try{
         e.preventDefault();
         const response:AxiosResponse<DelResponse> = await axios.delete(`http://localhost:8000/api/delete/${id}`,
            {
               headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
         );
         if(response.data.success){
            location.reload();
         }
      }catch(error){
         console.error("error deleting post:",error);
      }
     }
     useEffect(()=>{
      document.title = 'Your Posts';
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
                 <form onSubmit={(e)=>handleDeletion(dt.id,e)}>
                  <button type='submit' 
                  style={{
                     border:"none",backgroundColor:"inherit",color:"blue",
                  textDecoration:isHovered ? "underline wavy blue" : "underline white"}}
                  onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>Delete</button>
                  </form>
               </div>
            </div>
            );
         }) : <p>Nothing to show</p>
      }
        </>
     )
}
export default Mypost