import {Outlet, useNavigation} from "react-router-dom";
import Header from "../components/Header.jsx";
import Navbar from "../components/Navbar.jsx";

const Layout = () => {
    const navigation = useNavigation();
    const isPageLoading = navigation.state === 'loading';
    return (
        <>
            <Header />
            <Navbar />
            {isPageLoading ? (
                <>Loading </>
            ) : (
                <section className='align-element py-2'>
                    <Outlet />
                </section>
            )}
        </>
    );
};

export default Layout;
