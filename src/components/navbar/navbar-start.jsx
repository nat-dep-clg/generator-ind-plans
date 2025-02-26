import {FaBarsStaggered} from "react-icons/fa6";
import {NavLink} from "react-router-dom";

const NavbarStart = ({children}) => {
    return (
        <div className='navbar-start'>
            <NavLink
                to='/'
                className='hidden lg:flex btn btn-primary text-3xl items-center'
            >
                ІП
            </NavLink>
            <div className='dropdown'>
                <label tabIndex={0} className='btn btn-ghost lg:hidden'>
                    <FaBarsStaggered className='h-6 w-6'/>
                </label>
                <ul
                    tabIndex={0}
                    className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52'
                >
                    {children}
                </ul>
            </div>
        </div>
    );
};

export default NavbarStart;
