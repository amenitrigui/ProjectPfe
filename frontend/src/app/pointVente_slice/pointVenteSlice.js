import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//* url: http://localhost:5000/api/pointvente/SOLEVO/ajouterpointVente

export const ajouterpointVente = createAsyncThunk(
  "PointVenteSlice/ajouterpointVente",
  async (_, thunkAPI) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/pointvente/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/ajouterpointVente`,
      {
        PointVenteInfo: thunkAPI.getState().pointVenteSlice.pointVenteInfo,
      }
    );
    console.log(response);
    return response.data.newPointVente;
  }
);
export const getListePointVente = createAsyncThunk(
  "PointVenteSlice/getListePointVente",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/pointvente/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getListePointVente`
    );
    console.log(response);
    return response.data.data;
  }
);
export const getLibellePointVneteparPVente = createAsyncThunk(
  "PointVenteSlice/getLibellePointVneteparPVente",
  async (codepv, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/pointvente/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getLibellePointVneteparPVente`,
      {
        params: {
          Code: codepv,
        },
      }
    );
    return response.data.data[0];
  }
);

const pointVenteInfoInitiales = {
  Code: "",
  Libelle: "",
};
export const pointVenteSlice = createSlice({
  name: "pointVenteSlice",
  initialState: {
    pointVenteInfoInitiales,
    pointVenteInfo: {
      ...pointVenteInfoInitiales,
    },
    listeCodespointVente: [],
    status: "inactive",
    erreur: null,
  },
  reducers: {
    setPointVenteInfos: (state, action) => {
      // * actions fiha les donnes (payload)
      // * exemple d'objet action : action: {payload: {}}
      const { colonne, valeur } = action.payload;
      state.pointVenteInfo[colonne] = valeur;
    }, // el reducer houwa haja simple
    setPointVenteInfosEntiere: (state, action) => {
      state.pointVenteInfo = action.payload;
    },
    viderChampsPointVenteInfo: (state) => {
      state.pointVenteInfo = {
        ...pointVenteInfoInitiales,
      };
    },
  },
  // * on utilise l'objet builder pour replacer l'opérateur switch case ...
  // * l'objet builder nous permet d'écrire des cas plus lisibles et flexibles
  extraReducers: (builder) => {
    builder

      .addCase(ajouterpointVente.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(ajouterpointVente.fulfilled, (state, action) => {
        console.log(action.payload);
        /// state.RegionInfo.desirgg = action.payload.desirgg;
        state.status = "réussi";
      })
      .addCase(ajouterpointVente.rejected, (state, action) => {
        state.status = "échoué";
        state.erreur = action.payload;
      })

      .addCase(getListePointVente.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getListePointVente.fulfilled, (state, action) => {
        console.log(action.payload);
        state.listeCodespointVente = action.payload;
        state.status = "réussi";
      })
      .addCase(getListePointVente.rejected, (state, action) => {
        state.status = "échoué";
        state.erreur = action.payload;
      })

      .addCase(getLibellePointVneteparPVente.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getLibellePointVneteparPVente.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload && Object.keys(action.payload).length > 0) {
          state.pointVenteInfo.Libelle = action.payload.Libelle;
          console.log(state.pointVenteInfo.Libelle);
          //state.listeCodespointVente = action.payload;
          state.status = "réussi";
        }
      })
      .addCase(getLibellePointVneteparPVente.rejected, (state, action) => {
        state.status = "échoué";
        state.erreur = action.payload;
      });
  },
});

export const {
  viderChampsPointVenteInfo,

  setPointVenteInfosEntiere,
  setPointVenteInfos,
} = pointVenteSlice.actions;
export default pointVenteSlice.reducer;
