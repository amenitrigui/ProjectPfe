import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Link } from "react-router-dom";
import SideBar from "../../components/Common/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { getDevisList, setDevisList } from "../../app/devis_slices/devisSlice";

function DevisList() {
  const [devis, setDevis] = useState([]);
  const [filteredDevis, setFilteredDevis] = useState([]);
  const dataBaseName = localStorage.getItem("selectedDatabase");
  //Action
  const dispatch = useDispatch();
  // todo lire les donnes de listedevis a partie min devisslice
  const ListeDevis = useSelector((store) => store.DevisCrud.DevisList);
  // todo recuperation de donnes donc on utilise useeffect
  useEffect(() => {
    dispatch(getDevisList());
  }, []); // [] hthii bch may9ahdch f boucle infini

  // useEffect(() => {
  //   const fetchDevis = async () => {
  //     try {
  //       const dbName = localStorage.getItem("selectedDatabase");
  //       if (!dbName) throw new Error("Aucune base de données sélectionnée.");

  //       const response = await axios.get(
  //         `${process.env.REACT_APP_API_URL}/api/devis/${dbName}/devis`
  //       );
  //       setDevis(response.data.devisList);
  //       setFilteredDevis(response.data.devisList);
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //   };

  //   fetchDevis();
  // }, []);

  // ! placeholder solution
  const handleFilterChange = (e, column) => {
    const value = e.target.value;
    filters[column] = value;

    axios
      .get("http://localhost:5000/api/devis/filterDevis", {
        params: { filters: filters, databaseName: dataBaseName },
      })
      .then((res) => {
        console.log(res.data.data);
        setFilteredDevis(res.data.data);
        dispatch(setDevisList(res.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // * tableau des filtres appliquées par l'utilisateur
  const [filters, setFilters] = useState({
    NUMBL: "",
    DATT: "",
    libpv: "",
    CODECLI: "",
    ADRCLI: "",
    RSCLI: "",
    MTTC: "",
  });

  const columns = [
    { name: "Numéro BL", selector: (row) => row.NUMBL, sortable: true },
    { name: "Date", selector: (row) => row.datt, sortable: true },
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

  return (
    <div className="container mx-auto p-6">
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
          data={ListeDevis}
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
