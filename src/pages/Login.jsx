import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from '../context/auth.context';

function Login() {

    const navigate = useNavigate();

    const { storeToken, authenticateUser } = useContext(AuthContext);

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const [ errorMessage, setErrorMessage ] = useState(null);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post(`${ process.env.REACT_APP_API_URL }/auth/login`, { username, password })
            .then(response => {
                storeToken(response.data.authToken);
                authenticateUser();
                navigate('/');
            })
            .catch(err => setErrorMessage(err.response.data.message));       
    }

    return <>
        { errorMessage && <p>{ errorMessage }</p> }
        <form onSubmit={ handleSubmit } className="inline-flex flex-col">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" value={ username } onChange={ e => setUsername(e.target.value) } />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={ password } onChange={ e => setPassword(e.target.value) } />

            <input type="submit" value="Login" className='btn btn-primary' />
        </form>
    </>

}

export default Login;