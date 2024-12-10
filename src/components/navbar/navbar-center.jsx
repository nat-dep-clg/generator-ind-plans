
const NavbarCenter = ({children}) => {
    return (
        <div className='navbar-center hidden lg:flex'>
            <ul className='menu menu-horizontal'>
                {children}
            </ul>
        </div>
    );
};

export default NavbarCenter;
