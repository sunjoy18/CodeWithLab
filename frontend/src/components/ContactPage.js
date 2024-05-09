import React, {useState} from 'react'
import '../css/ContactPage.css'
import { Link } from 'react-router-dom'

const ContactPage = () => {
    const [credentials, setCredentials] = useState({ email: "", name: "", msg: "", phone: "" });

    const showAlert = (message, type) => {
        window.alert(`${type.toUpperCase()}: ${message}`);
    };

    const mail = async (e) => {
        e.preventDefault();
        const { email, name, msg, phone } = credentials;
        if (msg === "" || email === "") {
            return showAlert("Message & email is required", 'ALERT')
        }
        const response = await fetch("http://localhost:5000/logn/send-message", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email: email, name: name, message: msg, phone: phone })
        });

        const json = await response.json();

        if (json.message === 'success') {
            return 
        } else if (json.message === 'sent') {
            showAlert("Message sent successfully.","success");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <>
                <section id="footer">
                    <div className="footer-left">
                        <h2>Let's make something amazing together</h2>
                        <form action='/' method='post' encType='text/plain'>
                            <div className="email-form">

                                <h2>Start by <span>saying hi</span></h2>
                                <input type="text" name="name" id="" placeholder="Your name" onChange={onChange} value={credentials.name}/>
                                <input type="email" name="email" id="" placeholder="Email Address" onChange={onChange} value={credentials.email}/>
                                <input type='text' name='msg' id="" placeholder="Message"onChange={onChange} value={credentials.msg}/>
                                <div>
                                    <input type="number" name="phone" id="" placeholder="Phone number" onChange={onChange} value={credentials.phone}/>
                                    <button type="submit" onClick={mail}>Send</button>
                                </div>
                            </div>
                        </form>

                        <div className="footer-title">
                            <h3 className="title-first-name">
                                Code With Lab
                            </h3>
                            {/* <h3 className="title-last-name">
                    Saha
                </h3> */}
                        </div>
                    </div>
                    <div className="footer-right">
                        <div className="footer-email-intro">
                            <p>Information</p>
                            <h6>Malad, Mumbai, Maharashtra, India, Pin-400067</h6>
                            <h3>codewithlab@gmail.com</h3>
                        </div>
                        <div className="footer-nav-menu">
                            <ul className="footer-menu">
                                <li><Link className="active" to="/">&lt; Service &gt;</Link></li>
                                <li><Link className="" to="/feature">Features</Link></li>
                                <li><Link className="" to="/aboutus">About US</Link></li>
                            </ul>
                        </div>
                        <div className="social-icons">
                            <Link to="https://github.com/codewithlab" target="_blank">
                                <i className="fa-brands fa-github"></i>
                            </Link>
                            <Link to="mailto:codewithlab@gmail.com" target="_blank">
                                <i className="fa-regular fa-envelope"></i>
                            </Link>
                            <Link to="https://www.instagram.com/codewithlab/" target="_blank">
                                <i className="fa-brands fa-instagram"></i>
                            </Link>
                        </div>
                    </div>
                </section>
            </>
        </div>
    )
}

export default ContactPage
