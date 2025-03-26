import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


//* récuperer la liste de codes posteaux
// * example:
// * input :
// * output : liste de codes pregion 01
export const getListeCodeRegions = createAsyncThunk(
  "clientSlice/getListeCodeRegions",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/region/${
        thunkAPI.getState().UtilisateurInfo.dbName
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
    console.log("ok");
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/region/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/getVilleParRegion/${codeRegion}`
    );
    console.log("response")
    
    return response.data.ListRegion[0]

  }
);
export const clientSlice = createSlice({
  name: "slice",
  initialState: {
    listeCodesSecteur: [],
    clientsASupprimer: [], // * tableau des codes de clients a supprimer. id reeelement code.
    listeClients: [],
    listeCodesRegion:[],
    listeToutCodesPosteaux: [],
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
        rsoc: "",
        cp: "",
        adresse: "",
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
        fax: "",
  
        codesec: "",
        desisec: "",
  
        codergg: "",
        desirgg: "",
        desicp: "",
      }
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
        console.log(action.payload);
        // ! ceci est utilisé pour les filtres
        state.listeClients = action.payload;
        //objet client bch tit3aba il formulaire
        state.clientInfos = action.payload[0];
        state.clientInfos.CODEp = action.payload[0].cp;
        state.clientInfos.codergg=action.payload.desireg

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
        console.log(action.payload);
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

      .addCase(getDesignationSecteurparCodeSecteur.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getDesignationSecteurparCodeSecteur.fulfilled, (state, action) => {
        state.clientInfos.desisec = action.payload.desisec;

        state.status = "réussi";
      })

      .addCase(getDesignationSecteurparCodeSecteur.rejected, (state, action) => {
        state.status = "échoué";
        state.erreur = action.payload;
      })

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
        console.log(action.payload)
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
} = clientSlice.actions;
export default clientSlice.reducer;
