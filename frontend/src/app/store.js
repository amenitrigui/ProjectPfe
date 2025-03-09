import { configureStore } from "@reduxjs/toolkit";
import clientSlice from "../app/client_slices/clientSlice"; //thb te5oo js
import uiSlice from "./interface_slices/uiSlice";
import devisSlice from "./devis_slices/devisSlice";
import utilisateurSlice from "./utilisateur_slices/utilisateurSlice";
import articleSlice from "./article_slices/articleSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import localforage from 'localforage';

const persistConfig = {
  key: "root",
  storage: localforage, // pour utiliser LocalStorage
  whitelist: [ // pour specifier quelles slices on persiste
    "ClientCrud",
    "UtilisateurInfo",
    "uiStates",
    "DevisCrud",
    "ArticlesDevis",
  ],
};

const rootReducer = combineReducers({
  ClientCrud: clientSlice, // ? client partie min store cle: clientcrud/valeur : clientslice
  uiStates: uiSlice,
  DevisCrud: devisSlice,
  UtilisateurInfo: utilisateurSlice,
  ArticlesDevis: articleSlice,
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
