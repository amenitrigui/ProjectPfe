import { createSlice } from "@reduxjs/toolkit";

export const utilisateurSlice = createSlice({
    name: "utilisateurSlice",
    initialState: {
        dbName: "",
        token: ""
    },
    reducers: {
        setDbName: (state, action) => {
            state.dbName = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload
        }
    }
})

export const { setDbName, setToekn } = utilisateurSlice.actions;
export default utilisateurSlice.reducer;