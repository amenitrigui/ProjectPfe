import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  filtrerListeDevis,
  getDevisList,
  setDevisList,
  setFiltresSaisient,
} from "../../app/devis_slices/devisSlice";
import DevisFormTout from "./DevisFormTout";
import SideBar from "../../components/Common/SideBar";
import ToolBar from "../../components/Common/ToolBar";
function DevisList() {
  const dataBaseName = localStorage.getItem("selectedDatabase");

  const dispatch = useDispatch();
  const ListeDevis = useSelector((state) => state.devisSlice.devisList);
  const filterDevis = useSelector((state) => state.devisSlice.filterDevis);
  useEffect(() => {
    dispatch(getDevisList());
  }, [dispatch]);

  const handleFilterChange = (e, column) => {
    dispatch(setFiltresSaisient({ valeur: e.target.value, collonne: column }));
    dispatch(filtrerListeDevis());
  };

  const columns = [
    { name: "N°Devis", selector: (row) => row.NUMBL, sortable: true },
    { name: "DATEBL", selector: (row) => row.DATEBL, sortable: true },
    { name: "Code Facture", selector: (row) => row.CODEFACTURE },
    { name: "Code Cli", selector: (row) => row.CODECLI },
    { name: "ADRCLI", selector: (row) => row.ADRCLI },

    { name: "RSCLI", selector: (row) => row.RSCLI },
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
          {Object.keys(filterDevis).map((column, index) => (
            <input
              key={index}
              type="text"
              onChange={(e) => handleFilterChange(e, column)}
              placeholder={`🔍 ${column}`}
              className="border p-2 rounded-md shadow-sm focus:ring focus:ring-blue-300"
            />
          ))}
        </div>

        {/* Tableau des devis */}
        <div className="bg-white p-4 rounded-lg shadow-lg mt-4">
          <DataTable
            columns={columns}
            data={ListeDevis}
            customStyles={customStyles}
            selectableRows
            fixedHeader
            pagination
            highlightOnHover
            striped
            // onSelectedRowsChange={handleSelectionChange}
          />
        </div>
      </div>
    </div>
  );
}

export default DevisList;
