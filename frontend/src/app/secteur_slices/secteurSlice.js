import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getListeSousFamillesParCodeSousFamille = createAsyncThunk(
  "sousfamilleSlice/getListeSousFamillesParCodeSousFamille",
  async (codeSousFamille, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/sousfamille/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
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
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getListeSousFamillesParLibelleSousFamille/${LibelleSousFamille}`
    );
    console.log(response);
    return response.data.LibellesousFamilles;
  }
);
//* thunk pour ajouter un sous famille
export const ajouterSecteur = createAsyncThunk(
  "secteurSlice/ajouterSecteur",
  async (_, thunkAPI) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/secteur/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/ajouterSecteur`,
      {
        secteurInfo: thunkAPI.getState().secteurSlice.secteurInfo,
      }
    );
    console.log(response);
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
  },

  //   extraReducers: (builder) => {
  //     builder

  //   },
});
export const { setListeSecteur, setSecteurInfos } = secteurSlice.actions;

export default secteurSlice.reducer;
