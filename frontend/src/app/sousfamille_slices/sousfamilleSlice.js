import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getListeSousFamillesParCodeSousFamille = createAsyncThunk(
  "sousfamilleSlice/getListeSousFamillesParCodeSousFamille",
  async (codeSousFamille, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/sousfamille/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/getListeSousFamillesParCodeSousFamille/${codeSousFamille}`
    );
    console.log(response);
    return response.data.sousFamilles;
  }
);
// * thunk pour récuperer la liste de sous  familles par libelle
export const getListeSousFamillesParLibelleSousFamille = createAsyncThunk(
  "sousfamilleSlice/getListeSousFamillesParLibelleSousFamille",
  async (LibelleSousFamille, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/sousfamille/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/getListeSousFamillesParLibelleSousFamille/${LibelleSousFamille}`
    );
    console.log(response);
    return response.data.LibellesousFamilles;
  }
);

export const sousfamilleSlice = createSlice({
  name: "sousfamilleSlice",
  initialState: {
    listeSousfamille: [],
  },
  reducers: {
    setListeSousfamille: (state, action) => {
      state.listeSousfamille = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(
        getListeSousFamillesParCodeSousFamille.pending,
        (state, action) => {
          state.status = "chagement";
        }
      )
      .addCase(
        getListeSousFamillesParCodeSousFamille.fulfilled,
        (state, action) => {
          state.status = "succès";
          state.listeSousfamille = action.payload;
        }
      )
      .addCase(
        getListeSousFamillesParCodeSousFamille.rejected,
        (state, action) => {
          state.status = "échec";
        }
      )
      .addCase(
        getListeSousFamillesParLibelleSousFamille.pending,
        (state, action) => {
          state.status = "chagement";
        }
      )
      .addCase(
        getListeSousFamillesParLibelleSousFamille.fulfilled,
        (state, action) => {
          state.status = "succès";
          state.listeSousfamille = action.payload;
        }
      )
      .addCase(
        getListeSousFamillesParLibelleSousFamille.rejected,
        (state, action) => {
          state.status = "échec";
        }
      );
  },
});
export const {setListeSousfamille} = sousfamilleSlice.actions;

export default sousfamilleSlice.reducer;
