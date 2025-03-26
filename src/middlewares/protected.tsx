import {useAppSelector} from "../app/store.ts";
import {Loader} from "../components/common/loader.tsx";
import {Navigate, useLocation} from "react-router-dom";
import React from "react";
import {startsWithAny} from "../utils";

type Props = {
    children: React.ReactNode;
};

function Protected({children}: Props) {
    const {isLoading, user} = useAppSelector(state => state.user);
    const {isAuthenticated} = useAppSelector(state => state.auth);
    const {pathname} = useLocation()

    if(isLoading) {
        return <Loader />
    }

    if(pathname.startsWith("/auth") ){
        if(isAuthenticated){
            if(pathname.startsWith("/auth/verify")){
                if(user?.verified) {
                    return <Navigate to={"/store"} />
                }

            }
            if(startsWithAny(pathname,["/auth/login", "/auth/register", "/auth/forgotten"])) {
                console.log('execute')
                return <Navigate to={"/store"} />;
            }
        }
        if(!isAuthenticated) {
            if(startsWithAny(pathname,["/auth/verify"])) {
                return <Navigate to={"/store"} />;
            }
        }
    }

    if(pathname.startsWith("/admin") ){
        if(!isAuthenticated) {
            return <Navigate to={"/auth/login"} />;
        }
    }

    if(pathname.startsWith("/customer") ){
        if(!isAuthenticated) {
            return <Navigate to={"/auth/login"} />;
        }
    }
    if(pathname.startsWith("/vendor") ){
        if(!isAuthenticated) {
            return <Navigate to={"/auth/login"} />;
        }
    }


    return (
        <>
            {children}
        </>
    );
};

export default Protected;