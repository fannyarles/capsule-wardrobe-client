import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { toast } from "react-hot-toast";
import axios from "axios";
import Loader from "../components/Loader";
import defaultAvatar from './../assets/avatar-default.jpg';

function Account() {

    const navigate = useNavigate();

    const storedToken = localStorage.getItem('authToken');
    const { isUserLoading, user } = useContext(AuthContext);

    const [userInfos, setUserInfos] = useState(null);
    const [isUploading, setIsUploading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (userInfos.email === '') { setErrorMessage(`Please, fill all required fields.`); return; }

        axios.updateInfos(`${process.env.REACT_APP_API_URL}/account/edit/${user.id}`, userInfos, { headers: { "Authorization": `Bearer ${storedToken}` } })
            .then(response => {
                toast.success('Account updated!');
                navigate('/');
            })
            .catch(err => setErrorMessage(err.response.data.message))
    }

    const handleUpload = async (e) => {
        setIsUploading(true);

        const uploadData = new FormData();
        uploadData.append("avatar", e.target.files[0]);

        const response = await axios.post(`${process.env.REACT_APP_API_URL}/account/upload`, uploadData, { headers: { "Authorization": `Bearer ${storedToken}` } })
            .catch(err => toast.error("Error while uploading the file."));

        const fileUrl = response.data.fileUrl;

        setUserInfos({ ...userInfos, avatarUrl: fileUrl });
        setIsUploading(false);
    }


    useEffect(() => {
        if (user) {
            axios.get(`${process.env.REACT_APP_API_URL}/account/${user.id}`, { headers: { "Authorization": `Bearer ${storedToken}` } })
                .then(response => {
                    if (!response.data.avatarUrl || response.data.avatarUrl === '') response.data.avatarUrl = defaultAvatar;
                    setUserInfos(response.data)
                })
                .catch(err => setErrorMessage(err.response.data.message));
        }
    }, [user])

    return (<>
        <div className="row mb-4 text-start">
            <div className="col col-12">
                <h1>Edit Account</h1>
            </div>
        </div>

        <div className="row text-start">

            {!userInfos && <Loader />}

            {userInfos &&
                <form onSubmit={handleSubmit}>

                    <div className="row d-flex text-start justify-content-start">

                        <div className="col col-12 col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4">
                            <div style={{
                                height: "250px",
                                width: "auto",
                                backgroundImage: `url("${userInfos.avatarUrl}")`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain",
                                backgroundPosition: "top left",
                                paddingTop: "90%"
                            }}></div>
                            {/* <img src={userInfos.avatarUrl === undefined ? defaultAvatar : userInfos.avatarUrl} alt="avatar" width={"100%"} /> */}
                        </div>

                        <div className="col col-12 col-xl-9 col-lg-8 col-md-12 d-flex flex-column align-content-start justify-content-between">
                            <div>
                                <label htmlFor="email" className="mt-0 pt-0">Email<span className="required">(Required)</span></label><br />
                                <input type="email" name="email" id="email" value={userInfos.email} onChange={e => setUserInfos({ ...userInfos, email: e.target.value })} /><br /><br />

                                <label htmlFor="avatar">Profile picture</label><br />
                                <input type="file" id="avatar" name="avatar" onChange={e => handleUpload(e)} /><br /><br />
                            </div>
                            <div>
                                {errorMessage && <p>{errorMessage}</p>}
                                <button className="btn btn-primary btn-lg mt-3" type="button" disabled={isUploading} onClick={handleSubmit}>
                                    {isUploading ? <><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...</>
                                        : <>Update account</>}
                                </button>
                            </div>
                        </div>

                    </div>

                </form>
            }
        </div>

    </>);
}

export default Account;