import React, { useState } from 'react';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isRegistering) {
            // Handle registration logic here
            console.log('Registering...');
        } else {
            // Handle login logic here
            console.log('Logging in...');
        }
    };

    return (
        <div>
            <h1>Connexion</h1>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type="email" value={email} onChange={handleEmailChange} required />

                <label>Password:</label>
                <input type="password" value={password} onChange={handlePasswordChange} required />

                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default Auth;