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

export const addClient = createAsyncThunk(
    "slice/addClient",
    async(_, thunkApi) => {
        const clientInfos = thunkApi.getState().ClientCrud.clientInfos;
        console.log(clientInfos);
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/client/SOLEVO/Add`, {
            clientInfos
        })
        console.log(response);
        return response.data;
    }
)

export const clientSlice = createSlice({
  name: "slice",
  initialState: {
    value: 0,
    clientList: [],
    clientInfos: {},
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    fillClientInfos: (state, action) => {
        const { field, value } = action.payload;
        state.clientInfos[field] = value;
    }
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
      })
      .addCase(addClient.pending, (state) => {
        console.log("pending");
        state.status = "pending"
      })
      .addCase(addClient.fulfilled, (state, action) => {
        console.log("succeeded");
        state.status = "succeeded";
      })
      .addCase(addClient.rejected, (state, action) => {
        console.log(action.payload);
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { fillClientInfos } = clientSlice.actions;

export default clientSlice.reducer;
