import {Outlet} from "react-router-dom";


function AdminLayout() {
    return (
        <div>
            admin layout
            <Outlet />
        </div>
    );
};

export default AdminLayout;