import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getListeSousfamillesParCodeSousfamille = createAsyncThunk(
  'sousfamilleSlice/getListeSousfamillesParCodeSousfamille',
  async(_,thunkAPI) => {

  }
)

export const sousfamilleSlice = createSlice({
  name: "sousfamilleSlice",
  initialState: {
    listeSousfamille: [],
  },
  reducers: {
    
  },

  extraReducers: (builder) => {
    builder
    .addCase(getListeSousfamillesParCodeSousfamille.pending, (state, action) => {
      state.status="chagement"
    })
    .addCase(getListeSousfamillesParCodeSousfamille.fulfilled, (state, action) => {
      state.status="succès"
      state.listeSousfamille = action.payload;
    })
    .addCase(getListeSousfamillesParCodeSousfamille.rejected, (state, action) => {
      state.status="échec"
    })
  },
});
export const {
  
} = sousfamilleSlice.actions;

export default sousfamilleSlice.reducer;
