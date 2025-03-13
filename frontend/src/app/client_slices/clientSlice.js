import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// * Thunk pour récupérer la liste des clients
export const getListeClient = createAsyncThunk(
  "slice/getListeClient",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/client/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/List`
    );
    return response.data.result;
  }
);

//* recupere client la liste des client par typecli
export const getClientParTypecli = createAsyncThunk(
  "Slice/getClientParTypecli",
  async (typecli, thunkAPI) => {
    console.log(
      `${process.env.REACT_APP_API_URL}/api/client/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/getClientParTypecli`
    );
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/client/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/getClientParTypecli`,
      {
        params: { typecli },
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
        thunkAPI.getState().UtilisateurInfo.dbName
      }/getClientParCin/${cin}`
    );
    return response.data.client;
  }
);
// * récupere un client par son code
export const getClientParCode = createAsyncThunk(
  "Slice/getListeClient",
  async (code, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/client/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/client/${code}`
    );
    console.log(response.data)
    return response.data.client;
  }
);
// * Thunk pour ajouter un client
export const ajouterClient = createAsyncThunk(
  "slice/ajouterClient",
  async (_, thunkAPI) => {
    const clientInfos = thunkAPI.getState().ClientCrud.clientInfos;
    console.log(clientInfos);
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/client/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/Add`,
      {
        clientInfos,
      }
    );
    console.log(response);
    thunkAPI.getState().uiStates.setAlertMessage(response.data.message);
    return response.data;
  }
);

// * Thunk pour mettre à jour un client
export const majClient = createAsyncThunk(
  "slice/majClient",
  async (_, thunkAPI) => {
    const clientUpdate = thunkAPI.getState().ClientCrud.clientInfos;

    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/client/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/Update`,
      { clientUpdate } // htha y3niii bch tjib les donds il kol htha body, ya3ni objet kamel mesh bel champ bel champ
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
        thunkAPI.getState().UtilisateurInfo.dbName
      }/filterClient`,
      {
        params: {
          filters: thunkAPI.getState().ClientCrud.filters, // Utiliser filters ici
        },
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
        thunkAPI.getState().UtilisateurInfo.dbName
      }/getToutCodesClient`
    );
    return response.data.listeCodesClients;
  }
);

// * Thunk pour supprimer des clients par leurs codes
// * slice/supprimerClient identifiant unique pour la methode
export const supprimerClient = createAsyncThunk(
  "slice/supprimerClient",
  async (code, thunkAPI) => {
    console.log("code= ", code);
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/client/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/Delete/${code}`
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
        thunkAPI.getState().UtilisateurInfo.dbName
      }/getDerniereCodeClient`
    );
    return response.data.derniereCodeClient.code;
  }
);
export const getCodePostalDesignationParCode= createAsyncThunk(
  "clientSlice/getCodePostalDesignationParCode",
  async(tab,thunkAPI)=>{
    const response=await axios.get(`${process.env.REACT_APP_API_URL}/api/client/${
        thunkAPI.getState().UtilisateurInfo.dbName}/getCpInfos`,
        {
          params: {
            cp: tab[0],
            codeClient: tab[1]
          }
        }
      )
      console.log(response)
      return response.data.cpInfos

  }
)

export const clientSlice = createSlice({
  name: "slice",
  initialState: {
    // * les champs doivenent etres initialisées à vide
    // * pour éviter des problème quand on
    // * les utilisent tant que valeurs par defaut
    clientInfos: {
      code: "",
      rsoc: "",
      adresse: "",
      cp: "",
      email: "",
      telephone: "",
      tel1: "",
      tel2: "",
      telex: "",
      desrep: "",
      aval2: "",
      aval1: "",
      Commentaire: "",
      datemaj: "",
      userm: "",
      usera: "",
      fact: "",
      timbref: "",
      cltexport: "",
      suspfodec: "",
      regime: "",
      exon: "",
      majotva: "",
      fidel: "",
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
      typecli: "L",
      cin: "",
      fax:"",
      secteur: {
        codesec: "",
        desisec: "",
      },
      region: {
        codergg: "",
        desirgg: "",
      },
      cpostal: {
        CODEp: "",
        desicp: "",
      },
    }, // * informations de formulaire de client
    listeToutCodesClients: [],
    clientsASupprimer: [], // * tableau des codes de clients a supprimer. id reeelement code.
    listeClients: [],
    status: "inactive",
    erreur: null,
    // todo: change this to french
    // todo: this is for later tho
    // todo: hence the "todo"
    // todo: todo
    filters: {
      code: "",
      rsoc: "",
      Matricule: "",
      telephone: "",
      fax: "",
      desrep: "",
    },

    insertionDepuisDevisForm: false,
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
        code: "",
        nature: "",
        rsoc: "",
        nom1: "",
        nom2: "",
        nom3: "",
        titre1: "",
        titre2: "",
        titre3: "",
        gsm1: "",
        gsm2: "",
        gsm3: "",
        nposte1: "",
        nposte2: "",
        nposte3: "",
        adresse: "",
        cp: "",
        email: "",
        telephone: "",
        desrep: "",
        aval2: "",
        aval1: "",
        tarif: "",
        Commentaire: "",
        datemaj: "",
        userm: "",
        usera: "",
        fact: "",
        timbref: "",
        cltexport: "",
        suspfodec: "",
        regime: "",
        exon: "",
        majotva: "",
        fidel: "",
        banque: "",
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
        typecli: "L",
        cin: "",
        secteur: {
          codesec: "",
          desisec: "",
        },
        region: {
          codergg: "",
          desirgg: "",
        },
        cpostal: {
          CODEp: "",
          desicp: "",
        },
      };
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
        console.log(action.payload)
        // ! danger
        state.listeClients = action.payload;
        //objet client bch tit3aba il formulaire 
        state.clientInfos.cpostal.CODEp=action.payload[0].cp;
        state.clientInfos=action.payload[0]; 

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
        state.clientInfos.code = (parseInt(action.payload) + 1).toString();
        state.status = "réussi";
      })
      .addCase(getDerniereCodeClient.rejected, (state, action) => {
        state.status = "échoué";
        state.erreur = action.payload;
      })

      .addCase(getClientParTypecli.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getClientParTypecli.fulfilled, (state, action) => {
        state.listeClients = action.payload;
        state.status = "réussi";
      })
      .addCase(getClientParTypecli.rejected, (state, action) => {
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

      .addCase(getCodePostalDesignationParCode.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getCodePostalDesignationParCode.fulfilled, (state, action) => {
        state.clientInfos.cpostal.CODEp = action.payload[0].CODEp;
        state.clientInfos.cpostal.desicp = action.payload[0].desicp;

        state.status = "réussi";
      })
      .addCase(getCodePostalDesignationParCode.rejected, (state, action) => {
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
} = clientSlice.actions;
export default clientSlice.reducer;
