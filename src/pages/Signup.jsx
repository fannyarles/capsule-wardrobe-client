import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthApi from './../services/AuthApi.service';

function Signup() {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        AuthApi.signup({ username, email, password })
            .then(response => navigate('/login'))
            .catch(err => setErrorMessage(err.response.data.message));
    }

    return <>
        <div id="login-page">
            <div className="row mb-4">
                <div className="col col-12">
                    <h1>Signup</h1>
                </div>
            </div>

            <div className="row">
                <div className="col col-10 col-sm-7 col-md-5 col-lg-5 col-xl-5 col-xxl-5 mx-auto">

                    {errorMessage && <p>{errorMessage}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username">Username</label><br />
                            <input type="text" id="username" name="username" className="form-label text-center" value={username} onChange={e => setUsername(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email">Email</label><br />
                            <input type="email" id="email" className="form-label text-center" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password">Password</label><br />
                            <input type="password" id="password" className="form-label text-center" value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <input type="submit" value="Signup" className="btn btn-primary" />
                    </form>

                </div>
            </div>
        </div>
    </>

}

export default Signup;