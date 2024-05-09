import React, { useState } from 'react'
import '../css/HomePage.css'
import { Link, useNavigate } from 'react-router-dom'
import '../js/HomeScript.js'
import rocket from '../data/rocket2.png'
import astro from '../data/astronaut.png'

const HomePage = () => {
    const [activeCard, setActive] = useState("design-card-1");

    const openCard = (cardName, textName) => {
        if (activeCard !== cardName) {
            setActive(cardName);
            changeText(textName);
        }
    };

    const [introText, setText] = useState("introduction-text-1");

    const changeText = (textName) => {
        if (introText !== textName) {
            setText(textName);
        }
    };

    // Profile
    const [profileCard, setProfileActive] = useState("single-profile-card-1");

    const setProfile = (profileNo, profileInfoName) => {
        if (profileCard !== profileNo) {
            setProfileActive(profileNo);
            changeInfo(profileInfoName);
        }
    };

    const [profileInfo, setProfileInfoActive] = useState("testimonial-card-1");

    const changeInfo = (profileInfoName) => {
        if (profileInfo !== profileInfoName) {
            setProfileInfoActive(profileInfoName);
        }
    };

    let history = useNavigate();

    const checkLogin = (e) => {
        e.preventDefault();
        let token = localStorage.getItem("token");
        if (token) {
            history('/playground')
        }
        else {
            history('/login')
        }
    }

    return (
        <>
            <section id="content-body">
                <div className="image">
                    <img src={rocket} alt="" />
                </div>
                <img src={astro} alt="" className="shake" />
                <div className="main">
                    <div className="picture">
                        <img src={astro} alt="" />
                    </div>
                    <div className="main__text">
                        <h1>CODE WITH LAB</h1>
                        <p>Join the future of programming with CodeWithLab - the innovative platform for collaborative coding. Experience our user-friendly interface and compatibility with popular programming languages. Access online Linux environments, with high availability and maintainability. Explore our seamless GitLab integration today!</p>
                        <button className="btn" onClick={checkLogin}>PLAYGROUND 🚀</button>
                    </div>
                </div>
            </section>
            <section id="introduction">
                <div className="cards">
                    <div className={activeCard === 'design-card-1' ? 'design-card active' : 'design-card'} onClick={() => openCard('design-card-1', 'introduction-text-1')}>
                        <div>
                            <h3>CWl Online Compiler</h3>
                            <i className="fa-solid fa-code"></i>
                        </div>
                        <p>All-in-one hub for online code editing and execution across diverse programming languages.</p>
                        {/* <Link to="/ui">20 PROJECTS</Link> */}
                    </div>
                    <div className={activeCard === 'design-card-2' ? 'design-card active' : 'design-card'} onClick={() => openCard('design-card-2', 'introduction-text-2')}>
                        <div>
                            <h3>Online Linux Access</h3>
                            <i className="fa-solid fa-terminal"></i>
                        </div>
                        <p>Seamlessly access Linux online, execute commands</p>
                        {/* <Link to="/frontend">20 PROJECTS</Link> */}
                    </div>
                    <div className={activeCard === 'design-card-3' ? 'design-card active' : 'design-card'} onClick={() => openCard('design-card-3', 'introduction-text-3')}>
                        <div>
                            <h3>Gitlab Integration</h3>
                            <i className="fa-brands fa-gitlab"></i>
                        </div>
                        <p>Manage repositories seamlessly within the coding environment.</p>
                        {/* <Link to="/backend">20 PROJECTS</Link> */}
                    </div>
                </div>
                <div className={introText === 'introduction-text-1' ? 'introduction-text active' : 'introduction-text none'}>
                    <p>Introduction</p>
                    <h2>Compiler!</h2>
                    <h4>Fostering Coding Experiences that Inspire and Simplify with CodeWithLab.</h4>
                    <p>CodeWithLab provides a user-friendly online code editor, similar to Microsoft Visual Studio Code.
                        Developers can write, edit, and execute code in multiple programming languages within the same platform.
                        The platform supports a wide range of programming languages, allowing developers to run and test code without switching between different tools or environments.</p>
                </div>
                <div className={introText === 'introduction-text-2' ? 'introduction-text active' : 'introduction-text none'}>
                    <p>Introduction</p>
                    <h2>Linux!</h2>
                    <h4> Elevating your Linux experience</h4>
                    <p>CodeWithLab offers users easy access to an online version of Linux, providing a robust and reliable environment for development.
                        Developers can execute Linux commands and perform tasks within the integrated Linux environment, with a 90% uptime guarantee, ensuring a stable and uninterrupted workflow.</p>
                </div>
                <div className={introText === 'introduction-text-3' ? 'introduction-text active' : 'introduction-text none'}>
                    <p>Introduction</p>
                    <h2>GitLab!</h2>
                    <h4>Harmonizing coding and version control </h4>
                    <p>CodeWithLab seamlessly integrates with GitLab, providing a robust version control system.
                        Developers can manage their Git repositories, including pushing and pulling code, without leaving the CodeWithLab environment.</p>
                </div>
            </section>


            <section id="testimonial">
                <div className="testimonial-title">
                    <h2>Our Developers</h2>
                </div>
                <div className={profileInfo === 'testimonial-card-1' ? 'testimonial-card active' : 'testimonial-card none'}>
                    <div className="star-rating">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <p>5.0 Rating</p>
                    </div>
                    <h4 style={{fontSize: '15px'}}>As a BScIT student, I bring a comprehensive skill set that spans various domains. In the realm of DevOps, I am proficient in utilizing tools such as Jenkins, Kubernetes, Gitlab, Git, GitHub, Ansible, AWS Cloud, and Terraform. This proficiency is complemented by a strong foundation in Mathematics. On the development front, I excel in Frontend Development with expertise in React JS, React Native, and Node JS. My database skills include MongoDB, and I am well-versed in Data Structures and Algorithms (DSA). In the programming realm, I am adept in Python, C, and C++, showcasing a quick grasping capability that enables me to adapt swiftly to new technologies and challenges.</h4>
                    <i className="fa-solid fa-quote-right"></i>
                </div>
                <div className={profileInfo === 'testimonial-card-2' ? 'testimonial-card active' : 'testimonial-card none'}>
                    <div className="star-rating">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <p>4.5 Rating</p>
                    </div>
                    <h4 style={{fontSize: '15px'}}>As a BScIT student with a strong foundation in Mathematics, I possess versatile skills in Frontend Development with expertise in JavaScript, React JS, Node JS, and React Native. Additionally, I am proficient in backend development using Django and well-versed in Data Structures and Algorithms (DSA). My programming languages proficiency includes Python, C, C++, Java, and JavaScript. Known for my quick grasping capability, I excel in adapting to new technologies and learning swiftly. Moreover, I have hands-on experience in utilizing ChatGPT for various applications, showcasing my ability to integrate advanced language models into practical scenarios.</h4>
                    <i className="fa-solid fa-quote-right"></i>
                </div>
                {/* <div className={profileInfo === 'testimonial-card-3' ? 'testimonial-card active' : 'testimonial-card none'}>
                    <div className="star-rating">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <p>4.0 Rating</p>
                    </div>
                    <h4>I highly recommend for any design or development project.
                        Having skills, experience, and passion to create stunning, functional solutions that will take
                        your business to the next level.</h4>
                    <i className="fa-solid fa-quote-right"></i>
                </div> */}
                <div className="client-profile-card">
                    <div className={profileCard === 'single-profile-card-1' ? 'single-profile-card active' : 'single-profile-card'} onClick={() => setProfile('single-profile-card-1', 'testimonial-card-1')}>
                        <img alt="" src="../assets/aniket.png" />
                        <div>
                            <h4>Aniket Yadav</h4>
                            <p>Developer & Founder, <Link to="https://www.linkedin.com/in/aniketyadav0/" target="_blank" rel="noreferrer">Contact</Link></p>
                        </div>
                    </div>
                    <div className={profileCard === 'single-profile-card-2' ? 'single-profile-card active' : 'single-profile-card'} onClick={() => setProfile('single-profile-card-2', 'testimonial-card-2')}>
                        <img alt="" src="../assets/sanjay.png" />
                        <div>
                            <h4>Sanjay Gupta</h4>
                            <p>Developer & Founder, <Link to="https://www.linkedin.com/in/sanjay-gupta-392a82223/" target="_blank" rel="noreferrer">Contact</Link></p>
                        </div>
                    </div>
                    {/* <div className={profileCard === 'single-profile-card-3' ? 'single-profile-card active' : 'single-profile-card'} onClick={() => setProfile('single-profile-card-3','testimonial-card-3')}>
                        <img alt="" src="../assets/rohit.png" />
                        <div>
                            <h4>Rohit Kumbhar</h4>
                            <p>Development Assister, <Link to="/">Wiser</Link></p>
                        </div>
                    </div> */}

                </div>
            </section>

            <section className='footer'>
                <footer className="site-footer">
                    <div>
                        <div className="rows">
                            <div className="col1">
                                <h6>CodeWithLab</h6>
                                <p className="text-justify">CodeWithLab is a collaborative online code editor designed to provide developers with a comprehensive coding environment. We aim to bridge the gap between traditional IDEs and cloud-based platforms, offering a feature-rich development experience. Explore coding in various languages, access an online Linux environment, and integrate seamlessly with GitLab for version control.</p>
                            </div>

                            <div className="col2">
                                <h6>Categories</h6>
                                <ul className="footer-links">
                                    <li>Coding</li>
                                    <li>Web Development</li>
                                    <li>Cloud Computing</li>
                                    <li>Linux</li>
                                    <li>Git</li>
                                </ul>
                            </div>

                            <div className="col3">
                                <h6>Quick Links</h6>
                                <ul className="footer-links">
                                    <li><Link to="/feature">Features</Link></li>
                                    <li><Link to="/aboutus">About Us</Link></li>
                                    <li><Link to="/contact">Contact Us</Link></li>
                                </ul>
                            </div>
                        </div>
                        <hr />
                    </div>
                    <div>
                        <div className="rows">
                            <div>
                                <p className="copyright-text">Copyright &copy; {new Date().getFullYear()} All Rights Reserved by
                                    <Link to="/"> CodeWithLab</Link>.
                                </p>
                            </div>
                            <div />
                            <div style={{ marginTop: '10px' }}>
                                <ul className="social-icons">
                                    <li><Link className="instagram" to="https://www.instagram.com/codewithlab/" target="_blank" rel="noreferrer"><i className="fa fa-instagram"></i></Link></li>
                                    <li><Link className="github" to="https://github.com/codewithlab" target="_blank" rel="noreferrer"><i className="fa fa-github"></i></Link></li>
                                    <li><Link className="email" to="mailto:codewithlab@gmail.com"><i className="fa fa-envelope"></i></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>
            </section>
        </>
    )

}

export default HomePage
