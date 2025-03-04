import { configureStore } from "@reduxjs/toolkit";
import clientSlice from "../app/client_slices/clientSlice"; //thb te5oo js
import uiSlice from "./interface_slices/uiSlice";
import devisSlice from "./devis_slices/devisSlice";
import { utilisateurSlice } from "./utilisateur_slices/utilisateurSlice";
import articleSlice  from "./article_slices/articleSlice";


// ? bch nrmiha fiha les data mt3i kol
export default configureStore({
  reducer: {
    ClientCrud: clientSlice, // ? client partie min store cle: clientcrud/valeur : clientslice
    uiStates: uiSlice,
    // Devis
    DevisCrud: devisSlice,
    //user
    UtilisateurInfo:utilisateurSlice,

    ArticlesDevis:articleSlice,
  },
});
