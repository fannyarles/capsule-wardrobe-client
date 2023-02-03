import { NavLink, useNavigate } from "react-router-dom";
import logo from './../assets/logo_C.png'

function NavBar() {

    const navigate = useNavigate();

    return (
        <header className="px-5 py-5">
            <div className="row d-flex justify-content-between align-items-center">
                {/* <div className="col col-xs-6 mobile-menu">
                    <NavLink to="/" className="d-flex justify-content-start text-dark"><i className="bi bi-list"></i></NavLink>
                </div> */}
                <div className="col col-6">
                    <NavLink to="/" className="d-flex justify-content-start"><img src={logo} alt="logo" width="auto" height="40px" /></NavLink>
                </div>
                {/* <nav className="col col-xxl-8 col-lg-6 d-flex justify-content-center desktop-menu">
                    <NavLink to='/#features' className="nav-link px-xl-5 px-lg-4 px-md-4 px-sm-4" onClick={() => document.getElementById('features').scrollIntoView()}>About</NavLink>
                    <NavLink to='#features' className="nav-link px-xl-5 px-lg-4 px-md-4 px-sm-4" onClick={() => document.getElementById('features').scrollIntoView()}>Features</NavLink>
                    <NavLink to='#pricing' className="nav-link px-xl-5 px-lg-4 px-md-4 px-sm-4" onClick={() => document.getElementById('pricing').scrollIntoView()}>Pricing</NavLink>
                    <NavLink to='#faq' className="nav-link px-xl-5 px-lg-4 px-md-4 px-sm-4" onClick={() => document.getElementById('faq').scrollIntoView()}>FAQ</NavLink>
                </nav> */}
                <div className="col col-6 d-flex justify-content-end">
                    <NavLink to='/login' className="btn btn-outline-secondary me-4">Login</NavLink>
                    <NavLink to='/signup' className="btn btn-secondary">Signup</NavLink>
                </div>
            </div>
        </header>
    )
}

export default NavBar;