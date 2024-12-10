const WrapperHeader = ({ children }) => {
    return (
        <header
            className='bg-neutral py-2 text-neutral-content'>
            <div className='align-element flex justify-center sm:justify-end'>
                {children}
            </div>
        </header>
);
};

export default WrapperHeader;
