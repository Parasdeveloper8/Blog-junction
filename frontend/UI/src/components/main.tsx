import axios, { AxiosResponse} from 'axios';
import { useEffect, useState } from 'react'
import "../assets/CSS/main.css"

import Loader from './loader';
const Main = () =>{
    interface ApiResponse {
        email:string;
        id: number;
        text: string;
        created_at: string;
        updated_at: string;
        name:string;
        title:string;
     }

     const [data,setData] = useState<null | ApiResponse []>(null);

     useEffect(()=>{
        async function fetch(){
        const response:AxiosResponse<{info : ApiResponse[] }| null>
         = 
         await axios.get('http://localhost:8000/api/posts'
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
        <div>
        {data ? 
         data.map((dt) => {
            return(
            <div className="card mx-auto mt-2 divCard" >
               <div className="card-body" key={dt.id}>
                  <div style={{display:"flex",borderBottom:"1px solid black",justifyContent:"space-between"}}>
                 <p style={{fontSize:"25px"}}>{dt.name}</p>
                 <p className='card-text' style={{paddingLeft:"1rem"}}>{dt.created_at.split('T')[0]}</p>
                 </div>
                 <p className='text-center' 
                 style={{fontSize:"20px",fontStyle:"italic",textDecoration:"underline black"}}
                 >{dt.title}</p>
                 <p className="card-text">{dt.text}</p>
               </div>
            </div>
            );
         }) : <Loader/>
      }
        </div>
        </>
    )
}
export default Main