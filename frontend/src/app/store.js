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

const persistConfig = {
  key: "root",
  storage: localStorage, // pour utiliser LocalStorage
  // ! le magique au chocolat
  // whitelist: [ // pour specifier quelles slices on persiste
  //   "ClientCrud",
  //   "UtilisateurInfo",
  //   "uiStates",
  //   "DevisCrud",
  //   "ArticlesDevis",
  // ],
  whitelist: ["UtilisateurInfo"]
};

const rootReducer = combineReducers({
  ClientCrud: clientSlice, // ? client partie min store cle: clientcrud/valeur : clientslice
  uiStates: uiSlice,
  DevisCrud: devisSlice,
  UtilisateurInfo: utilisateurSlice,
  ArticlesDevis: articleSlice,
  familleSlice: familleSlice,
  sousfamilleSlice: sousfamilleSlice
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
