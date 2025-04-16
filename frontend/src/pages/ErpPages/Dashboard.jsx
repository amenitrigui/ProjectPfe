import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaCog,
  FaCreditCard,
  FaSignOutAlt,
  FaRegUserCircle,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

import {
  getDevisCountByMonthAndYear,
  getNombreTotalDevis,
  getTotalChiffres,
} from "../../app/devis_slices/devisSlice";

import SideBar from "../../components/Common/SideBar";
import { setOuvrireDrawerMenu } from "../../app/interface_slices/uiSlice";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const data01 = [
  { name: "Clients", value: 400 },
  { name: "Fournisseurs", value: 300 },
  { name: "Partenaires", value: 300 },
  { name: "Autres", value: 200 },
];

const data02 = [
  { name: "Validés", value: 2400 },
  { name: "En attente", value: 4567 },
  { name: "Refusés", value: 1398 },
  { name: "En cours", value: 9800 },
];

const Dashboard = () => {
  const devisMonthYear = useSelector((state) => state.DevisCrud.devisMonthYear);

  // Transformer les données pour le BarChart
  const chartData = devisMonthYear.map((item) => {
    // Créer un label comme "01/2024" ou "Janvier 2024"
    const monthNames = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ];
    return {
      name: `${monthNames[item.month - 1]} ${item.year}`, // ou `${item.month}/${item.year}` si tu préfères
      devis: item.totalDevis,
    };
  });

  const data03 = [
    { name: "Jan", devis: 400 },
    { name: "Fév", devis: 300 },
    { name: "Mar", devis: 200 },
    { name: "Avr", devis: 278 },
    { name: "Mai", devis: 189 },
    { name: "Juin", devis: 239 },
    { name: "Juil", devis: 349 },
  ];
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const ouvrireMenuDrawer = useSelector(
    (state) => state.uiStates.ouvrireMenuDrawer
  );
  const nombredevis = useSelector((state) => state.DevisCrud.nombreDeDevis);
  const totalchifre = useSelector((state) => state.DevisCrud.totalchifre);
  const infosUtilisateur = useSelector(
    (state) => state.UtilisateurInfo.infosUtilisateur
  );
  const utilisateurConnecte = useSelector(
    (state) => state.Utilisateur_SuperviseurSlices.utilisateurConnecte
  );
  useEffect(() => {
    dispatch(getNombreTotalDevis());
    dispatch(getTotalChiffres());
    dispatch(getDevisCountByMonthAndYear());
  }, []);
  const toggleSidebar = () => {
    dispatch(setOuvrireDrawerMenu(!ouvrireMenuDrawer));
  };

  return (
    <div className="container">
      <SideBar />

      <div className={`main ${ouvrireMenuDrawer ? "active" : ""}`}>
        <div className="topbar">
          <div className="toggle" onClick={toggleSidebar}>
            <ion-icon name="menu-outline"></ion-icon>
          </div>

          <div className="relative inline-block text-left">
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
              <FaRegUserCircle className="mr-3 text-3xl" />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            {isOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white border rounded-lg shadow-lg z-50">
                <div className="p-4 flex items-center border-b">
                  <FaRegUserCircle className="mr-3 text-3xl" />
                  <div>
                    <p className="font-semibold">{infosUtilisateur.nom}</p>
                    <p className="text-sm text-gray-500">
                      {infosUtilisateur.type}
                    </p>
                  </div>
                </div>
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link
                      to="/UtilisateurFormTout"
                      className="flex items-center"
                    >
                      <FaUser className="mr-3" /> My Profile
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link to="/Settings" className="flex items-center">
                      <FaCog className="mr-3" /> Settings
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 border-t">
                    <Link to="/" className="flex items-center">
                      <FaSignOutAlt className="mr-3" /> Log Out
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="cardBox grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              number: nombredevis,
              name: "Nombre devis Total",
            },
            {
              number: totalchifre.toFixed(2),
              name: "Nombre devis générés Total",
              user: `${utilisateurConnecte.codeuser}//${utilisateurConnecte.nom}`,
            },
            {
              number: nombredevis,
              name: "Nombre devis générés par Utilisateur",
              user: `${utilisateurConnecte.codeuser}//${utilisateurConnecte.nom}`,
            },
            {
              number: totalchifre.toFixed(2),
              name: "Nombre devis non générés par Utilisateur",
            },
          ].map((card, index) => {
            // ✅ Icônes ERP dynamiques selon texte
            const getIcon = (text) => {
              const lower = text.toLowerCase();
              if (lower.includes("non générés")) return "close-circle-outline";
              if (lower.includes("générés") && lower.includes("utilisateur"))
                return "person-circle-outline";
              if (lower.includes("générés")) return "document-text-outline";
              if (lower.includes("total")) return "file-tray-full-outline";
              return "information-circle-outline";
            };

            return (
              <div className="card" key={index}>
                <div>
                  <div className="numbers">{card.number}</div>
                  <div className="cardName">
                    {card.name}
                    {card.user && (
                      <span className="text-blue-600 font-semibold ml-1">
                        {` ${card.user}`}
                      </span>
                    )}
                  </div>
                </div>
                <div className="iconBx">
                  <ion-icon name={getIcon(card.name)}></ion-icon>
                </div>
              </div>
            );
          })}
        </div>

        <div className="details grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Pie Chart - Clients */}
          <div className="p-4 bg-white shadow rounded">
            <div className="cardHeader mb-4">
              <h2>Statistiques Clients</h2>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={data01}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {data01.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart - Devis */}
          <div className="p-4 bg-white shadow rounded">
            <div className="cardHeader mb-4">
              <h2>Statistiques Devis</h2>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={data02}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#82ca9d"
                  label
                >
                  {data02.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="p-4 bg-white shadow rounded">
            <div className="cardHeader mb-4">
              <h2>Nombre Devis par Mois et Année</h2>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="devis" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
