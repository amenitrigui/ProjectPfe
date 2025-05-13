import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// * Thunk pour récupérer la liste des clients
export const getListeClient = createAsyncThunk(
  "slice/getListeClient",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/client/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getListeClients`, {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().utilisateurSystemSlice.token}`
        }
      }
    );
    return response.data.result;
  }
);

// * recupere client la liste des client par raison sociale
export const getClientParRaisonSociale = createAsyncThunk(
  "Slice/getClientParRaisonSociale",
  async (rsoc, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/client/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getClientParRaisonSociale/${rsoc}`,{
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().utilisateurSystemSlice.token}`
        },
      }
    );
    return response.data.clients;
  }
);

//* recupere un client par cin
export const getClientParCin = createAsyncThunk(
  "Slice/getClientParCin",
  async (cin, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/client/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getClientParCin/${cin}`,{
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().utilisateurSystemSlice.token}`
        },
      }
    );
    return response.data.client;
  }
);
// * récupere un client par son code
export const getClientParCode = createAsyncThunk(
  "Slice/getClientParCode",
  async (code, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/client/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getClientParCode/${code}`,{
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().utilisateurSystemSlice.token}`
        },
      }
    );
    return response.data.client;
  }
);
// * Thunk pour ajouter un client
export const ajouterClient = createAsyncThunk(
  "slice/ajouterClient",
  async (_, thunkAPI) => {
    const clientInfos = thunkAPI.getState().clientSlice.clientInfos;
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/client/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/AjouterClient`,
      {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().utilisateurSystemSlice.token}`
        },
        clientInfos
      }
    );
    thunkAPI.getState().interfaceSlice.setAlertMessage(response.data.message);
    return response.data.clientInfos;
  }
);

// * Thunk pour mettre à jour un client
export const majClient = createAsyncThunk(
  "slice/majClient",
  async (_, thunkAPI) => {
    const clientMaj = thunkAPI.getState().clientSlice.clientInfos;

    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/client/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/majClient`,
      {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().utilisateurSystemSlice.token}`
        },
        clientMaj 
      } // htha y3niii bch tjib les donds il kol htha body, ya3ni objet kamel mesh bel champ bel champ
    );
    return response.message;
  }
);

// * Thunk pour filtrer les clients (Correction ici)
export const filtrerClients = createAsyncThunk(
  "slice/filtrerClients",
  async (_, thunkAPI) => {
    // Passer `filters` en paramètre
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/client/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/filtrerListeClients`,
      {
        params: {
          filters: thunkAPI.getState().clientSlice.filters, // Utiliser filters ici
        },
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().utilisateurSystemSlice.token}`
        }
      }
    );
    return response.data.data; // Retourner la réponse
  }
);

// * récupere la liste de toutes les codes des clients
// * utilisé pour remplir la liste déroulante
export const getToutCodesClient = createAsyncThunk(
  "devisSlice/getToutCodesClient",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/client/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getToutCodesClient`,{
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().utilisateurSystemSlice.token}`
        },
      }
    );
    return response.data.listeCodesClients;
  }
);

// * Thunk pour supprimer des clients par leurs codes
// * slice/supprimerClient identifiant unique pour la methode
export const supprimerClient = createAsyncThunk(
  "slice/supprimerClient",
  async (code, thunkAPI) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/client/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/Delete/${code}`,{
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().utilisateurSystemSlice.token}`
        },
      }
    );
    return response.data.message;
  }
);

// * récupere le code de dernier client
export const getDerniereCodeClient = createAsyncThunk(
  "clientSlice/getDerniereCodeClient",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/client/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getDerniereCodeClient`,{
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().utilisateurSystemSlice.token}`
        },
      }
    );
    return response.data.derniereCodeClient.code;
  }
);

//* récuperer la désignation d'un secteur par son code
// * example:
// * input : 002
// * output : SHZ
export const getDesignationSecteurparCodeSecteur = createAsyncThunk(
  "clientSlice/getDesignationSecteurparCodeSecteur",
  async (codesecteur, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/secteur/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getDesignationSecteurparCodeSecteur/${codesecteur}`
    );
    return response.data.secteurInfo[0];
  }
);

//* récuperer la liste de codes secteur
// * example:
// * input :
// * output : ['001','002','003','004']
export const getListeCodesSecteur = createAsyncThunk(
  "clientSlice/getListeCodeSecteur",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/secteur/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getListeCodesSecteur`
    );
    return response.data.listeCodesSecteurs;
  }
);

//* récuperer la ville associé à un code postal
// * example:
// * input : 1000
// * output : Beb El Bhar
export const getVilleParCodePostal = createAsyncThunk(
  "clientSlice/getVilleParCodePostal",
  async (cp, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/codePostal/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getVilleParCodePostale/${cp}`
    );
    return response.data.ville[0];
  }
);

//* récuperer la liste de codes posteaux
// * example:
// * input :
// * output : liste de codes posteaux
export const getListeCodesPosteaux = createAsyncThunk(
  "clientSlice/getListeCodesPosteaux",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/codePostal/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getListeCodesPosteaux`
    );
    return response.data.listeCodesPosteaux;
  }
);

