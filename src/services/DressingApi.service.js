import axios from "axios";
const storedToken = localStorage.getItem('authToken');

const api = axios.create({
    // make sure you use PORT = 5005 (the port where our server is running)
    baseURL: process.env.REACT_APP_API_URL
    // withCredentials: true // => you might need this option if using cookies and sessions
});

const addItem = ({ category, brand, occasions, imageUrl, ownerId }) => {
    return api.post("/dressing/item/add", { category, brand, occasions, imageUrl, ownerId }, { headers: { "Authorization": `Bearer ${storedToken}` } })
        .then(response => response.data)
        .catch(err => console.error(err))
}

const uploadPhoto = (uploadData) => {
    return api.post("/dressing/item/uploadPic", uploadData, { headers: { "Authorization": `Bearer ${storedToken}` } })
        .then(response => response.data)
        .catch(err => console.error(err))
}

const getDressing = (ownerId) => {
    return api.get("/dressing", { ownerId }, { headers: { "Authorization": `Bearer ${storedToken}` } })
        .then(response => response.data)
        .catch(err => console.error(err))
}

const authMethods = {
    addItem,
    uploadPhoto,
    getDressing
}

export default authMethods;