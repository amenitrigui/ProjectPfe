import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const ajouterCodePostal = createAsyncThunk(
  "CodePostaleSlice/ajouterCodePostal",
  async (_, thunkAPI) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL.replace(/\/$/, '')}/api/codePostal/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/ajouterCodePostal`,
      {
        CodePostalInfo: thunkAPI.getState().codePostaleSlice.CpostaleInfo,
      },
      {
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );
    return response.data.newCodePostal;
  }
);
const cpostalInfoInitiales = {
  CODEp: "",
  desicp: "",
};
export const cpostalSlice = createSlice({
  name: "cpostaleslice",
  initialState: {
    cpostalInfoInitiales,
    CpostaleInfo: {
      ...cpostalInfoInitiales,
    },

    status: "inactive",
    erreur: null,
  },
  reducers: {
    setCodePostaleList: (state, action) => {
      state.listeCodeRegion = action.payload;
    },
    setCodePostaleInfos: (state, action) => {
      // * actions fiha les donnes (payload)
      // * exemple d'objet action : action: {payload: {}}
      const { colonne, valeur } = action.payload;
      state.CpostaleInfo[colonne] = valeur;
    }, // el reducer houwa haja simple
    setCPostaleInfosEntiere: (state, action) => {
      state.CpostaleInfo = action.payload;
    },
    viderChampsCPostalInfo: (state) => {
      state.CpostaleInfo = {
        ...cpostalInfoInitiales,
      };
    },
  },
  // * on utilise l'objet builder pour replacer l'opérateur switch case ...
  // * l'objet builder nous permet d'écrire des cas plus lisibles et flexibles
  extraReducers: (builder) => {
    builder
      .addCase(ajouterCodePostal.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(ajouterCodePostal.fulfilled, (state, action) => {
        state.status = "réussi";
        state.CpostaleInfo = action.payload;
      })
      .addCase(ajouterCodePostal.rejected, (state, action) => {
        state.status = "échoué";
        state.erreur = action.erreur;
      });
  },
});

export const {
  setCodePostaleList,
  viderChampsCPostalInfo,
  setCPostaleInfosEntiere,
  setCodePostaleInfos,
} = cpostalSlice.actions;
export default cpostalSlice.reducer;
