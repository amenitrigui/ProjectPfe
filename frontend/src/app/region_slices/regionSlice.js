import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//* récuperer la liste de codes posteaux
// * example:
// * input :
// * output : liste de codes pregion 01
export const getListeCodeRegions = createAsyncThunk(
  "clientSlice/getListeCodeRegions",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/region/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getListeCodeRegions`
    );
    return response.data.listeCodesRegion;
  }
);
//* récuperer la ville associé à un region
// * example:
// * input : 01
// * output : 01
export const getVilleParRegion = createAsyncThunk(
  "clientSlice/getVilleParRegion",
  async (codeRegion, thunkAPI) => {
    console.log("ok");
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/region/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getVilleParRegion/${codeRegion}`
    );
    console.log("response");

    return response.data.ListRegion[0];
  }
);

//* url: http://localhost:5000/api/region/SOLEVO/ajouterRegion {"RegionInfo": {   "codergg": "002",  "desirgg": "ddd"}}

export const ajouterRegion = createAsyncThunk(
  "RegionSlice/ajouterRegion",
  async (_, thunkAPI) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/region/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/ajouterRegion`,
      {
        RegionInfo: thunkAPI.getState().regionSlice.RegionInfo,
      }
    );
    console.log(response);
    return response.data.newRegion;
  }
);
const regionInfoInitiales = {
  codergg: "",
  desirgg: "",
};
export const regionSlice = createSlice({
  name: "Regionslice",
  initialState: {
    regionInfoInitiales,
    RegionInfo: {
      ...regionInfoInitiales
    },
    listeCodesRegion: [],
    status: "inactive",
    erreur: null,
  },
  reducers: {
    setRegionInfos: (state, action) => {
      // * actions fiha les donnes (payload)
      // * exemple d'objet action : action: {payload: {}}
      const { colonne, valeur } = action.payload;
      state.RegionInfo[colonne] = valeur;
    }, // el reducer houwa haja simple
    setRegionInfosEntiere: (state, action) => {
      state.RegionInfo = action.payload;
    },
    viderChampsRegionInfo: (state) => {
      state.RegionInfo = {
        ...regionInfoInitiales
      };
    },
  },
  // * on utilise l'objet builder pour replacer l'opérateur switch case ...
  // * l'objet builder nous permet d'écrire des cas plus lisibles et flexibles
  extraReducers: (builder) => {
    builder

      .addCase(getListeCodeRegions.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getListeCodeRegions.fulfilled, (state, action) => {
        state.listeCodesRegion = action.payload;
        state.status = "réussi";
      })
      .addCase(getListeCodeRegions.rejected, (state, action) => {
        state.status = "échoué";
        state.erreur = action.payload;
      })

      .addCase(getVilleParRegion.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getVilleParRegion.fulfilled, (state, action) => {
        console.log(action.payload);
        state.RegionInfo.desirgg = action.payload.desirgg;
        state.status = "réussi";
      })
      .addCase(getVilleParRegion.rejected, (state, action) => {
        state.status = "échoué";
        state.erreur = action.payload;
      });
  },
});

export const {
  setRegionInfos,

  setRegionInfosEntiere,
  viderChampsRegionInfo,
} = regionSlice.actions;
export default regionSlice.reducer;
