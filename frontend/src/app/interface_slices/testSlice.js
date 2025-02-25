import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk pour récupérer la liste des clients
export const getListeClient = createAsyncThunk(
  // thunk hiya haja tibta 3ibrt async
  "slice/getListeClient",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/client/SOLEVO/List`
    );

    return response.data.result;
  }
);

export const testSlice = createSlice({
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
      .addCase(getListeClient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getListeClient.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.clientList = action.payload;
      })
      .addCase(getListeClient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { increment, decrement } = testSlice.actions;

export default testSlice.reducer;
