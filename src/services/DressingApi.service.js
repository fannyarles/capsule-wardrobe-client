import axios from "axios";

const api = axios.create({
  // make sure you use PORT = 5005 (the port where our server is running)
  baseURL: process.env.REACT_APP_API_URL
  // withCredentials: true // => you might need this option if using cookies and sessions
});

const addItem = ({ type, brand, occasions, imageUrl, ownerId }) => {
    return api.post("/dressing/add-item", { type, brand, occasions, imageUrl, ownerId })
                   .then(response => response.data)
                   .catch(err => console.error(err))
}

const uploadPhoto = (uploadData) => {
    return api.post("/dressing/upload", uploadData)
                .then(response => response.data)
                .catch(err => console.error(err))
}

const getDressing = (ownerId) => {
    return api.get("/dressing", { ownerId } )
                .then(response => response.data)
                .catch(err => console.error(err))

}

const authMethods = {
    addItem,
    uploadPhoto,
    getDressing
}

export default authMethods;