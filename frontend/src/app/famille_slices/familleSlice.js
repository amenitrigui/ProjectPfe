import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// * thunk pour récuperer la liste de familles par code
// export const getListeFamillesParCodeFamille = createAsyncThunk(
//   "familleSlice/getListeFamillesParCodeFamille",
//   async (codeFamille, thunkAPI) => {
//     console.log(codeFamille);
//     const response = await axios.get(
//       `${process.env.REACT_APP_API_URL}/api/famille/${
//         thunkAPI.getState().UtilisateurInfo.dbName
//       }/getListeFamillesParCodeFamille`,
//       {
//         params: {
//           codeFamille: codeFamille,
//         },
//       }
//     );

//     console.log(response);
//    // return response.data.listeFamilles;
//   }
// );
export const getListeFamillesParCodeFamille = createAsyncThunk(
  "articleSlice/getListeFamillesParCodeFamille",
  async (codeFamille, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/famille/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/getListeFamillesParCodeFamille`,
      {
        params: {
          codeFamille: codeFamille,
        },
      }
    );
    console.log(response);
    return response.data.getListeFamillesParCodeFamille;
  }
);

// * thunk pour récuperer la liste de familles par libelle
export const getListeFamillesParLibelleFamille = createAsyncThunk(
  "articleSlice/getListeFamillesParLibelleFamille",
  async (LibelleFamille, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/famille/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/getListeFamillesParLibelleFamille/${LibelleFamille}`
    );
    console.log(response);
    return response.data.familles;
  }
);

// * thunk pour ajouter une famille
export const ajouterFamille = createAsyncThunk(
  "FamilleSlice/ajouterFamille",
  async (_, thunkAPI) => {
    console.log(thunkAPI.getState().familleSlice.FamilleInfos);
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/famille/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/ajouterFamille`,
      {
        FamilleAjoute: thunkAPI.getState().familleSlice.FamilleInfos,
      }
    );

 
    return response.data.FamilleCree;
  }
);

// * thunk pour récuperer la liste de sous-familles par libelle

export const familleSlice = createSlice({
  name: "familleSlice",
  initialState: {
    listeFamilles: [],
    FamilleInfos: {
      code: "",
      libelle: "",
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
export const { setListeFamilles, setFamilleInfosEntiere, setFamilleInfo } =
  familleSlice.actions;

export default familleSlice.reducer;
