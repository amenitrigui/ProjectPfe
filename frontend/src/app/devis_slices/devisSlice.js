import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// * Action asynchrone pour récupérer la liste des devis
export const getDevisList = createAsyncThunk(
  "slice/getDevisList",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getTousDevis`,
      {
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
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
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getLignesDevis/${NumBL}`,
      {
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );
    return response.data.listeArticle;
  }
);

// * Action asynchrone pour ajouter un devis
export const AjouterDevis = createAsyncThunk(
  "slice/AddDevis",
  async (_, thunkAPI) => {
    const devisInfo = thunkAPI.getState().devisSlice.devisInfo;
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/devis/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/ajouterDevis`,
      { devisInfo },
      {
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
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
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getNombreDevis`,
      {
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );
    console.log(response);
    return response.data.totalDevis;
  }
);

// * Action asynchrone pour récupérer la totalité des chiffres générés par des devis
export const getTotalChiffres = createAsyncThunk(
  "slice/getNombreTotal",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getTotalChiffres`,
      {
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );
    return response.data.totalchifre;
  }
);

// * Action asynchrone pour récupérer un devis par son code
export const getDevisParNUMBL = createAsyncThunk(
  "Slice/getDevisParNUMBL",
  async (NUMBL, thunkAPI) => {
    const codeuser =
      thunkAPI.getState().utilisateurSystemSlice.utilisateurConnecte.codeuser;
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getDevisParNUMBL/${NUMBL}`,
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
    return response.data.devis;
  }
);

// * thunk pur récuperer la liste de devis par NUMBL
export const getListeDevisParNUMBL = createAsyncThunk(
  "devisSlice/getListeDevisParNUMBL",
  async (NUMBL, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getListeDevisParNUMBL`,
      {
        params: {
          NUMBL: NUMBL,
          codeuser:
            thunkAPI.getState().utilisateurSystemSlice.utilisateurConnecte
              .codeuser,
        },
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );

    return response.data.listeDevis;
  }
);
export const getDevisCountByMonthAndYear = createAsyncThunk(
  "devisSlice/getDevisCountByMonthAndYear",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getDevisCountByMonthAndYear`,
      {
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );
    return response.data.devisCountByMonthAndYear;
  }
);

// * Action asynchrone pour récupérer la liste des devis par montant
export const getDevisParMontant = createAsyncThunk(
  "devisSlice/getDevisParMontant",
  async (montant, thunkAPI) => {
    const codeuser =
      thunkAPI.getState().utilisateurSystemSlice.utilisateurConnecte.codeuser;
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getDevisParMontant/${montant}`,
      {
        params: {
          codeuser,
        },
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
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
    const codeuser =
      thunkAPI.getState().utilisateurSystemSlice.utilisateurConnecte.codeuser;
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getDevisParClient`,
      {
        params: {
          CODECLI,
          codeuser,
        },

        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );
    return response.data.devis;
  }
);

// * Action asynchrone pour récuperer les informations d'utilisateur courament connecté
export const getInfoUtilisateur = createAsyncThunk(
  "slice/getInfoUtilisateur",
  async (usera, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getInfoUtilisateur`,
      {
        params: {
          usera,
        },

        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
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
    const codeuser =
      thunkAPI.getState().utilisateurSystemSlice.utilisateurConnecte.codeuser;

    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getDevisParPeriode`,
      {
        params: {
          DATEBL,
          codeuser,
        },

        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );
    return response.data.devis;
  }
);

