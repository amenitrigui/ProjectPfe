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
export const getCodeUtilisateurParCode = createAsyncThunk(
  "Utilisateur_SuperviseurSlice/getCodeUtilisateurParCode",
  async (codeuser) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/Utilisateur_Superviseur/getCodeUtilisateurParCode`,
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

    derniereCodeUtilisateur: "",
  },
  reducers: {
    setListeUtilisateur_Superviseur: (state, action) => {
      state.listeUtilisateur_Superviseur = action.payload;
    },
    setUtilisateurSupInfo:(state,action)=>{
state.Utilisateur_SuperviseurInfos=action.payload
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

      .addCase(getCodeUtilisateurParCode.pending, (state, action) => {
        state.status = "chagement";
      })
      .addCase(getCodeUtilisateurParCode.fulfilled, (state, action) => {
        state.status = "succès";
        state.listeUtilisateur_Superviseur = action.payload;
      })
      .addCase(getCodeUtilisateurParCode.rejected, (state, action) => {
        state.status = "échec";
      });
  },
});
export const {
  setListeUtilisateur_Superviseur,
  setUtilisateur_SuperviseurInfos,
  setutilisateurConnecte,
  setutilisateurConnecteEntiere,
  setViderChampsUtilisateur,setUtilisateurSupInfo
} = Utilisateur_SuperviseurSlices.actions;

export default Utilisateur_SuperviseurSlices.reducer;
