import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk pour récupérer la liste des clients
export const getClientList = createAsyncThunk( // thunk hiya haja tibta 3ibrt async
  "slice/getClientList",
  async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/client/SOLEVO/List`);
      
      return response.data.result;
  }
);

export const clientSlice = createSlice({
  name: "slice",
  initialState: {
    value: 0,
    clientList: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClientList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getClientList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.clientList = action.payload;
      })
      .addCase(getClientList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { increment, decrement } = clientSlice.actions;

export default clientSlice.reducer;
