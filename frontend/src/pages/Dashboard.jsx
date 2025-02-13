import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiLogOut } from 'react-icons/fi';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from 'chart.js';
import SideBar from '../components/Common/SideBar';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement);

function Dashboard() {
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Ventes',
        data: [30, 45, 60, 50, 70, 90],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenus',
        data: [400, 600, 800, 700, 900, 1100],
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
    ],
  };

  const pieData = {
    labels: ['Produit A', 'Produit B', 'Produit C'],
    datasets: [
      {
        data: [300, 500, 200],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar avec Drawer */}
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Bouton pour ouvrir la sidebar */}
          <label htmlFor="my-drawer" className="btn btn-primary drawer-button m-4 w-40">
  <img src="enter.png" alt="enter Icon" className="w-6 h-6" />
</label>


          {/* Contenu principal */}
          <div className="flex-1 p-6">
            <h1 className="text-3xl font-bold text-blue-600 mb-6">📊 Statistiques</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-2">Ventes Mensuelles</h2>
                <Bar data={barData} />
              </div>
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-2">Revenus</h2>
                <Line data={lineData} />
              </div>
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-2">Répartition des Produits</h2>
                <Pie data={pieData} />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
     <SideBar></SideBar>
      </div>
    </div>
  );
}

export default Dashboard;
