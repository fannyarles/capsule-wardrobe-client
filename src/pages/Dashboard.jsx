import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";

function Dashboard() {

    const { isUserLoading, isLoggedIn, user } = useContext(AuthContext);

    useEffect(() => {

    }, [isUserLoading])

    return <>
        {!isUserLoading && <p>Hello, {user.username}!</p>}
    </>

}

export default Dashboard;