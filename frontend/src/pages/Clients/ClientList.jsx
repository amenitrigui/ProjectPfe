import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import SideBar from "../../components/Common/SideBar";
import ClientForm from "../../components/Client/ClientForm";

function ClientList() {
  const [clients, setClients] = useState([]);
  const [filteredClient, setFilteredClient] = useState([]);
  const dataBaseName = localStorage.getItem("selectedDatabase");
  const dbName = localStorage.getItem("selectedDatabase");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDevis = async () => {
      try {
        if (!dbName) throw new Error("Aucune base de données sélectionnée.");

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/client/${dbName}/ListeClient`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setClients(response.data.result);
        setFilteredClient(response.data.result);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchDevis();
  }, []);

  const [filters, setFilters] = useState({
    code: "",
    rsoc: "",
    adresse: "",
    cp: "",
    email: "",
  });

  const handleFilterChange = (e, column) => {
    const value = e.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [column]: value,
    }));

    axios
      .get(`http://localhost:5000/api/client/${dbName}/filterClient`, {
        params: { filters },
      })
      .then((res) => {
        setFilteredClient(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const columns = [
    { name: "Code", selector: (row) => row.code, sortable: true },
    { name: "Raison Sociale", selector: (row) => row.rsoc, sortable: true },
    { name: "Adresse", selector: (row) => row.adresse },
    { name: "Code Postal", selector: (row) => row.cp },
    { name: "Email", selector: (row) => row.email },
  ];

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

  return (
    
      <div className="drawer lg:drawer-open">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Contenu principal */}
          <div className="container mx-auto p-6">
            <ClientForm ClientAjoute={setFilteredClient} />
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
                data={filteredClient}
                customStyles={customStyles}
                selectableRows
                fixedHeader
                pagination
                highlightOnHover
                striped
              />
            </div>
          </div>
        </div>
    
        {/* SideBar ici */}
        <SideBar />
      </div>
    );
    
  
}

export default ClientList;
