import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getDevisParNUMBL,
  getDevisParCodeClient,
  getDevisParMontant,
  getDevisParPeriode,
  setDevisInfoEntiere,
  setDevisList,
  getInfoUtilisateur,
} from "../../app/devis_slices/devisSlice";
import DataTable from "react-data-table-component";
import { FaArrowLeft } from "react-icons/fa"; // Import de l'icône
import { getCin, getListeCodeClient, getTypeClient } from "../../app/client_slices/clientSlice";

const Recherche = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // * valeur de champs de recherche
  const [valeurRecherche, setValeurRecherche] = useState("");
  // * critère de filtre (par client, par montant ...)
  const [filtrerPar, setFiltrerPar] = useState("");
  // * liste de devis récuperer de store
  const devisList = useSelector((state) => state.DevisCrud.devisList);
  const listeClients = useSelector((state) => state.ClientCrud);
  console.log(listeClients);
  // * pour obtenir les informations de dévis séléctionné
  const handleselecteddevis = ({ selectedRows }) => {
    console.log(selectedRows[0]);
    dispatch(setDevisInfoEntiere(selectedRows[0]));
  };
  const toolbarTable = useSelector((state) => state.uiStates.toolbarTable);

  // * pour filtrer la liste des devis
  const handleSearch = () => {

    if (!valeurRecherche) {
      alert("Veuillez entrer une valeur pour la recherche.");
      return;
    }
    if (!filtrerPar) {
      alert("Veuillez sélectionner un filtre de recherche.");
      return;
    }
  
    if (toolbarTable.toLowerCase() == "devis") {
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
      case "utilisateur":
        dispatch(getInfoUtilisateur(valeurRecherche));
      default:
        console.log("Valeur de filtre non définie");
    }}
    if (toolbarTable.toLowerCase() == "client") {
      switch (filtrerPar) {
        case "code":
          console.log("case code");
          dispatch(getListeCodeClient(valeurRecherche));
          break;
        case "typecli":
          dispatch(getTypeClient(valeurRecherche));
          break;
        case "cin":
          dispatch(getCin(valeurRecherche));
          break;
       
      }

    }
  };

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "18px",
        backgroundColor: "#e0f2fe",
        color: "#034694",
        padding: "12px",
      },
    },
    rows: {
      style: {
        fontSize: "16px",
        backgroundColor: "#f8fafc",
        "&:hover": {
          backgroundColor: "#dbeafe",
        },
      },
    },
    pagination: {
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        backgroundColor: "#e0f2fe",
      },
    },
  };

  const handleValidate = () => {
    dispatch(setDevisList([]));
    navigate("/DevisFormTout");
  };

  const collones = [
    { name: "Numéro de devis", selector: (row) => row.NUMBL, sortable: true },
    { name: "Code client", selector: (row) => row.CODECLI, sortable: true },
    { name: "Raison Sociale", selector: (row) => row.RSCLI },
    { name: "Point de vente", selector: (row) => row.cp },

    { name: "Montant", selector: (row) => row.MTTC },
    { name: "Date", selector: (row) => row.DATEBL },
    { name: "Vendeur", selector: (row) => row.usera },

    { name: "RS Représentant", selector: (row) => row.RSREP },
    { name: "Code secteur", selector: (row) => row.codesecteur },
  ];

  return (
    <div className="container mx-auto p-6">
      {/* Bouton de retour */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 transition duration-200 mb-4"
      >
        <FaArrowLeft className="mr-2" /> Retour
      </button>

      <h2 className="text-2xl font-semibold mb-6 text-center">Recherche</h2>

      <div className="flex space-x-6">
        <div className="w-1/3 bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Rechercher Devis Par
          </h3>

          <div className="space-y-2">

            {toolbarTable=="devis"&&(["devis", "client", "montant", "periode", "article"].map(
              (filtre) => (
                <label key={filtre} className="flex items-center">
                  <input
                    type="radio"
                    name="filtres"
                    value={filtre}
                    className="mr-2"
                    onChange={() => setFiltrerPar(filtre)}
                  />
                  {filtre.charAt(0).toUpperCase() + filtre.slice(1)}
                </label>
              )
            ))}
              {toolbarTable=="client"&&(["code", "typecli", "cin"].map(
              (filtre) => (
                <label key={filtre} className="flex items-center">
                  <input
                    type="radio"
                    name="filtres"
                    value={filtre}
                    className="mr-2"
                    onChange={() => setFiltrerPar(filtre)}
                  />
                  {filtre.charAt(0).toUpperCase() + filtre.slice(1)}
                </label>
              )
            ))}
          </div>
        </div>

        <div className="w-2/3 bg-white p-4 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <input
              id="searchInput"
              type="text"
              onChange={(e) => setValeurRecherche(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg w-full"
              placeholder="Entrez votre recherche..."
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

      <DataTable
        data={devisList}
        columns={collones}
        pagination
        fixedHeader
        customStyles={customStyles}
        striped
        selectableRows
        onSelectedRowsChange={handleselecteddevis}
      />

      <button
        onClick={handleValidate}
        className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition duration-200 mt-4"
      >
        Valider
      </button>
    </div>
  );
};

export default Recherche;
