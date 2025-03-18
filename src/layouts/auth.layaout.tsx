import {Outlet} from "react-router-dom";


function AuthLayout() {
    return (
        <div>
            auth layout
            <Outlet />
        </div>
    );
};

export default AuthLayout;