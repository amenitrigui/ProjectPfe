import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//* thunk pour ajouter un sous famille
export const AjouterUtilisateur = createAsyncThunk(
  "Utilisateur_SuperviseurSlice/AjouterUtilisateur",
  async (_, thunkAPI) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/Utilisateur_Superviseur/AjouterUtilisateur`,
      {
        User: thunkAPI.getState().Utilisateur_SuperviseurSlices
          .Utilisateur_SuperviseurInfos,
      }
    );
    console.log(response);
    return response.data.user;
  }
);
export const getDerniereCodeUtilisateur = createAsyncThunk(
  "Utilisateur_SuperviseurSlice/getDerniereCodeUtilisateur",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/Utilisateur_Superviseur/getDerniereCodeUtilisateur`
    );
    console.log(response);
    return response.data.derniereCodeUtilisateur;
  }
);
export const ModifierUtilisateur = createAsyncThunk(
  "Utilisateur_SuperviseurSlice/ModifierUtilisateur",
  async (_, thunkAPI) => {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/Utilisateur_Superviseur/ModifierUtilisateur`,
      {
        MajUtilisateur:
          thunkAPI.getState().Utilisateur_SuperviseurSlices
            .Utilisateur_SuperviseurInfos,
      }
    );
    console.log(response);
    return response.data.user;
  }
);
export const supprimerUtilisateur = createAsyncThunk(
  "Utilisateur_SuperviseurSlice/supprimerUtilisateur",
  async (codeuser) => {
    console.log(codeuser);
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/Utilisateur_Superviseur/supprimerUtilisateur`,
      {
        params: { codeuser: codeuser },
      }
    );
    console.log(response);
  }
);
export const getListeUtilisateurParCode = createAsyncThunk(
  "Utilisateur_SuperviseurSlice/getListeUtilisateurParCode",
  async (codeuser) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/Utilisateur_Superviseur/getListeUtilisateurParCode`,
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
  "Utilisateur_SuperviseurSlice/getListeUtilisateurParNom",
  async (nom) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/Utilisateur_Superviseur/getListeUtilisateurParNom`,
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
  "Utilisateur_SuperviseurSlice/getListeUtilisateurParDirecteur",
  async (directeur) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/Utilisateur_Superviseur/getListeUtilisateurParDirecteur`,
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
  "Utilisateur_SuperviseurSlice/getListeUtilisateurParType",
  async (type) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/Utilisateur_Superviseur/getListeUtilisateurParType`,
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
  "Utilisateur_SuperviseurSlice/getListeUtilisateur",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/Utilisateur_Superviseur/getListeUtilisateur`
    );
    console.log(response);
    return response.data.result;
  }
);
export const filterListeUtilisateur = createAsyncThunk(
  "Utilisateur_SuperviseurSlice/filterListeUtilisateur",
  async (_, thunkAPI) => {
    // Passer `filters` en paramètre
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/Utilisateur_Superviseur/filterListeUtilisateur`,
      {
        params: {
          filters:
            thunkAPI.getState().Utilisateur_Superviseur.filtersUtilisateur, // Utiliser filters ici
        },
      }
    );
    console.log(response);
    return response.data.data; // Retourner la réponse
  }
);
export const getCodeUtilisateurSuivant = createAsyncThunk(
  "Utilisateur_SuperviseurSlice/getCodeUtilisateurSuivant",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/Utilisateur_Superviseur/getCodeUtilisateurSuivant`
    );
    console.log(response)
    return response
  }
);
export const Utilisateur_SuperviseurSlices = createSlice({
  name: "Utilisateur_SuperviseurSlices",
  initialState: {
    listeUtilisateur_Superviseur: [],
    Utilisateur_SuperviseurInfos: {
      codeuser: "",
      motpasse: "test",
      nom: "",
      email: "",
      type: "",
      directeur: "",
    },
    utilisateurConnecte: {
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
      console.log(action.payload);
      state.filtersUtilisateur[colonne] = valeur;
    },
    setViderChampsUtilisateur: (state, action) => {
      state.Utilisateur_SuperviseurInfos = {
        codeuser: "",
        email: "",
        type: "",
        directeur: "",
        motpasse: "",
      };
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
        state.Utilisateur_SuperviseurInfos=action.payload[0]
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
} = Utilisateur_SuperviseurSlices.actions;

export default Utilisateur_SuperviseurSlices.reducer;
