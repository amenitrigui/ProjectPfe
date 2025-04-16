export const isNumerique = (valeur) => {
  console.log(valeur);
  return (!isNaN(valeur))
}

export const isAlphaNumerique = (valeur) => {

}

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

export const listeTables = ["utilisateur", "devis", ""] 