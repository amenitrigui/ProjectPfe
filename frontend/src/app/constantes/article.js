export const defaultArticleInfos = {
  code: "",
  libelle: "",
  unite: "",
  famille: "",
  codesousfam: "",
  codebarre: "",
  nbrunite: "",
  comptec: "",
  type: "",
  typeart: "",
  colisage: "",
  import: "",
  tauxtva: "",
  prixbrut: "",
  prixnet: "",
  fodec: "",
  DREMISE: 0,
  CONFIG: "",
  reforigine: "",
  lieustock: "",
  NGP: "",
  sav: "",
  cons: "",
  Dtcons: "0",
  remmax: "",
  prix1ttc: "",
  prix2TTC: "",
  prix3TTC: "",
  prix4TTC: "",

  prix1: "",
  prix2: "",
  prix3: "",
  prix4: "",
  nomenclature: "",
  gestionstock: "",
  avecconfig: "",
  ventevrac: "",
  usera: "",
  userm: "",
  datecreate: new Date().toISOString().split("T")[0],
  datemaj: new Date().toISOString().split("T")[0],
  libelleFamille: "",
  Libellesousfamille: "",
  derniereCodeArticle: "",
  quantite: "",
};

export const defaultLigneDevisInfos = {
  CodeART: "", // code article
  DesART: "", // designation article
  QteArt: 0, // Qte article
  PUART: 0, // Prix Unitaire
  Remise: 0, // Remise sur la commande
  TauxTva: 0, // tva sur l'article
  unite: "", // unité de l'article (P : piece, Ser: service ...)
  TypeArt: "", // De Service / Sur Stock
  Conf: "", // Configuration de la ligne de devis
  famille: "", // famille article
  nbun: "", // ????????????????????????????????????????????????????????
};
