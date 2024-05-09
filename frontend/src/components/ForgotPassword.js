// ForgotPassword.js

import React, { useState } from 'react';
import axios from 'axios';
import '../css/ResetPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [resetStatus, setResetStatus] = useState(null);

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        const femail = email
        // Add logic for sending a password reset email
        const response = await axios.post('http://localhost:5000/logn/forgotPassword', { femail })

        const json = response.data;

        if (json.message === 'success') {
            setResetStatus(`Password reset email sent successfully. Check your email for further instructions.`);
        } else if (json.message === 'find') {
            setResetStatus('No User Exist.');
        } else if (json.message === 'email') {
            setResetStatus('Invalid Email Format.');
        } else if(json.message === 'sent') {
            window.alert('Password reset link sent successfully')
        }
    };

    return (
        <div className='LoginPage'>
            <div className="reset-password-container">
                <h2>Forgot Password</h2>
                <p className='resetp'>Enter your email address to reset your password.</p>
                <input
                    className='resetInput'
                    type="text"
                    placeholder="Enter your email"
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button className='resetbtn' onClick={handleForgotPassword}>Reset Password</button>
                {resetStatus && <p className="msg">⚠️{resetStatus}</p>}
            </div>
        </div>
    );
};

export default ForgotPassword;
