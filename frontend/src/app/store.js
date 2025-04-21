import { configureStore } from "@reduxjs/toolkit";
import clientSlice from "../app/client_slices/clientSlice"; //thb te5oo js
import interfaceSlice from "./interface_slices/interfaceSlice";
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
import utilisateurSystemSlices from "./utilisateurSystemSlices/utilisateurSystemSlice";
import codePostaleSlice from "./cpostal_slices/cpostalSlice"
import regionSlice from "./region_slices/regionSlice"

import  secteurSlice  from "./secteur_slices/secteurSlice";

const persistConfig = {
  key: "root",
  storage: localStorage,
  whitelist: ["utilisateurSystemSlice"]
};

const rootReducer = combineReducers({
  clientSlice: clientSlice, // ? client partie min store cle: clientcrud/valeur : clientslice
  interfaceSlice: interfaceSlice,
  devisSlice: devisSlice,
  utilisateurSlice: utilisateurSlice,
  articleSlice: articleSlice,
  familleSlice: familleSlice,
  sousfamilleSlice: sousfamilleSlice,
  Stock_Slice: Stock_Slice,
  valorisation_Slice:valorisation_Slice,
  secteurSlice:secteurSlice,
  regionSlice:regionSlice,
  codePostaleSlice:codePostaleSlice,
  utilisateurSystemSlice:utilisateurSystemSlices,
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
