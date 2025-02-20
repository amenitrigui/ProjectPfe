import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import SideBar from "../../components/Common/SideBar";
import ClientForm from "../../components/Client/ClientForm";
import ToolBar from "../../components/Common/ToolBar";
import Alert from "../../components/Common/Alert";
import { Link } from 'react-router-dom';
import { FiHome, FiLogOut, FiShoppingCart, FiUser, FiBox, FiSettings, FiTruck } from 'react-icons/fi';
import { useDispatch, useSelector } from "react-redux";
import { getClientList,FilltersSaisieUser,getClientFilter } from "../../app/client/clientSlice";


function ClientList() {

const dispatch = useDispatch()
const clientList=useSelector((store)=>store.ClientCrud.clientList)

 // * UseEffect #1 : Récuperer La liste des clients
useEffect(()=>{
  dispatch(getClientList())
},[])

  // * Utilisés pour l'affichage de DataTable
  const [filteredClient, setFilteredClient] = useState([]);
  // * Utilisé pour spécifier quelle db (societé) on interroge
  const dbName = localStorage.getItem("selectedDatabase");
  // * Utilisé pour l'authorization de l'utilisateur à effectuer des opérations
  const token = localStorage.getItem("token");
  
  // * State pour l'affichage d'une alert
  const [showAlert, setShowAlert] = useState(false);
  // * State pour le message d'une alert
  const [message, setMessage] = useState("");

  // * State pour Vérifier si une opération (insert, delete, update) est effectué
  const [operationEffectue, setOperationEffectue] = useState(false);
  const filters= useSelector((store)=>store.ClientCrud.filters)
  console.log(filters)

  // useEffect(() => {
  //   const fetchClients = async () => {
  //     try {
  //       if (!dbName) throw new Error("Aucune base de données sélectionnée.");

  //       const response = await axios.get(
  //         `${process.env.REACT_APP_API_URL}/api/client/${dbName}/List`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       setClients(response.data.result);
  //       setFilteredClient(response.data.result);
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //   };

  //   fetchClients();
  // }, []);



  // * Filtrage de la liste des clients par colonne
  const handleFilterChange = (e, column) => {
    // const value = e.target.value;
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   [column]: value,
    // }));

    // axios
    //   .get(`http://localhost:5000/api/client/${dbName}/filterClient`, {
    //     params: { filters },
    //   })
    //   .then((res) => {
    //     setFilteredClient(res.data.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    dispatch(FilltersSaisieUser({valeur :e.target.value,collonne :column}))
    dispatch(getClientFilter())
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
    console.log(selectedRows[0].code);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      <div className="drawer-content">
        <div className="drawer">
          <input type="checkbox" id="my-drawer" className="drawer-toggle" />

          <div className="drawer-content">

            {/* Contenu principal ici */}
            <label htmlFor="my-drawer" className="btn btn-primary drawer-button m-4 w-40">
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
                <Link to="/home-Page" className="flex items-center space-x-4 p-3 hover:bg-blue-700 rounded-md transition">
                  <FiHome className="text-xl" /> <span>Acuiell</span>
                </Link>
              </li>

              {/* Sales Section */}
              <li className="mb-4">
                <Link to="/DevisList" className="flex items-center space-x-4 p-3 hover:bg-blue-700 rounded-md transition">
                  <FiShoppingCart className="text-xl" /> <span>gestion ventes</span>
                </Link>
              </li>

              {/* Inventory Section */}
              <li className="mb-4">
                <Link to="/DevisFormTout" className="flex items-center space-x-4 p-3 hover:bg-blue-700 rounded-md transition">
                  <FiBox className="text-xl" /> <span>devis form</span>
                </Link>
              </li>

              {/* Purchasing Section */}
              <li className="mb-4">
                <Link to="/Purchases" className="flex items-center space-x-4 p-3 hover:bg-blue-700 rounded-md transition">
                  <FiTruck className="text-xl" /> <span>Achats</span>
                </Link>
              </li>

              {/* Customer Management Section */}
              <li className="mb-4">
                <Link to="/ClientList" className="flex items-center space-x-4 p-3 hover:bg-blue-700 rounded-md transition">
                  <FiUser className="text-xl" /> <span>Clients</span>
                </Link>
              </li>

              {/* Settings Section */}
              <li className="mb-4">
                <Link to="/Settings" className="flex items-center space-x-4 p-3 hover:bg-blue-700 rounded-md transition">
                  <FiSettings className="text-xl" /> <span>Paramètres</span>
                </Link>
              </li>

              {/* Logout Section */}
              <li>
                <Link to="/" className="flex items-center space-x-4 p-3 hover:bg-blue-700 rounded-md transition">
                  <FiLogOut className="text-xl" /> <span>Déconnexion</span>
                </Link>
              </li>

            </ul>
          </div>

        </div>

        {/* Contenu principal */}
        <div className="container mx-auto p-6">
          {showAlert && <Alert message={message} showAlert={showAlert} /> }
          <ToolBar
            setOperationEffectue={setOperationEffectue}
            targetTable={"client"}
            setClientList={setFilteredClient}
            setShowAlert={setShowAlert}
            setMessage={setMessage}
          />

          <ClientForm
            operationEffectue={operationEffectue}
          />
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
              data={clientList}
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
