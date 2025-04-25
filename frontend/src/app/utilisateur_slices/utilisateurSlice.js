import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUtilisateur = createAsyncThunk(
  "utilisateurSlice/loginUtilisateur",
  async (infosConnexion, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/utilisateurs/loginUtilisateur`, {
          nom: infosConnexion.nom,
          motpasse: infosConnexion.motpasse 
        }
      )

      console.log(response);
    }catch(error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      )
    }
  }
)

export const deconnecterUtilisateur = createAsyncThunk(
  "utilisateurSlice/deconnecterUtilisateur",
  async(_,thunkAPI) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/utilisateurs/deconnecterUtilisateur`
    )

    console.log(response)
  }
)

export const getUtilisateurParCode = createAsyncThunk(
  "utilisateurSlice/getUtilisateurParCode",
  async (codeuser, thunkAPI) => {
    console.log(codeuser);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/utilisateurs/getUtilisateurParCode/${codeuser}`);

      console.log(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const utilisateurSlice = createSlice({
  name: "utilisateurSlice",
  initialState: {
    codeuser: "",
    status: "",
    erreur: "",
    listeUtilisateur: [],
    infosUtilisateur: {
      codeuser: "",
      nom: "",
      type:"",
      directeur:""
    },
  },
  reducers: {
    setCodeUser: (state, action) => {
      state.codeuser = action.payload;
    },
    setListeUtilisateur: (state, action) => {
      state.listeUtilisateur = action.payload;
    },
    setutilisateurSliceEntire: (state,action)=>{
      state.infosUtilisateur=action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUtilisateurParCode.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(getUtilisateurParCode.fulfilled, (state, action) => {
        state.status = "réussi";
        state.listeUtilisateur = action.payload;
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
        // state.token = action.payload.token;
        state.status = "succès";
      })
      .addCase(loginUtilisateur.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "échec";
      })
  },
});

export const { setCodeUser, setListeUtilisateur,setutilisateurSliceEntire } =
  utilisateurSlice.actions;
export default utilisateurSlice.reducer;
