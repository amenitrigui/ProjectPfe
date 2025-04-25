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
  setToolbarTable,
} from "../../app/interface_slices/interfaceSlice";
import SideBar from "../../components/Common/SideBar";
import ToolBar from "../../components/Common/ToolBar";

function ClientList() {
  const dispatch = useDispatch();
  const listeClients = useSelector((store) => store.clientSlice.listeClients);

  useEffect(() => {
    dispatch(getListeClient());
    dispatch(setToolbarTable("client"));
  }, []);

  const filters = useSelector((store) => store.clientSlice.filters);

  const handleFilterChange = (e, column) => {
    dispatch(setFiltresSaisient({ valeur: e.target.value, collonne: column }));
    dispatch(filtrerClients());
  };

  const columns = [
    { name: "Code", selector: (row) => row.code, sortable: true },
    { name: "Raison Sociale", selector: (row) => row.rsoc, sortable: true },
    { name: "Matricule", selector: (row) => row.Matricule },
    { name: "Télephone", selector: (row) => row.telephone },
    { name: "Fax", selector: (row) => row.fax },
    { name: "Responsable 1", selector: (row) => row.responsable1 },
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
  const ouvrireMenuDrawer = useSelector(
    (state) => state.interfaceSlice.ouvrireMenuDrawer
  );

  return (
    <div className="container">
    <SideBar></SideBar>

    
    <div className={`main ${ouvrireMenuDrawer ? "active" : ""}`}>
      <ToolBar></ToolBar>
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
