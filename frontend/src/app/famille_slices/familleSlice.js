import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// * thunk pour récuperer la liste de familles par code
export const getListeFamillesParCodeFamille = createAsyncThunk(
  "familleSlice/getListeFamillesParCodeFamille",
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
    return response.data.listeFamilles;
  }
);
// * thunk pour récuperer la liste de familles par libelle

// * thunk pour récuperer la liste de sous-familles par code

// * thunk pour récuperer la liste de sous-familles par libelle

export const familleSlice = createSlice({
  name: "familleSlice",
  initialState: {
    listeFamilles: [],
    status: "",
    erreur: "",
  },
  reducers: {
    setListeFamilles: (state, action) => {
      state.listeFamilles = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getListeFamillesParCodeFamille.pending, (state, action) => {
        state.status = "chargement";
      })
      .addCase(getListeFamillesParCodeFamille.fulfilled, (state, action) => {
        state.listeFamilles = action.payload;
        state.status = "succès";
      });
  },
});
export const { setListeFamilles } = familleSlice.actions;

export default familleSlice.reducer;
