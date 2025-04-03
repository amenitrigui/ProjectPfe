import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// * récupere la liste de familles
// * exemple :
// * input : ""
// * output : liste des familles : ["Fam1", "Fam2", "Fam3", ...]
export const getArticleFamiles = createAsyncThunk(
  "Slice/getArticleFamiles",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/article/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/getListeFamilles`
    );
    return response.data.familles;
  }
);

// * méthode pour récuperer la liste de codes d'articles
// * exemple : 
// * input : ""
// * output: Liste codes articles : ["CodeArt1", "CodeArt2", "CodeArt3", "CodeArt4", "CodeArt5", ...]

export const getListeCodesArticles = createAsyncThunk(
  "Slice/getListeCodesArticles",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/article/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/getToutCodesArticle`
      // $paramettre de la requette
    );
    console.log(response);
    return response.data.listeCodesArticles
    ;
  }
);

// * supprimer un article par code
// * exemple : 
// * input : YDKITV1
// * output : article ayant le code YDKITV1 sera supprimé
export const suprimerArticle = createAsyncThunk(
  "Slice/suprimerArticle",
  // ! chaque thunk contient deux paramètres : 
  // ! param1 (code) : à passer au moment de l'appel de la méthode
  // ! param2 (thunkAPI) : un paramètres supplementaire qui revient de la méthode createAsyncThunk
  async (code,thunkAPI) => {
    console.log(code)
    const response = await axios.delete(`
      ${process.env.REACT_APP_API_URL}/api/article/${
      thunkAPI.getState().UtilisateurInfo.dbName
      }/suprimerArticle/${code}
    `);
    console.log(response)
    return response
  }
);

// * méthode pour récuperer toutes les articles par un code
// * exemple : input :
// ! outdated
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

// * méthode pour récuperer la liste de codes familles
// * exemple : 
// * input : ""
// * output: Liste codes familles : "code": "02-MAT", "libelle": "MATELAS"

export const getListeFamillesArticle = createAsyncThunk(
  "Slice/getListeFamillesArticle",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/article/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/getListeFamilles`
    );
    console.log(response);
    return response.data.familles
    ;
  }
);

export const articleSlice = createSlice({
  name: "articleSlice",
  initialState: {
    ListeArticle: [],
    ListeCodeArticles: [],
    ListeFamille: [],
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
      sousfamille: "",
      codebarre: "",
      nbreunite: "",
      comptec: "",
      type: "",
      typeart: "",
      colisage: "",
      import: "",
    },
  },
  reducers: {
    setArticleInfos: (state, action) => {
      const { colonne, valeur } = action.payload;
      console.log(colonne, " ", valeur);
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
        REMISE: "",
        tauxtva: "",
        puht: "",
        nbrunite: "",
        mtnetht: "",
        sousfamille: "",
        codebarre: "",
        nbreunite: "",
        comptec: "",
        type: "",
        typeart: "",
        colisage: "",
        import: "",
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

      .addCase(getListeCodesArticles.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getListeCodesArticles.fulfilled, (state, action) => {
        // state.devisInfo = action.payload[0];
        state.ListeCodeArticles = action.payload;
        console.log(action.payload);
        state.status = "reussi";
      })
      .addCase(getListeCodesArticles.rejected, (state, action) => {
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
      })
      
      .addCase(suprimerArticle.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(suprimerArticle.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = "reussi";
      })
      .addCase(suprimerArticle.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "echoue";
      })
      
      .addCase(getListeFamillesArticle.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getListeFamillesArticle.fulfilled, (state, action) => {
        state.ListeFamille = action.payload;
        state.status = "reussi";
      })
      .addCase(getListeFamillesArticle.rejected, (state, action) => {
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
