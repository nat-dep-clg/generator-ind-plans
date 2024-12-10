import WrapperNavbar from "./wrappers/wrapper-navbar.jsx";
import {toggleTheme} from "../store/slices/userSlice.js";
import NavbarEnd from "./navbar/navbar-end.jsx";
import {useDispatch} from "react-redux";
import NavbarCenter from "./navbar/navbar-center.jsx";
import NavLinks from "./NavLinks.jsx";
import NavbarStart from "./navbar/navbar-start.jsx";

const Navbar = () => {
    const dispatch = useDispatch();

    const handleTheme = () => {
        dispatch(toggleTheme());
    };
    return (
        <WrapperNavbar>
            <NavbarStart>
                <NavLinks/>
            </NavbarStart>
            <NavbarCenter>
                <NavLinks />
            </NavbarCenter>
            <NavbarEnd func={handleTheme} />
        </WrapperNavbar>
    );
};

export default Navbar;
