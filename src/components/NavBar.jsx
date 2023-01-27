import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function NavBar() {

    const { isLoggedIn, logoutUser } = useContext(AuthContext);
    console.log(isLoggedIn)

    return (
        <nav className="my-8">
            <Link to="/" className="mx-5">Home</Link>

            { !isLoggedIn ? 
                <>
                    <Link to="/login" className="mx-5">Login</Link>
                    <Link to="/signup" className="mx-5">Signup</Link>
                </>
            :
                <>
                    <Link to="/dressing" className="mx-5">My Dressing</Link>
                    <Link to="/dressing/add-item" className="mx-5">Add Clothing Items</Link>
                    <Link to="/random-outfit" className="mx-5">Random Outfit</Link>
                    <Link to="/" className="mx-5" onClick={ () => logoutUser() }>Logout</Link>
                </>
            }
        </nav>
    )
}

export default NavBar;