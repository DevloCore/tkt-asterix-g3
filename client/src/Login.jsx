import React, { useContext, useState } from 'react';
import './assets/login.css';
import axios from 'axios';
import { navigate } from './main';
import { UserContext } from './assets/contexts/UserContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser, setLoading } = useContext(UserContext);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post('login', {
            username: email,
            password: password
        }).then((response) => {
            console.log(response)
            if(response.data.error) {
                alert(response.data.error);
                return;
            }
            const user = {
                email: response.data.email,
                admin: response.data.admin,
                metier: response.data.metier
            };

            localStorage.setItem('apiToken', response.data.token);
            localStorage.setItem('user', JSON.stringify(user));

            setUser(user);

            navigate('/');
        }).catch((error) => {
            alert(error);
            console.error(error);
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <div className="form-login text-center">
            <form onSubmit={handleSubmit}>
                <h1 class="h3 mb-3 fw-normal">Se connecter</h1>

                <div class="form-floating">
                    <input required type="text" class="form-control" id="floatingInput" placeholder="name@example.com" value={email} onChange={handleEmailChange} required/>
                    <label for="floatingInput">Adresse mail</label>
                </div>
                <div class="form-floating">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="Mot de passe" value={password} onChange={handlePasswordChange} required/>
                    <label for="floatingPassword">Mot de passe</label>
                </div>

                <div class="mb-3">
                </div>
                <button class="w-100 btn btn-lg btn-primary" type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default Login;