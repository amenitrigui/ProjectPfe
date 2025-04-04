import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUtilisateurCourantInfos = createAsyncThunk(
  "utilisateurSlice/getUtilisateurCourantInfos",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/utilisateurs/getUtilisateurParCode`,
      {
        params: {
          codeuser: thunkAPI.getState().UtilisateurInfo.codeuser,
        },
      }
    );
    return response.data.utilisateur[0]
  }
);

export const utilisateurSlice = createSlice({
  name: "utilisateurSlice",
  initialState: {
    dbName: "",
    token: "",
    codeuser: "",
    status: "",
    erreur: "",
    infosUtilisateur: {
      codeuser: "",
      nom: ""
    }
  },
  reducers: {
    setDbName: (state, action) => {
      state.dbName = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setCodeUser: (state, action) => {
      state.codeuser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUtilisateurCourantInfos.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getUtilisateurCourantInfos.fulfilled, (state, action) => {
        state.status = "réussi";
        state.infosUtilisateur = action.payload;
      })
      .addCase(getUtilisateurCourantInfos.rejected, (state, action) => {
        state.status = "échoué";
        state.erreur = action.erreur;
      });
  },
});

export const { setDbName, setToken, setCodeUser } = utilisateurSlice.actions;
export default utilisateurSlice.reducer;
