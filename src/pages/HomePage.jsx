import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";

function HomePage() {

    const { isUserLoading, isLoggedIn, user } = useContext(AuthContext);
    
    useEffect(() => {

    }, [isUserLoading])

    return <>
    { !isUserLoading && <p>Hello, { user.username }!</p> }
    </>
}

export default HomePage;