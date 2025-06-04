import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getListeSousFamillesParCodeSousFamille = createAsyncThunk(
  "sousfamilleSlice/getListeSousFamillesParCodeSousFamille",
  async (codeSousFamille, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL.replace(/\/$/, '')}/api/sousfamille/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getListeSousFamillesParCodeSousFamille/${codeSousFamille}`
    );
    return response.data.sousFamilles;
  }
);
// * thunk pour récuperer la liste de sous  familles par libelle
export const getListeSousFamillesParLibelleSousFamille = createAsyncThunk(
  "sousfamilleSlice/getListeSousFamillesParLibelleSousFamille",
  async (LibelleSousFamille, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL.replace(/\/$/, '')}/api/sousfamille/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getListeSousFamillesParLibelleSousFamille/${LibelleSousFamille}`
    );
    return response.data.LibellesousFamilles;
  }
);

//* thunk pour ajouter un sous famille
export const ajouterSecteur = createAsyncThunk(
  "secteurSlice/ajouterSecteur",
  async (_, thunkAPI) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL.replace(/\/$/, '')}/api/secteur/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/ajouterSecteur`,
      {
        secteurInfo: thunkAPI.getState().secteurSlice.secteurInfo,
      },
      {
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );
    return response.data.newSecteur;
  }
);

const secteurInfoInitiales = {
  codesec: "",
  desisec: "",
};
export const secteurSlice = createSlice({
  name: "secteurSlice",
  initialState: {
    secteurInfoInitiales,
    listeSecteur: [],
    secteurInfo: {
      ...secteurInfoInitiales
    },
  },
  reducers: {
    setListeSecteur: (state, action) => {
      state.listeSecteur = action.payload;
    },
    setSecteurInfos: (state, action) => {
      const { colonne, valeur } = action.payload;
      state.secteurInfo[colonne] = valeur;
    },
    viderChampsSecteurInfos: (state, action) => {
      state.secteurInfo = {
        ...state.secteurInfoInitiales
      }
    }
  },

  //   extraReducers: (builder) => {
  //     builder

  //   },
});
export const { setListeSecteur, setSecteurInfos, viderChampsSecteurInfos } = secteurSlice.actions;

export default secteurSlice.reducer;
