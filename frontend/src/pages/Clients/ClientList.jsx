

import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Link } from "react-router-dom";
import SideBar from "../../components/SideBar";

function ClientList() {
  const [clients, setClients] = useState([]);
  const [filteredDevis, setFilteredDevis] = useState([]);
  const dataBaseName = localStorage.getItem("selectedDatabase");

  useEffect(() => {
    /**
     * Description
     * Chargement de liste des devis
     * @author Ameni
     * @date 2025-02-06
     * @returns {filteredDevis / devis}
     */
    const fetchDevis = async () => {
      try {
        const dbName = localStorage.getItem("selectedDatabase");
        if (!dbName) throw new Error("Aucune base de données sélectionnée.");

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/client/${dbName}/ListeClient`
        );
        console.log(response)
  setClients(response.data.result);
        
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchDevis();
  }, []);

  /**
   * Description
   * Filtrage de contenu de datatable par colonne
   * @author Bilel
   * @date 2025-02-06
   * @returns {filteredDevis}
   */
  const handleFilterChange = (e, column) => {
    const value = e.target.value;
    filters[column] = value;

    axios.get("http://localhost:5000/api/client/filterClient", { params: {filters: filters, databaseName: dataBaseName} })
    .then(res => {
      console.log(res.data.data);
      setFilteredDevis(res.data.data);

    }).catch(error => {
      console.log(error);
    })
  };

  /**
   * Description
   * Filtres pour les barres de recherche
   * @author Bilel
   * @date 2025-02-06
   */
  const [filters, setFilters] = useState({
    code: "",
    rsoc: "",
    adresse: "",
    cp: "",
    email: "",
   
  });

  /**
   * Description
   * Colonnes de datatable
   * @author Ameni
   * @date 2025-02-06
   */
  const columns = [
    { name: "code", selector: (row) => row.code, sortable: true },
    { name: "raison sociale", selector: (row) => row.rsoc, sortable: true },
    { name: "adresse", selector: (row) => row.adresse },
    { name: "Code postale", selector: (row) => row.cp },
    { name: "email", selector: (row) => row.email },
    //  { name: "RSCLI", selector: (row) => row.RSCLI },
    // { name: "Montant TTC", selector: (row) => row.MTTC },
  ];

  /**
   * Description
   * styles personalisées de datatable
   * @author Ameni
   * @date 2025-02-06
   */
  const customStyles = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "18px",
        backgroundColor: "#e0f2fe", // Bleu clair
        color: "#034694",
        padding: "12px",
      },
    },
    rows: {
      style: {
        fontSize: "16px",
        backgroundColor: "#f8fafc", // Gris très clair
        "&:hover": {
          backgroundColor: "#dbeafe", // Bleu clair au survol
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

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
 
      <div className="flex justify-between items-center mb-6 p-4 bg-white shadow-md rounded-lg">
        
        <img src="logicom.jpg" alt="Logicom Logo" className="h-16 w-auto rounded-md shadow-md" />
        <h1 className="text-4xl font-bold text-blue-700 text-center">📜 Liste des Devis</h1>
        <div className="flex space-x-4 text-lg font-semibold">
          <Link to="/Dashboard" className="text-blue-600 hover:underline">
            Dashboard
          </Link>
          <Link to="/" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </div>
      </div>

      {/* Zone de recherche */}
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

      {/* Tableau des devis */}
      <div className="bg-white p-4 rounded-lg shadow-lg mt-4">
        <DataTable
          columns={columns}
          data={clients}
          customStyles={customStyles}
          selectableRows
          fixedHeader
          pagination
          highlightOnHover
          striped
        />
      </div>
    </div>
  );
}

export default ClientList;
