

const WrapperNavbar = ({children}) => {
    return (
        <nav className='bg-base-200'>
            <div className='navbar align-element'>
                {children}

            </div>
        </nav>
    );
};

export default WrapperNavbar;
