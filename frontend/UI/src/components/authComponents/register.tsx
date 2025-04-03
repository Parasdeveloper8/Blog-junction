const Register = () =>{
     return (
        <>
          <form>
    <div className="mb-3">
    <label htmlFor="exampleInputName" className="form-label">Your Name</label>
    <input type="text" className="form-control" id="exampleInputName"/>
    </div>

    <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>

    <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Set Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1"/>
    </div>

    <button type="submit" className="btn btn-primary">Register</button>
           </form>
        </>
     )
}
export default Register