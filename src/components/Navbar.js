import React from "react";
import { Link , useLocation, useNavigate } from "react-router-dom";

const Navbar = (props) => {
	let location = useLocation();
	let navigate = useNavigate();
	const logoutHandler=()=>{
		localStorage.removeItem('token')
		props.showAlert("Logged Out!!", "danger")
	}
	
	return (
		<nav className="navbar navbar-dark navbar-expand-md bg-dark sticky-top">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">
					iNotes
				</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
					<span className="navbar-toggler-icon" />
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link className={`nav-link ${location.pathname==="/" ? "active" : ""}`} aria-current="page" to="/">
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link className={`nav-link ${location.pathname==="/about" ? "active" : ""}`} to="/about">
								About
							</Link>
						</li>
						<li className="nav-item dropdown">
							<Link
								className="nav-link dropdown-toggle"
								to="/"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								Dropdown
							</Link>
							<ul className="dropdown-menu bg-dark">
								<li className="nav-item">
									<Link className="nav-link" to="/">
										Action
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link " to="/">
										Another action
									</Link>
								</li>
								<li >
									<hr className="dropdown-divider" />
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/">
										Something else here
									</Link>
								</li>
							</ul>
						</li>
						
					</ul>
					{!localStorage.getItem('token') ?  <form>
					<Link className="btn btn-secondary mx-2" role="button" to={"/login"}>Login</Link>
					<Link className="btn btn-secondary" role="button" to={"/signup"}>Signup</Link></form> : 
					<Link className="btn btn-secondary" role="button" onClick={logoutHandler} to={"/login"} >Logout</Link>

					
						}
					
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
