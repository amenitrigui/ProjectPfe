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
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="drawer-content">
        <div className="drawer">
          <input type="checkbox" id="my-drawer" className="drawer-toggle" />

          <div className="drawer-content">
            {/* Contenu principal ici */}
            <label
              htmlFor="my-drawer"
              className="btn btn-primary drawer-button m-4 w-40"
            >
              <img src="enter.png" alt="enter Icon" className="w-6 h-6" />
            </label>
            <h1 className="text-2xl font-bold text-center">Liste de clients</h1>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <ul className="menu bg-blue-800 text-white min-h-full w-80 p-6 space-y-6">
              {/* Sidebar Header */}
              <div className="text-center text-xl font-semibold mb-8">
                <h2>Logicom ERP</h2>
              </div>

              {/* Dashboard Section */}
              <li className="mb-4">
                <Link
                  to="/home-Page"
                  className="flex items-center space-x-4 p-3 hover:bg-blue-700 rounded-md transition"
                >
                  <FiHome className="text-xl" /> <span>Acuiell</span>
                </Link>
              </li>

              {/* Sales Section */}
              <li className="mb-4">
                <Link
                  to="/DevisList"
                  className="flex items-center space-x-4 p-3 hover:bg-blue-700 rounded-md transition"
                >
                  <FiShoppingCart className="text-xl" />{" "}
                  <span>gestion ventes</span>
                </Link>
              </li>

              {/* Inventory Section */}
              <li className="mb-4">
                <Link
                  to="/DevisFormTout"
                  className="flex items-center space-x-4 p-3 hover:bg-blue-700 rounded-md transition"
                >
                  <FiBox className="text-xl" /> <span>devis form</span>
                </Link>
              </li>

              {/* Purchasing Section */}
              <li className="mb-4">
                <Link
                  to="/Purchases"
                  className="flex items-center space-x-4 p-3 hover:bg-blue-700 rounded-md transition"
                >
                  <FiTruck className="text-xl" /> <span>Achats</span>
                </Link>
              </li>

              {/* Customer Management Section */}
              <li className="mb-4">
                <Link
                  to="/ClientList"
                  className="flex items-center space-x-4 p-3 hover:bg-blue-700 rounded-md transition"
                >
                  <FiUser className="text-xl" /> <span>Clients</span>
                </Link>
              </li>

              {/* Settings Section */}
              <li className="mb-4">
                <Link
                  to="/Settings"
                  className="flex items-center space-x-4 p-3 hover:bg-blue-700 rounded-md transition"
                >
                  <FiSettings className="text-xl" /> <span>Paramètres</span>
                </Link>
              </li>

              {/* Logout Section */}
              <li>
                <Link
                  to="/"
                  className="flex items-center space-x-4 p-3 hover:bg-blue-700 rounded-md transition"
                >
                  <FiLogOut className="text-xl" /> <span>Déconnexion</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="container mx-auto p-6">
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
    </div>
  );
}

export default ClientList;