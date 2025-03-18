import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {isAxiosError} from "axios";
import {UserService} from "./user.service.ts";
import {thunkBuilder} from "../../../utils/thunkBuilder.ts";
import {authenticate} from "../auth/auth.slice.ts";

interface InitialState {
    isLoading: boolean;
    user: User | null
}


const initialState: InitialState = {
    isLoading: true,
    user: null
}

export const authUser =  createAsyncThunk("/user/get", async (_, thunk) => {
    try {
        const response = await UserService.auth<{data: User}>()
        thunk.dispatch(setUser(response.data))
        thunk.dispatch(authenticate(true))
        return thunk.fulfillWithValue(response);
    } catch (error: unknown) {
        thunk.dispatch(authenticate(false))
        if (isAxiosError(error)) {
            return thunk.rejectWithValue(error.message)
        }
        return thunk.rejectWithValue(".")
    }
})


const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }
    },
    extraReducers: (builder) => {
        thunkBuilder(builder, authUser, [
            state => {
                state.isLoading = true;
            },(state, action) => {
                state.isLoading = false;
                state.user = action.payload.data
            },state => {
                state.isLoading = false;
                state.user = null
            },
        ])
    }
})

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
