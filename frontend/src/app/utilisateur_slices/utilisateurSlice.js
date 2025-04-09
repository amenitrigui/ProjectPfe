import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUtilisateurParCode = createAsyncThunk(
  "utilisateurSlice/getUtilisateurParCode",
  async (codeuser, thunkAPI) => {
    console.log(codeuser);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/utilisateurs/getUtilisateurParCode/${codeuser}`);

      console.log(response);
      // return response.data.utilisateur;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
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
    listeUtilisateur: [],
    infosUtilisateur: {
      codeuser: "",
      nom: "",
    },
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
    setListeUtilisateur: (state, action) => {
      state.listeUtilisateur = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUtilisateurParCode.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getUtilisateurParCode.fulfilled, (state, action) => {
        state.status = "réussi";
        state.listeUtilisateur = action.payload;
        console.log(state.listeUtilisateur);
        state.infosUtilisateur = action.payload;
      })
      .addCase(getUtilisateurParCode.rejected, (state, action) => {
        state.status = "échoué";
        state.erreur = action.erreur;
      });
  },
});

export const { setDbName, setToken, setCodeUser, setListeUtilisateur } =
  utilisateurSlice.actions;
export default utilisateurSlice.reducer;
