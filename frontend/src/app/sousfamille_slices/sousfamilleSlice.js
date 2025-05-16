import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getListeSousFamillesParCodeSousFamille = createAsyncThunk(
  "sousfamilleSlice/getListeSousFamillesParCodeSousFamille",
  async (codeSousFamille, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/sousfamille/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getListeSousFamillesParCodeSousFamille/${codeSousFamille}`,
      {
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );
    return response.data.sousFamilles;
  }
);
// * thunk pour récuperer la liste de sous  familles par libelle
export const getListeSousFamillesParLibelleSousFamille = createAsyncThunk(
  "sousfamilleSlice/getListeSousFamillesParLibelleSousFamille",
  async (LibelleSousFamille, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/sousfamille/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getListeSousFamillesParLibelleSousFamille/${LibelleSousFamille}`,
      {
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );
    return response.data.LibellesousFamilles;
  }
);
//* thunk pour ajouter un sous famille
export const ajouterSousFamille = createAsyncThunk(
  "sousfamilleSlice/ajouterSousFamille",
  async (_, thunkAPI) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/sousfamille/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/ajouterSousFamille`,
      {
        SousFamilleAjoute:
          thunkAPI.getState().sousfamilleSlice.SousFamilleInfos,
      },
      {
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );
    return response.data.SousFamilleCree;
  }
);

const sousfamilleInfoInitiales = {
  code: "",
  libelle: "",
};
export const sousfamilleSlice = createSlice({
  name: "sousfamilleSlice",
  initialState: {
    listeSousfamille: [],
    sousfamilleInfoInitiales,
    SousFamilleInfos: {
      ...sousfamilleInfoInitiales,
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
    viderSousFamilleInfos: (state) => {
      state.SousFamilleInfos = {
        ...sousfamilleInfoInitiales
      }
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
export const { setListeSousfamille, setSousFamilleInfos, viderSousFamilleInfos } =
  sousfamilleSlice.actions;

export default sousfamilleSlice.reducer;
