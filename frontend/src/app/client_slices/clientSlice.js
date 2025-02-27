import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk pour récupérer la liste des clients
export const getListeClient = createAsyncThunk(
  "slice/getListeClient",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/client/SOLEVO/List`
    );
    return response.data.result;
  }
);

export const ajouterClient = createAsyncThunk(
  "slice/ajouterClient",
  async (_, thunkApi) => {
    const clientInfos = thunkApi.getState().ClientCrud.clientInfos;
    console.log(clientInfos);
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/client/SOLEVO/Add`,
      {
        clientInfos,
      }
    );
    console.log(response);
    thunkApi.getState().uiStates.setAlertMessage(response.data.message);
    return response.data;
  }
);

// ? Thunk pour mettre à jour un client
export const majClient = createAsyncThunk(
  "slice/majClient",
  async (_, thunkAPI) => {
    const clientUpdate = thunkAPI.getState().ClientCrud.clientInfos;

    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/client/SOLEVO/Update`,
      { clientUpdate } // htha y3niii bch tjib les donnes il kol htha body
    );
    return response.message;
  }
);

// ? Thunk pour filtrer les clients (Correction ici)
export const filtrerClients = createAsyncThunk(
  "slice/filtrerClients",
  async (_, thunkAPI) => {
    // Passer `filters` en paramètre
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/client/SOLEVO/filterClient`,
      {
        params: {
          filters: thunkAPI.getState().ClientCrud.filters, // Utiliser filters ici
        },
      }
    );
    return response.data.data; // Retourner la réponse
  }
);

// ? slice/supprimerClient identifiant uniquepour la methode
export const supprimerClient = createAsyncThunk(
  "slice/supprimerClient",
  async (_, thunkAPI) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/client/SOLEVO/Delete/`,
      {
        data: {
          clients: thunkAPI.getState().ClientCrud.clientsASupprimer,
        },
      }
    );
    return response.data;
  }
);

export const clientSlice = createSlice({
  name: "slice",
  initialState: {
    // ? les champs doivenent etres initialisées à vide
    // ? pour éviter des problème quand on
    // ? les utilisent tant que valeurs par defaut
    clientInfos: {
      code: "",
      rsoc: "",
      adresse: "",
      cp: "",
      email: "",
      telephone: "",
      desrep: "",
    }, //Add  formulaire
    listeClients: [],
    clientsASupprimer: [], // id reeelement code
    status: "inactive",
    erreur: null,
    // todo: change this to french
    // todo: this is for later tho
    // todo: hence the "todo"
    filters: {
      code: "",
      rsoc: "",
      adresse: "",
      cp: "",
      email: "",
    },
    isertionDepuisDevis: false
  },
  reducers: {
    // Action synchrone pour modifier les filtres
    setFiltresSaisient: (state, action) => {
      const { valeur, collonne } = action.payload;
      state.filters[collonne] = valeur; // Correction ici
    },
    setClientInfos: (state, action) => {
      const { colonne, valeur } = action.payload; //actions fiha les donnes (payload)
      state.clientInfos[colonne] = valeur;
    }, // haja simple
    setClientInfosEntiere: (state, action) => {
      state.clientInfos = action.payload;
    },
    setClientsASupprimer: (state, action) => {
      state.clientsASupprimer.push(action.payload);
    },
  },
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
        console.log(state.status);
      })
      .addCase(supprimerClient.fulfilled, (state, action) => {
        state.status = "réussi";
        console.log(action.payload);
        console.log(state.status);
      })
      .addCase(supprimerClient.rejected, (state, action) => {
        state.status = "échoué";
        state.erreur = action.erreur;
        console.log(state.status);
      })

      .addCase(ajouterClient.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(ajouterClient.fulfilled, (state, action) => {
        console.log(action);
        state.status = "réussi";
      })
      .addCase(ajouterClient.rejected, (state, action) => {
        console.log(action);
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
        console.log(action);
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
} = clientSlice.actions;
export default clientSlice.reducer;
