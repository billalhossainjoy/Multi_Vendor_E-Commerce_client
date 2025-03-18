import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AuthService} from "./auth.service.ts";
import {AxiosError} from "axios";
import {thunkBuilder} from "../../../utils/thunkBuilder.ts";
import {TLoginSchema} from "../../../schema/auth.schema.ts";
import {setUser} from "../user/user.slice.ts";

interface Auth {
    isAuthenticated: boolean;
    isLoading: boolean;
}

const initialState: Auth = {
    isAuthenticated: false,
    isLoading: false,
}

export const loginUser = createAsyncThunk("/auth/login", async (data: TLoginSchema, thunk) => {
    try {
        const response = await AuthService.login<{data: User}>(data)
        thunk.dispatch(setUser(response.data))
        return thunk.fulfillWithValue(response);
    } catch (error: unknown) {
        if (error instanceof AxiosError) return thunk.rejectWithValue(error.message)
        return thunk.rejectWithValue("Failed to login.")
    }
})

export const signupUser = createAsyncThunk("/auth/register", async (formData: FormData, thunk) => {
    try {
        const response = AuthService.register<{data: User}>(formData)
        return thunk.fulfillWithValue(response);
    } catch (error: unknown) {
        if (error instanceof AxiosError) return thunk.rejectWithValue(error.message)
        return thunk.rejectWithValue("Failed to register your account.")
    }
})

export const logoutUser = createAsyncThunk("/auth/logout", async (_, thunk) => {
    try {
        const response = AuthService.logout()
        return thunk.fulfillWithValue(response);
    } catch (error: unknown) {
        if (error instanceof AxiosError) return thunk.rejectWithValue(error.message)
        return thunk.rejectWithValue("Failed to logout.")
    }
})
export const userRefreshToken = createAsyncThunk("/auth/refresh-token", async (_, thunk) => {
    try {
        const response = AuthService.refreshToken()
        return thunk.fulfillWithValue(response);
    } catch (error: unknown) {
        if (error instanceof AxiosError) return thunk.rejectWithValue(error.message)
        return thunk.rejectWithValue("Failed to generate refresh token.")
    }
})


const authSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        authenticate: (state, action) => ({...state, isAuthenticated: action.payload})
    },
    extraReducers: (builder) => {

        thunkBuilder(builder, loginUser, [
            (state) => {
                state.isLoading = true
            },
            (state, action) => {
                state.isLoading = false
                state.isAuthenticated = true
                setUser(action.payload)
            },
            (state) => {
                state.isLoading = false
                state.isAuthenticated = false
            },
        ])

        thunkBuilder(builder, signupUser, [
            state => {
                state.isLoading = true
            },
            (state, action) => {
                state.isLoading = false
                state.isAuthenticated = true
                setUser(action.payload)
            },
            (state) => {
                state.isLoading = false
                state.isAuthenticated = false
            }
        ])

        thunkBuilder(builder, logoutUser, [
            state => {
                state.isLoading = true
            },
            (state) => {
                state.isLoading = false
                state.isAuthenticated = false
            },
            (state) => {
                state.isLoading = false
            }
        ])

        thunkBuilder(builder, userRefreshToken, [
            state => {
                state.isLoading = true
            },
            (state) => {
                state.isLoading = false
            },
            (state) => {
                state.isLoading = false
            }
        ])


    }
})

export default authSlice.reducer;

export const {authenticate} = authSlice.actions