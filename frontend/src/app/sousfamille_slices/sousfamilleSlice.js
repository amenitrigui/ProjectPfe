import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getListeSousFamillesParCodeSousFamille = createAsyncThunk(
  "sousfamilleSlice/getListeSousFamillesParCodeSousFamille",
  async (codeSousFamille, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/sousfamille/${
        thunkAPI.getState().utilisateurSlice.dbName
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
        thunkAPI.getState().utilisateurSlice.dbName
      }/getListeSousFamillesParLibelleSousFamille/${LibelleSousFamille}`
    );
    console.log(response);
    return response.data.LibellesousFamilles;
  }
);
//* thunk pour ajouter un sous famille
export const ajouterSousFamille = createAsyncThunk(
  "sousfamilleSlice/ajouterSousFamille",
  async (_, thunkAPI) => {
    console.log(thunkAPI.getState().sousfamilleSlice.SousFamilleInfos);
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/sousfamille/${
        thunkAPI.getState().utilisateurSlice.dbName
      }/ajouterSousFamille`,
      {
        SousFamilleAjoute:
          thunkAPI.getState().sousfamilleSlice.SousFamilleInfos,
      }
    );
    console.log(response);
    return response.data.SousFamilleCree;
  }
);

export const sousfamilleSlice = createSlice({
  name: "sousfamilleSlice",
  initialState: {
    listeSousfamille: [],
    SousFamilleInfos: {
      code: "",
      libelle: "",
    },
  },
  reducers: {
    setListeSousfamille: (state, action) => {
      state.listeSousfamille = action.payload;
    },
    setSousFamilleInfos: (state, action) => {
      const { colonne, valeur } = action.payload;
      state.SousFamilleInfos[colonne] = valeur;
    },
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
export const { setListeSousfamille, setSousFamilleInfos } =
  sousfamilleSlice.actions;

export default sousfamilleSlice.reducer;