// * Action asynchrone pour récupérer la liste des codes des devis
export const getListeNumbl = createAsyncThunk(
  "devisSlice/getListeNUMBL",
  async (codeuser, thunkAPI) => {
    let response;
    if (!codeuser) {
      response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/devis/${
          thunkAPI.getState().utilisateurSystemSlice.dbName
        }/getCodesDevis/${
          thunkAPI.getState().utilisateurSystemSlice.utilisateurConnecte
            .codeuser
        }`,
        {
          headers: {
            Authorization: `Bearer ${
              thunkAPI.getState().utilisateurSystemSlice.token
            }`,
          },
        }
      );
    }
    return response.data.listeNUMBL;
  }
);

// * Action asynchrone pour récupérer la liste des points de vente d'une societé
export const getListePointsVente = createAsyncThunk(
  "devisSlice/getListePointsVente",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getListePointVente`,
      {
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );

    return response.data.pointsVenteDistincts;
  }
);

// * Action asynchrone pour récupérer la liste des points de vente d'une societé
export const getListeSecteur = createAsyncThunk(
  "devisSlice/getListeSecteur",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getListeSecteur`,
      {
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );
    return response.data.secteurDistincts;
  }
);
export const getListeCodeVendeur = createAsyncThunk(
  "devisslice/getListeCodeVendeur",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getListeCodeVendeur`,
      {
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );
    return response.data.VendeurDistincts;
  }
);
export const getDesignationSecteurparCodeSecteur = createAsyncThunk(
  "devisslice/getDesignationSecteurparCodeSecteur",
  async (codesecteur, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/secteur/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getDesignationSecteurparCodeSecteur/${codesecteur}`
    );
    return response.data.secteurInfo;
  }
); // * méthode pour récuperer le dernière numbl :
// * si on fournit le paramètre codeuser, on récupere le derniere numbl pour cet utilisateur
// * si on ne fournit pas le paramètre codeuser, on récupere le numbl de dernière devis généré quelle que soit l'utilisateur qui l'a créé
export const getDerniereNumbl = createAsyncThunk(
  "devisSlice/getDerniereNumbl",
  async (codeuser, thunkAPI) => {
    let response;
    if (codeuser) {
      response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/devis/${
          thunkAPI.getState().utilisateurSystemSlice.dbName
        }/getDerniereNumbl`,
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
    }
    if (!codeuser) {
      response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/devis/${
          thunkAPI.getState().utilisateurSystemSlice.dbName
        }/getDerniereNumbl`
      );
    }
    return response.data.derniereNumbl;
  }
);
export const annulerDevis = createAsyncThunk(
  "devisSlice/annulerDevis",
  async (NUMBL, thunkAPI) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/devis/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/annulerDevis`,
      {
        params: {
          NUMBL: NUMBL,
          codeuser:
            thunkAPI.getState().utilisateurSystemSlice.utilisateurConnecte
              .codeuser,
        },

        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );
    return response;
  }
);

export const getNbTotalDevisGeneres = createAsyncThunk(
  "devisSlice/getNbTotalDevisGeneres",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getNbTotalDevisGeneres`,
      {
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );
    return response.data.nbDevisGeneresTotal;
  }
);

export const getNbTotalDevisGeneresParUtilisateur = createAsyncThunk(
  "devisSlice/getNbTotalDevisGeneresParUtilisateur",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getNbTotalDevisGeneresParUtilisateur`,
      {
        params: {
          codeuser:
            thunkAPI.getState().utilisateurSystemSlice.utilisateurConnecte
              .codeuser,
        },

        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );
    return response.data.nbDevisGeneresTotal;
  }
);

