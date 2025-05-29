import { createSelector } from "@reduxjs/toolkit";

export const statusChargementGlobale = createSelector(
  [
    (state) => state.utilisateurSystemSlice?.status,
    (state) => state.devisSlice?.status,
    (state) => state.clientSlice?.status,
  ],
  (authStatus, devisStatus, clientStatus) => {
    // console.log("authStatus: ", authStatus);
    console.log("devisStatus: ", devisStatus);
    // console.log("clientStatus: ", clientStatus);
    // if (authStatus && authStatus === "chargement") {
    //   return true;
    // }
    if (devisStatus && devisStatus === "chargement") {
      return true;
    }
    // if (clientStatus && clientStatus === "chargement") {
    //   return true;
    // }

    return false;
  }
);
