import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk pour récupérer la liste des clients
export const getClientList = createAsyncThunk(
  "slice/getClientList",
  async () => {
    const response = await axios.get(`${process.env.BACKEND_URL}/api/client/SOLEVO/List`
    );
    return response.data.result;
  }
);

export const addClient = createAsyncThunk(
    "slice/addClient",
    async(_, thunkApi) => {
        const clientInfos = thunkApi.getState().ClientCrud.clientInfos;
        console.log(clientInfos);
        const response = await axios.post(`${process.env.BACKEND_URL}/api/client/SOLEVO/Add`, {
            clientInfos
        })
        console.log(response);
        return response.data;
    }
)
export const updateclient=createAsyncThunk(
    "slice/updateClient",
    async(_,thunkAPI)=>
        {   
            const clientUpdate = thunkAPI.getState().ClientCrud.clientUpdate;
            console.log(clientUpdate)
          
        clientUpdate.rsoc= "aaaaaa";
        const response = await axios.put(`${process.env.BACKEND_URL}/api/client/SOLEVO/Update`,
            {clientUpdate} // htha y3niii bch tjib les donnes il kol htha body 
        )
        return response
    }

)

// Thunk pour filtrer les clients (Correction ici)
export const getClientFilter = createAsyncThunk(
    "slice/getClientFilter",
    async (_, thunkAPI) => { // Passer `filters` en paramètre
        console.log("ddd")
        const response = await axios.get(`http://localhost:5000/api/client/SOLEVO/filterClient`, {
            params:{
                filters: thunkAPI.getState().ClientCrud.filters, // Utiliser filters ici
            }
        });
        console.log(response)
        return response.data.data; // Retourner la réponse

    }
); // slice/deleteClient identifiant uniquepour la methode
export const deleteClient = createAsyncThunk("slice/deleteClient",
    async (_,thunkAPI) => {
        const id = thunkAPI.getState().ClientCrud.clientAsuprimer;
        const response = await axios.delete(`http://localhost:5000/api/client/SOLEVO/Delete/${id}`)
        return response
    }   
)

export const clientSlice = createSlice({
            name: "slice",
            initialState: {
            clientInfos: {},//Add  formulaire 
            value: 0,
            clientList: [],
            clientUpdate:{},
            clientAsuprimer: "", // id reeelement code 
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
                },
                setClientInfos: (state, action) => {
                    const { field, value } = action.payload; //actions fiha les donnes (payload)
                    state.clientInfos[field] = value;
                },// haja simple 
                setclientAsupprimer :(state,action)=>{
                    const {id}=action.payload;
                    state.clientAsuprimer=id;
                },
                setclientMiseJOUR :(state,action)=>{
                    const {clientMiseAjour}=action.payload;
                    state.clientUpdate=clientMiseAjour;
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

                    .addCase(deleteClient.pending, (state) => {
                        state.status = "loading";
                        console.log(state.status)
                    })
                    .addCase(deleteClient.fulfilled, (state, action) => {
                        state.status = "succeeded";
                        console.log(action.payload)
                        console.log(state.status)
                    })
                    .addCase(deleteClient.rejected, (state, action) => {
                        state.status = "failed";
                        state.error = action.error.message;
                        console.log(state.status)
                    })

                    .addCase(addClient.pending, (state) => {
                        console.log("pending");
                        state.status = "pending"
                    })
                    .addCase(addClient.fulfilled, (state, action) => {
                    console.log("succeeded");
                    state.status = "succeeded";
                    })
                    .addCase(addClient.rejected, (state, action) => {
                    console.log(action.payload);
                    state.status = "failed";
                    state.error = action.payload;
                    })

                    .addCase(updateclient.pending, (state) => {
                        console.log("pending");
                        state.status = "pending"
                    })
                    .addCase(updateclient.fulfilled, (state, action) => {
                        console.log("succeeded");
                        state.status = "succeeded";
                    })
                    .addCase(updateclient.rejected, (state, action) => {
                        console.log(action);
                        state.status = "failed";
                        state.error = action.payload;
                    });
                   


            }
        });

export const { FilltersSaisieUser,setClientInfos ,setclientAsupprimer,setclientMiseJOUR} = clientSlice.actions;
export default clientSlice.reducer;
