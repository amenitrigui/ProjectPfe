import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { PURGE } from "redux-persist";

export const deconnexionUtilisateur = createAsyncThunk(
  "auth/deconnexionUtilisateur",
  async (navigate, thunkAPI) => {
    // * try catch my beloved
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/utilisateurs/deconnecterUtilisateur`
      );
      window.sessionStorage.clear();
      window.localStorage.clear();
      navigate("/");
      window.location.reload(true);
    } catch (error) {
      console.log(error);
    }
  }
);
export const loginUtilisateur = createAsyncThunk(
  "utilisateurSlice/loginUtilisateur",
  async (infosConnexion, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/utilisateurs/loginUtilisateur`,
        {
          nom: infosConnexion.nom,
          motpasse: infosConnexion.motpasse,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const deconnecterUtilisateur = createAsyncThunk(
  "utilisateurSlice/deconnecterUtilisateur",
  async (_, thunkAPI) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/utilisateurs/deconnecterUtilisateur`
    );
  }
);

export const getUtilisateurParCode = createAsyncThunk(
  "utilisateurSlice/getUtilisateurParCode",
  async (codeuser, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/utilisateurSystem/getUtilisateurParCode`,
        {
          params: {
            codeuser: codeuser,
          },
          headers: {
            Authorization: `Bearer ${
              thunkAPI.getState().utilisateurSystemSlice.token
            }`,
          },
        }
      );
      return response.data.utilisateur;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const filterListeUtilisateur = createAsyncThunk(
  "utilisateurSlice/filterListeUtilisateur",
  async (_, thunkAPI) => {
    // Passer `filters` en paramètre
    const filterutilisateur =
      thunkAPI.getState().utilisateurSlice.filtersUtilisateur;
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/utilisateurSystem/filterListeUtilisateur`,
      {
        params: {
          filters: filterutilisateur, // Utiliser filters ici
        },
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );

    return response.data.data; // Retourner la réponse
  }
);

export const getDerniereCodeUtilisateur = createAsyncThunk(
  "utilisateurSlice/getDerniereCodeUtilisateur",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/utilisateurSystem/getDerniereCodeUtilisateur`
    );
    return response.data.derniereCodeUtilisateur;
  }
);

export const getListeUtilisateurParCode = createAsyncThunk(
  "utilisateurSlice/getListeUtilisateurParCode",
  async (codeuser, thunkAPI) => {
    console.log(codeuser);
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/utilisateurSystem/getListeUtilisateurParCode`,
      {
        params: {
          codeuser: codeuser,
        },
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );
    console.log(response);
    return response.data.result;
  }
);
export const getListeUtilisateurParNom = createAsyncThunk(
  "utilisateurSlice/getListeUtilisateurParNom",
  async (nom,thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/utilisateurSystem/getListeUtilisateurParNom`,
      {
        params: {
          nom: nom,
        },
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );
    return response.data.result;
  }
);
export const getListeUtilisateurParDirecteur = createAsyncThunk(
  "utilisateurSlice/getListeUtilisateurParDirecteur",
  async (directeur,thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/utilisateurSystem/getListeUtilisateurParDirecteur`,
      {
        params: {
          directeur: directeur,
        },
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );
    return response.data.result;
  }
);
export const getListeUtilisateurParType = createAsyncThunk(
  "utilisateurSlice/getListeUtilisateurParType",
  async (type, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/utilisateurSystem/getListeUtilisateurParType`,
      {
        params: {
          type: type,
        },
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );
    return response.data.result;
  }
);
export const getListeUtilisateur = createAsyncThunk(
  "utilisateurSlice/getListeUtilisateur",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/utilisateurSystem/getListeUtilisateur`,
      {
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );
    return response.data.result;
  }
);
export const AjouterUtilisateur = createAsyncThunk(
  "slice/AjouterUtilisateur",
  async (_, thunkAPI) => {
    const UtilisateurInfos = thunkAPI.getState().clientSlice.clientInfos;
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/utilisateurs/AjouterUtilisateur`,
      {
        UtilisateurInfos,
      },  {
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
export const getListeCodesUtilisateur = createAsyncThunk(
  "utilisateurSlice/getListeCodesUtilisateur",
  async (_, thunkAPI) => {
    const response = await axios.get(
      `
      ${process.env.REACT_APP_API_URL}/api/utilisateurSystem/getListeCodesUtilisateur
      `,
      {
        headers: {
          Authorization: `Bearer ${
            thunkAPI.getState().utilisateurSystemSlice.token
          }`,
        },
      }
    );

    return response.data.listeCodesUtilisateur;
  }
);
export const uploadImageUtilisateur = createAsyncThunk(
  "utilisateurSlice/uploadImageUtilisateur",
  async ({ codeuser, imageFile }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/utilisateurs/uploadImage/${codeuser}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return { imageUrl: response.data.imageUrl };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
const infoUtilisateurInitiales = {
  codeuser: "",
  nom: "",
  type: "",
  directeur: "",
  image: "",
};
export const utilisateurSlice = createSlice({
  name: "utilisateurSlice",
  initialState: {
    codeuser: "",
    status: "",
    infoUtilisateurInitiales,
    erreur: "",
    listeUtilisateur: [],
    responseLogin: {},
    infosUtilisateur: {
      ...infoUtilisateurInitiales,
    },

    filtersUtilisateur: {
      codeuser: "",
      type: "",
      email: "",
      directeur: "",
      nom: "",
    },

    derniereCodeUtilisateur: "",
    listeUtilisateur_Superviseur: [],
    listeCodesUtilisateur: [],
  },
  reducers: {
    setListeUtilisateur_Superviseur: (state, action) => {
      state.listeUtilisateur_Superviseur = action.payload;
    },
    setCodeUser: (state, action) => {
      state.codeuser = action.payload;
    },
    setListeUtilisateur: (state, action) => {
      state.listeUtilisateur = action.payload;
    },
    setInfosUtilisateur: (state, action) => {
      const { colonne, valeur } = action.payload;
      state.infosUtilisateur[colonne] = valeur;
    },
    setInfosUtilisateurEntiere: (state, action) => {
      state.infosUtilisateur = action.payload;
    },
    setFiltresSaisient: (state, action) => {
      const { colonne, valeur } = action.payload;
      state.filtersUtilisateur[colonne] = valeur;
    },
    viderChampsInfosUtilisateur: (state, action) => {
      state.infosUtilisateur = {
        ...infoUtilisateurInitiales,
      };
    },
    viderResponseLogin: (state, action) => {
      state.responseLogin = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUtilisateurParCode.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getUtilisateurParCode.fulfilled, (state, action) => {
        state.status = "réussi";
        state.infosUtilisateur = action.payload;
      })
      .addCase(getUtilisateurParCode.rejected, (state, action) => {
        state.status = "échec";
        state.erreur = action.erreur;
      })

      .addCase(loginUtilisateur.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(loginUtilisateur.fulfilled, (state, action) => {
        if (action.payload && action.payload != {}) {
          state.responseLogin = action.payload;
          state.status = "succès";
        }
      })
      .addCase(loginUtilisateur.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "échec";
      })

      .addCase(uploadImageUtilisateur.fulfilled, (state, action) => {
        state.infosUtilisateur.imageUrl = action.payload.imageUrl;
      })

      .addCase(filterListeUtilisateur.pending, (state, action) => {
        state.status = "chagement";
      })
      .addCase(filterListeUtilisateur.fulfilled, (state, action) => {
        state.status = "succès";
        state.listeUtilisateur_Superviseur = action.payload;
      })
      .addCase(filterListeUtilisateur.rejected, (state, action) => {
        state.status = "échec";
      })

      .addCase(getDerniereCodeUtilisateur.pending, (state, action) => {
        state.status = "chagement";
      })
      .addCase(getDerniereCodeUtilisateur.fulfilled, (state, action) => {
        state.status = "succès";
        state.derniereCodeUtilisateur = action.payload;
      })
      .addCase(getDerniereCodeUtilisateur.rejected, (state, action) => {
        state.status = "échec";
      })

      .addCase(getListeUtilisateurParCode.pending, (state, action) => {
        state.status = "chagement";
      })
      .addCase(getListeUtilisateurParCode.fulfilled, (state, action) => {
        state.status = "succès";
        if (action.payload && action.payload.length > 0) {
          // state.Utilisateur_SuperviseurInfos = action.payload[0];
          state.listeUtilisateur_Superviseur = action.payload;
        }
      })
      .addCase(getListeUtilisateurParCode.rejected, (state, action) => {
        state.status = "échec";
      })

      .addCase(getListeUtilisateurParNom.pending, (state, action) => {
        state.status = "chagement";
      })
      .addCase(getListeUtilisateurParNom.fulfilled, (state, action) => {
        state.status = "succès";
        state.listeUtilisateur_Superviseur = action.payload;
      })
      .addCase(getListeUtilisateurParNom.rejected, (state, action) => {
        state.status = "échec";
      })

      .addCase(getListeUtilisateurParDirecteur.pending, (state, action) => {
        state.status = "chagement";
      })
      .addCase(getListeUtilisateurParDirecteur.fulfilled, (state, action) => {
        state.status = "succès";
        state.listeUtilisateur_Superviseur = action.payload;
      })
      .addCase(getListeUtilisateurParDirecteur.rejected, (state, action) => {
        state.status = "échec";
      })

      .addCase(getListeUtilisateurParType.pending, (state, action) => {
        state.status = "chagement";
      })
      .addCase(getListeUtilisateurParType.fulfilled, (state, action) => {
        state.status = "succès";
        state.listeUtilisateur_Superviseur = action.payload;
      })
      .addCase(getListeUtilisateurParType.rejected, (state, action) => {
        state.status = "échec";
      })

      .addCase(getListeUtilisateur.pending, (state, action) => {
        state.status = "chagement";
      })
      .addCase(getListeUtilisateur.fulfilled, (state, action) => {
        state.listeUtilisateur_Superviseur = action.payload;
        state.status = "succès";
      })
      .addCase(getListeUtilisateur.rejected, (state, action) => {
        state.status = "échec";
      })

      .addCase(getListeCodesUtilisateur.pending, (state, action) => {
        state.status = "chagement";
      })
      .addCase(getListeCodesUtilisateur.fulfilled, (state, action) => {
        state.listeCodesUtilisateur = action.payload;
        state.status = "succès";
      })
      .addCase(getListeCodesUtilisateur.rejected, (state, action) => {
        state.status = "échec";
      });
  },
});

export const {
  setCodeUser,
  setFiltresSaisient,
  setListeUtilisateur,
  setInfosUtilisateur,
  setInfosUtilisateurEntiere,
  setListeUtilisateur_Superviseur,
  viderChampsInfosUtilisateur,
  viderResponseLogin,
} = utilisateurSlice.actions;
export default utilisateurSlice.reducer;
