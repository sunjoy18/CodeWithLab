import React, { useState } from 'react';
import '../css/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

    const [isSignUpActive, setSignUpActive] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const history = useNavigate();

    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [scredentials, setCredentials1] = useState({ sname: "", semail: "", spassword: "", smob: "", sprof: "" });

    const handleSignUpClick = () => {
        setSignUpActive(true);
    };

    const handleSignInClick = () => {
        setSignUpActive(false);
    };

    const showAlert = (message, type) => {
        window.alert(`${type.toUpperCase()}: ${message}`);
    };

    const doSignIn = async (e) => {
        e.preventDefault();
        const { email, password } = credentials;
        if (email === "" || password === "") {
            return showAlert("All fields are required", 'ALERT')
        }
        const response = await fetch("http://localhost:5000/logn/login", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        });

        const json = await response.json();

        if (json.message === 'success') {
            localStorage.setItem("token", json.token);
            history("/");
            // showAlert("Logged in Successfully", "success");
        } else if (json.message === 'verification') {
            showAlert("Verification Pending.", "Warning");
        } else if (json.message === 'registeration') {
            showAlert("Register yourself first.", "Warning");
        } else if (json.message === 'password') {
            showAlert("Incorrect Password.", "Warning");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const doSignUp = async (e) => {
        e.preventDefault();
        const { susername, semail, spassword, smobileNumber, sprofession } = scredentials;

        if (susername === "" || spassword === "" || smobileNumber === "" || semail === "" || sprofession === "") {
            return showAlert("All fields are required", 'ALERT')
        }
        const response = await axios.post("http://localhost:5000/logn/register", {
            susername,
            semail,
            spassword,
            smobileNumber,
            sprofession,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = response.data;
        console.log("json: ", json)
        if (json.success) {
            localStorage.setItem("token", json.authToken);
            history("/");
            showAlert("Account Created Successfully", "success");
        } else {
            // Handle specific error messages
            if (json.message === 'email') {
                showAlert("Invalid email format.", "Warning");
            } else if (json.message === 'mobile') {
                showAlert("Mobile number must be exactly 10 digits.", "Warning");
            } else if (json.message === 'password') {
                showAlert("Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number. It should be at least 8 characters long.", "Warning");
            } else if (json.message === 'exist') {
                showAlert("Email is already registered.", "Warning")
            } else if (json.message === 'verify') {
                showAlert("Registration successful. Please check your email for verification.", "Success")
            } else if (json.message === 'verified') {
                localStorage.setItem("token", json.tkn);
                showAlert("You have been verified.", "success")
            }
        }
    };


    const sonChange = (e) => {
        setCredentials1({ ...scredentials, [e.target.name]: e.target.value });
    };

    return (
        <div className='LoginPage'>
            <div className={`container ${isSignUpActive ? 'right-panel-active' : ''}`} id="container">
                <div className="form-container sign-up-container">
                    <form className='LoginForm' action="/">
                        <h4 className='LoginH4'>Create Account</h4>
                        {/* <div className="social-container">
                            <Link to="/" className="social"><i className="fab fa-google-plus-g"></i></Link>
                            <Link to="/" className="social"><i className="fab fa-github"></i></Link>
                        </div> */}
                        {/* <span className='LoginSpan'>or use your email for registration</span> */}
                        <input className='LoginInput' type="text" placeholder="Name" name='susername' onChange={sonChange} />
                        <input className='LoginInput' type="email" placeholder="Email" name='semail' onChange={sonChange} />
                        <input className='LoginInput' type="phone" placeholder="Mobile" name='smobileNumber' onChange={sonChange} />
                        <input className='LoginInput' type="text" placeholder="Profession" name='sprofession' onChange={sonChange} />
                        <input className='LoginInput' placeholder="Password" name='spassword' onChange={sonChange} />
                        <button className='LoginButton' onClick={doSignUp}> Sign Up</button>
                    </form>
                </div>

                <div className="form-container sign-in-container">
                    <form className='LoginForm' action="/">
                        <h4 className='LoginH4'>Log Back</h4>
                        {/* <div className="social-container">
                            <Link to="/" className="social"><i className="fab fa-google-plus-g"></i></Link>
                            <Link to="/" className="social"><i className="fab fa-github"></i></Link>
                        </div> */}
                        {/* <span className='LoginSpan'>or use your account</span> */}
                        <input className='LoginInput' type="email" placeholder="Email" name='email' onChange={onChange} value={credentials.email} />
                        <input className='LoginInput' type={showPassword ? 'text' : 'password'} placeholder="Password" name='password' onChange={onChange} value={credentials.password} />
                        <span className='eye' onClick={() => setShowPassword(!showPassword)}>👁️</span>
                        <Link to="/forgot-password">Forgot your password?</Link>
                        <Link to="/reset-password">Reset Password</Link>
                        <button className='LoginButton' onClick={doSignIn}>Sign In</button>
                    </form>
                </div>


                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p className='LoginP'>Login to get connected!</p>
                            <button className="ghost" id="signIn" onClick={handleSignInClick}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p className='LoginP'>Start journey with us!</p>
                            <button className="ghost" id="signUp" onClick={handleSignUpClick}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
