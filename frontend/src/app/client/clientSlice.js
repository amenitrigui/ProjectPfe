import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk pour récupérer la liste des clients
export const getClientList = createAsyncThunk(
    "slice/getClientList",
    async () => {

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/client/SOLEVO/List`);
        return response.data.result;
    }
);

// Thunk pour filtrer les clients (Correction ici)
export const getClientFilter = createAsyncThunk(
    "slice/getClientFilter",
    async (_, thunkAPI) => { // Passer `filters` en paramètre
        console.log("ddd")
        const response = await axios.get(`http://localhost:5000/api/client/SOLEVO/filterClient`, {
            params: thunkAPI.getState().ClientCrud.filters, // Utiliser filters ici
        });
        console.log(response)
        return response.data.result; // Retourner la réponse

    }
); // slice/getclientDelete identifiant uniquepour la methode
export const getclientDelete = createAsyncThunk("slice/getclientDelete",
    async () => {
        const response = await axios.delete(`http://localhost:5000/api/client/SOLEVO/Delete/41101462`)
        return response
    }   
)

export const clientSlice = createSlice({
            name: "slice",
            initialState: {
                value: 0,
                clientList: [],
                status: "idle", // idle | loading | succeeded | failed
                error: null,
                filters: {
                    code: "",
                    rsoc: "",
                    adresse: "",
                    cp: "",
                    email: "",
                }
            },
            reducers: {
                // Action synchrone pour modifier les filtres
                FilltersSaisieUser: (state, action) => {
                    const { valeur, collonne } = action.payload;
                    state.filters[collonne] = valeur; // Correction ici
                }
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
                    
                    .addCase(getclientDelete.pending, (state) => {
                        state.status = "loading";
                        console.log(state.status)
                    })
                    .addCase(getclientDelete.fulfilled, (state, action) => {
                        state.status = "succeeded";
                        state.clientList = action.payload;
                        console.log(state.status)
                    })
                    .addCase(getclientDelete.rejected, (state, action) => {
                        state.status = "failed";
                        state.error = action.error.message;
                        console.log(state.status)
                    });
            }
        });

export const { FilltersSaisieUser } = clientSlice.actions;
export default clientSlice.reducer;
