import {useSelector} from "react-redux";
import CuratorContent from "./curator/curator-content.jsx";


const Content = () => {
    const user = useSelector((state) => state.userState.user);

    if (user.role === 'curator') return <CuratorContent  />;

    return null;
};

export default Content;
