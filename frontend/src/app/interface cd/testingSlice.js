import { createSlice } from "@reduxjs/toolkit";

export const testingSlice = createSlice({
    name: "test",
    initialState: {
        testValue: 0
    },
    reducers: {
        increment: (state) =>{
            state.testValue += 1;
        },
        decrement: (state) => {
            state.testValue -= 1;
        },
        incrementByAmount: (state, action) => {
            state.testValue += action.payload
        }
    }
})

export const { increment, decrement } = testingSlice.actions;
export default testingSlice.reducer;