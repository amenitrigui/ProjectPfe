export const isNumerique = (valeur) => {
  return (!isNaN(valeur))
}

export const isAlphaNumerique = (valeur) => {
  return /^[A-Za-z0-9\s]*$/.test(valeur);
};

export const isAlphabetique = (valeur) => {
    return /^[A-Za-z\s]*$/.test(valeur)
}

export const validerChampsForm = (table, formInfos) => {
  const estValide = true;
  switch(table){
    case "article":
      break;
    case "client":
      break;
    case "devis" :
      break;
    case "famille":
      break;
    case "utilisateur":
      break;
  }

  return estValide;
}

export const listeTables = ["utilisateur", "devis", "article", "famille", "sousfamille", "region", "cpostal", "pointvente"] 