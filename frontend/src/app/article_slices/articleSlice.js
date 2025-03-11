import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const getArticleFamiles = createAsyncThunk(
  "Slice/getArticleFamiles",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/article/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/familles`
    );

    return response.data.familles;
  }
);
export const getCodeArticle = createAsyncThunk(
  "Slice/getCodeArticle",
  async (famille, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/article/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/codes/famille/${famille}`
      // $paramettre de la requette
    );
    // console.log(response);
    return response.data.articles;
  }
);
export const getTousArticleparcode = createAsyncThunk(
  "Slice/getArticleLibeleparcode",
  async (code, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/article/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/articles/details/${code}`
    );
    console.log(response);
    return response.data.article;
  }
);

export const articleSlice = createSlice({
  name: "articleSlice",
  initialState: {
    ListeArticle: [],
    ListeCodeArticles: [],
    ListeCodeArticlesparLib: {},
    articleInfos: {
      famille: "",
      code: "",
      unite: "",
      libelle: "",
      quantite: "",
      CONFIG: "",
      REMISE: "",
      tauxtva: "",
      puht: "",
      nbrunite: "",
      mtnetht: "",
    },
  },
  reducers: {
    setArticleInfos: (state, action) => {
      const { colonne, valeur } = action.payload;
      console.log(colonne, " ", valeur)
      state.articleInfos[colonne] = valeur;
    },
    setArticleInfosEntiere: (state, action) => {
      state.articleInfos = action.payload;
    },
    viderChampsArticleInfo: (state) => {
      state.articleInfos = {
        famille: "",
        code: "",
        unite: "",
        libelle: "",
        quantite: "",
        CONFIG: "",
        DREMISE: "",
        tauxtva: "",
        puht: "",
        nbrunite: "",
        netHt: "",
        puttc: ""
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticleFamiles.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getArticleFamiles.fulfilled, (state, action) => {
        // state.devisInfo = action.payload[0];
        state.ListeArticle = action.payload;
        state.status = "reussi";
      })
      .addCase(getArticleFamiles.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "echoue";
      })

      .addCase(getCodeArticle.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getCodeArticle.fulfilled, (state, action) => {
        // state.devisInfo = action.payload[0];
        state.ListeCodeArticles = action.payload;
        console.log(action.payload);
        state.status = "reussi";
      })
      .addCase(getCodeArticle.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "echoue";
      })

      .addCase(getTousArticleparcode.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getTousArticleparcode.fulfilled, (state, action) => {
        // state.devisInfo = action.payload[0];
        console.log(action.payload);
        state.ListeCodeArticlesparLib = action.payload;
        state.status = "reussi";
      })
      .addCase(getTousArticleparcode.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "echoue";
      });
  },
});
export const {
  setArticleInfos,
  setArticleInfosEntiere,
  viderChampsArticleInfo,
} = articleSlice.actions;
export default articleSlice.reducer;
