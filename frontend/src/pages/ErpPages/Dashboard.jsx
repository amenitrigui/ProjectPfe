import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  getNbTotalDevisGeneres,
  getDevisCountByMonthAndYear,
  getNombreTotalDevis,
  getTotalChiffres,
  getNbTotalDevisGeneresParUtilisateur,
  getNbDevisNonGeneresParUtilisateur,
  getNbTotalDevisAnnulees,
  getNbTotalDevisEnCours,
  getNbTotalDevisSansStatus,
  getAnneesDistinctGenerationDevis,
  getNbDevisGeneresParAnnee,
} from "../../app/devis_slices/devisSlice";

import SideBar from "../../components/Common/SideBar";
import { setOuvrireDrawerMenu } from "../../app/interface_slices/interfaceSlice";
import ToolBar from "../../components/Common/ToolBar";

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

const data03 = [
  { name: "Jan", devis: 400 },
  { name: "Fév", devis: 300 },
  { name: "Mar", devis: 200 },
  { name: "Avr", devis: 278 },
  { name: "Mai", devis: 189 },
  { name: "Juin", devis: 239 },
  { name: "Juil", devis: 349 },
];

const Dashboard = () => {
  //?==================================================================================================================
  //?=====================================================variables====================================================
  //?==================================================================================================================
  const devisMonthYear = useSelector(
    (state) => state.devisSlice.devisMonthYear
  );
  const dispatch = useDispatch();
  const [anneeSelectionne, setAnneeSelectionne] = useState(new Date().getFullYear());

  const ouvrireMenuDrawer = useSelector(
    (state) => state.interfaceSlice.ouvrireMenuDrawer
  );
  const nombredevis = useSelector((state) => state.devisSlice.nombreDeDevis);
  const totalchifre = useSelector((state) => state.devisSlice.totalchifre);
  const nbTotalDevisAnnulees = useSelector(
    (state) => state.devisSlice.nbTotalDevisAnnulees
  );
  const nbDevisEncours = useSelector(
    (state) => state.devisSlice.nbDevisEncours
  );
  const nbTotDevisSansStatus = useSelector(
    (state) => state.devisSlice.nbTotDevisSansStatus
  );

  const utilisateurConnecte = useSelector(
    (state) => state.utilisateurSystemSlice.utilisateurConnecte
  );
  const nbTotalDevisGeneres = useSelector(
    (state) => state.devisSlice.nbTotalDevisGeneres
  );

  const nbTotalDevisGeneresParUtilisateur = useSelector(
    (state) => state.devisSlice.nbTotalDevisGeneresParUtilisateur
  );

  const nbTotalDevisNonGeneresParUtilisateur = useSelector(
    (state) => state.devisSlice.nbTotalDevisNonGeneresParUtilisateur
  );

  const nbDevisGeneresParAnnee = useSelector((state) => state.devisSlice.nbDevisGeneresParAnnee);
  // Transformer les données pour le BarChart
  const chartData = nbDevisGeneresParAnnee.map((item) => {
    return {
      name: item.mois, // ou `${item.month}/${item.year}` si tu préfères
      devis: item.nombreDevis,
    };
  });

  const statsDevis = [
    { name: "Générés", value: nbTotalDevisGeneres },
    { name: "Annulées", value: nbTotalDevisAnnulees },
    { name: `Générés par ${utilisateurConnecte.codeuser}`, value: nbTotalDevisGeneresParUtilisateur },
    { name: `Non Générés ${utilisateurConnecte.codeuser}`, value: nbTotalDevisNonGeneresParUtilisateur },
  ];
  const anneesDistinctGenerationDevis = useSelector((state) => state.devisSlice.anneesDistinctGenerationDevis);
  //?==================================================================================================================
  //?=================================================appels UseEffect=================================================
  //?==================================================================================================================
  useEffect(() => {
    dispatch(getNombreTotalDevis());
    dispatch(getTotalChiffres());
    dispatch(getNbTotalDevisGeneres());
    dispatch(getDevisCountByMonthAndYear());
    dispatch(getNbTotalDevisAnnulees());
    dispatch(getNbTotalDevisEnCours());
    dispatch(getNbTotalDevisGeneresParUtilisateur());
    dispatch(getNbDevisNonGeneresParUtilisateur());
    dispatch(getNbTotalDevisSansStatus());
    dispatch(getAnneesDistinctGenerationDevis());
    dispatch(getNbDevisGeneresParAnnee(new Date().getFullYear()))
  }, []);

  useEffect(() => {
    dispatch(getNbDevisGeneresParAnnee(anneeSelectionne))
  },[anneeSelectionne])
  //?==================================================================================================================
  //?=====================================================fonctions====================================================
  //?==================================================================================================================
  const toggleSidebar = () => {
    dispatch(setOuvrireDrawerMenu(!ouvrireMenuDrawer));
  };

  return (
    <div className="container">
      <SideBar />

      <div className={`main ${ouvrireMenuDrawer ? "active" : ""}`}>
        <ToolBar />

        <div className="cardBox grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              number: nombredevis,
              name: "Nombre devis Total",
            },
            {
              number: nbTotalDevisGeneres,
              name: "Nombre Total de devis générés",
            },
            {
              number: nbTotalDevisGeneresParUtilisateur,
              name: "Nombre de devis générés par l'utilisateur",
              user: `${utilisateurConnecte.codeuser}//${utilisateurConnecte.nom}`,
            },
            {
              number: nbTotalDevisNonGeneresParUtilisateur,
              name: "Nombre devis non générés par Utilisateur",
            },
          ].map((card, index) => {
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
                  outerRadius={70}
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
                <Legend />
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
                  data={statsDevis}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
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
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="p-4 bg-white shadow rounded">
            <div className="cardHeader mb-4">
              <h2>Nombre de devis générés par mois et année</h2>
            </div>
            <input type="checkbox" /> Afficher les résultats pour l'utilisateur courant
            <select className="w-full select border-none focus:outline-none focus:ring-0 appearance-none" value={anneeSelectionne} onChange={(e) => {setAnneeSelectionne(e.target.value)}}>
              {anneesDistinctGenerationDevis.map((annee) => {
                return (
                  <option key={annee.year} value={annee.year}>{annee.year}</option>
                )
              })}
            </select>
            <hr></hr>
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
