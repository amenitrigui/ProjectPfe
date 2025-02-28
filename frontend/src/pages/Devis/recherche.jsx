import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDevis } from "../../../../backend/controllers/devisController";
import { getDevisParMontant } from "../../app/devis_slices/devisSlice";

const Recherche = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [valeurRecherche, setValeurRecherche] = useState("");
  const [filtrerPar, setFiltrerPar] = useState("");

  const devisList = useSelector((state) => state.DevisCrud.DevisList);
  const status = useSelector((state) => state.DevisCrud.status);
  const erreur = useSelector((state) => state.DevisCrud.erreur);

  const handleSearch = async () => {
    if (!valeurRecherche) {
      alert("Veuillez entrer une valeur pour la recherche.");
      return;
    }
    if(!filtrerPar) {
      alert("veuillez sélectionner un filtre de recherche.");
      return;
    }

    switch(filtrerPar){
      case("client"): dispatch(getDevisParCodeClient()); break;
      case("devis"): dispatch(getDevis()); break;
      case("montant"): dispatch(getDevisParMontant()); break;
      case("periode"): dispatch(getDevisParPeriode()); break;
      default: console.log("valeur de filtre non définit");
    }
  };

  // const handleValidate = () => {
  //   if (!selectedResult) {
  //     alert("Veuillez sélectionner un résultat avant de valider.");
  //     return;
  //   }

  //   // Naviguer vers Devis-Form avec les données sélectionnées
  //   navigate("/Devis-Form", { state: { formData: selectedResult } });
  // };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">Recherche</h2>
      <div className="flex space-x-6">
        <div className="w-1/3 bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Recherche par
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

      {status && <p>Chargement...</p>}
      {erreur && <p className="text-red-600">{erreur}</p>}
      {devisList && devisList.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold">Résultats :</h4>
          <ul>
            {devisList.map((result, index) => (
              <li key={index}>
                <p>
                  <strong>Numéro de devis:</strong> {result.NUMBL}
                </p>
                <p>
                  <strong>Client:</strong> {result.RSCLI}
                </p>
              </li>
            ))}
          </ul>
          <button
            // onClick={handleValidate}
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
