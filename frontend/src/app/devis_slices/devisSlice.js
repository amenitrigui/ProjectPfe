import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// * Action asynchrone pour récupérer la liste des devis
export const getDevisList = createAsyncThunk(
  "slice/getDevisList",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/getTousDevis`
    );
    return response.data.devisList;
  }
);

// * Action asynchrone pour récupérer les lignes d'articles d'un devis
export const getLignesDevis = createAsyncThunk(
  "slice/getLignesDevis",
  async (NumBL, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/getLignesDevis/${NumBL}`
    );
    return response.data.listeArticle;
  }
);

// * Action asynchrone pour ajouter un devis
export const AjouterDevis = createAsyncThunk(
  "slice/AddDevis",
  async (_, thunkAPI) => {
    const devisInfo = thunkAPI.getState().DevisCrud.devisInfo;
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/devis/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/ajouterDevis`,
      { devisInfo }
    );
    return response.data.devis;
  }
);

// * Action asynchrone pour récupérer le nombre des devis générées
export const getNombreTotalDevis = createAsyncThunk(
  "Slice/getNmobredevis",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/getNombreDevis`
    );
    return response.data.totalDevis;
  }
);

// * Action asynchrone pour récupérer la totalité des chiffres générés par des devis
export const getTotalChiffres = createAsyncThunk(
  "slice/getNombreTotal",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/getTotalChiffres`
    );
    return response.data.totalchifre;
  }
);

// * Action asynchrone pour récupérer un devis par son code
export const getDevisParNUMBL = createAsyncThunk(
  "Slice/getDevisParNUMBL",
  async (NUMBL, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/getDevisParNUMBL/${NUMBL}`,
      {
        params: {
          codeuser: thunkAPI.getState().UtilisateurInfo.codeuser,
        },
      }
    );
    return response.data.devis;
  }
);

// * thunk pur récuperer la liste de devis par NUMBL
export const getListeDevisParNUMBL = createAsyncThunk(
  "devisSlice/getListeDevisParNUMBL",
  async(NUMBL, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/getListeDevisParNUMBL`,{
        params: {
          NUMBL: NUMBL,
          codeuser: thunkAPI.getState().UtilisateurInfo.infosUtilisateur.codeuser
        }
      }
    )

    console.log(response)
    return response.data.listeDevis;
  }
)

// * Action asynchrone pour récupérer la liste des devis par montant
// ! on peut retourner des devis dont le montant est
// ! presque celle qu'on recherche
// ! exemple: si on cherche par le montant 3205, on peut retourner des résultat pour 3205.7 et ainsi de suite
export const getDevisParMontant = createAsyncThunk(
  "devisSlice/getDevisParMontant",
  async (montant, thunkAPI) => {
    const codeuser = thunkAPI.getState().UtilisateurInfo.codeuser;
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/getDevisParMontant/${montant}`,
      {
        params: {
          codeuser,
        },
      }
    );
    return response.data.devis;
  }
);

// * Action asynchrone pour récupérer la liste des devis pour un client
export const getDevisParCodeClient = createAsyncThunk(
  "slice/getDevisParCodeClient",
  async (CODECLI, thunkAPI) => {
    const codeuser = thunkAPI.getState().UtilisateurInfo.codeuser;
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/getDevisParClient`,
      {
        params: {
          CODECLI,
          codeuser,
        },
      }
    );
    console.log(response);
    return response.data.devis;
  }
);

// * Action asynchrone pour récuperer les informations d'utilisateur courament connecté
export const getInfoUtilisateur = createAsyncThunk(
  "slice/getInfoUtilisateur",
  async (usera, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/getInfoUtilisateur`,
      {
        params: {
          usera,
        },
      }
    );
    return response.data.utilisateur;
  }
);

