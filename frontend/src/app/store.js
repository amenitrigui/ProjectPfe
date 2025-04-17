import { configureStore } from "@reduxjs/toolkit";
import clientSlice from "../app/client_slices/clientSlice"; //thb te5oo js
import uiSlice from "./interface_slices/uiSlice";
import devisSlice from "./devis_slices/devisSlice";
import utilisateurSlice from "./utilisateur_slices/utilisateurSlice";
import articleSlice from "./article_slices/articleSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import localStorage from "redux-persist/es/storage";
import  familleSlice  from "./famille_slices/familleSlice";
import  sousfamilleSlice  from "./sousfamille_slices/sousfamilleSlice";
import Stock_Slice from "./Stock_valorisation_utilitaires/Stock_Slice"
import valorisation_Slice from "./Stock_valorisation_utilitaires/valorisation_Slice"
import Utilisateur_SuperviseurSlices from "./Utilisateur_SuperviseurSlices/Utilisateur_SuperviseurSlices"

const persistConfig = {
  key: "root",
  storage: localStorage, // pour utiliser LocalStorage
  // whitelist: [ // pour specifier quelles slices on persiste
  //   "ClientCrud",
  //   "UtilisateurInfo",
  //   "uiStates",
  //   "DevisCrud",
  //   "ArticlesDevis",
  // ],

  whitelist: ["UtilisateurInfo","Utilisateur_SuperviseurSlices"]
};

const rootReducer = combineReducers({
  ClientCrud: clientSlice, // ? client partie min store cle: clientcrud/valeur : clientslice
  uiStates: uiSlice,
  DevisCrud: devisSlice,
  UtilisateurInfo: utilisateurSlice,
  ArticlesDevis: articleSlice,
  familleSlice: familleSlice,
  sousfamilleSlice: sousfamilleSlice,
  Stock_Slice: Stock_Slice,
  valorisation_Slice:valorisation_Slice,
  Utilisateur_SuperviseurSlices:Utilisateur_SuperviseurSlices

});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// ? bch nrmiha fiha les data mt3i kol
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);
export { store, persistor };
