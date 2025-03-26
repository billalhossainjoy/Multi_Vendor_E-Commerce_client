import {ActionReducerMapBuilder, AsyncThunk, Draft, PayloadAction} from "@reduxjs/toolkit";

export const thunkBuilder = <State, ThunkArgs, Returned> (
    builder: ActionReducerMapBuilder<State>,
    thunk: AsyncThunk<Returned, ThunkArgs, any>,
    handler:  [
        (state : Draft<State>) => void,
        (state : Draft<State>, action : PayloadAction<Returned>) => void,
        (state: Draft<State>, action: PayloadAction<any>) => void,
    ]
) => {
    builder.addCase(thunk.pending,(state)=>  handler[0](state))
    builder.addCase(thunk.fulfilled, (state, action)=>  handler[1](state, action))
    builder.addCase(thunk.rejected, (state, action)=>  handler[2](state, action))
}