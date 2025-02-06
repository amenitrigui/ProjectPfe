import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Link } from "react-router-dom";

function DevisList() {
  const [devis, setDevis] = useState([]);
  const [filteredDevis, setFilteredDevis] = useState([]);
  const [filters, setFilters] = useState({
    NUMBL: "",
    DATT: "",
    libpv: "",
    CODECLI: "",
    ADRCLI: "",
    RSCLI: "",
    MTTC: "",
  });

  useEffect(() => {
    const fetchDevis = async () => {
      try {
        const dbName = localStorage.getItem("selectedDatabase");
        if (!dbName) throw new Error("Aucune base de données sélectionnée.");

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/devis/${dbName}/devis`
        );
        setDevis(response.data.devisList);
        setFilteredDevis(response.data.devisList);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchDevis();
  }, []);

  const columns = [
    { name: "Numéro BL", selector: (row) => row.NUMBL, sortable: true },
    { name: "Date", selector: (row) => row.DATT, sortable: true },
    { name: "Point de vente", selector: (row) => row.libpv },
    { name: "Code client", selector: (row) => row.CODECLI },
    { name: "Adresse", selector: (row) => row.ADRCLI },
    { name: "RSCLI", selector: (row) => row.RSCLI },
    { name: "Montant TTC", selector: (row) => row.MTTC },
  ];

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

  const handleFilterChange = (e, column) => {
    const value = e.target.value;

    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [column]: value };

      const filteredData = devis.filter((row) =>
        Object.keys(newFilters).every((key) =>
          row[key]?.toString().toLowerCase().includes(newFilters[key].toLowerCase())
        )
      );

      setFilteredDevis(filteredData);
      return newFilters;
    });
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 p-4 bg-white shadow-md rounded-lg">
        <img src="logicom.jpg" alt="Logicom Logo" className="h-16 w-auto rounded-md shadow-md" />
        <h1 className="text-4xl font-bold text-blue-700 text-center">📜 Liste des Devis</h1>
        <div className="flex space-x-4 text-lg font-semibold">
          <Link to="/Dashboard" className="text-blue-600 hover:underline">Dashboard</Link>
          <Link to="/" className="text-blue-600 hover:underline">Sign In</Link>
        </div>
      </div>

      {/* Zone de recherche */}
      <div className="grid grid-cols-3 gap-4 p-4 bg-gray-100 rounded-lg shadow-md">
        {Object.keys(filters).map((column, index) => (
          <input
            key={index}
            type="text"
            value={filters[column]}
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
          data={filteredDevis}
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

export default DevisList;
