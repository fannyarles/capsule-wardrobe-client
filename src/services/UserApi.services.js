import axios from "axios";

const api = axios.create({
    // make sure you use PORT = 5005 (the port where our server is running)
    baseURL: process.env.REACT_APP_API_URL
    // withCredentials: true // => you might need this option if using cookies and sessions
});

const storedToken = localStorage.getItem('authToken');

const getTop5Items = () => {

    return api.get(`/dressing/items/top5`, { headers: { "Authorization": `Bearer ${storedToken}` } })
        .then(response => response.data)
        .catch(err => console.error(err))
}

const getTop5Cats = () => {

    return api.get(`/outfits/cat/top5`, { headers: { "Authorization": `Bearer ${storedToken}` } })
        .then(response => response.data)
        .catch(err => console.error(err))
}

// const uploadPhoto = (uploadData) => {
//     return api.post("/api/upload", uploadData)
//                 .then(response => response.data)
//                 .catch(err => console.error(err))
// }

// const editUser = ({username, campus, course, image }) => {
//     return api.put("/api/users", {username, campus, course, image})
// }

const userMethods = {
    getTop5Items,
    getTop5Cats
    // uploadPhoto,
    // editUser
}

export default userMethods;