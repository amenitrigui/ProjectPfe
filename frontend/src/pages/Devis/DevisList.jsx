import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDevisList, setDevisList } from "../../app/devis_slices/devisSlice";
import DevisFormTout from "./DevisFormTout";
import SideBar from "../../components/Common/SideBar";
import ToolBar from "../../components/Common/ToolBar";
function DevisList() {
  const [filteredDevis, setFilteredDevis] = useState([]);
  const dataBaseName = localStorage.getItem("selectedDatabase");

  const dispatch = useDispatch();
  const ListeDevis = useSelector((store) => store.devisSlice.devisList);

  useEffect(() => {
    dispatch(getDevisList());
  }, [dispatch]);

  const [filters, setFilters] = useState({
    NUMBL: "",
    DATT: "",
    libpv: "",
    CODECLI: "",
    ADRCLI: "",
    RSCLI: "",
    MTTC: "",
  });

  const handleFilterChange = (e, column) => {
    const value = e.target.value;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [column]: value,
    }));

    if (dataBaseName) {
      axios
        .get("http://localhost:5000/api/devis/filterDevis", {
          params: {
            filters: { ...filters, [column]: value },
            databaseName: dataBaseName,
          },
        })
        .then((res) => {
          setFilteredDevis(res.data.data);
          dispatch(setDevisList(res.data.data));
        })
        .catch((error) => {
          console.error("Erreur lors du filtrage :", error);
        });
    }
  };

  const columns = [
    { name: "N°Devis", selector: (row) => row.NUMBL, sortable: true },
    { name: "Date", selector: (row) => row.DATEBL, sortable: true },
    { name: "G.", selector: (row) => row.CODEFACTURE },
    { name: "B.L", selector: (row) => row.CODECLI },
    { name: "Client", selector: (row) => row.RSCLI },
    { name: "MTTC", selector: (row) => row.MTTC },
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
   const ouvrireMenuDrawer = useSelector(
      (state) => state.interfaceSlice.ouvrireMenuDrawer
    );

  return (
    <div className="container">
      <SideBar />

      
      <div className={`main ${ouvrireMenuDrawer ? "active" : ""}`}>
        <ToolBar></ToolBar>
      {/* Barre de filtre */}
      <div className="grid grid-cols-3 gap-4 p-4 bg-gray-100 rounded-lg shadow-md">
        {columns.map((col, index) => (
          <input
            key={index}
            type="text"
            onChange={(e) => handleFilterChange(e, col.selector)}
            placeholder={`🔍 ${col.name}`}
            className="border p-2 rounded-md shadow-sm focus:ring focus:ring-blue-300"
          />
        ))}
      </div>

      {/* Tableau des devis */}
      <div className="bg-white p-4 rounded-lg shadow-lg mt-4">
        <DataTable
          columns={columns}
          data={filteredDevis.length > 0 ? filteredDevis : ListeDevis}
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
  );
}

export default DevisList;
