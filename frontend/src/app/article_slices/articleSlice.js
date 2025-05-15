import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  defaultArticleInfos,
  defaultLigneDevisInfos,
} from "../constantes/article";
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
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getListeFamilles`,
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

// * méthode pour récuperer la liste de codes d'articles
// * exemple :
// * input : ""
// * output: Liste codes articles : ["CodeArt1", "CodeArt2", "CodeArt3", "CodeArt4", "CodeArt5", ...]

export const getListeCodesArticles = createAsyncThunk(
  "Slice/getListeCodesArticles",
  async (codeFamille, thunkAPI) => {
    let response;
    if (!codeFamille) {
      response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/article/${
          thunkAPI.getState().utilisateurSystemSlice.dbName
        }/getToutCodesArticle`,
        {
          headers: {
            Authorization: `Bearer ${
              thunkAPI.getState().utilisateurSystemSlice.token
            }`,
          },
        }
        // $paramettre de la requette
      );
    }

    if (codeFamille) {
      response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/article/${
          thunkAPI.getState().utilisateurSystemSlice.dbName
        }/getToutCodesArticle`,
        {
          headers: {
            Authorization: `Bearer ${
              thunkAPI.getState().utilisateurSystemSlice.token
            }`,
          },

          params: {
            codeFamille: codeFamille,
          },
        }
      );
    }
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
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/article/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/suprimerArticle`,

      {
        params: {
          code: code,
        },
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );
    return response;
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
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getListeFamilles`,
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
// * thunk pour récuperer la liste d'articles
// * exemple
// * input : ""
// * output: liste d'articles : [{"code": "art1", "libelle": "libelleArt1",...}, ...]
export const getListeArticles = createAsyncThunk(
  "Slice/getListeArticles",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/article/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getListeArticles`,
      {
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );
    console.log(response);
    return response.data.listeArticles;
  }
);
// * thunk pour filtrer la liste d'articles
// * exemple
// * input : filter={type: "testType", "libelle": "testLibelle"}
// * output: listeArticles = [{"code": "testCode", "libelle": "testLibelle", ... ""}]
export const filtrerListeArticle = createAsyncThunk(
  "Slice/filtrerListeArticle",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/article/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/filtrerListeArticle`,
      {
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
        params: {
          filters: thunkAPI.getState().articleSlice.filters,
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
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getDesignationFamilleParCodeFamille`,
      {
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
        params: {
          codeFamille: codeFamille,
        },
      }
    );
    return response.data.getDesignationFamilleParCodeFamille[0].libelle;
  }
);

export const getListecodesousFamille = createAsyncThunk(
  "article/getListecodesousFamille",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/article/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getListecodesousFamille`,
      {
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );
    return response.data.getcodesousFamille;
  }
);
export const getdesignationSousFamillebycodeSousFamille = createAsyncThunk(
  "article/getdesignationSousFamillebycodeSousFamille",
  async (codeSousFamille, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/article/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getdesignationSousFamillebycodeSousFamille/${codeSousFamille}`,
      {
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );
    return response.data.libelle[0].libelle;
  }
);
export const getArticleParCode = createAsyncThunk(
  "article/getArticleParCode",
  async (code, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/article/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getArticleParCode`,
      {
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
        params: {
          code: code,
        },
      }
    );
    return response.data.article;
  }
);

export const ajouterArticle = createAsyncThunk(
  "articleSlice/ajouterArticle",
  async (_, thunkAPI) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/article/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/ajouterArticle`,
      {
        articleAjoute: thunkAPI.getState().articleSlice.articleInfos,
      },
      {
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
      // * body/ req.body : c'est l'objet equivalent à req.body dans le backend
    );

    //return response.data
  }
);
export const modifierarticle = createAsyncThunk(
  "articleSlice/ModifierArticle",
  async (code, thunkAPI) => {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/article/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/modifierArticle`,
      {
        article: thunkAPI.getState().articleSlice.articleInfos,
      },
      {
        params: {
          code: code,
        },

        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );
    return response;
  }
);

export const getListeArticleparFamille = createAsyncThunk(
  "article/getListeArticleparFamille",
  async (codeFamille, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/article/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getListeArticleparFamille`,
      {
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
        params: {
          codeFamille: codeFamille,
        },
      }
    );
    return response.data.ListecodeFamille;
  }
);

export const getListeArticleparLibelle = createAsyncThunk(
  "article/getListeArticleparLibelle",
  async (libelle, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/article/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getListeArticleparLibelle`,
      {
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
        params: {
          libelle: libelle,
        },
      }
    );
    return response.data.ListelibelleArticle;
  }
);

export const getListeArticleParSousFamille = createAsyncThunk(
  "article/getListeArticleParSousFamille",
  async (SousFamille, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/article/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getListeArticleParSousFamille/${SousFamille}`,
      {
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );
    return response.data.ListeArticleSousFamille;
  }
);

export const getListeArticleParCodeArticle = createAsyncThunk(
  "article/getListeArticleParCodeArticle",
  async (parametres, thunkAPI) => {
    let response;
    if (parametres.codeArticle) {
      response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/article/${
          thunkAPI.getState().utilisateurSystemSlice.dbName
        }/getListeArticleParCodeArticle`,
        {
          params: {
            codeArticle: parametres.codeArticle,
          },
          headers: {
            Authorization: `Bearer ${
              thunkAPI.getState().utilisateurSystemSlice.token
            }`,
          },
        }
      );
    }
    if (parametres.codeArticle && parametres.codeFamille) {
      response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/article/${
          thunkAPI.getState().utilisateurSystemSlice.dbName
        }/getListeArticleParCodeArticle`,
        {
          params: {
            codeArticle: parametres.codeArticle,
            codeFamille: parametres.codeFamille,
          },
        }
      );
    }
    return response.data.ListecodeArticle;
  }
);

