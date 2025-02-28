import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getDevisParNUMBL,
  getDevisParCodeClient,
  getDevisParMontant,
  getDevisParPeriode,
  setDevisInfoEntiere,
} from "../../app/devis_slices/devisSlice";
import DataTable from "react-data-table-component";

const Recherche = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [valeurRecherche, setValeurRecherche] = useState("");
  const [filtrerPar, setFiltrerPar] = useState("");

  const devisList = useSelector((state) => state.DevisCrud.DevisList);
  const status = useSelector((state) => state.DevisCrud.status);
  const erreur = useSelector((state) => state.DevisCrud.erreur);
  const [selectedResult, setSelectedResult] = useState(null);
  const devisinfo = useSelector((state) => state.DevisCrud.devisInfo);
  console.log(devisinfo);
  const handleselecteddevis = ({selectedRows}) => {
    dispatch(setDevisInfoEntiere(selectedRows[0]));
  };
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
    navigate("/DevisFormTout");
  };
  const collones = [
    { name: "Numéro de devis", selector: (row) => row.NUMBL, sortable: true },
    { name: "Code client", selector: (row) => row.CODECLI, sortable: true },
    { name: "Raison Sociale", selector: (row) => row.RSCLI },
    { name: "Point de vente", selector: (row) => row.cp },
    { name: "Adresse", selector: (row) => row.ADRCLI },
    { name: "Montant", selector: (row) => row.MTTC },
    { name: "Date", selector: (row) => row.DATEBL },
    { name: "Raison Sociale Représentant", selector: (row) => row.RSREP },
    { name: "Code secteur", selector: (row) => row.codesecteur },
  ];
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
      <DataTable
        data={devisList}
        columns={collones}
        pagination
        fixedHeader
        customStyles={customStyles}
        striped
        selectableRows
        onSelectedRowsChange={handleselecteddevis}
      ></DataTable>
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
