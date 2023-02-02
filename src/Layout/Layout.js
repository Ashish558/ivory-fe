import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className=''>
            {/* <Header /> */}

            <Outlet></Outlet>

        </div>
    );
};
export default Layout;