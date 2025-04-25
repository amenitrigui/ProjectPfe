import { createSlice } from "@reduxjs/toolkit";
export const interfaceSlice = createSlice({
  name: "interfaceSlice",
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
    // * state pour déterminer quelle table on utilise
    // * puisque toolbar est un composant common de
    // * client et devis pour le moment
    toolbarTable: "",
    // * state pour activer/ desactiver les champs de formulaire
    // * selon le mode
    activerChampsForm: false,
    // * state pour afficher/cacher les boutons de validation/annulation
    activerBoutonsValiderAnnuler: false,
    // * mode de toolbar: insertion/modification/consultation
    toolbarMode: "consultation",
    setAlertModifier: "",
    afficherRecherchePopup: false,
    ouvrireMenuDrawer: true,
    afficherFamillePopub: false,
    afficherSecteurPopup: false,
    ouvrireAvatarMenu: false,
    isDashBoardRoute: true,
    lignedevisSelectionne: [],
  },

  reducers: {
    setIsDashBoardRoute: (state, action) => {
      state.isDashBoardRoute = action.payload;
    },
    setOuvrireAvatarMenu: (state, action) => {
      state.ouvrireAvatarMenu = action.payload;
    },
    setAfficherRecherchePopup: (state, action) => {
      state.afficherRecherchePopup = action.payload;
    },
    setAfficherFamillePopub: (state, action) => {
      state.afficherFamillePopub = action.payload;
    },
    setLignedevisSelectionne: (state, action) => {
      state.lignedevisSelectionne = action.payload;
    },

    setAlertMessage: (state, action) => {
      state.message = action.payload;
      state.afficherAlert = true;
    },
    setAfficherSecteurPopup: (state, action) => {
      state.afficherSecteurPopup = action.payload;
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
    setAfficherAlert: (state, action) => {
      state.afficherAlert = action.payload;
    },
    setAfficherAlertModal: (state, action) => {
      state.afficherAlertModal = action.payload;
    },
    setToolbarTable: (state, action) => {
      state.toolbarTable = action.payload;
    },
    setActiverChampsForm: (state, action) => {
      state.activerChampsForm = action.payload;
    },
    setActiverBoutonsValiderAnnuler: (state, action) => {
      state.activerBoutonsValiderAnnuler = action.payload;
    },
    setToolbarMode: (state, action) => {
      state.toolbarMode = action.payload;
    },

    setOuvrireDrawerMenu: (state, action) => {
      state.ouvrireMenuDrawer = action.payload;
    },
  },
});
export const {
  setAlertMessage,
  toggleAlert,
  setLignedevisSelectionne,
  setTypeAlert,
  setMessageAlertModal,
  setAfficherAlertModal,
  setAfficherAlert,
  setToolbarTable,
  setActiverChampsForm,
  setActiverBoutonsValiderAnnuler,
  setToolbarMode,
  setAfficherRecherchePopup,
  setOuvrireDrawerMenu,
  setAfficherFamillePopub,
  setAfficherSecteurPopup,
  setOuvrireAvatarMenu,
  setIsDashBoardRoute,
} = interfaceSlice.actions;
export default interfaceSlice.reducer;
