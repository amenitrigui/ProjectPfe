import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUtilisateur = createAsyncThunk(
  "utilisateurSlice/loginUtilisateur",
  async (infosConnexion, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/utilisateurs/loginUtilisateur`, {
          nom: infosConnexion.nom,
          motpasse: infosConnexion.motpasse 
        }
      )

      console.log(response);
    }catch(error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      )
    }
  }
)

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
      })
      
      .addCase(loginUtilisateur.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(loginUtilisateur.fulfilled, (state, action) => {
        // state.token = action.payload.token;
        state.status = "succès";
      })
      .addCase(loginUtilisateur.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "échec";
      })
  },
});

export const { setDbName, setToken, setCodeUser, setListeUtilisateur } =
  utilisateurSlice.actions;
export default utilisateurSlice.reducer;
