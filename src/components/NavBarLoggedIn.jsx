import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import defaultAvatar from './../assets/avatar-default.jpg';
import logo from './../assets/logo_C.png'

function NavBar() {

    const { isLoggedIn, user, logoutUser } = useContext(AuthContext);

    const showMenu = e => {
        if (e.currentTarget.parentNode.classList.contains('open')) {
            e.currentTarget.parentNode.classList.toggle('open');
        } else {
            e.currentTarget.parentNode.classList.toggle('open');
        }
    }

    return (<>
        <div id="sidebar">
            <div className="sidebar-mobile flex-shrink-0 p-5 d-flex flex-column justify-content-between" onClick={(e) => { showMenu(e) }}>
                <div className="row">
                    <div className="col col-12">
                        <h1 className="mobile-menu-icon"><i class="bi bi-list"></i></h1>
                    </div>
                </div>
            </div>
            <div className="sidebar-desktop flex-shrink-0 p-5 d-flex flex-column justify-content-between">
                <div className="row">
                    <div className="col col-12">
                        <h2><Link to="/dressing" className="nav-item d-flex align-items-center pb-3 mb-5 link-dark text-decoration-none"><img src={logo} alt="logo" width="70%" height="auto" /></Link></h2>
                        <Link to="/" className="nav-item d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none">Dashboard</Link>
                        <Link to="/dressing" className="nav-item d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none">My Dressing</Link>
                        <Link to="/dressing/item/add" className="nav-item d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none">Add Clothing Items</Link>
                        <Link to="/outfits/random" className="nav-item d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none">Random Outfit</Link>
                        <Link to="/outfits/saved" className="nav-item d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none">Saved Outfits</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col col-12 d-flex flex-column justify-content-end">
                        <Link to="/account" className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none">
                            <div className="navbar-avatar me-3"
                                style={{
                                    backgroundImage: `url("${user.avatarUrl ? user.avatarUrl : defaultAvatar}")`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center center"
                                }}>
                            </div>
                            My Account
                        </Link>
                        <Link to="/subscribe" className="d-flex align-items-center py-2 px-3 mb-3 link-dark text-decoration-none personal-shopper">Personal Shopper</Link>
                        <Link to="/" className="d-flex align-items-center link-dark text-decoration-none" onClick={() => logoutUser()}>Logout</Link>
                    </div>

                </div>
            </div>
        </div>
    </>)
}

export default NavBar;