//* récuperer la liste de codes posteaux
// * example:
// * input :
// * output : liste de codes pregion 01
export const getListeCodeRegions = createAsyncThunk(
  "clientSlice/getListeCodeRegions",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/region/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getListeCodeRegions`
    );
    return response.data.listeCodesRegion;
  }
);
//* récuperer la ville associé à un region
// * example:
// * input : 01
// * output : 01
export const getVilleParRegion = createAsyncThunk(
  "clientSlice/getVilleParRegion",
  async (codeRegion, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/region/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getVilleParRegion/${codeRegion}`
    );

    return response.data.ListRegion[0];
  }
);
const clientInfoInitiales = {
  code: "",
  rsoc: "",
  cp: "",
  matemaj: "",
  adresse: "",
  email: "",
  telephone: "",
  tel1: "",
  tel2: "",
  codepv: "",
  datcreat: new Date().toISOString().split("T")[0],
  telex: "",
  desrep: "",
  aval2: "",
  aval1: "",
  Commentaire: "",
  datemaj: "",
  userm: "",
  usera: "",
  // ? les champs suivantes sont des checkboxes
  // ? on initialise leurs valeurs à 0 pour dire
  // ? que initialement ils sont décochés
  offretick: "0",
  timbref: "0",
  cltexport: "0",
  suspfodec: "0",
  regime: "0",
  exon: "0",
  majotva: "0",
  fidel: "0",
  ptva: "0",
  // ? =========================================
  // ? les champs suivantes sont des selects
  // ? on initialise leurs valeurs à 0 pour dire
  // ? Non (N)
  blockage: "0",
  contrat: "0",
  // ? ==========================================
  datefinaut: "",
  datedebaut: "",
  decision: "",
  matriculef: "",
  reference: "",
  srisque: "",
  scredit: "",
  delregBL: "",
  delregFT: "",
  delregFC: "",
  remise: "",
  activite: "",
  codes: "",
  coder: "",
  typecli: "L",
  cin: "",
  fax: "",
  codesec: "",
  desisec: "",
  codergg: "",
  desirgg: "",
  desicp: "",
  nom1: "",
  nom2: "",
  nom3: "",
};
export const clientSlice = createSlice({
  name: "slice",
  initialState: {
    clientInfoInitiales,
    // * les champs doivenent etres initialisées à vide
    // * pour éviter des problème quand on
    // * les utilisent tant que valeurs par defaut
    clientInfos: {
      ...clientInfoInitiales,
    }, // * informations de formulaire de client
    listeToutCodesClients: [],

    listeCodesSecteur: [],
    clientsASupprimer: [], // * tableau des codes de clients a supprimer. id reeelement code.
    listeClients: [],
    listeCodesRegion: [],
    listeToutCodesPosteaux: [],
    status: "inactive",
    erreur: null,
    filters: {
      code: "",
      rsoc: "",
      Matricule: "",
      telephone: "",
      fax: "",
      desrep: "",
    },

    insertionDepuisDevisForm: false,
    dernierCodeClient: "",
  },
  reducers: {
    // * Action synchrone pour modifier les filtres
    setFiltresSaisient: (state, action) => {
      const { valeur, collonne } = action.payload;
      state.filters[collonne] = valeur; // Correction ici
    },
    setClientList: (state, action) => {
      state.clientList = action.payload;
    },
    setClientInfos: (state, action) => {
      // * actions fiha les donnes (payload)
      // * exemple d'objet action : action: {payload: {}}
      const { colonne, valeur } = action.payload;
      state.clientInfos[colonne] = valeur;
    }, // el reducer houwa haja simple
    setClientInfosEntiere: (state, action) => {
      state.clientInfos = action.payload;
    },
    viderChampsClientInfo: (state) => {
      state.clientInfos = {
        ...clientInfoInitiales,
      };
    },
    setDerniereCodeClient: (state, action) => {
      state.dernierCodeClient = action.payload;
    },
    setClientsASupprimer: (state, action) => {
      state.clientsASupprimer.push(action.payload);
    },
    setInsertionDepuisDevisForm: (state, action) => {
      state.insertionDepuisDevisForm = action.payload;
    },
    setListeClients: (state, action) => {
      state.listeClients = action.payload;
    },
  },
  // * on utilise l'objet builder pour replacer l'opérateur switch case ...
  // * l'objet builder nous permet d'écrire des cas plus lisibles et flexibles
  extraReducers: (builder) => {
    builder
      .addCase(getListeClient.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getListeClient.fulfilled, (state, action) => {
        state.status = "réussi";
        state.listeClients = action.payload;
      })
      .addCase(getListeClient.rejected, (state, action) => {
        state.status = "échoué";
        state.erreur = action.erreur;
      })

      .addCase(filtrerClients.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(filtrerClients.fulfilled, (state, action) => {
        state.status = "réussi";
        state.listeClients = action.payload; // Mettre à jour la liste filtrée
      })
      .addCase(filtrerClients.rejected, (state, action) => {
        state.status = "échoué";
        state.erreur = action.erreur;
      })

      .addCase(supprimerClient.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(supprimerClient.fulfilled, (state, action) => {
        state.status = "réussi";
      })
      .addCase(supprimerClient.rejected, (state, action) => {
        state.status = "échoué";
        state.erreur = action.erreur;
      })

      .addCase(ajouterClient.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(ajouterClient.fulfilled, (state, action) => {
        state.status = "réussi";
      })
      .addCase(ajouterClient.rejected, (state, action) => {
        state.status = "échoué";
        state.erreur = action.payload;
      })

      .addCase(majClient.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(majClient.fulfilled, (state, action) => {
        state.status = "réussi";
      })
      .addCase(majClient.rejected, (state, action) => {
        state.status = "échoué";
        state.erreur = action.payload;
      })

      .addCase(getClientParCode.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getClientParCode.fulfilled, (state, action) => {
        // ! ceci est utilisé pour les filtres
        state.listeClients = action.payload;
        if (action.payload[0] && action.payload[0] != {}) {
          //objet client bch tit3aba il formulaire
          state.clientInfos = action.payload[0];
        }

        state.status = "réussi";
      })
      .addCase(getClientParCode.rejected, (state, action) => {
        state.status = "échoué";
        state.erreur = action.payload;
      })

      .addCase(getToutCodesClient.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getToutCodesClient.fulfilled, (state, action) => {
        state.listeToutCodesClients = action.payload;
        state.status = "réussi";
      })
      .addCase(getToutCodesClient.rejected, (state, action) => {
        state.status = "échoué";
        state.erreur = action.payload;
      })

      .addCase(getDerniereCodeClient.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getDerniereCodeClient.fulfilled, (state, action) => {
        // state.dernierCodeClient = (parseInt(action.payload) + 1).toString();
        state.dernierCodeClient = action.payload;
        state.status = "réussi";
      })
      .addCase(getDerniereCodeClient.rejected, (state, action) => {
        state.status = "échoué";
        state.erreur = action.payload;
      })

      .addCase(getClientParRaisonSociale.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getClientParRaisonSociale.fulfilled, (state, action) => {
        state.listeClients = action.payload;

        state.status = "réussi";
      })
      .addCase(getClientParRaisonSociale.rejected, (state, action) => {
        state.status = "échoué";
        state.erreur = action.payload;
      })

      .addCase(getClientParCin.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getClientParCin.fulfilled, (state, action) => {
        state.listeClients = action.payload;
        state.status = "réussi";
      })
      .addCase(getClientParCin.rejected, (state, action) => {
        state.status = "échoué";
        state.erreur = action.payload;
      })

      .addCase(getDesignationSecteurparCodeSecteur.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(
        getDesignationSecteurparCodeSecteur.fulfilled,
        (state, action) => {
          state.clientInfos.desisec = action.payload.desisec;

          state.status = "réussi";
        }
      )

      .addCase(
        getDesignationSecteurparCodeSecteur.rejected,
        (state, action) => {
          state.status = "échoué";
          state.erreur = action.payload;
        }
      )

      .addCase(getListeCodesPosteaux.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getListeCodesPosteaux.fulfilled, (state, action) => {
        state.listeToutCodesPosteaux = action.payload;
        state.status = "réussi";
      })
      .addCase(getListeCodesPosteaux.rejected, (state, action) => {
        state.status = "échoué";
        state.erreur = action.payload;
      })

      .addCase(getVilleParCodePostal.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getVilleParCodePostal.fulfilled, (state, action) => {
        state.clientInfos.desicp = action.payload.desicp;
        state.status = "réussi";
      })
      .addCase(getVilleParCodePostal.rejected, (state, action) => {
        state.status = "échoué";
        state.erreur = action.payload;
      })

      .addCase(getListeCodesSecteur.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getListeCodesSecteur.fulfilled, (state, action) => {
        state.listeCodesSecteur = action.payload;
        state.status = "réussi";
      })
      .addCase(getListeCodesSecteur.rejected, (state, action) => {
        state.status = "échoué";
        state.erreur = action.payload;
      })

      .addCase(getListeCodeRegions.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getListeCodeRegions.fulfilled, (state, action) => {
        state.listeCodesRegion = action.payload;
        state.status = "réussi";
      })
      .addCase(getListeCodeRegions.rejected, (state, action) => {
        state.status = "échoué";
        state.erreur = action.payload;
      })

      .addCase(getVilleParRegion.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getVilleParRegion.fulfilled, (state, action) => {
        state.clientInfos.desirgg = action.payload.desirgg;
        state.status = "réussi";
      })
      .addCase(getVilleParRegion.rejected, (state, action) => {
        state.status = "échoué";
        state.erreur = action.payload;
      });
  },
});

export const {
  setFiltresSaisient,
  setClientInfos,
  setClientsASupprimer,
  setClientInfosEntiere,
  viderChampsClientInfo,
  setInsertionDepuisDevisForm,
  setListeClients,
  setDerniereCodeClient,
} = clientSlice.actions;
export default clientSlice.reducer;
