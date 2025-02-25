import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Action asynchrone pour récupérer la liste des devis
export const getDevisList = createAsyncThunk(
  "slice/getDevisList",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/SOLEVO/devis`
    );
   
    return response.data.devisList; // ✅ Retourner uniquement les données utiles
  }
);
export const addDevis = createAsyncThunk(
  "slice/AddDevis"  ,
  async(_thunkAPI)=>{
    const response =await axios.post(`${process.env.REACT_APP_API_URL}/api/devis/SOLEVO/create`)
    return response
  }
)

export const devisSlice = createSlice({
  name: "devisSlice", // ✅ Correction du nom
  initialState: {
    DevisList: [],
    status: "idle", // ✅ Doit être dans initialState
    error: null, // ✅ Doit être dans initialState
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getDevisList.pending, (state) => {
        state.status = "loading";
        console.log(state.status);
      })
      .addCase(getDevisList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.DevisList = action.payload; // ✅ Action contient les données
        console.log(action);
      })
      .addCase(getDevisList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.log(action);
      });
  },
});

export default devisSlice.reducer;
