export const statusChargementGlobale = (state) => {
  let chargementEnCours = false;
  const slicesAVerifier = [
    "Stock_Slice",
    "valorisation_Slice",
    "utilisateurSystemSlice",
    "utilisateurSlice",
    "sousfamilleSlice",
    "secteurSlice",
    "regionSlice",
    "pointVenteSlice",
    "interfaceSlice",
    "familleSlice",
    "devisSlice",
    "codePostaleSlice",
    "clientSlice",
    "articleSlice",
  ];

  if (slicesAVerifier.some(
    (nomSlice) => state[nomSlice]?.status === "chargement"
  )) {
    chargementEnCours = true;
  };
};
