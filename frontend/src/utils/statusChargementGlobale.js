export const statusChargementGlobale = (state) => {
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

  return (slicesAVerifier.some(
    (nomSlice) => state[nomSlice]?.status === "chargement"
  ))
};
