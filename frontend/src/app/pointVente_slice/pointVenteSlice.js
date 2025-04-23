import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



//* url: http://localhost:5000/api/pointvente/SOLEVO/ajouterpointVente

export const ajouterpointVente = createAsyncThunk(
  "RegionSlice/ajouterpointVente",
  async (_, thunkAPI) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/pointvente/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/ajouterpointVente`,
      {
        pointVenteInfo: thunkAPI.getState().pointVenteSlice.pointVenteInfo,
      }
    );
    console.log(response);
 //  return response.data.newRegion
  }
);
export const pointVenteSlice = createSlice({
  name: "pointVenteSlice",
  initialState: {
    pointVenteInfo: {
      Code: "",
      Libelle: "",
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
        Code: "",
        Libelle: "",
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
      });
  },
});

export const {
    viderChampsPointVenteInfo,

    setPointVenteInfosEntiere,
    setPointVenteInfos,
} = pointVenteSlice.actions;
export default pointVenteSlice.reducer;
