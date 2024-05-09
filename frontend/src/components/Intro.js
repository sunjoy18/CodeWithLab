import React from 'react'
import logo from '../Logo.png'
import '../css/Intro.css'

const Intro = () => {

    return (
        <div className="main">
            <h1 className='intro'><img src={logo} width='100px' height='100px' alt='logo' /><br />Code With Lab
                <div className="roller">
                    <span id="rolltext">
                        Develop<br />
                        RUn<br />
                        Deploy<br />
                        <span id="spare-time">Switch To New World Of Coding !!</span><br />
                    </span>
                </div>
            </h1>

        </div>


    )
}

export default Intro
