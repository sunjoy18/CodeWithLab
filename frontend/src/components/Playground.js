import React from 'react'
import template from '../data/template'
import '../css/Playground.css'
import Logo from '../Logo.png'
import { Link } from 'react-router-dom'

const Playground = () => {
    const tempData = template;

    const launchfeature = (id) => {
        if (id === 1) {
            window.location.href = 'http://13.232.38.17:8443/';
            console.log(id);
        }
        else if (id === 2) {
            window.location.href = 'http://13.232.38.17:4200/';
            console.log(id);
        }
        else if (id === 3) {
            window.location.href = 'https://gitlab.codewithlab.live';
            console.log(id);
        }
    }
    return (
        <div className='mainGround'>
            <p>CWL-Compiler : </p>
            <Link to='/compiler'>
                <button className='logoBtn'>
                    <img className="logo" src={Logo} alt='plus' />
                </button>
            </Link>
            <p>Other Features : </p>
            <div className='tempContainer'>
                <Link className='temp' to='/html'>
                    <img className="tempImg" src={require('../data/html.png')} alt='HTML' />
                    <span className='tempTitle'>HTML Live</span>
                </Link>
                {
                    tempData.map((item, key) => {
                        return <Link className='temp' key={key} onClick={() => launchfeature(item.id)}>
                            <img className="tempImg" src={item.image} alt={item.name} />
                            <span className='tempTitle' >{item.name}</span>
                        </Link>
                    }
                    )
                }
            </div>

        </div>
    )
}

export default Playground