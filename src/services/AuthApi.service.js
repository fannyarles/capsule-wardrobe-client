import axios from "axios";

const api = axios.create({
    // make sure you use PORT = 5005 (the port where our server is running)
    baseURL: process.env.REACT_APP_API_URL
    // withCredentials: true // => you might need this option if using cookies and sessions
});

const signup = ({ username, email, password }) => {
    return api.post(`/auth/signup`, { username, email, password })
        .then(response => response.data)
}

const login = ({ username, password }) => {
    return api.post(`/auth/login`, { username, password })
        .then(response => response.data)
}

const verifyToken = (storedToken) => {
    return api.get("/auth/verify", { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(response => response.data)
}

// const uploadPhoto = (uploadData) => {
//     return api.post("/api/upload", uploadData)
//                 .then(response => response.data)
//                 .catch(err => console.error(err))
// }

// const editUser = ({username, campus, course, image }) => {
//     return api.put("/api/users", {username, campus, course, image})
// }

const authMethods = {
    signup,
    login,
    verifyToken,
    // uploadPhoto,
    // editUser
}

export default authMethods;