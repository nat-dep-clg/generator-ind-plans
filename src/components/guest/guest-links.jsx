import {SlLogin} from "react-icons/sl";
import {Link} from "react-router-dom";

const GuestLinks = () => {
    return (
        <div className='flex gap-x-6 justify-center items-center'>
            <Link to='/login' className='link link-hover text-xs sm:text-sm'>
                <SlLogin size={45} className="textarea-info p-1 mr-2" />
            </Link>
        </div>
    );
};

export default GuestLinks;
