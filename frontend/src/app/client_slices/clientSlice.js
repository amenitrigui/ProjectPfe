import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk pour récupérer la liste des clients
export const getClientList = createAsyncThunk(
  "slice/getClientList",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/client/SOLEVO/List`
    );
    return response.data.result;
  }
);

export const addClient = createAsyncThunk(
  "slice/addClient",
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
export const updateclient = createAsyncThunk(
  "slice/updateClient",
  async (_, thunkAPI) => {
    const clientUpdate = thunkAPI.getState().ClientCrud.clientInfos;

    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/client/SOLEVO/Update`,
      { clientUpdate } // htha y3niii bch tjib les donnes il kol htha body
    );
    return response.message;
  }
);

// Thunk pour filtrer les clients (Correction ici)
export const getClientFilter = createAsyncThunk(
  "slice/getClientFilter",
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
); // slice/deleteClient identifiant uniquepour la methode
export const deleteClient = createAsyncThunk(
  "slice/deleteClient",
  async (_, thunkAPI) => {
    const id = thunkAPI.getState().ClientCrud.clientAsuprimer;
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/client/SOLEVO/Delete/${id}`
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
    value: 0,
    clientList: [],
    clientAsuprimer: [], // id reeelement code
    status: "idle",
    error: null,
    filters: {
      code: "",
      rsoc: "",
      adresse: "",
      cp: "",
      email: "",
    },
  },
  reducers: {
    // Action synchrone pour modifier les filtres
    FilltersSaisieUser: (state, action) => {
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
    setclientAsupprimer: (state, action) => {
      state.clientAsuprimer.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClientList.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getClientList.fulfilled, (state, action) => {
        state.status = "réussi";
        state.clientList = action.payload;
      })
      .addCase(getClientList.rejected, (state, action) => {
        state.status = "échoué";
        state.error = action.error.message;
      })

      .addCase(getClientFilter.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getClientFilter.fulfilled, (state, action) => {
        state.status = "réussi";
        state.clientList = action.payload; // Mettre à jour la liste filtrée
      })
      .addCase(getClientFilter.rejected, (state, action) => {
        state.status = "échoué";
        state.error = action.error.message;
      })

      .addCase(deleteClient.pending, (state) => {
        state.status = "chargement";
        console.log(state.status);
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.status = "réussi";
        console.log(action.payload);
        console.log(state.status);
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.status = "échoué";
        state.error = action.error.message;
        console.log(state.status);
      })

      .addCase(addClient.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(addClient.fulfilled, (state, action) => {
        console.log(action);
        state.status = "réussi";
      })
      .addCase(addClient.rejected, (state, action) => {
        console.log(action);
        state.status = "échoué";
        state.error = action.payload;
      })

      .addCase(updateclient.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(updateclient.fulfilled, (state, action) => {
        state.status = "réussi";
      })
      .addCase(updateclient.rejected, (state, action) => {
        console.log(action);
        state.status = "échoué";
        state.error = action.payload;
      });
  },
});

export const {
  FilltersSaisieUser,
  setClientInfos,
  setclientAsupprimer,
  setClientInfosEntiere,
} = clientSlice.actions;
export default clientSlice.reducer;
