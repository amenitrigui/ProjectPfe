import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setClientsASupprimer,
  setClientInfosEntiere,
} from "../../app/client_slices/clientSlice";
import {
  filterListeUtilisateur,
  getListeUtilisateur,
  setFiltresSaisient,
} from "../../app/utilisateur_slices/utilisateurSlice";
import { setToolbarTable } from "../../app/interface_slices/interfaceSlice";
import ToolBar from "../../components/Common/ToolBar";
import SideBar from "../../components/Common/SideBar";

function UtilisateurList() {
  const dispatch = useDispatch();
  const listeUtilisateur_Superviseur = useSelector(
    (store) => store.utilisateurSlice.listeUtilisateur_Superviseur
  );
  useEffect(() => {
    dispatch(getListeUtilisateur());
    // dispatch(setToolbarTable("utilisateur"));
  }, []);

  const filtersUtilisateur = useSelector(
    (store) => store.utilisateurSlice.filtersUtilisateur
  );

  const handleFilterChange = (e, column) => {
    dispatch(setFiltresSaisient({ colonne: column, valeur: e.target.value }));
    dispatch(filterListeUtilisateur());
  };
  const ouvrireMenuDrawer = useSelector(
    (state) => state.interfaceSlice.ouvrireMenuDrawer
  );

  const columns = [
    { name: "codeuser", selector: (row) => row.codeuser, sortable: true },
    { name: "type", selector: (row) => row.type, sortable: true },
    { name: "email", selector: (row) => row.email, sortable: true },
    { name: "directeur", selector: (row) => row.directeur, sortable: true },
    { name: "nom", selector: (row) => row.nom, sortable: true },
  ];

  // Définition de la couleur principale
  const primaryColor = "rgb(48, 60, 123)";

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "18px",
        backgroundColor: "#e0f2fe",
        color: primaryColor, // Appliquer la même couleur que Liste Client
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

  const handleSelectionChange = ({ selectedRows }) => {
    if (selectedRows.length !== 0) {
      dispatch(setClientsASupprimer(selectedRows[0].code));
      dispatch(setClientInfosEntiere(selectedRows[0]));
    } else {
      dispatch(setClientsASupprimer([]));
    }
  };
  return (
    <div className="container">
      <SideBar />
      <div className={`main ${ouvrireMenuDrawer ? "active" : ""}`}>
        <ToolBar />

        {/* Filtres */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-100 rounded-lg shadow-md">
          {Object.keys(filtersUtilisateur).map((column, index) =>
            columns[index] ? (
              <input
                key={index}
                type="text"
                onChange={(e) => handleFilterChange(e, column)}
                placeholder={`🔍 ${columns[index].name}`}
                className="border p-2 rounded-md shadow-sm focus:ring focus:ring-blue-300"
              />
            ) : (
              <></>
            )
          )}
        </div>

        {/* Tableau DataTable */}
        <div className="bg-white p-4 rounded-lg shadow-lg mt-4">
          <DataTable
            columns={columns}
            data={listeUtilisateur_Superviseur}
            customStyles={customStyles}
            fixedHeader
            pagination
            highlightOnHover
            striped
            onSelectedRowsChange={handleSelectionChange}
          />
        </div>
      </div>
    </div>
  );
}

export default UtilisateurList;
