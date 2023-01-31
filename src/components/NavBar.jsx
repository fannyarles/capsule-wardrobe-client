import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function NavBar() {

    const { isLoggedIn, logoutUser } = useContext(AuthContext);
    // console.log(isLoggedIn)

    return (
        <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between px-4 py-4">
                <NavLink to="/" className="d-flex align-items-center col-md-3 mb-md-0 text-dark text-decoration-none">Home</NavLink>

                <ul className="nav col-12 col-md-auto justify-content-center mb-md-0">
                    <li onClick={() => document.getElementById('banner').scrollIntoView()}><NavLink to='#banner' className="nav-link px-5 link-dark">Home</NavLink></li>
                    <li onClick={() => document.getElementById('about').scrollIntoView()}><NavLink to='#about' className="nav-link px-5 link-dark">About MinFit</NavLink></li>
                    <li onClick={() => document.getElementById('features').scrollIntoView()}><NavLink to='#features' className="nav-link px-5 link-dark">Features</NavLink></li>
                    <li onClick={() => document.getElementById('pricing').scrollIntoView()}><NavLink to='#pricing' className="nav-link px-5 link-dark">Pricing</NavLink></li>
                    <li onClick={() => document.getElementById('faq').scrollIntoView()}><NavLink to='#faq' className="nav-link px-5 link-dark">FAQ</NavLink></li>
                </ul>

                <div className="col-md-3 text-end">
                    <NavLink to='/login' className="btn btn-outline-primary me-3">Login</NavLink>
                    <NavLink to='/signup' className="btn btn-primary">Signup</NavLink>
                </div>
            </header>
        </div>
    )
}

export default NavBar;