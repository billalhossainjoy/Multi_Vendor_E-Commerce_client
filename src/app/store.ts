import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./features/auth/auth.slice.ts";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import userSlice from "./features/user/user.slice.ts";

const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice
    }
})

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = (selector) => useSelector(selector)

export default store;