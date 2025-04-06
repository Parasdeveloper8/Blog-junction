import { Link , useLocation ,useNavigate} from "react-router-dom";
import axios, { AxiosResponse } from 'axios';

const NavBar = () => {
  const location = useLocation();
  const lstatus = location.state?.status;
  const status =  lstatus;
  const token:string | null= localStorage.getItem('token');
 // console.log(localStorage.getItem('token'));

    //css properties
    //const styling:React.CSSProperties = { }
    interface ApiResponse {
      success:boolean;
      info:string;
    }

    const navigate = useNavigate();

  const handleLogout = async(e: React.FormEvent) =>{
    try{
      e.preventDefault();
      // send to backend
      await axios.get('/sanctum/csrf-cookie'); // important
      const response: AxiosResponse<ApiResponse> = await axios.post("http://localhost:8000/api/logout",{},{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if(response.data.success){
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        navigate('/login'); 
    }
    }catch(error){
        console.error(error);
    }
      axios.post("http://localhost:8000/api/logout")
  }
    return (
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <div>
            <Link className="navbar-brand" to="/">Blog Junction</Link>
            </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/createPage">Create Post</Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">My Post</a>
        </li>
        {status ? (
          <form className="d-flex" style={{marginRight:"5px",marginBottom:"5px"}} onSubmit={handleLogout}>
          <button className="btn btn-outline-success" type="submit">Logout</button>
          </form>) :  (
          <>
          <li className="nav-item" >
          <Link className="nav-link" to="/login">Login</Link>
          </li>
          <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li>
        </>
      )}

       </ul>
       <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search for post" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
      </div>
      </div>
      </nav>
        </>
    )
}
export default NavBar