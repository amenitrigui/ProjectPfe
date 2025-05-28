import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//* thunk pour ajouter un sous famille
export const AjouterUtilisateur = createAsyncThunk(
  "utilisateurSystemSlices/AjouterUtilisateur",
  async (_, thunkAPI) => {
    console.log(
      thunkAPI.getState().utilisateurSystemSlice.Utilisateur_SuperviseurInfos
    );
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/utilisateurSystem/AjouterUtilisateur`,
      {
        utilisateurInfo:
          thunkAPI.getState().utilisateurSystemSlice
            .Utilisateur_SuperviseurInfos,
      },
      {
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );
    return response.data.data;
  }
);

export const ModifierUtilisateur = createAsyncThunk(
  "utilisateurSystemSlices/ModifierUtilisateur",
  async (codeuser, thunkAPI) => {
    const utilisateur = thunkAPI.getState().utilisateurSlice.infosUtilisateur;
    console.log(utilisateur);
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/utilisateurSystem/ModifierUtilisateur`,
      {
        MajUtilisateur: utilisateur,
      },
      {
        params: {
          codeuser: codeuser,
        },
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );
    console.log(response);
    return response.data.user;
  }
);
export const supprimerUtilisateur = createAsyncThunk(
  "utilisateurSystemSlices/supprimerUtilisateur",
  async (codeuser, thunkAPI) => {
    console.log(codeuser);
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/utilisateurSystem/supprimerUtilisateur`,
      {
        params: { codeuser: codeuser },
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );
    console.log(response);
    return response.data.utilisateur;
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
export const getModuleParamettreParUtilisateur = createAsyncThunk(
  "utilisateurSystemSlices/getModuleParamettreParUtilisateur",
  async (paramettre, thunkApi) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/utilisateurSystem/getModuleParamettreParUtilisateur`,
      {
        params: {
          codeuser: paramettre.codeuser,
          modulepr: paramettre.modulepr,
          module: paramettre.module,
          societe: thunkApi.getState().utilisateurSystemSlice.dbName,
        },
        headers: {
          Authorization: `Bearer ${
            thunkApi.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );
    return response.data.paramettres[0];
  }
);

export const modifierModuleParamettreParUtilisateur = createAsyncThunk(
  "utilisateurSystemSlices/modifierModuleParamettreParUtilisateur",
  async (paramettre, thunkAPI) => {
    console.log(paramettre.codeuser);
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/utilisateurSystem/modifierModuleParamettreParUtilisateur`,
      {
        paramettreModifier: paramettre.paramettreModifier,
      },
      {
        params: {
          codeuser: paramettre.codeuser,
          modulepr: paramettre.modulepr,
          module: paramettre.module,
          societe: thunkAPI.getState().utilisateurSystemSlice.dbName,
        },
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );
    console.log(response);
    return response;
  }
);

export const getRepresantantUtilisateur = createAsyncThunk(
  "utilisateurSystemSlice/getRepresantantUtilisateur",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/utilisateurSystem/getCodeUtilisateurSuivant`
    );
  }
);
const utilisateurSystemInfoInitiales = {
  codeuser: "",
  motpasse: "test",
  nom: "",
  email: "",
  type: "",
  directeur: "",
};

const paramettresAccesUtilisateurInitiales = {
  accee: "",
  ecriture: "",
  ajouter: "",
  supprimer: "",
  modifier: "",
};
export const utilisateurSystemSlices = createSlice({
  name: "utilisateurSystemSlices",
  initialState: {
    utilisateurSystemInfoInitiales,
    paramettresAccesUtilisateurInitiales,
    Utilisateur_SuperviseurInfos: {
      ...utilisateurSystemInfoInitiales,
    },
    infosUtilisateursup: {
      codeuser: "",
      nom: "",
      type: "",
      directeur: "",
      motpasse: "",
      image: "",
    },
    utilisateurConnecte: {
      codeuser: "",
      nom: "",
      type: "",

      droitAcceTableClient: {
        accee: "",
        ecriture: "",
        ajouter: "",
        modifier: "",
        supprimer: "",
      },

      droitAcceeTableArticle: {
        accee: "",
        ecriture: "",
        ajouter: "",
        modifier: "",
        supprimer: "",
      },
    },
    dbName: "",
    token: "",
    paramettresAccesUtilisateur: {
      ...paramettresAccesUtilisateurInitiales,
    },
  },
  reducers: {
    setParametresAcceesUtilisateur: (state, action) => {
      const { colonne, valeur } = action.payload;
      state.paramettresAccesUtilisateur[colonne] = valeur;
    },
    setDroitAcceTableClient: (state, action) => {
      state.utilisateurConnecte.droitAcceTableClient = action.payload;
    },
    setDroitAcceeTableArticle: (state, action) => {
      state.utilisateurConnecte.droitAcceeTableArticle = action.payload;
    },
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
        ...utilisateurSystemInfoInitiales,
      };
    },
    setDbName: (state, action) => {
      state.dbName = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    SetUtilisateurSystemremplir: (state, action) => {
      state.Utilisateur_SuperviseurInfos = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(AjouterUtilisateur.pending, (state, action) => {
        state.status = "chargement";
      })
      .addCase(AjouterUtilisateur.fulfilled, (state, action) => {
        state.status = "succès";
        state.listeSousfamille = action.payload;
      })
      .addCase(AjouterUtilisateur.rejected, (state, action) => {
        state.status = "échec";
      })

      .addCase(supprimerUtilisateur.pending, (state, action) => {
        state.status = "chargement";
      })
      .addCase(supprimerUtilisateur.fulfilled, (state, action) => {
        state.status = "succès";
        state.infosUtilisateursup = action.payload;
      })
      .addCase(supprimerUtilisateur.rejected, (state, action) => {
        state.status = "échec";
      })

      .addCase(getModuleParamettreParUtilisateur.pending, (state, action) => {
        state.status = "chargement";
      })
      .addCase(getModuleParamettreParUtilisateur.fulfilled, (state, action) => {
        state.status = "succès";
        state.paramettresAccesUtilisateur = action.payload;
      })
      .addCase(getModuleParamettreParUtilisateur.rejected, (state, action) => {
        state.status = "échec";
      });
  },
});
export const {
  setUtilisateur_SuperviseurInfos,
  setutilisateurConnecte,
  setutilisateurConnecteEntiere,
  setViderChampsUtilisateur,
  setUtilisateurSupInfo,
  setDbName,
  SetUtilisateurSystemremplir,
  setToken,
  setParametresAcceesUtilisateur,
  setDroitAcceTableClient,
  setDroitAcceeTableArticle
} = utilisateurSystemSlices.actions;

export default utilisateurSystemSlices.reducer;
