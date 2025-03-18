import React from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useAppSelector} from "../../app/store.ts";

interface Props {
    children: React.ReactNode;
    authenticated?: boolean;
}

export const Auth: React.FC<Props> = ({children, authenticated = true}) => {
    const {isAuthenticated} = useAppSelector(state => state.auth)
    const {pathname} = useLocation()



    if(pathname.startsWith("/auth")) {
        if(isAuthenticated) {
            return <Navigate to={"/"} />
        }
        else {
            return <Navigate to={pathname} />
        }
    }

    if(!isAuthenticated && authenticated) {
        return <Navigate to={"/auth/login"} />
    }

    return <>{children}</>
};