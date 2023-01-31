import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from '../context/auth.context';

function Login() {

    const navigate = useNavigate();

    const { storeToken, authenticateUser } = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { username, password })
            .then(response => {
                storeToken(response.data.authToken);
                authenticateUser();
                navigate('/');
            })
            .catch(err => setErrorMessage(err.response.data.message));
    }

    return (
        <div id="login-page">
            <div className="row">
                <div className="col col-2 mx-auto">

                    {errorMessage && <p>{errorMessage}</p>}
                    <form onSubmit={handleSubmit}>
                        <div class="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" id="username" name="username" class="form-control" value={username} onChange={e => setUsername(e.target.value)} />
                        </div>
                        <div class="mb-5">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" id="password" class="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div class="mb-3 d-grid">
                            <input type="submit" value="Login" className="btn btn-primary" />
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );

}

export default Login;