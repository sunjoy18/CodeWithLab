import React from 'react'
import '../css/NavBar.css'
import Logo from '../Logo.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const withouSidebarRoutes = ["/compiler", "/html"];

const NavBar = () => {
    const { pathname } = useLocation();
    let location = useLocation();
    let history = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        history("/login");
        //  props.showAlert("Logged Out Successfully", "success");
    }

    if (withouSidebarRoutes.some((item) => pathname.includes(item))) return null;

    return (
        <div>
            <section id="header">
                <div className="navbar-title">
                    <img src={Logo} alt='CWL Logo' style={{ height: "1.8rem", width: "1.8rem" }} />
                    <h3>
                        <Link className="title-first-name" to="/">CodeWithLab</Link>
                    </h3>
                </div>
                <div>
                    <ul className="navbar-menu">
                        {/* <li><Link className="active" to="/compiler">&lt;Service&gt;</Link></li> */}
                        {location.pathname === '/feature' ? (
                            <li><Link className="" style={{ color: '#64f4ac', fontSize: '15px' }} to="/feature">Features</Link></li>

                        ) : (
                            <li><Link className="" to="/feature">Features</Link></li>
                        )
                        }
                        {location.pathname === '/aboutus' ? (
                            <li><Link className="" style={{ color: '#64f4ac', fontSize: '15px' }} to="/aboutus">AboutUS</Link></li>
                        ) : (
                            <li><Link className="" to="/aboutus">AboutUS</Link></li>
                        )
                        }
                        {location.pathname === '/contact' ? (
                            <li><Link className="" style={{ color: '#64f4ac', fontSize: '15px' }} to="/contact">Contacts</Link></li>
                        ) : (
                            <li><Link className="" to="/contact">Contacts</Link></li>
                        )
                        }
                    </ul>
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
                        <li>
                            {!localStorage.getItem("token") ? <form className="d-flex" role="search">
                                {location.pathname === '/login' ?
                                    console.log("Welcome")
                                    :
                                    <Link to='/login'><button className='NavLoginBtn'>Login</button></Link>
                                }
                            </form> : <button className='NavLoginBtn' onClick={handleLogout}>Log Out</button>}
                        </li>
                    </ul>
                </div>
            </section >
        </div >
    )
}

export default NavBar
