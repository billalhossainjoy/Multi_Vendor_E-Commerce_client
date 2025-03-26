import React from "react";
import Forgotten from "../../components/auth/forgotten.tsx";
import {useLocation} from "react-router-dom";
import ForgottenPassword from "../../components/auth/forgotten-password.tsx";

const ForgottenPasswordPage: React.FC = () => {
    const {pathname} = useLocation()
    return (
        <div>
            {
                pathname.startsWith("/auth/forgotten/new")  ? <Forgotten /> : <ForgottenPassword />
            }
        </div>
    );
}

export default ForgottenPasswordPage