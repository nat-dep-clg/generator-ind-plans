import React from 'react';
import {BsMoonFill, BsSunFill} from "react-icons/bs";

const NavbarEnd = ({func}) => {
    return (
        <div className='navbar-end'>
            <label className='swap swap-rotate'>
                <input type='checkbox' onChange={func}/>
                {/* sun icon*/}
                <BsSunFill className='swap-on h-4 w-4'/>
                {/* moon icon*/}
                <BsMoonFill className='swap-off h-4 w-4'/>
            </label>
        </div>
    );
};

export default NavbarEnd;
