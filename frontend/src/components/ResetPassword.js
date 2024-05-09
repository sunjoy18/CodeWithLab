import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/ResetPassword.css';

const ResetPassword = () => {
    const history = useNavigate();
    const [email, setEmail] = useState('');
    const [opass, setoPass] = useState('');
    const [pass, setPass] = useState('');
    const [rpass, setrPass] = useState('');
    const [resetStatus, setResetStatus] = useState(null);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (pass !== rpass) return setResetStatus('Password Mismatch.');
    
        const remail = email;
        const oldPassword = opass;
        const newPassword = pass;
    
        // Send a request to your server to initiate the password reset process
        const response = await axios.post('http://localhost:5000/logn/resetPassword', { remail, oldPassword, newPassword });
    
        const json = response.data;
    
        if (json.message === 'success') {
            setResetStatus(`Password reset successfull.`);
            localStorage.setItem("token", json.tkn);
            history("/");
        } else if (json.message === 'find') {
            setResetStatus('No Users found');
        } else if (json.message === 'password') {
            window.alert("Warning : Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number. It should be at least 8 characters long.");
            setResetStatus('Incorrect Password Format.');
        } else if (json.message === 'incorrectOldPassword') {
            setResetStatus('Incorrect Old Password.');
        }
    };

    return (

        <div className='LoginPage'>
            <div className="reset-password-container">
                <h2>Reset Password</h2>
                <p className='resetp'>Enter your email address to reset your passwords.</p>
                <input
                    className='resetInput'
                    type="text"
                    placeholder="Enter your email"
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className='resetInput'
                    type="text"
                    placeholder="Old password"
                    name='newPass'
                    value={opass}
                    onChange={(e) => setoPass(e.target.value)}
                />
                <input
                    className='resetInput'
                    type="text"
                    placeholder="Enter new password"
                    name='newPass'
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                />
                <input
                    className='resetInput'
                    type="text"
                    placeholder="Re-enter new password"
                    name='rnewPass'
                    value={rpass}
                    onChange={(e) => setrPass(e.target.value)}
                />
                <button className='resetbtn' onClick={handleResetPassword}>Reset Password</button>
                {resetStatus && <p className="msg">⚠️{resetStatus}</p>}
            </div>
        </div>
    );
};

export default ResetPassword;
