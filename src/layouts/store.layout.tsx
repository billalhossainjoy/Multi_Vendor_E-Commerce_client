import {Outlet} from "react-router-dom";


function StoreLayout() {
    return (
        <div>
            store layout
            <Outlet />
        </div>
    );
};

export default StoreLayout;