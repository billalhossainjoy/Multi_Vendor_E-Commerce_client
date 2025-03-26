import {useMemo} from "react";
import {useLocation} from "react-router-dom";


const useRoutes = () => {
    const {pathname} = useLocation()


    return useMemo(() => [{
        label: "",
        href: "",
        icon: "",
        active: ""
    }],[pathname])
}

export default useRoutes;