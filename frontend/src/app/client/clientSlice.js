import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchClientList = createAsyncThunk('client/fetchClientList', async() => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/client/SOLEVO/List`);
    return response.data.result;
})

// Step 2: Create the slice
export const clientSlice = createSlice({
    name: "clientSlice",
    initialState: {
        clientList: [], 
        loading: false,
        error: null,

        clientInfos: {
            code: "",
            rsoc: "",
            adresse: "",
            cp: "",
            email: "",
            telephone: "",
            desrep: "",
        }
    },
    reducers: {
        setClientList: (state, action) => {
            state.clientList = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        fillClientInfos: (state, action) => {
            const { field, value } = action.payload;
            state.clientInfos[field] = value;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchClientList.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchClientList.fulfilled, (state, action) => {
            state.loading = false;
            state.clientList = action.payload;
        })
        .addCase(fetchClientList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
});

export const { setClientList, setLoading, setError, fillClientInfos } = clientSlice.actions;
export default clientSlice.reducer;