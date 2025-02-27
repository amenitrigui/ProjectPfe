import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// Action asynchrone pour récupérer la liste des devis
export const getDevisList = createAsyncThunk("slice/getDevisList", async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/devis/SOLEVO/devis`
  );
  return response.data.devisList;
});

export const AjouterDevis = createAsyncThunk(
  "slice/AddDevis",
  async (_, thunkAPI) => {
    console.log("ddd");
    const devisInfo = thunkAPI.getState().DevisCrud.devisInfo;
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/devis/SOLEVO/create`,
      { devisInfo }
    );
    console.log(response);
    return response.data.devis;
  }
);
export const getNombrededevis = createAsyncThunk(
  "Slice/getNmobredevis",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/SOLEVO/devis/total`
    );
    return response.data.totalDevis;
  }
);
export const getTotalChifre = createAsyncThunk(
  "slice/getNombreTotal",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/devis/SOLEVO/devis/totalchiffre`
    );
    console.log(response);
    return response.data.totalchifre;
  }
);
export const getdevis = createAsyncThunk("Slice/getDevis", async (NUMBL) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/devis/SOLEVO/getDevis`,
    {
      params:{
        NUMBL
      }
    }
    
  );
console.log(response)

  return response.data.devis;
});
export const devisSlice = createSlice({
  name: "devisSlice",
  initialState: {
    DevisList: [],
    devisInfo: {
      NUMBL: "",
      libpv: "",
      ADRCLI: "",
      CODECLI: "",
      cp: "",
      DATEBL: "",
      MREMISE: "",
      MTTC: "",
      comm: "",
      RSREP: "",
      CODEREP: "",
      usera: "",
      RSCLI: "",
      codesecteur: "",
      MHT: "",
      articles: [],
    },
    totalchifre: 0,
    nombreDeDevis: 0,
    status: "idle",
    error: null,
  },
  reducers: {
    setDevisInfo: (state, action) => {
      const { collone, valeur } = action.payload;
      state.devisInfo[collone] = valeur;
    },
    setDevisList: (state, action) => {
      state.DevisList = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getDevisList.pending, (state) => {
        state.status = "loading";
        console.log(state.status);
      })
      .addCase(getDevisList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.DevisList = action.payload;
        console.log(action);
      })
      .addCase(getDevisList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.log(action);
      })
      .addCase(AjouterDevis.pending, (state) => {
        state.status = "chargement";
      })
      .addCase(AjouterDevis.fulfilled, (state, action) => {
        state.status = "reussi";
      })
      .addCase(AjouterDevis.rejected, (state, action) => {
        state.erreur = action.payload;
        state.status = "echoue";
      })
      .addCase(getNombrededevis.pending, (state) => {
        state.status = "chargeement";
      })
      .addCase(getNombrededevis.fulfilled, (state, action) => {
        console.log(action);
        state.nombreDeDevis = action.payload;
        state.status = "reussi";
      })
      .addCase(getNombrededevis.rejected, (state, action) => {
        state.nombreDeDevis = action.payload;
        state.status = "echoue";
      })


      .addCase(getTotalChifre.pending, (state) => {
        state.status = "chargeement";
      })
      .addCase(getTotalChifre.fulfilled, (state, action) => {
        console.log(action);
        state.totalchifre = action.payload;
        state.status = "reussi";
      })
      .addCase(getTotalChifre.rejected, (state, action) => {
        state.totalchifre = action.payload;
        state.status = "echoue";
      })

      .addCase(getdevis.pending, (state) => {
        state.status = "chargeement";
      })
      .addCase(getdevis.fulfilled, (state, action) => {
      
        state.DevisList = action.payload;
        state.status = "reussi";
      })
      .addCase(getdevis.rejected, (state, action) => {
        state.devisInfo = action.payload;
        state.status = "echoue";
      });
  },
});
export const { setDevisInfo, setDevisList } = devisSlice.actions;

export default devisSlice.reducer;
