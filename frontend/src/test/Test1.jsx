import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVilleParCodePostal,
  setClientInfos,
  viderChampsClientInfo,
} from "../app/client_slices/clientSlice";
import { setDevisInfo } from "../app/devis_slices/devisSlice";
import { setOuvrireDrawerMenu } from "../app/interface_slices/interfaceSlice";

function Test1() {
  const dispatch = useDispatch();
  const toolbarMode = useSelector((state) => state.interfaceSlice.toolbarMode);
  const clientInfos = useSelector((state) => state.clientSlice.clientInfos);
  const utilisateurConnecte = useSelector(
    (state) => state.utilisateurSystemSlice.utilisateurConnecte
  );
  const insertionDepuisDevisForm = useSelector(
    (state) => state.devisSlice.insertionDepuisDevisForm
  );

  const handleChange = (e, colonne) => {
    if (e.target.value === "") {
      dispatch(viderChampsClientInfo());
    }
    if (colonne === "cp" && e.target.value.length === 4) {
      dispatch(getVilleParCodePostal(e.target.value));
    }
    dispatch(setClientInfos({ colonne, valeur: e.target.value }));
    if (insertionDepuisDevisForm) {
      dispatch(setDevisInfo({ colonne, valeur: e.target.value }));
    }
  };
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const ouvrireMenuDrawer = useSelector(
    (state) => state.interfaceSlice.ouvrireMenuDrawer
  );
  const convertir = () => {
    let valeur = document.getElementById("valeurAConvertir").value;
    const champResultat = document.getElementById("resultat");
    let resultat = "";
    if (valeur === 0) return "Zero";

    // Words for numbers 0 to 19
    const units = [
      "",
      "Un",
      "Deux",
      "Trois",
      "Quatre",
      "Cinque",
      "Six",
      "Sept",
      "Huite",
      "Neuf",
      "Dix",
      "Onze",
      "Douze",
      "Treize",
      "Quatorze",
      "Quinze",
      "Seize",
      "Dix Sept",
      "Dix Huite",
      "Dix Neuf",
    ];

    // Words for numbers multiple of 10
    const tens = [
      "",
      "",
      "Vingt",
      "Trente",
      "Quarante",
      "Cinquante",
      "Soixante",
      "Soixante-Dix",
      "Quatre-Vingt",
      "Quatre-Vingt-Dix",
    ];

    const multiplier = ["", "Mille", "Million", "Milliard"];

    let group = 0;

    // Process number in group of 1000s
    while (valeur > 0) {
      if (valeur % 1000 !== 0) {
        let value = valeur % 1000;
        let temp = "";

        // Handle 3 digit number
        if (value >= 100) {
          temp = units[Math.floor(value / 100)] + " Cent ";
          value %= 100;
        }

        // Handle 2 digit number
        if (value >= 20) {
          temp += tens[Math.floor(value / 10)] + " ";
          value %= 10;
        }

        // Handle unit number
        if (value > 0) {
          temp += units[value] + " ";
        }

        // Add the multiplier according to the group
        temp += multiplier[group] + " ";

        // Add the result of this group to overall result
        resultat = temp + resultat;
      }
      valeur = Math.floor(valeur / 1000);
      group++;
    }

    // Remove trailing space
    console.log(resultat);
    champResultat.value = resultat.trim();
    return resultat.trim();
  };
  return (
    <>
      <div className="flex flex-nowrap">
        <input
          id="valeurAConvertir"
          className="w-1/2 border border-gray-300 rounded-md p-2"
          type="text"
        />
        <input
          id="resultat"
          className="w-1/2 border border-gray-300 rounded-md p-2"
          type="text"
        />
      </div>
      <button
        onClick={() => {
          convertir();
        }}
      >
        convert
      </button>
    </>
  );
}

export default Test1;
