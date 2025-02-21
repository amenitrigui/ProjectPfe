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
    return response.data;
  }
);

// Thunk pour filtrer les clients (Correction ici)
export const getClientFilter = createAsyncThunk(
  "slice/getClientFilter",
  async (_, thunkAPI) => {
    // * Passer `filtresClient` en paramètre
    const response = await axios.get(
      `http://localhost:5000/api/client/SOLEVO/filterClient`,
      {
        params: {
            filters: thunkAPI.getState().ClientCrud.filtresClient, // Utiliser filtresClient ici
        }
      }
    );
    console.log(response.data.data);
    return response.data.data; // Retourner la réponse
  }
);
// slice/deleteClient identifiant uniquepour la methode
export const deleteClient = createAsyncThunk(
  "slice/deleteClient",
  async (_, thunkAPI) => {
    const id = thunkAPI.getState().ClientCrud.clientAsuprimer;
    const response = await axios.delete(
      `http://localhost:5000/api/client/SOLEVO/Delete/${id}`
    );

    console.log(response);

    return response;
  }
);

export const clientSlice = createSlice({
  name: "slice",
  initialState: {
    clientInfos: {}, //Add  formulaire
    value: 0,
    clientList: [],
    clientAsuprimer: "", // id reeelement code
    status: "idle", // idle | loading | succeeded | failed
    error: null,
    filtresClient: {
      code: "",
      rsoc: "",
      adresse: "",
      cp: "",
      email: "",
    },
  },
  reducers: {
    // Action synchrone pour modifier les filtres
    setFiltresClient: (state, action) => {
      const { valeur, collonne } = action.payload;
      state.filtresClient[collonne] = valeur; // Correction ici
    },
    fillClientInfos: (state, action) => {
      const { field, value } = action.payload; //actions fiha les donnes (payload)
      state.clientInfos[field] = value;
    }, // haja simple
    setclientAsupprimer: (state, action) => {
      const { id } = action.payload;
      state.clientAsuprimer = id;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClientList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getClientList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.clientList = action.payload;
      })
      .addCase(getClientList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(getClientFilter.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getClientFilter.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.clientList = action.payload; // Mettre à jour la liste filtrée
      })
      .addCase(getClientFilter.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //
      .addCase(deleteClient.pending, (state) => {
        state.status = "loading";
        console.log(state.status);
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload)
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.log(state.status);
      })

      .addCase(addClient.pending, (state) => {
        console.log("pending");
        state.status = "pending";
      })
      .addCase(addClient.fulfilled, (state, action) => {
        console.log("succeeded");
        state.status = "succeeded";
      })
      .addCase(addClient.rejected, (state, action) => {
        console.log(action.payload);
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setFiltresClient, fillClientInfos, setclientAsupprimer } =clientSlice.actions;
export default clientSlice.reducer;
