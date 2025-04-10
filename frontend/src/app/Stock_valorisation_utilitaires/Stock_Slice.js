import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getlistepointvente = createAsyncThunk(
  "StockSlice/getlistepointvente",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/Stock_Article/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/getlistepointvente`
    );
    console.log(response.data.listepointVente);
    return response.data.listepointVente;
  }
);
export const getListedepotdeStockparpcodepointvente = createAsyncThunk(
  "StockSlice/getListedepotdeStockparpcodepointvente", // Ajout du type d'action
  async (codepv, thunkAPI) => {
    console.log(codepv)
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/Stock_Article/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/getListedepotdeStockparpcodepointvente`,
      {
        params: { codepv: codepv }, // Correction de la syntaxe des params
      }
    );
    console.log(response)
    
    return response.data.listedepot; // Retourner seulement les données
  }
);
export const Stock_Slice = createSlice({
  name: "StockSlice", // J'ai corrigé le nom pour qu'il corresponde au préfixe de l'action
  initialState: {
    listePointVente: [],
    listedepot:[],
    StockInfo: [],
    status: "",
    erreur: "",
  },
  reducers: {
    setListeStock: (state, action) => {
      state.listePointVente = action.payload;
    },
    setListeDepot: (state, action) => {
        state.listedepot = action.payload;
      },
    setStockInfosEntiere: (state, action) => {
      // Correction du nom (cohérence avec l'export)
      state.StockInfo = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getlistepointvente.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getlistepointvente.fulfilled, (state, action) => {
        state.listePointVente = action.payload; // Correction: utiliser listeStock au lieu de listeFamilles
        state.status = "reussi";
      })
      .addCase(getlistepointvente.rejected, (state, action) => {
        state.erreur = action.error.message; // Utilisation de action.error.message pour l'erreur
        state.status = "echoue";
      })

      .addCase(getListedepotdeStockparpcodepointvente.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getListedepotdeStockparpcodepointvente.fulfilled, (state, action) => {
        state.listedepot = action.payload; // Correction: utiliser listeStock au lieu de listeFamilles
        state.status = "reussi";
      })
      .addCase(getListedepotdeStockparpcodepointvente.rejected, (state, action) => {
        state.erreur = action.error.message; // Utilisation de action.error.message pour l'erreur
        state.status = "echoue";
      });

  },
});

// Correction de l'export des actions (cohérence avec le nom dans les reducers)
export const { setListeStock, setStockInfosEntiere,setListeDepot } = Stock_Slice.actions;

export default Stock_Slice.reducer;
