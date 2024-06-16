import './auth.css';
import Input from '../../components/general/Input';
import Button from '../../components/general/Button';
import {faKey, faUser} from '@fortawesome/free-solid-svg-icons';
import {useEffect} from 'react';

const Login = ({username, password, setUsername, setPassword}) => {
    return (
        <div className="login">
            <h1>Sign in with your account</h1>
            <Input
                label="Username"
                icon={faUser}
                type="text"
                value={username}
                setValue={setUsername}
                className={'light'}
            />
            <Input
                label="Password"
                icon={faKey}
                type="password"
                value={password}
                setValue={setPassword}
                className={'light'}
            />
            <Button label="Sign In" icon={faKey}/>
        </div>
    );
};

export default Login;
