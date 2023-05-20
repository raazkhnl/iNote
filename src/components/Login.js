import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Login =  (props) => {

  const [credentials, setCredentials] = useState({email:"", password:""})
  let navigate = useNavigate();
  const submitHandler= async(e)=>{
    e.preventDefault();

    //API Call
    const response = await fetch("http://localhost:5000/api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
      	},
        body: JSON.stringify({email: credentials.email, password: credentials.password})
		});
    const json = await response.json()  //token is received as respnse
    if(json.success){ //if success==true
      //Save the auth token and redirect to home
      localStorage.setItem('token', json.authToken)
      props.showAlert("Logged in!!", "success")
      navigate("/")
    }
    else{
      props.showAlert("Invalid Credentials!!", "danger")
    }
  }
  const onChange=(e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }
  return (
    <div>
      <form onSubmit={submitHandler}>
      <div className="container">
  <div className="row">
    <div className="col-sm-6 offset-sm-3">
      <div className="card">
        <div className="card-header">Login</div>
        <div className="card-body">
          <div>
            <label htmlFor="email" className="form-label">Email</label>
            <input type="text" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} placeholder="Enter Your Email" />
            </div>
          <div className="mt-2">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} placeholder="Enter Your Password" />
                     </div>
          <button type="submit"  className="btn btn-primary w-100 mt-3">
            Login
          </button>
          <p className="text-center mt-3">
            Dont Have Account? <Link to={"/signup"}>Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  </div>
  
</div>
</form>
    </div>
  )
}

export default Login