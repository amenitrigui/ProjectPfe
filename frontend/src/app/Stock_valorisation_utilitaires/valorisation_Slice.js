import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getPrixVente = createAsyncThunk(
  "ValorisationSlice/getPrixVente",
  async (code, thunkAPI) => {
    console.log(code)
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/Valorisation_Article/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getPrixVente`,
      {
        params: {
          code: code,
        },
      }
    );

    console.log(response);
    return response.data.getPrixVente;
  }
);

export const valorisation_Slice = createSlice({
  name: "valorisation_Slice",
  initialState: {
    listePrixVente: [],

    status: "",
    erreur: "",
  },
  reducers: {
    setlistePrixVente: (state, action) => {
      state.listePrixVente = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getPrixVente.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getPrixVente.fulfilled, (state, action) => {
        state.listePrixVente = action.payload; // Correction: utiliser listeStock au lieu de listeFamilles
        state.status = "reussi";
      })
      .addCase(getPrixVente.rejected, (state, action) => {
        state.erreur = action.error.message; // Utilisation de action.error.message pour l'erreur
        state.status = "echoue";
      });
  },
});

// Correction de l'export des actions (cohérence avec le nom dans les reducers)
export const { setlistePrixVente } = valorisation_Slice.actions;

export default valorisation_Slice.reducer;
