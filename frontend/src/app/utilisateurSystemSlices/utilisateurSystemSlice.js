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
export const getDerniereCodeUtilisateur = createAsyncThunk(
  "utilisateurSystemSlices/getDerniereCodeUtilisateur",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/utilisateurSystem/getDerniereCodeUtilisateur`
    );
    return response.data.derniereCodeUtilisateur;
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
    console.log(codeuser);
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/utilisateurSystem/supprimerUtilisateur`,
      {
        params: { codeuser: codeuser },
      }
    );
    console.log(response);
  }
);
export const getListeUtilisateurParCode = createAsyncThunk(
  "utilisateurSystemSlices/getListeUtilisateurParCode",
  async (codeuser) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/utilisateurSystem/getListeUtilisateurParCode`,
      {
        params: {
          codeuser: codeuser,
        },
      }
    );
    console.log(response);
    return response.data.result;
  }
);
export const getListeUtilisateurParNom = createAsyncThunk(
  "utilisateurSystemSlices/getListeUtilisateurParNom",
  async (nom) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/utilisateurSystem/getListeUtilisateurParNom`,
      {
        params: {
          nom: nom,
        },
      }
    );
    console.log(response);
    return response.data.result;
  }
);
export const getListeUtilisateurParDirecteur = createAsyncThunk(
  "utilisateurSystemSlices/getListeUtilisateurParDirecteur",
  async (directeur) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/utilisateurSystem/getListeUtilisateurParDirecteur`,
      {
        params: {
          directeur: directeur,
        },
      }
    );
    console.log(response);
    return response.data.result;
  }
);
export const getListeUtilisateurParType = createAsyncThunk(
  "utilisateurSystemSlices/getListeUtilisateurParType",
  async (type) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/utilisateurSystem/getListeUtilisateurParType`,
      {
        params: {
          type: type,
        },
      }
    );
    console.log(response);
    return response.data.result;
  }
);
export const getListeUtilisateur = createAsyncThunk(
  "utilisateurSystemSlices/getListeUtilisateur",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/utilisateurSystem/getListeUtilisateur`
    );
    console.log(response);
    return response.data.result;
  }
);
export const filterListeUtilisateur = createAsyncThunk(
  "utilisateurSystemSlices/filterListeUtilisateur",
  async (_, thunkAPI) => {
    // Passer `filters` en paramètre
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/utilisateurSystem/filterListeUtilisateur`,
      {
        params: {
          filters:
            thunkAPI.getState().utilisateurSystemSlices.filtersUtilisateur, // Utiliser filters ici
        },
      }
    );
    console.log(response);
    return response.data.data; // Retourner la réponse
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
    listeUtilisateur_Superviseur: [],
    Utilisateur_SuperviseurInfos: {
      ...utilisateurSystemInfoInitiales
    },
    utilisateurConnecte: {
      codeuser: "",
      nom: "",
      type: "",
    },
    filtersUtilisateur: {
      codeuser: "",
      type: "",
      email: "",
      directeur: "",
      nom: "",
    },

    derniereCodeUtilisateur: "",
    dbName: "",
    token: "",
  },
  reducers: {
    setListeUtilisateur_Superviseur: (state, action) => {
      state.listeUtilisateur_Superviseur = action.payload;
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
    setFiltresSaisient: (state, action) => {
      const { colonne, valeur } = action.payload;
      state.filtersUtilisateur[colonne] = valeur;
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

      .addCase(getDerniereCodeUtilisateur.pending, (state, action) => {
        state.status = "chagement";
      })
      .addCase(getDerniereCodeUtilisateur.fulfilled, (state, action) => {
        state.status = "succès";
        state.derniereCodeUtilisateur = action.payload;
      })
      .addCase(getDerniereCodeUtilisateur.rejected, (state, action) => {
        state.status = "échec";
      })

      .addCase(getListeUtilisateurParCode.pending, (state, action) => {
        state.status = "chagement";
      })
      .addCase(getListeUtilisateurParCode.fulfilled, (state, action) => {
        state.status = "succès";
        state.Utilisateur_SuperviseurInfos = action.payload[0];
        state.listeUtilisateur_Superviseur = action.payload;
      })
      .addCase(getListeUtilisateurParCode.rejected, (state, action) => {
        state.status = "échec";
      })

      .addCase(getListeUtilisateurParNom.pending, (state, action) => {
        state.status = "chagement";
      })
      .addCase(getListeUtilisateurParNom.fulfilled, (state, action) => {
        state.status = "succès";
        state.listeUtilisateur_Superviseur = action.payload;
      })
      .addCase(getListeUtilisateurParNom.rejected, (state, action) => {
        state.status = "échec";
      })

      .addCase(getListeUtilisateurParDirecteur.pending, (state, action) => {
        state.status = "chagement";
      })
      .addCase(getListeUtilisateurParDirecteur.fulfilled, (state, action) => {
        state.status = "succès";
        state.listeUtilisateur_Superviseur = action.payload;
      })
      .addCase(getListeUtilisateurParDirecteur.rejected, (state, action) => {
        state.status = "échec";
      })

      .addCase(getListeUtilisateurParType.pending, (state, action) => {
        state.status = "chagement";
      })
      .addCase(getListeUtilisateurParType.fulfilled, (state, action) => {
        state.status = "succès";
        state.listeUtilisateur_Superviseur = action.payload;
      })
      .addCase(getListeUtilisateurParType.rejected, (state, action) => {
        state.status = "échec";
      })

      .addCase(getListeUtilisateur.pending, (state, action) => {
        state.status = "chagement";
      })
      .addCase(getListeUtilisateur.fulfilled, (state, action) => {
        state.status = "succès";
        state.listeUtilisateur_Superviseur = action.payload;
      })
      .addCase(getListeUtilisateur.rejected, (state, action) => {
        state.status = "échec";
      });
  },
});
export const {
  setListeUtilisateur_Superviseur,
  setUtilisateur_SuperviseurInfos,
  setutilisateurConnecte,
  setutilisateurConnecteEntiere,
  setViderChampsUtilisateur,
  setUtilisateurSupInfo,
  setFiltresSaisient,
  setDbName,
  setToken,
} = utilisateurSystemSlices.actions;

export default utilisateurSystemSlices.reducer;
