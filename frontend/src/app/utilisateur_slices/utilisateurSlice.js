import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";




export const utilisateurSlice = createSlice({
    name: "utilisateurSlice",
    initialState: {
        dbName: "",
        token: "",
        codeuser: "",
    },
    reducers: {
        setDbName: (state, action) => {
            state.dbName = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
        setCodeUser: (state, action) => {
            state.codeuser = action.payload;
        }
    }

})

export const { setDbName, setToken, setCodeUser } = utilisateurSlice.actions;
export default utilisateurSlice.reducer;