// * Action asynchrone pour récupérer la liste des devis pendant une période spécifique
export const getDevisParPeriode = createAsyncThunk(
  "slice/getDevisParPeriode",
  async (DATEBL, thunkAPI) => {
    const codeuser = thunkAPI.getState().UtilisateurInfo.codeuser;

    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/getDevisParPeriode`,
      {
        params: {
          DATEBL,
          codeuser,
        },
      }
    );
    return response.data.devis;
  }
);

// * Action asynchrone pour récupérer la liste des codes des devis
export const getListeNumbl = createAsyncThunk(
  "devisSlice/getListeNUMBL",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/getCodesDevis/${thunkAPI.getState().UtilisateurInfo.codeuser}`
    );
    return response.data.listeNUMBL;
  }
);

// * Action asynchrone pour récupérer la liste des points de vente d'une societé
export const getListePointsVente = createAsyncThunk(
  "devisSlice/getListePointsVente",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/getListePointVente`
    );

    return response.data.pointsVenteDistincts;
  }
);

export const getDerniereNumbl = createAsyncThunk(
  "devisSlice/getDerniereNumbl",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/getDerniereNumbl`
    );
    return response.data.derniereNumbl;
  }
);

export const deleteDevis = createAsyncThunk(
  "devisSlice/deleteDevis",
  async (NUMBL, thunkAPI) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/devis/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/deleteDevis/${NUMBL}`
    );
    return response;
  }
);

export const devisSlice = createSlice({
  name: "devisSlice",
  initialState: {
    // * liste de devis
    devisList: [],
    // * liste de codes de devis
    listeNUMBL: [],
    // * liste de points de vente
    listePointsVente: [],
    // * informations du formulaire de devis
    devisInfo: {
      NUMBL: "",
      libpv: "",
      ADRCLI: "",
      CODECLI: "",
      cp: "",
      DATEBL: new Date().toISOString().split("T")[0],
      MREMISE: "",
      MTTC: "",
      MTVA: "",
      comm: "",
      RSREP: "",
      CODEREP: "",
      TIMBRE: "",
      usera: "",
      RSCLI: "",
      codesecteur: "",
      MHT: "",
      articles: [],
    },
    totalchifre: 0,
    nombreDeDevis: 0,
    status: null,
    error: null,
  },
  reducers: {
    setDevisInfo: (state, action) => {
      const { collone, valeur } = action.payload;
      state.devisInfo[collone] = valeur;
    },
    setDevisList: (state, action) => {
      state.devisList = action.payload;
    },
    setDevisInfoEntiere: (state, action) => {
      state.devisInfo = action.payload;
    },
    viderChampsDevisInfo: (state) => {
      state.devisInfo = {
        NUMBL: "",
        libpv: "",
        ADRCLI: "",
        CODECLI: "",
        cp: "",
        DATEBL: new Date().toISOString().split("T")[0],
        MREMISE: "",
        MTTC: "",
        MTVA: "",
        comm: "",
        RSREP: "",
        CODEREP: "",
        TIMBRE: "",
        usera: "",
        RSCLI: "",
        codesecteur: "",
        MHT: "",
        articles: [],
        quantite: 0,
        DREMISE: 0
      };
    },
    setDevisClientInfos: (state, action) => {
      const { ADRCLI, CODECLI, cp, RSCLI } = action.payload;
      state.devisInfo.CODECLI = CODECLI;
      state.devisInfo.ADRCLI = ADRCLI;
      state.devisInfo.cp = cp;
      state.devisInfo = RSCLI;
    },
    setDevisArticles: (state, action) => {
      state.devisInfo.articles = [...state.devisInfo.articles, action.payload];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getDevisList.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getDevisList.fulfilled, (state, action) => {
        state.status = "reussi";
        state.devisList = action.payload;
      })
      .addCase(getDevisList.rejected, (state, action) => {
        state.status = "echoue";
        state.error = action.error.message;
      })
      .addCase(AjouterDevis.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(AjouterDevis.fulfilled, (state, action) => {
        state.status = "reussi";
      })
      .addCase(AjouterDevis.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "echoue";
      })
      .addCase(getNombreTotalDevis.pending, (state) => {
        state.status = "chargeement";
      })
      .addCase(getNombreTotalDevis.fulfilled, (state, action) => {
        state.nombreDeDevis = action.payload;
        state.status = "reussi";
      })
      .addCase(getNombreTotalDevis.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "echoue";
      })

      .addCase(getTotalChiffres.pending, (state) => {
        state.status = "chargeement";
      })
      .addCase(getTotalChiffres.fulfilled, (state, action) => {
        state.totalchifre = action.payload;
        state.status = "reussi";
      })
      .addCase(getTotalChiffres.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "echoue";
      })

      .addCase(getDevisParNUMBL.pending, (state) => {
        state.status = "chargeement";
      })
      .addCase(getDevisParNUMBL.fulfilled, (state, action) => {
        // state.devisList = action.payload;
        state.devisInfo = action.payload[0];
        state.status = "reussi";
      })
      .addCase(getDevisParNUMBL.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "echoue";
      })

      .addCase(getDevisParCodeClient.pending, (state) => {
        state.status = "chargeement";
      })
      .addCase(getDevisParCodeClient.fulfilled, (state, action) => {
        state.devisList = action.payload;
        state.status = "reussi";
      })
      .addCase(getDevisParCodeClient.rejected, (state, action) => {
        state.devisInfo = action.payload;
        state.status = "echoue";
      })

      .addCase(getDevisParMontant.pending, (state) => {
        state.status = "chargeement";
      })
      .addCase(getDevisParMontant.fulfilled, (state, action) => {
        state.devisList = action.payload;
        state.status = "reussi";
      })
      .addCase(getDevisParMontant.rejected, (state, action) => {
        state.status = "echoue";
        state.erreur = action.payload;
      })

      .addCase(getDevisParPeriode.pending, (state) => {
        state.status = "chargeement";
      })
      .addCase(getDevisParPeriode.fulfilled, (state, action) => {
        state.devisList = action.payload;
        state.status = "reussi";
      })
      .addCase(getDevisParPeriode.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "echoue";
      })

      .addCase(getListeNumbl.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getListeNumbl.fulfilled, (state, action) => {
        state.listeNUMBL = action.payload;
        state.status = "reussi";
      })
      .addCase(getListeNumbl.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "echoue";
      })

      .addCase(getListePointsVente.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getListePointsVente.fulfilled, (state, action) => {
        state.listePointsVente = action.payload;
        state.status = "reussi";
      })
      .addCase(getListePointsVente.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "echoue";
      })

      .addCase(getInfoUtilisateur.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getInfoUtilisateur.fulfilled, (state, action) => {
        state.devisList = action.payload;
        state.status = "reussi";
      })
      .addCase(getInfoUtilisateur.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "echoue";
      })

      .addCase(getLignesDevis.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getLignesDevis.fulfilled, (state, action) => {
        // state.devisInfo = action.payload[0];
        state.devisInfo.articles = action.payload;
        state.status = "reussi";
      })
      .addCase(getLignesDevis.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "echoue";
      })

      .addCase(getDerniereNumbl.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getDerniereNumbl.fulfilled, (state, action) => {
        state.devisInfo.NUMBL =
          "DV" +
          (parseInt(action.payload.NUMBL.substring(2, 9)) + 1).toString();
        state.status = "reussi";
      })
      .addCase(getDerniereNumbl.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "echoue";
      })
      
      .addCase(getListeDevisParNUMBL.pending, (state) => {
        state.status = "chargeement";
      })
      .addCase(getListeDevisParNUMBL.fulfilled, (state, action) => {
        state.devisList = action.payload;
        state.status = "reussi";
      })
      .addCase(getListeDevisParNUMBL.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "echoue";
      });
  },
});
export const {
  setDevisInfo,
  setDevisList,
  setDevisInfoEntiere,
  viderChampsDevisInfo,
  setDevisClientInfos,
  setDevisArticles,
} = devisSlice.actions;

export default devisSlice.reducer;
