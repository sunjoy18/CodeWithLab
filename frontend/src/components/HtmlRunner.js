import React from 'react'
import '../css/HtmlRunner.css'
import Logo from '../Logo.png'
import { Link } from 'react-router-dom'

const HtmlRunner = () => {

    let newWindow;

    function live() {
        let inBox = document.getElementById("input");
        if (newWindow) {
            newWindow.location.reload();
        } else {
            newWindow = window.open();
        }
        newWindow.document.write(inBox.value);
        newWindow.document.title = "CodeWithLab : Live"; 
        newWindow.document.close();
    }
    
    function openNewTab() {
        newWindow = window.open();
        newWindow.document.title = "CodeWithLab : Live"; 
        live();
    }
    return (
        <div>
            <section id="header">
                <div className="navbar-title">
                    <img src={Logo} alt='CWL Logo' style={{ height: "1.8rem", width: "1.8rem" }} />
                    <h3>
                        <Link className="title-first-name" to="/">CodeWithLab</Link>
                    </h3>
                    <p className="title-last-name" style={{ fontSize: '20px' }}>
                        Live HTML Runner
                    </p>
                </div>
                <div>
                    <ul className="social-media">
                        <li>
                            <i className="fa-brands fa-instagram"></i>
                            <Link to="https://www.instagram.com/codewithlab/" target="_blank" rel="noreferrer">Instagram</Link>
                        </li>
                        <li>
                            <i className="fa-brands fa-github"></i>
                            <Link to="https://github.com/codewithlab" target="_blank" rel="noreferrer">Github</Link>
                        </li>
                        <li>
                            <i className="fa-regular fa-envelope"></i>
                            <Link to="mailto:codewithlab@gmail.com">Email</Link>
                        </li>
                        <button onClick={openNewTab} className="active" style={{ fontSize: '15px', border: '1px solid black',borderRadius:'2px', background: '#64F4AC', padding: '3px', cursor: 'pointer' }} ><b>LIVE↗️</b> </button>
                    </ul>
                </div>
            </section>
            <section>
                <div>
                    <textarea id="input" onKeyUp={live} name="inputbox" rows="20" cols="206" placeholder='Write your Code here..' ></textarea>
                </div>
            </section>
        </div>
    )
}

export default HtmlRunner