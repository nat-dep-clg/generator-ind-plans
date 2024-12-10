import WrapperHeader from "./wrappers/wrapper-header.jsx";
import {logoutUser} from "../store/slices/userSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import UserGreeting from "./user/user-greeting.jsx";
import GuestLinks from "./guest/guest-links.jsx";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userState.user);

    const handleLogout = () => {
        navigate('/');
        dispatch(logoutUser());
    };

    return (
        <WrapperHeader>
            {user?.role !== 'guest' ? (
                <UserGreeting user={user} onLogout={handleLogout} />
            ) : (
                <GuestLinks />
            )}
        </WrapperHeader>
    );
};

export default Header;
