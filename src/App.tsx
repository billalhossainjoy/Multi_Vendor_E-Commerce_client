import {BrowserRouter} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import {useEffect} from "react";
import {useAppDispatch} from "./app/store.ts";
import {authUser} from "./app/features/user/user.slice.ts";
import {Router} from "./router.tsx";

const App: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(authUser())
    }, [dispatch])

  return (
    <BrowserRouter>
        <Router />
        <div><Toaster /></div>
    </BrowserRouter>
  );
};
export default App;

