import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDbName } from "../../app/utilisateurSystemSlices/utilisateurSystemSlice";

const SocietiesList = () => {
  const [societies, setSocieties] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.utilisateurSystemSlice.token);
  if (token == "") {
    navigate("/");
  }

  useEffect(() => {
    const societiesFromStorage = JSON.parse(localStorage.getItem("societies"));
    if (societiesFromStorage) {
      setSocieties(societiesFromStorage);
    } else {
      console.log("Aucune société trouvée dans le localStorage.");
    }
  }, [navigate]);

  const handleSelect = async (society) => {
    try {

      if (!token) {
        navigate("/");
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/utilisateurs/select-database`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            databaseName: society,
          }),
        }
      );

      if (response.status === 200) {
        dispatch(setDbName(society));
        localStorage.setItem("selectedDatabase", society);
        localStorage.setItem("selectedRsoc", society.rsoc);
        navigate("/Dashboard");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la sélection de la base de données:",
        error
      );
      alert("Une erreur est survenue lors de la sélection de la société.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-indigo-600 to-purple-700 flex items-start justify-center p-8">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Liste des Sociétés
        </h1>

        {societies.length === 0 ? (
          <div className="text-center text-gray-600">
            Aucune société trouvée.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {societies.map((society, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center justify-between text-lg font-semibold text-gray-800 mb-2">
                  <div className="flex items-center">
                    <span className="mr-2 text-2xl">📁</span>
                    <span>{society.societe}</span>
                  </div>
                  <span>{society.rsoc}</span>
                </div>
                <button
                  onClick={() => handleSelect(society.societe)}
                  className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
                >
                  Sélectionner
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SocietiesList;
