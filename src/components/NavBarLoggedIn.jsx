import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function NavBar() {

    const { isLoggedIn, user, logoutUser } = useContext(AuthContext);

    return (
        <div className="flex-shrink-0 p-5 d-flex flex-column justify-content-between" style={{ width: "280px", height: "100vh", position: "fixed", backgroundColor: "#f1f1f1" }}>
            <div className="row">
                <div className="col col-12">
                    <h2><Link to="/dressing" className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none">LOGO</Link></h2>
                    <Link to="/" className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none">Dashboard</Link>
                    <Link to="/dressing" className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none">My Dressing</Link>
                    <Link to="/dressing/item/add" className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none">Add Clothing Items</Link>
                    <Link to="/outfits/random" className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none">Random Outfit</Link>
                    <Link to="/outfits/saved" className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none">Saved Outfits</Link>
                </div>
            </div>
            <div className="row">
                <div className="col col-12">
                    <Link to="/account" className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none">
                        <img src={user.avatarUrl} alt="avatar" className="navbar-avatar me-3" />
                        My Account
                    </Link>
                    <Link to="/subscribe" className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none">Personal Shopper</Link>
                    <Link to="/" className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none" onClick={() => logoutUser()}>Logout</Link>
                </div>

            </div>
        </div>
    )
}

export default NavBar;