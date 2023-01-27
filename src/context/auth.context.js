import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
 
const AuthContext = createContext();

function AuthProviderWrapper(props) {

    const [ user, setUser ] = useState(null);
    const [ isUserLoading, setIsUserLoading ] = useState(true);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    const storeToken = (token) => localStorage.setItem('authToken', token);
    const removeToken = (authToken) => localStorage.removeItem('authToken');

    const authenticateUser = () => {

        const storedToken = localStorage.getItem('authToken');

        if ( storedToken ) {

            axios.get(`${ process.env.REACT_APP_API_URL }/auth/verify`, { headers: { "Authorization": `Bearer ${ storedToken }`}})
            .then(response => {
                const user = response.data;
                setUser(user);
                setIsLoggedIn(true);
                setIsUserLoading(false);
            })
            .catch(err => {
                setUser(null);
                setIsLoggedIn(false);
                setIsUserLoading(true);
            })

        } else {

            setUser(null);
            setIsLoggedIn(false);
            setIsUserLoading(true);

        }

    }

    const logoutUser = () => {
        removeToken();
        authenticateUser();
    }
  
    useEffect(() => {                                    
      authenticateUser();
     }, []);
  
    return (
      <AuthContext.Provider value={{ isLoggedIn, isUserLoading, user, storeToken, authenticateUser, logoutUser }}>
        {props.children}
      </AuthContext.Provider>
    )
}

export { AuthContext, AuthProviderWrapper };