import axios, { AxiosResponse} from 'axios';
import { useEffect, useState } from 'react';
import Loader from './loader';
const Main = () =>{
    interface ApiResponse {
        email:string;
        id: number;
        text: string;
        created_at: string;
        updated_at: string;
        name:string;
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
            <div className="card mx-auto mt-2" style={{width: "36rem"}}>
               <div className="card-body" key={dt.id}>
                 <h5 className="card-title">{dt.name}</h5>
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