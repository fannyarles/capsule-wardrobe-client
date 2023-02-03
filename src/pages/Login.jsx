import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import AuthApi from './../services/AuthApi.service'

function Login() {

    const navigate = useNavigate();

    const { storeToken, authenticateUser } = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username || !password) { setErrorMessage(`All fields are required!`) }

        AuthApi.login({ username, password })
            .then(response => {
                storeToken(response.authToken);
                authenticateUser();
                navigate('/dashboard');
            })
            .catch(error => setErrorMessage(error.response?.data?.message));
    }

    return (
        <div id="login-page">
            <div className="row mb-4">
                <div className="col col-12">
                    <h1>Login</h1>
                </div>
            </div>

            <div className="row">
                <div className="col col-10 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3 mx-auto">

                    {errorMessage && <p className='error-message'>{errorMessage}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label><br />
                            <input type="text" id="username" name="username" className="form-control text-center" value={username} onChange={e => setUsername(e.target.value)} />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="password" className="form-label">Password</label><br />
                            <input type="password" id="password" className="form-control text-center" value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className="mb-3 d-grid">
                            <input type="submit" value="Login" className="btn btn-primary" />
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );

}

export default Login;