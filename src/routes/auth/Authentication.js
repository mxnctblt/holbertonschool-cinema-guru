import {useState} from 'react';
import axios from 'axios';
import './auth.css';
import Login from './Login';
import Register from './Register';

const Authentication = ({setIsLoggedIn, setUserUsername}) => {
    const [_switch, set_switch] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const postData = async (endpoint, username, password) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/api/auth/${endpoint}`,
                {
                    username,
                    password,
                },
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.status === 200) {
                localStorage.setItem('accessToken', response.data.accessToken);
                setUserUsername(username);
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (_switch) {
            await postData('login', username, password);
        } else {
            await postData('register', username, password);
        }
    };
    return (
        <form className="authentication" onSubmit={handleSubmit}>
            <div className="switch-buttons">
                <div
                    className={_switch ? 'selected' : 'unselected'}
                    onClick={() => set_switch(true)}
                >
                    <span>Sign In</span>
                </div>
                <div
                    className={_switch ? 'unselected' : 'selected'}
                    onClick={() => set_switch(false)}
                >
                    <span>Sign Up</span>
                </div>
            </div>
            <div className="content">
                {_switch ? (
                    <Login
                        username={username}
                        password={password}
                        setUsername={setUsername}
                        setPassword={setPassword}
                    />
                ) : (
                    <Register
                        username={username}
                        password={password}
                        setUsername={setUsername}
                        setPassword={setPassword}
                    />
                )}
            </div>
        </form>
    );
};

export default Authentication;
