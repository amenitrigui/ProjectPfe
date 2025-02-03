import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTruck,
  FaFileInvoice,
  FaDollarSign,
  FaUsers,
  FaClipboardList,
  FaFileExport,
  FaEdit,
  FaChartBar,
  FaClipboardCheck,
  FaPowerOff,
} from "react-icons/fa";

const GestionDesVentes = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

   const [selectedRsoc, setSelectedRsoc] = useState(null);
  
    useEffect(() => {
      const selectedDatabase = localStorage.getItem("selectedDatabase");
      const societies = localStorage.getItem("societies");
  
      if (selectedDatabase && societies) {
        const parsedSocieties = JSON.parse(societies);
        const selectedSociety = parsedSocieties.find(society => society.societe === selectedDatabase);
  
        if (selectedSociety) {
          setSelectedRsoc(selectedSociety.rsoc);
        } else {
          console.log("Société non trouvée.");
        }
      } else {
        console.log("Aucune société ou base de données sélectionnée.");
      }
    }, []);

  const handleLogout = () => {
    setIsModalOpen(true);
  };

  const handleConfirmLogout = () => {
    setIsModalOpen(false);
    navigate("/Home-Page");
  };

  const handleCancelLogout = () => {
    setIsModalOpen(false);
  };

  const sectionsCentral = [
    { name: "BON DE LIVRAISON", icon: <FaTruck /> },
    { name: "FACTURATION BL", icon: <FaFileInvoice /> },
    { name: "FACTURE COMPTANT", icon: <FaDollarSign /> },
    { name: "AVOIR CLIENT", icon: <FaUsers /> },
    { name: "CONSULTATION FACTURE", icon: <FaClipboardList /> },
    {
      name: "DEVIS / FACT PROFORMA",
      route: "/Dashboard",
      icon: <FaClipboardCheck />,
    },
    { name: "JOURNAL DES DEVIS", icon: <FaChartBar /> },
    { name: "ÉDITIONS", icon: <FaEdit /> },
    { name: "FACTURE EXPORT", icon: <FaFileExport /> },
  ];

  const modulesRight = [
    { name: "Gestion Des ACHATS", route: "/achats" },
    { name: "Gestion Des CLIENTS", route: "/clients" },
    { name: "Gestion Des FOURNISSEURS", route: "/fournisseurs" },
    { name: "Gestion Des B.C.C.", route: "/bcc" },
    { name: "Gestion Des B.C.F.", route: "/bcf" },
  ];

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-900 text-white flex flex-col items-center relative">
      <div className="flex flex-col items-center mt-10">
        <h1 className="text-4xl font-extrabold mb-6 border-b-4 border-gray-300 pb-2">
          GESTION DES VENTES
        </h1>
        <div className="absolute top-4 left-4">
        <h2 className="text-black font-bold italic text-3xl">
            <span className="font-bold">{selectedRsoc || "Aucune société sélectionnée"}</span>
        </h2> 

      </div>

        <button
          onClick={handleLogout}
          className="bg-gray-100 p-4 rounded-full shadow-md hover:shadow-xl transition"
        >
          <FaPowerOff className="text-red-600 text-3xl" />
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4 text-black">
              Voulez-vous quitter la gestion des ventes ?
            </h2>

            <div className="flex justify-between">
              <button
                onClick={handleConfirmLogout}
                className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-400"
              >
                Oui
              </button>
              <button
                onClick={handleCancelLogout}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200"
              >
                Non
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-8 mt-12">
        {sectionsCentral.map((section, index) => (
          <button
            key={index}
            onClick={() => handleNavigation(section.route)}
            className="flex flex-col items-center justify-center bg-white text-blue-700 w-64 h-24 rounded-lg shadow-md hover:shadow-xl hover:bg-gray-100 transition"
          >
            <div className="text-3xl mb-2">{section.icon}</div>
            <span className="text-lg font-semibold">{section.name}</span>
          </button>
        ))}
      </div>

      <div className="absolute right-10 top-32 space-y-6">
        {modulesRight.map((module, index) => (
          <button
            key={index}
            onClick={() => handleNavigation(module.route)}
            className="bg-gray-100 w-48 h-20 rounded-lg shadow-md hover:shadow-xl flex flex-col justify-center items-center text-blue-800 font-bold hover:bg-blue-200 transition"
          >
            <span>{module.name}</span>
            <span className="text-xs text-gray-500">IC ERP</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GestionDesVentes;
