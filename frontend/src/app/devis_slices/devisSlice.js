import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Action asynchrone pour récupérer la liste des devis
export const getDevisList = createAsyncThunk(
  "slice/getDevisList",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/SOLEVO/devis`
    );

    return response.data.devisList; // ✅ Retourner uniquement les données utiles
  }
);
export const AjouterDevis = createAsyncThunk(
  "slice/AddDevis",
  async (_thunkAPI) => {
    const devisInfo = _thunkAPI.getState().DevisCrud.devisInfo;
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/devis/SOLEVO/create`,
      { devisInfo }
    );

    return response
  }
)

export const devisSlice = createSlice({
  name: "devisSlice", // ✅ Correction du nom
  initialState: {
    DevisList: [],
    devisInfo:
    {
      NUMBL:"",
      libpv:"",
      adresse:"",
      code:"",
      cp:"",
      DATEBL:"",
      MREMISE:"",
      MTTC:"",
      comm:"",
      RSREP:"",
      CODEREP:"",
      usera:"",
      rsoc:"",
      codesecteur:"",
      MHT:"",
      articles:[],


    },
    status: "idle", // ✅ Doit être dans initialState
    error: null, // ✅ Doit être dans initialState
  },
  reducers: {
    setDevisInfo:(state,action)=>{
      const {collone,valeur}=action.payload;
      state.devisInfo[collone]=valeur;
    }

  },

  extraReducers: (builder) => {
    builder
      .addCase(getDevisList.pending, (state) => {
        state.status = "loading";
        console.log(state.status);
      })
      .addCase(getDevisList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.DevisList = action.payload; // ✅ Action contient les données
        console.log(action);
      })
      .addCase(getDevisList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.log(action);
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
      });
  },
});
export const {setDevisInfo}=devisSlice.actions

export default devisSlice.reducer;
