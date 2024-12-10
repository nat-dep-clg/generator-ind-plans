import {SlLogout} from "react-icons/sl";

const UserGreeting = ({ user, onLogout }) => {
    return (
        <div className='flex gap-x-2 sm:gap-x-8 items-center'>
            <p className='text-xs sm:text-sm'>Вітаю, {user.pip}</p>
            <button
                className='btn btn-outline'
                onClick={onLogout}>
                <SlLogout size={45} className="textarea-info p-1 mr-2"/>
            </button>
        </div>
    );
};

export default UserGreeting;
