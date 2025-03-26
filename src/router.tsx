import {Navigate, Route, Routes} from "react-router-dom";
import StoreLayout from "./layouts/store.layout.tsx";
import HomePage from "./pages/store/home.tsx";
import AdminLayout from "./layouts/admin.layout.tsx";
import CustomerLayout from "./layouts/customer.layout.tsx";
import AuthLayout from "./layouts/auth.layaout.tsx";
import LoginPage from "./pages/auth/login.tsx";
import SignUpPage from "./pages/auth/signup.tsx";
import VendorLayout from "./layouts/vendor.layout.tsx";
import Protected from "./middlewares/protected.tsx";
import VerifyPage from "./pages/auth/verify.tsx";
import ForgottenPasswordPage from "./pages/auth/forgotten-password.tsx";


export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to={"/store"} replace />} />

            <Route path="/store" element={<Protected><StoreLayout /></Protected>}>
                <Route index element={<HomePage />}/>
            </Route>

            <Route path="/admin" element={<Protected><AdminLayout /></Protected>}>
                <Route index element={<Navigate to={"/admin"} replace />} />

            </Route >

            <Route path="/customer" element={<Protected><CustomerLayout /></Protected>}>
                <Route index element={<Navigate to={"/customer"} replace />} />

            </Route >

            <Route path="/auth"  element={<Protected><AuthLayout /></Protected>}>
                <Route index element={<Navigate to={"/auth/login"} replace />} />

                <Route path={"login"} index element={<LoginPage />}/>
                <Route path={"signup"} element={<SignUpPage />} />
                <Route path={"forgotten/new"} element={<ForgottenPasswordPage />} />
                <Route path={"forgotten/token/:token"} element={<ForgottenPasswordPage />} />

                <Route path={"verify/:token"} element={<VerifyPage />} />
            </Route >

            <Route path="/vendor" element={<><VendorLayout /></>}>
                <Route index element={<Navigate to={"/vendor"} replace />} />

            </Route >

        </Routes>
    );
};