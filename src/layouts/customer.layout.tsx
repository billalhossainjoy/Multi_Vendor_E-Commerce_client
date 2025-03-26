import {Outlet} from "react-router-dom";


function CustormerLayout() {
    return (
        <div>
            customer layout
            <Outlet />
        </div>
    );
};

export default CustormerLayout;