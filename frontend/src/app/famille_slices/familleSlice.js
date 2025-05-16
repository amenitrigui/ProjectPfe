import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// * thunk pour récuperer la liste de familles par code
export const getListeFamillesParCodeFamille = createAsyncThunk(
  "articleSlice/getListeFamillesParCodeFamille",
  async (codeFamille, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/famille/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getListeFamillesParCodeFamille`,
      {
        params: {
          codeFamille: codeFamille,
        },

        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );
    return response.data.getListeFamillesParCodeFamille;
  }
);

// * thunk pour récuperer la liste de familles par libelle
export const getListeFamillesParLibelleFamille = createAsyncThunk(
  "articleSlice/getListeFamillesParLibelleFamille",
  async (LibelleFamille, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/famille/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getListeFamillesParLibelleFamille/${LibelleFamille}`,
      {
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );
    return response.data.familles;
  }
);

// * thunk pour ajouter une famille
export const ajouterFamille = createAsyncThunk(
  "FamilleSlice/ajouterFamille",
  async (_, thunkAPI) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/famille/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/ajouterFamille`,
      {
        FamilleAjoute: thunkAPI.getState().familleSlice.FamilleInfos,
      },
      {
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );

    return response.data.FamilleCree;
  }
);

// * thunk pour récuperer la liste de sous-familles par libelle
const familleInfoInitiales = {
  code: "",
  libelle: "",
};
export const familleSlice = createSlice({
  name: "familleSlice",
  initialState: {
    familleInfoInitiales,
    listeFamilles: [],
    FamilleInfos: {
      ...familleInfoInitiales,
    },
    status: "",
    erreur: "",
  },
  reducers: {
    setListeFamilles: (state, action) => {
      state.listeFamilles = action.payload;
    },
    setFamilleInfosEntiere: (state, action) => {
      state.FamilleInfos = action.payload;
    },
    setFamilleInfo: (state, action) => {
      const { colonne, valeur } = action.payload;
      state.FamilleInfos[colonne] = valeur;
    },
    viderFamilleInfos: (state) =>{
      state.FamilleInfos = {
        ...familleInfoInitiales
      }
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getListeFamillesParCodeFamille.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getListeFamillesParCodeFamille.fulfilled, (state, action) => {
        state.listeFamilles = action.payload;
        // state.articleInfos.libelleFamille = action.payload;
        state.status = "reussi";
      })
      .addCase(getListeFamillesParCodeFamille.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "echoue";
      })

      .addCase(getListeFamillesParLibelleFamille.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getListeFamillesParLibelleFamille.fulfilled, (state, action) => {
        state.listeFamilles = action.payload;
        // state.articleInfos.libelleFamille = action.payload;
        state.status = "reussi";
      })
      .addCase(getListeFamillesParLibelleFamille.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "echoue";
      });
  },
});
export const { setListeFamilles, setFamilleInfosEntiere, setFamilleInfo, viderFamilleInfos } =
  familleSlice.actions;

export default familleSlice.reducer;
