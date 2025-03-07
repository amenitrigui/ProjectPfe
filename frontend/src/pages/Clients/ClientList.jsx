import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getListeClient,
  setFiltresSaisient,
  filtrerClients,
  setClientsASupprimer,
  setClientInfosEntiere,
} from "../../app/client_slices/clientSlice";
import {
  setClearAppele,
  setToolbarTable,
} from "../../app/interface_slices/uiSlice";

function ClientList() {
  const dispatch = useDispatch();
  const listeClients = useSelector((store) => store.ClientCrud.listeClients);

  useEffect(() => {
    dispatch(getListeClient());
    dispatch(setToolbarTable("client"));
  }, []);

  const filters = useSelector((store) => store.ClientCrud.filters);

  const handleFilterChange = (e, column) => {
    dispatch(setFiltresSaisient({ valeur: e.target.value, collonne: column }));
    dispatch(filtrerClients());
  };

  const columns = [
    { name: "Code", selector: (row) => row.code, sortable: true },
    { name: "Raison Sociale", selector: (row) => row.rsoc, sortable: true },
    { name: "Matricule", selector: (row) => row.Matricule },
    { name: "Telephone", selector: (row) => row.telephone },
    { name: "Fax", selector: (row) => row.fax },
    { name: "Responsable", selector: (row) => row.desrep },
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
    dispatch(setClearAppele(false));
    if (selectedRows.length !== 0) {
      dispatch(setClientsASupprimer(selectedRows[0].code));
      dispatch(setClientInfosEntiere(selectedRows[0]));
    } else {
      dispatch(setClearAppele(true));
      dispatch(setClientsASupprimer([]));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-6">
        <div className="mt-2 flex items-center relative">
          <Link
            to="/ClientFormTout"
            className="text-lg font-semibold text-[primaryColor] underline hover:text-blue-500 absolute left-0"
          >
            ← Retour
          </Link>

          <h1
            className="text-2xl font-bold text-center flex-1"
            style={{ color: primaryColor }}
          >
            Liste Client
          </h1>
        </div>

        {/* Filtres */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-100 rounded-lg shadow-md">
          {Object.keys(filters).map((column, index) => (
            <input
              key={index}
              type="text"
              onChange={(e) => handleFilterChange(e, column)}
              placeholder={`🔍 ${columns[index].name}`}
              className="border p-2 rounded-md shadow-sm focus:ring focus:ring-blue-300"
            />
          ))}
        </div>

        {/* Tableau DataTable */}
        <div className="bg-white p-4 rounded-lg shadow-lg mt-4">
          <DataTable
            columns={columns}
            data={listeClients}
            customStyles={customStyles}
            selectableRows
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

export default ClientList;
