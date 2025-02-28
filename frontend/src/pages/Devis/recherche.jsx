import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getDevisParNUMBL,
  getDevisParCodeClient,
  getDevisParMontant,
  getDevisParPeriode,
} from "../../app/devis_slices/devisSlice";

const Recherche = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [valeurRecherche, setValeurRecherche] = useState("");
  const [filtrerPar, setFiltrerPar] = useState("");

  const devisList = useSelector((state) => state.DevisCrud.DevisList);
  console.log(devisList);
  const status = useSelector((state) => state.DevisCrud.status);
  const erreur = useSelector((state) => state.DevisCrud.erreur);
  const [selectedResult, setSelectedResult] = useState(null);

  const handleSearch = async () => {
    if (!valeurRecherche) {
      alert("Veuillez entrer une valeur pour la recherche.");
      return;
    }
    if (!filtrerPar) {
      alert("veuillez sélectionner un filtre de recherche.");
      return;
    }

    switch (filtrerPar) {
      case "client":
        dispatch(getDevisParCodeClient(valeurRecherche));
        break;
      case "devis":
        dispatch(getDevisParNUMBL(valeurRecherche));
        break;
      case "montant":
        dispatch(getDevisParMontant(valeurRecherche));
        break;
      case "periode":
        dispatch(getDevisParPeriode(valeurRecherche));
        break;
      default:
        console.log("valeur de filtre non définit");
    }
  };

  const handleValidate = () => {
    navigate("/DevisFormTout");
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">Recherche</h2>
      <div className="flex space-x-6">
        <div className="w-1/3 bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Rechercher Devis Par
          </h3>
          <div className="space-y-2">
            {["devis", "client", "montant", "periode", "article"].map(
              (filtre) => (
                <label key={filtre} className="flex items-center">
                  <input
                    type="radio"
                    name="filtres"
                    className="mr-2"
                    onClick={() => setFiltrerPar(filtre)}
                  />
                  {filtre.charAt(0).toUpperCase() + filtre.slice(1)}
                </label>
              )
            )}
          </div>
        </div>

        <div className="w-2/3 bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-medium text-gray-700 mb-4"></h3>
          <div className="flex items-center space-x-2">
            <input
              id="searchInput"
              type="text"
              onChange={(e) => setValeurRecherche(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg w-full"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Rechercher
            </button>
          </div>
        </div>
      </div>

      {status === "chargement" && <p>Chargement...</p>}
      {erreur && <p className="text-red-600">{erreur}</p>}
      {devisList && devisList.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold">Résultats :</h4>
          <table className="min-w-full border border-gray-300 mt-4">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="border p-2">Numéro de devis</th>
                <th className="border p-2">Code client</th>
                <th className="border p-2">Raison Sociale</th>
                <th className="border p-2">Point de vente</th>
                <th className="border p-2">Adresse</th>
                <th className="border p-2">Montant</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Raison Sociale Représentant</th>
                <th className="border p-2">Code secteur</th>
              </tr>
            </thead>
            <tbody>
              {devisList.map((result, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="border p-2">{result.NUMBL}</td>
                  <td className="border p-2">{result.CODECLI}</td>
                  <td className="border p-2">{result.RSCLI}</td>
                  <td className="border p-2">{result.libpv}</td>
                  <td className="border p-2">{result.ADRCLI}</td>
                  <td className="border p-2">{result.MTTC}</td>
                  <td className="border p-2">{result.DATEBL}</td>
                  <td className="border p-2">{result.RSREP}</td>
                  <td className="border p-2">{result.codesecteur}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={handleValidate}
            className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition duration-200 mt-4"
          >
            Valider
          </button>
        </div>
      )}
    </div>
  );
};

export default Recherche;