export const getDerniereCodeArticle = createAsyncThunk(
  "articleSlice/getDerniereCodeArticle",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/article/${
        thunkAPI.getState().utilisateurSystemSlice.dbName
      }/getDerniereCodeArticle`,
      {
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );

    return response.data.derniereCodeArticle.code;
  }
);

// const defaultArticleInfos = {
//   code: "",
//   libelle: "",
//   unite: "",
//   famille: "",
//   codesousfam: "",
//   codebarre: "",
//   nbrunite: "",
//   comptec: "",
//   type: "",
//   typeart: "",
//   colisage: "",
//   import: "",
//   tauxtva: "",
//   prixbrut: "",
//   prixnet: "",
//   fodec: "",
//   CONFIG: "",
//   reforigine: "",
//   lieustock: "",
//   NGP: "",
//   sav: "",
//   cons: "",
//   Dtcons: "0",
//   remmax: "",
//   prix1ttc: "",
//   prix2TTC: "",
//   prix3TTC: "",
//   prix4TTC: "",

//   prix1: "",
//   prix2: "",
//   prix3: "",
//   prix4: "",
//   nomenclature: "",
//   gestionstock: "",
//   avecconfig: "",
//   ventevrac: "",
//   usera: "",
//   userm: "",
//   datecreate: new Date().toISOString().split("T")[0],
//   datemaj: new Date().toISOString().split("T")[0],
//   libelleFamille: "",
//   Libellesousfamille: "",
//   derniereCodeArticle: "",
//   quantite: "",
// };

export const articleSlice = createSlice({
  name: "articleSlice",
  initialState: {
    ListeArticle: [],
    ListeCodeArticles: [],
    ListeFamille: [],
    ListeSousFamille: [],
    ListeCodeArticlesparLib: {},
    derniereCodeArticle: "",
    filters: {
      code: "",
      libelle: "",
      famille: "",
      type: "",
      typeart: "",
      codesousfam: "",
    },
    defaultArticleInfos,
    defaultLigneDevisInfos,
    ligneDevisInfos: { ...defaultLigneDevisInfos },
    articleInfos: { ...defaultArticleInfos },
  },
  reducers: {
    setArticleInfos: (state, action) => {
      const { colonne, valeur } = action.payload;
      state.articleInfos[colonne] = valeur;
    },
    setFiltresSaisient: (state, action) => {
      const { valeur, collonne } = action.payload;
      state.filters[collonne] = valeur; // Correction ici
    },
    setLigneDevisInfos: (state, action) => {
      const { colonne, valeur } = action.payload;
      state.ligneDevisInfos[colonne] = valeur;
    },
    setArticleInfosEntiere: (state, action) => {
      state.articleInfos = action.payload;
    },
    setLigneDevisInfosEntiere: (state, action) => {
      state.ligneDevisInfos = action.payload;
    },
    setListeArticle: (state, action) => {
      state.ListeArticle = action.payload;
    },
    viderChampsArticleInfo: (state) => {
      state.articleInfos = {
        ...state.defaultArticleInfos,
      };
    },
    viderChampsLigneDevisInfos: (state) => {
      state.ligneDevisInfos = {
        ...state.defaultLigneDevisInfos,
      };
    },
    setDerniereCodeArticle: (state, action) => {
      state.derniereCodeArticle = action.payload;
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
        if (
          action.payload &&
          action.payload != [] &&
          action.payload.length != 0
        ) {
          // ! ceci est pour l'interface de recherche qui nécissite
          // ! une tableau pour populer le data table
          state.ListeArticle = action.payload;
          state.articleInfos = action.payload[0];
          state.ligneDevisInfos = action.payload[0];
        }
        state.status = "reussi";
      })
      .addCase(getArticleParCode.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "echoue";
      })

      .addCase(getListeArticleparFamille.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getListeArticleparFamille.fulfilled, (state, action) => {
        state.ListeArticle = action.payload;

        state.status = "reussi";
      })
      .addCase(getListeArticleparFamille.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "echoue";
      })

      .addCase(getListeArticleparLibelle.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getListeArticleparLibelle.fulfilled, (state, action) => {
        state.ListeArticle = action.payload;

        state.status = "reussi";
      })
      .addCase(getListeArticleparLibelle.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "echoue";
      })

      .addCase(getListeArticleParSousFamille.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getListeArticleParSousFamille.fulfilled, (state, action) => {
        state.ListeArticle = action.payload;

        state.status = "reussi";
      })
      .addCase(getListeArticleParSousFamille.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "echoue";
      })

      .addCase(getListeArticleParCodeArticle.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getListeArticleParCodeArticle.fulfilled, (state, action) => {
        state.ListeArticle = action.payload;
        state.status = "reussi";
      })
      .addCase(getListeArticleParCodeArticle.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "echoue";
      })

      .addCase(getDerniereCodeArticle.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getDerniereCodeArticle.fulfilled, (state, action) => {
        state.derniereCodeArticle = action.payload;
        state.status = "reussi";
      })
      .addCase(getDerniereCodeArticle.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "echoue";
      });
  },
});
export const {
  setArticleInfos,
  setLigneDevisInfos,
  viderChampsArticleInfo,
  setListeArticle,
  setArticleInfosEntiere,
  setLigneDevisInfosEntiere,
  viderChampsLigneDevisInfos,
  setDerniereCodeArticle,
  setFiltresSaisient,
} = articleSlice.actions;
export default articleSlice.reducer;
