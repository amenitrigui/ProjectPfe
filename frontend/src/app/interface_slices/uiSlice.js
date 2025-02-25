import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "uiSlice",
  initialState: {
    // * states pour l'affichage d'un alert
    // * message: message d'alert
    // * afficherAlert: visibilité d'alert
    // * typeAlert : warning, success, error...
    message: "initial alert message",
    afficherAlert: false,
    typeAlert: "",
    // *state alerte model
    afficherAlertModal: false,
    messageAlertModal: "",
    clearAppele: false,
  },
  reducers: {
    setAlertMessage: (state, action) => {
      state.message = action.payload;
      state.afficherAlert = true;
    },
    toggleAlert: (state) => {
      state.afficherAlert = !state.afficherAlert;
    },
    setTypeAlert: (state, action) => {
      state.typeAlert = action.payload;
    },

    /// Alerte  moch simple
    setMessageAlertModal: (state, action) => {
      state.messageAlertModal = action.payload;
    },
    setAfficherAlerteModel: (state, action) => {
      state.afficherAlertModal = action.payload;
    },

    setClearAppele: (state, action) => {
      state.clearAppele = action.payload;
    },
  },
});
export const {
  setAlertMessage,
  toggleAlert,
  setTypeAlert,
  setMessageAlertModal,
  setafficherAlerteModel,
  setClearAppele,
} = uiSlice.actions;
export default uiSlice.reducer;