export const getNbDevisNonGeneresParUtilisateur = createAsyncThunk(
  "devisSlice/getNbDevisNonGeneresParUtilisateur",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getNbDevisNonGeneresParUtilisateur`,
      {
        params: {
          codeuser:
            thunkAPI.getState().utilisateurSystemSlice.utilisateurConnecte
              .codeuser,
        },
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );
    return response.data.nbDevisNonGeneresParUtilisateur;
  }
);

export const getNbTotalDevisAnnulees = createAsyncThunk(
  "devisSlice/getNbTotalDevisAnnulees",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `
      ${process.env.REACT_APP_API_URL}/api/devis/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getNbTotalDevisAnnulees
    `,
      {
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );
    return response.data.nbDevisANnulees;
  }
);

export const getNbTotalDevisEnCours = createAsyncThunk(
  "devisSlice/getNbTotalDevisEnCours",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `
      ${process.env.REACT_APP_API_URL}/api/devis/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getNbTotalDevisEnCours
    `,
      {
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );
    return response.data.nbDevisEncours;
  }
);

export const getNbTotalDevisSansStatus = createAsyncThunk(
  "devisSlice/getNbTotalDevisSansStatus",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `
      ${process.env.REACT_APP_API_URL}/api/devis/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getNbTotalDevisSansStatus
    `,
      {
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );
    return response.data.nbDevisSansStatus;
  }
);

export const getAnneesDistinctGenerationDevis = createAsyncThunk(
  "devisSlice/getAnneesDistinctGenerationDevis",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `
    ${process.env.REACT_APP_API_URL}/api/devis/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getAnneesDistinctGenerationDevis`,
      {
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );
    return response.data.annees;
  }
);
export const getDevisparRepresentant = createAsyncThunk(
  `devisSlice/getDevisparRepresentant`,
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getDevisparRepresentant`,
      {
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );
    return response.data.nombredevisparrepresentant;
  }
);
export const getNbDevisGeneresParAnnee = createAsyncThunk(
  `devisSlice/getNbDevisGeneresParAnnee`,
  async (annee, thunkAPI) => {
    const response = await axios.get(
      `
      ${process.env.REACT_APP_API_URL}/api/devis/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getNbDevisGeneresParAnnee`,
      {
        params: {
          annee: annee,
        },
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );

    return response.data.nbDevisParAnne;
  }
);
export const majDevis = createAsyncThunk(
  "devisSlice/majDevis",
  async (NUMBL, thunkAPI) => {
    const devismaj = thunkAPI.getState().devisSlice.devisInfo;
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/devis/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/majDevis`,
      { DevisMaj: devismaj },
      {
        params: { NUMBL },

        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );
    return response;
  }
);
export const filtrerListeDevis = createAsyncThunk(
  "devisSlice/filtrerListeDevis",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/filtrerListeDevis`,
      {
        params: {
          filters: thunkAPI.getState().devisSlice.filterDevis, // Utiliser filters ici
        },
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

export const getrepresentantparcodevendeur = createAsyncThunk(
  "devisSlice/getrepresentantparcodevendeur",
  async (CODEREP, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getrepresentantparcodevendeur`,
      {
        params: {
          CODEREP: CODEREP,
        },
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
const devisInfoInitiales = {
  NUMBL: "",
  libpv: "SIEGE LOCAL",
  ADRCLI: "",
  CODECLI: "",
  delailivr: "",
  modepaie: "",
  transport: "",
  numPage: 1,
  cp: "",
  DATEBL: new Date().toISOString().split("T")[0],
  MREMISE: 0,
  MTTC: 0,
  MTVA: 0,
  comm: "",
  CODEREP: "",
  RSREP: "",
  DATEDMAJ: new Date().toISOString().split("T")[0],
  TIMBRE: 0,
  usera: "",
  userm: "",
  RSCLI: "",
  desisec: "",
  codesecteur: "",
  MHT: 0,
  email: "",
  REFCOMM: "",

  articles: [],
};
export const devisSlice = createSlice({
  name: "devisSlice",
  initialState: {
    // * liste de devis
    devisList: [],
    //* devisMonthYear
    devisMonthYear: [],
    // * liste de codes de devis
    listeNUMBL: [],
    //* liste de devis generes par reprensetant
    nbDevisparrepresentant: [],
    // * liste de points de vente
    listePointsVente: [],
    listesecteur: [],
    listeVendeur: [],
    devisInfoInitiales,
    // * informations du formulaire de devis
    devisInfo: {
      ...devisInfoInitiales,
    },
    nbTotalDevisGeneres: 0,
    nbTotalDevisGeneresParUtilisateur: 0,
    nbTotalDevisNonGeneresParUtilisateur: 0,
    filterDevis: {
      NUMBL: "",
      DATEBL: "",
      CODEFACTURE: "",
      CODECLI: "",
      ADRCLI: "",
      RSCLI: "",
      MTTC: "",
    },
    totalchifre: 0,
    nombreDeDevis: 0,
    status: null,
    error: null,
    nbTotalDevisGeneres: 0,
    nbTotalDevisGeneresParUtilisateur: 0,
    nbTotalDevisNonGeneresParUtilisateur: 0,
    nbTotalDevisAnnulees: 0,
    nbDevisEncours: 0,
    nbTotDevisSansStatus: 0,
    derniereNumbl: "",
    anneesDistinctGenerationDevis: [],
    nbDevisGeneresParAnnee: [],
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
    setDevisInfoArticleParIndice: (state, action) => {
      const { indice, ligneDevis } = action.payload;
      state.devisInfo.articles[indice] = ligneDevis;
    },
    viderChampsDevisInfo: (state) => {
      state.devisInfo = {
        ...devisInfoInitiales,
      };
    },
    setDerniereNumbl: (state, action) => {
      state.derniereNumbl = action.payload;
    },
    setDevisClientInfos: (state, action) => {
      const { ADRCLI, CODECLI, RSCLI } = action.payload;
      state.devisInfo.CODECLI = CODECLI;
      state.devisInfo.ADRCLI = ADRCLI;
      state.devisInfo.RSCLI = RSCLI;
    },
    setDevisArticles: (state, action) => {
      state.devisInfo.articles = [...state.devisInfo.articles, action.payload];
    },
    setFiltresSaisient: (state, action) => {
      const { valeur, collonne } = action.payload;
      state.filterDevis[collonne] = valeur; // Correction ici
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

      .addCase(getListeSecteur.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getListeSecteur.fulfilled, (state, action) => {
        state.listesecteur = action.payload;
        state.status = "reussi";
      })
      .addCase(getListeSecteur.rejected, (state, action) => {
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
        if (action.payload && action.payload.length > 0) {
          state.derniereNumbl = parseInt(action.payload.substring(2, 9));
          state.status = "reussi";
        }
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
      })

      .addCase(getDevisCountByMonthAndYear.pending, (state) => {
        state.status = "chargeement";
      })
      .addCase(getDevisCountByMonthAndYear.fulfilled, (state, action) => {
        state.devisMonthYear = action.payload;
        state.status = "reussi";
      })
      .addCase(getDevisCountByMonthAndYear.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "echoue";
      })

      .addCase(getNbTotalDevisGeneres.pending, (state) => {
        state.status = "chargeement";
      })
      .addCase(getNbTotalDevisGeneres.fulfilled, (state, action) => {
        state.nbTotalDevisGeneres = action.payload;
        state.status = "reussi";
      })
      .addCase(getNbTotalDevisGeneres.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "echoue";
      })

      .addCase(getNbTotalDevisGeneresParUtilisateur.pending, (state) => {
        state.status = "chargeement";
      })
      .addCase(
        getNbTotalDevisGeneresParUtilisateur.fulfilled,
        (state, action) => {
          state.nbTotalDevisGeneresParUtilisateur = action.payload;
          state.status = "reussi";
        }
      )
      .addCase(
        getNbTotalDevisGeneresParUtilisateur.rejected,
        (state, action) => {
          state.erreur = action.payload;
          state.status = "echoue";
        }
      )

      .addCase(getNbDevisNonGeneresParUtilisateur.pending, (state) => {
        state.status = "chargeement";
      })
      .addCase(
        getNbDevisNonGeneresParUtilisateur.fulfilled,
        (state, action) => {
          state.nbTotalDevisNonGeneresParUtilisateur = action.payload;
          state.status = "reussi";
        }
      )
      .addCase(getNbDevisNonGeneresParUtilisateur.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "echoue";
      })

      .addCase(getNbTotalDevisAnnulees.pending, (state) => {
        state.status = "chargeement";
      })
      .addCase(getNbTotalDevisAnnulees.fulfilled, (state, action) => {
        state.nbTotalDevisAnnulees = action.payload;
        state.status = "reussi";
      })
      .addCase(getNbTotalDevisAnnulees.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "echoue";
      })

      .addCase(getNbTotalDevisEnCours.pending, (state) => {
        state.status = "chargeement";
      })
      .addCase(getNbTotalDevisEnCours.fulfilled, (state, action) => {
        state.nbDevisEncours = action.payload;
        state.status = "reussi";
      })
      .addCase(getNbTotalDevisEnCours.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "echoue";
      })

      .addCase(getNbTotalDevisSansStatus.pending, (state) => {
        state.status = "chargeement";
      })
      .addCase(getNbTotalDevisSansStatus.fulfilled, (state, action) => {
        state.nbTotDevisSansStatus = action.payload;
        state.status = "reussi";
      })
      .addCase(getNbTotalDevisSansStatus.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "echoue";
      })

      .addCase(getAnneesDistinctGenerationDevis.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getAnneesDistinctGenerationDevis.fulfilled, (state, action) => {
        state.anneesDistinctGenerationDevis = action.payload;
        state.status = "reussi";
      })
      .addCase(getAnneesDistinctGenerationDevis.rejected, (state, action) => {
        state.status = "echoue";
      })

      .addCase(getNbDevisGeneresParAnnee.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getNbDevisGeneresParAnnee.fulfilled, (state, action) => {
        state.nbDevisGeneresParAnnee = action.payload;
        state.status = "reussi";
      })
      .addCase(getNbDevisGeneresParAnnee.rejected, (state, action) => {
        state.status = "echoue";
      })

      .addCase(getDevisparRepresentant.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getDevisparRepresentant.fulfilled, (state, action) => {
        state.nbDevisparrepresentant = action.payload;
        state.status = "reussi";
      })
      .addCase(getDevisparRepresentant.rejected, (state, action) => {
        state.status = "echoue";
      })

      .addCase(getDesignationSecteurparCodeSecteur.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(
        getDesignationSecteurparCodeSecteur.fulfilled,
        (state, action) => {
          state.devisInfo["desisec"] = action.payload[0].desisec;
          state.status = "reussi";
        }
      )
      .addCase(
        getDesignationSecteurparCodeSecteur.rejected,
        (state, action) => {
          state.status = "echoue";
        }
      )

      .addCase(getrepresentantparcodevendeur.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getrepresentantparcodevendeur.fulfilled, (state, action) => {
        state.devisInfo["RSREP"] = action.payload[0].RSREP;
        state.status = "reussi";
      })
      .addCase(getrepresentantparcodevendeur.rejected, (state, action) => {
        state.status = "echoue";
      })

      .addCase(getListeCodeVendeur.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getListeCodeVendeur.fulfilled, (state, action) => {
        state.listeVendeur = action.payload;
        state.status = "reussi";
      })
      .addCase(getListeCodeVendeur.rejected, (state, action) => {
        state.status = "echoue";
      })

      .addCase(filtrerListeDevis.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(filtrerListeDevis.fulfilled, (state, action) => {
        state.devisList = action.payload;
        state.status = "reussi";
      })
      .addCase(filtrerListeDevis.rejected, (state, action) => {
        state.status = "echoue";
      });
  },
});
export const {
  setDevisInfo,
  setDevisList,
  setFiltresSaisient,
  setDevisInfoEntiere,
  viderChampsDevisInfo,
  setDevisClientInfos,
  setDevisArticles,
  setDevisInfoArticleParIndice,
  setDerniereNumbl,
} = devisSlice.actions;

export default devisSlice.reducer;
