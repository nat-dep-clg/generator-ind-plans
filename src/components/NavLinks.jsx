import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";


const NavLinks = () => {
    const {links, role} = useSelector((state) => state.userState.user);
    const navlinks = role === 'guest'? [{id: 0, url: 'demo', text: 'Demo'}]:[...links]
    return (
        <>
            {navlinks.map((link) => {
                const { id, url, text } = link;
                return (
                    <li key={id}>
                        <NavLink className='capitalize' to={url}>
                            {text}
                        </NavLink>
                    </li>
                );
            })}
        </>
    );
};

export default NavLinks;
