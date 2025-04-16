import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import {
  filtrerListeArticle,
  getListeArticles,
} from "../../app/article_slices/articleSlice";
function ArticleList() {
  const dispatch = useDispatch();
  const listeArticle = useSelector((state) => state.ArticlesDevis.ListeArticle);
  const filters = {
    code: "",
    libelle: "",
    famille: "",
    type: "",
    typeart: "",
    codesousfam: "",
  };

  const handleFilterChange = (e, colonne) => {
    const updatedFilters = { ...filters, [colonne]: e.target.value };
    dispatch(filtrerListeArticle(updatedFilters));
  };

  useEffect(() => {
    dispatch(getListeArticles());
  }, []);
  const columns = [
    { name: "Code", selector: (row) => row.code, sortable: true },
    { name: "libelle", selector: (row) => row.libelle, sortable: true },
    { name: "famille", selector: (row) => row.famille },
    { name: "type", selector: (row) => row.type },
    { name: "typeart", selector: (row) => row.typeart },
    { name: "codesousfam", selector: (row) => row.codesousfam },
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

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-6">
        <div className="mt-2 flex items-center relative">
          <Link
            to="/ArticleFormTout"
            className="text-lg font-semibold text-[primaryColor] underline hover:text-blue-500 absolute left-0"
          >
            ← Retour
          </Link>

          <h1
            className="text-2xl font-bold text-center flex-1"
            style={{ color: primaryColor }}
          >
            Liste d'Article
          </h1>
        </div>

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
            data={listeArticle}
            customStyles={customStyles}
            selectableRows
            fixedHeader
            pagination
            highlightOnHover
            striped
            //   onSelectedRowsChange={handleSelectionChange}
          />
        </div>
      </div>
    </div>
  );
}

export default ArticleList;
