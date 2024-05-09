import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/ResetPassword.css';
import { useParams } from 'react-router-dom';

const ResetForgotPassword = () => {
  const { resetToken } = useParams();
    const history = useNavigate();
    const [pass, setPass] = useState('');
    const [rpass, setrPass] = useState('');
    const [resetStatus, setResetStatus] = useState(null);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (pass !== rpass) return setResetStatus('Password Mismatch.');
    
        const newPassword = pass;
    
        // Send a request to your server to initiate the password reset process
        const response = await axios.post('http://localhost:5000/logn/resetForgotPassword', { resetToken, newPassword });
    
        const json = response.data;
    
        if (json.message === 'success') {
            setResetStatus(`Password reset successfull.`);
            localStorage.setItem("token", resetToken);
            history("/");
        } else if (json.message === 'find') {
            setResetStatus('No Users found');
        } else if (json.message === 'password') {
            setResetStatus('Incorrect Password Format.');
        } else if (json.message === 'incorrectOldPassword') {
            setResetStatus('Incorrect Old Password.');
        }
    };

    return (

        <div className='LoginPage'>
            <div className="reset-password-container">
                <h2>Reset Password</h2>
                <p className='resetp'>Enter new password.</p>
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
                {resetStatus && <p className={resetStatus.includes('failed') ? 'error' : 'success'}>{resetStatus}</p>}
            </div>
        </div>
    );
};

export default ResetForgotPassword;
