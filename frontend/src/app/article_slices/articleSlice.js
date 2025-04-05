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
    return response.data.listeCodesArticles;
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
  async (code, thunkAPI) => {
    const response = await axios.delete(`
      ${process.env.REACT_APP_API_URL}/api/article/${
      thunkAPI.getState().UtilisateurInfo.dbName
    }/suprimerArticle/${code}
    `);
    return response;
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

    return response.data.familles;
  }
);
// * thunk pour récuperer la liste d'articles
// * exemple
// * input : ""
// * output: liste d'articles : [{"code": "art1", "libelle": "libelleArt1",...}, ...]
export const getListeArticles = createAsyncThunk(
  "Slice/getListeArticles",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/article/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/getListeArticles`
    );
    return response.data.listeArticles;
  }
);
// * thunk pour filtrer la liste d'articles
// * exemple
// * input : filter={type: "testType", "libelle": "testLibelle"}
// * output: listeArticles = [{"code": "testCode", "libelle": "testLibelle", ... ""}]
export const filtrerListeArticle = createAsyncThunk(
  "Slice/filtrerListeArticle",
  async (filters, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/article/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/filtrerListeArticle`,
      {
        params: {
          filters: filters,
        },
      }
    );

    return response.data.data;
  }
);

// * thunk pour récuperer la désignation d'un code famille
// * exemple
// * input : 02-MAS
// * output: MASLETA
export const getDesignationFamilleParCodeFamille = createAsyncThunk(
  "articleSlice/getDesignationFamilleParCodeFamille",
  async (codeFamille, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/article/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/getDesignationFamilleParCodeFamille/${codeFamille}`
    );
    return response.data.getDesignationFamilleParCodeFamille[0].libelle;
  }
);

export const getListecodesousFamille = createAsyncThunk(
  "article/getListecodesousFamille",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/article/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/getListecodesousFamille`
    );
    return response.data.getcodesousFamille;
  }
);
export const getdesignationSousFamillebycodeSousFamille = createAsyncThunk(
  "article/getdesignationSousFamillebycodeSousFamille",
  async (codeSousFamille, thunkAPI) => {
    console.log(codeSousFamille);
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/article/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/getdesignationSousFamillebycodeSousFamille/${codeSousFamille}`
    );
    console.log(response.data.libelle[0].libelle);
    return response.data.libelle[0].libelle;
  }
);
export const getArticleParCode = createAsyncThunk(
  "article/getArticleParCode",
  async (code, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/article/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/getArticleParCode/${code}`
    );
    console.log(response);
    return response.data.article[0];
  }
);

export const ajouterArticle = createAsyncThunk(
  "articleSlice/ajouterArticle",
  async (_, thunkAPI) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/article/${
        thunkAPI.getState().UtilisateurInfo.dbName
      }/ajouterArticle`,
      // * body/ req.body : c'est l'objet equivalent à req.body dans le backend
      {
        articleAjoute: thunkAPI.getState().ArticlesDevis.articleInfos,
      }
    );

    console.log(response);
  }
);

const defaultArticleInfos = {
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
  fodec: "",
  prixbrut: "",
  prixnet: "",
  libelleFamille: "",
  Libellesousfamille: ""
};

export const articleSlice = createSlice({
  name: "articleSlice",
  initialState: {
    ListeArticle: [],
    ListeCodeArticles: [],
    ListeFamille: [],
    ListeSousFamille: [],
    ListeCodeArticlesparLib: {},
    defaultArticleInfos,
    articleInfos: {...defaultArticleInfos},
  },
  reducers: {
    setArticleInfos: (state, action) => {
      const { colonne, valeur } = action.payload;
      state.articleInfos[colonne] = valeur;
    },
    setArticleInfosEntiere: (state, action) => {
      state.articleInfos = action.payload;
    },
    viderChampsArticleInfo: (state) => {
      state.articleInfos = {
        ...state.defaultArticleInfos
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
      })

      .addCase(getListeArticles.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getListeArticles.fulfilled, (state, action) => {
        state.ListeArticle = action.payload;
        state.status = "reussi";
      })
      .addCase(getListeArticles.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "echoue";
      })

      .addCase(filtrerListeArticle.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(filtrerListeArticle.fulfilled, (state, action) => {
        state.ListeArticle = action.payload;
        state.status = "reussi";
      })
      .addCase(filtrerListeArticle.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "echoue";
      })

      .addCase(getDesignationFamilleParCodeFamille.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(
        getDesignationFamilleParCodeFamille.fulfilled,
        (state, action) => {
          state.articleInfos.libelleFamille = action.payload;
          state.status = "reussi";
        }
      )
      .addCase(
        getDesignationFamilleParCodeFamille.rejected,
        (state, action) => {
          state.erreur = action.payload;
          state.status = "echoue";
        }
      )

      .addCase(getListecodesousFamille.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getListecodesousFamille.fulfilled, (state, action) => {
        state.ListeSousFamille = action.payload;
        state.status = "reussi";
      })
      .addCase(getListecodesousFamille.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "echoue";
      })

      .addCase(getdesignationSousFamillebycodeSousFamille.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(
        getdesignationSousFamillebycodeSousFamille.fulfilled,
        (state, action) => {
          state.articleInfos.Libellesousfamille = action.payload;
          state.status = "reussi";
        }
      )
      .addCase(
        getdesignationSousFamillebycodeSousFamille.rejected,
        (state, action) => {
          state.erreur = action.payload;
          state.status = "echoue";
        }
      )
      .addCase(getArticleParCode.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getArticleParCode.fulfilled, (state, action) => {
        if (action.payload && action.payload != {}) {
        console.log(action.payload)
          state.articleInfos = action.payload;
        }
        state.status = "reussi";
      })
      .addCase(getArticleParCode.rejected, (state, action) => {
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
