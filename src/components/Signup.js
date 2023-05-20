import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  let navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    //API Call
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.cpassword })
    });
    const json = await response.json()  //token is received as respnse
    if (json.success) { //if success==true
      //Save the auth token and redirect to home
      localStorage.setItem('token', json.authtoken)
      navigate("/")
      props.showAlert("Signed Up Successfully!!", "success")
    }
    else{
      props.showAlert(json.error, "danger")
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className="container">
      <form onSubmit={submitHandler}>

        <div className="row">
          <div className="col-sm-6 offset-sm-3">
            <div className="card">
              <div className="card-header">Signup</div>
              <div className="card-body">
                <div>
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={onChange} placeholder="Enter your name" />
                  <div className="valid-feedback">Looks good!</div>
                  <div className="invalid-feedback">Please choose a username.</div>
                </div>
                <div className="mt-2">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} placeholder="Enter Your Email" />
                  <div className="valid-feedback">Looks good!</div>
                  <div className="invalid-feedback">Please choose a username.</div>
                </div>
                <div className="mt-2">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} placeholder="Enter Your Password" />
                  </div>
                <div className="mt-2">
                  <label htmlFor="cpassword" className="form-label">Confirm Password  <span className={credentials.password === credentials.cpassword?'invisible':'visible text-danger'} >*Passwords didn't match!</span></label>
                  <input type="password" className="form-control" id="cpassword" name='cpassword' value={credentials.cpassword} onChange={onChange} placeholder="Confirm Your Password" minLength={5} required />
                </div>
                <button disabled={credentials.password !== credentials.cpassword} type="submit" className="btn btn-primary w-100 mt-3">
                  Signup
                </button>
                <p className="text-center mt-3">
                  Already Have Account? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>

      </form>

    </div>
  )
}

export default Signup