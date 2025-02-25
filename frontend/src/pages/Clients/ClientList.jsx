import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import ClientForm from "../../components/Client/ClientForm";
import ToolBar from "../../components/Common/ToolBar";
import Alert from "../../components/Common/Alert";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiLogOut,
  FiShoppingCart,
  FiUser,
  FiBox,
  FiSettings,
  FiTruck,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  getListeClient,
  setFiltresSaisient,
  filtrerClients,
  setClientsASupprimer,
  setClientInfosEntiere,
} from "../../app/client_slices/clientSlice";
import AlertModalD from "../../components/Common/AlertModalD";
import { setClearAppele } from "../../app/interface_slices/uiSlice";
import SideBar from "../../components/Common/SideBar";

function ClientList() {
  const dispatch = useDispatch();
  const listeClients = useSelector((store) => store.ClientCrud.listeClients);

  // * UseEffect #1 : Récuperer La liste des clients
  useEffect(() => {
    dispatch(getListeClient());
  }, []);

  // * Utilisé pour spécifier quelle db (societé) on interroge
  const dbName = localStorage.getItem("selectedDatabase");
  // * Utilisé pour l'authorization de l'utilisateur à effectuer des opérations
  const token = localStorage.getItem("token");
  const filters = useSelector((store) => store.ClientCrud.filters);
  // * Filtrage de la liste des clients par colonne
  const handleFilterChange = (e, column) => {
    dispatch(setFiltresSaisient({ valeur: e.target.value, collonne: column }));
    dispatch(filtrerClients());
  };

  // * Colonnes de DataTable
  const columns = [
    { name: "Code", selector: (row) => row.code, sortable: true },
    { name: "Raison Sociale", selector: (row) => row.rsoc, sortable: true },
    { name: "Adresse", selector: (row) => row.adresse },
    { name: "Code Postal", selector: (row) => row.cp },
    { name: "Email", selector: (row) => row.email },
  ];

  // * Style personalisé de DataTable
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

  const handleSelectionChange = ({ selectedRows }) => {
    // selectedRows.every(value => console.log(value));
    dispatch(setClearAppele(false))
    if (selectedRows.length != 0) {
      dispatch(setClientsASupprimer(selectedRows[0].code));
      dispatch(setClientInfosEntiere(selectedRows[0]));
    }

    if(selectedRows.length == 0) {
      dispatch(setClearAppele(true));
      dispatch(setClientsASupprimer([]))
    }
  };

  return (
   
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <SideBar className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0" />
    
        {/* Contenu principal */}
        <div className="flex-1 ml-64 p-6">
          <Alert />
          <AlertModalD />
          <ToolBar />
          <ClientForm />
          <br />
    
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