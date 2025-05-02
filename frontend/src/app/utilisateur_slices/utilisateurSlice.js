import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setToken } from "../utilisateurSystemSlices/utilisateurSystemSlice";


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
      return response.data
     
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
  }
)

export const getUtilisateurParCode = createAsyncThunk(
  "utilisateurSlice/getUtilisateurParCode",
  async (codeuser, thunkAPI) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/utilisateurs/getUtilisateurParCode/${codeuser}`);
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
  type:"",
  directeur:""
}
export const utilisateurSlice = createSlice({
  name: "utilisateurSlice",
  initialState: {
    codeuser: "",
    status: "",
    infoUtilisateurInitiales,
    erreur: "",
    listeUtilisateur: [],
    responseLogin:{},
    infosUtilisateur: {
      ...infoUtilisateurInitiales
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
        if(action.payload && action.payload != {}){
          state.responseLogin= action.payload;
          state.status = "succès";
        }
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
