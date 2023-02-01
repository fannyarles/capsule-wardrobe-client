import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, { username, email, password })
            .then(response => navigate('/login'))
            .catch(err => console.log(err));
    }

    return <>
        <form onSubmit={handleSubmit} className="inline-flex flex-col">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" value={username} onChange={e => setUsername(e.target.value)} />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />

            <input type="submit" value="Signup" className="btn btn-primary" />
        </form>
    </>

}

export default Signup;