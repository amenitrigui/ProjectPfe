import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getlistepointvente = createAsyncThunk(
  "StockSlice/getlistepointvente",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL.replace(/\/$/, '')}/api/Stock_Article/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getlistepointvente`, {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().utilisateurSystemSlice.token}`
        }
      }
    );
    return response.data.listepointVente;
  }
);

export const getListedepotdeStockparpcodepointvente = createAsyncThunk(
  "StockSlice/getListedepotdeStockparpcodepointvente",
  async (parames, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL.replace(/\/$/, '')}/api/Stock_Article/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getListedepotdeStockparpcodepointvente`,
      {
        params: { codepv: parames.codepv, codeArticle: parames.codeArticle },
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().utilisateurSystemSlice.token}`
        }
      }
    );

    return response.data.listedepot; // Retourner seulement les données
  }
);
// * thunk pour récuperer la quantité totale d'un article dans tous les depots
export const getQteTotalArticle = createAsyncThunk(
  "StockSlice/getQteTotalArticle",
  async (codeArticle, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL.replace(/\/$/, '')}/api/Stock_Article/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getQteTotalArticle`,
      {
        params: {
          codeArticle: codeArticle,
        },
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().utilisateurSystemSlice.token}`
        }
      }
    );

    return response.data.qteTotal;    
  }
);

export const Stock_Slice = createSlice({
  name: "StockSlice",
  initialState: {
    listePointVente: [],
    listedepot: [],
    StockInfo: [],
    status: "",
    erreur: "",
    qteTotArticle: 0
  },
  reducers: {
    setListeStock: (state, action) => {
      state.listePointVente = action.payload;
    },
    setListeDepot: (state, action) => {
      state.listedepot = action.payload;
    },
    setStockInfosEntiere: (state, action) => {
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
      .addCase(
        getListedepotdeStockparpcodepointvente.fulfilled,
        (state, action) => {
          state.listedepot = action.payload; // Correction: utiliser listeStock au lieu de listeFamilles
          state.status = "reussi";
        }
      )
      .addCase(
        getListedepotdeStockparpcodepointvente.rejected,
        (state, action) => {
          state.erreur = action.error.message;
          state.status = "echoue";
        }
      )
      
      .addCase(getQteTotalArticle.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(
        getQteTotalArticle.fulfilled,
        (state, action) => {
          state.qteTotArticle = action.payload;
          state.status = "reussi";
        }
      )
      .addCase(
        getQteTotalArticle.rejected,
        (state, action) => {
          state.erreur = action.error.message;
          state.status = "echoue";
        }
      );
  },
});

// Correction de l'export des actions (cohérence avec le nom dans les reducers)
export const { setListeStock, setStockInfosEntiere, setListeDepot } =
  Stock_Slice.actions;

export default Stock_Slice.reducer;
