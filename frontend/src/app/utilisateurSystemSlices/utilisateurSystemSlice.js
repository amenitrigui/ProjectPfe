import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//* thunk pour ajouter un sous famille
export const AjouterUtilisateur = createAsyncThunk(
  "utilisateurSystemSlices/AjouterUtilisateur",
  async (_, thunkAPI) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/utilisateurSystem/AjouterUtilisateur`,
      {
        User: thunkAPI.getState().utilisateurSystemSlices
          .Utilisateur_SuperviseurInfos,
      }
    );
    return response.data.user;
  }
);

export const ModifierUtilisateur = createAsyncThunk(
  "utilisateurSystemSlices/ModifierUtilisateur",
  async (_, thunkAPI) => {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/utilisateurSystem/ModifierUtilisateur`,
      {
        MajUtilisateur:
          thunkAPI.getState().utilisateurSystemSlices
            .Utilisateur_SuperviseurInfos,
      }
    );
    return response.data.user;
  }
);
export const supprimerUtilisateur = createAsyncThunk(
  "utilisateurSystemSlices/supprimerUtilisateur",
  async (codeuser) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/utilisateurSystem/supprimerUtilisateur`,
      {
        params: { codeuser: codeuser },
      }
    );
  }
);

export const getCodeUtilisateurSuivant = createAsyncThunk(
  "utilisateurSystemSlices/getCodeUtilisateurSuivant",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/utilisateurSystem/getCodeUtilisateurSuivant`
    );
    return response;
  }
);

export const getRepresantantUtilisateur = createAsyncThunk(
  "utilisateurSystemSlice/getRepresantantUtilisateur",
  async() =>{
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/utilisateurSystem/getCodeUtilisateurSuivant`
    )
  }
)
const utilisateurSystemInfoInitiales = {
  codeuser: "",
  motpasse: "test",
  nom: "",
  email: "",
  type: "",
  directeur: "",
};
export const utilisateurSystemSlices = createSlice({
  name: "utilisateurSystemSlices",
  initialState: {
    utilisateurSystemInfoInitiales,
    Utilisateur_SuperviseurInfos: {
      ...utilisateurSystemInfoInitiales
    },
    utilisateurConnecte: {
      codeuser: "",
      nom: "",
      type: "",
    },
    dbName: "",
    token: "",
  },
  reducers: {
    setUtilisateurSupInfo: (state, action) => {
      state.Utilisateur_SuperviseurInfos = action.payload;
    },
    setUtilisateur_SuperviseurInfos: (state, action) => {
      const { colonne, valeur } = action.payload;
      state.Utilisateur_SuperviseurInfos[colonne] = valeur;
    },
    setutilisateurConnecteEntiere: (state, action) => {
      state.utilisateurConnecte = action.payload;
    },
    setutilisateurConnecte: (state, action) => {
      const { colonne, valeur } = action.payload;
      state.utilisateurConnecte[colonne] = valeur;
    },
    setViderChampsUtilisateur: (state, action) => {
      state.Utilisateur_SuperviseurInfos = {
        ...utilisateurSystemInfoInitiales
      };
    },
    setDbName: (state, action) => {
      state.dbName = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(AjouterUtilisateur.pending, (state, action) => {
        state.status = "chagement";
      })
      .addCase(AjouterUtilisateur.fulfilled, (state, action) => {
        state.status = "succès";
        state.listeSousfamille = action.payload;
      })
      .addCase(AjouterUtilisateur.rejected, (state, action) => {
        state.status = "échec";
      })
  },
});
export const {
  setUtilisateur_SuperviseurInfos,
  setutilisateurConnecte,
  setutilisateurConnecteEntiere,
  setViderChampsUtilisateur,
  setUtilisateurSupInfo,
  setDbName,
  setToken,
} = utilisateurSystemSlices.actions;

export default utilisateurSystemSlices.reducer;
