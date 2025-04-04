export const isNumerique = (valeur) => {
  console.log(valeur);
  return (!isNaN(valeur))
}

export const isAlphaNumerique = (valeur) => {

}

export const isAlphabetique = (valeur) => {
    return /^[A-Za-z\s]*$/.test(valeur)
}