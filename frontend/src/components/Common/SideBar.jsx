import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiLogOut, FiShoppingCart, FiUser, FiBox, FiSettings, FiTruck } from 'react-icons/fi';

function SideBar() {
    console.log("SideBar")
    return (
        <>
            {/* Sidebar Container */}
            <div className="drawer-side fixed inset-0 z-50"> {/* Fixed and on top */}
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-blue-800 text-white min-h-full w-80 p-6 space-y-6">
                    {/* Sidebar Header */}
                    <div className="text-center text-xl font-semibold mb-8">
                        <h2>Logicom ERP</h2>
                    </div>

                    {/* Dashboard Section */}
                    <li className="mb-4">
                        <Link to="/home-Page" className="flex items-center space-x-4 p-3 hover:bg-blue-700 rounded-md transition">
                            <FiHome className="text-xl" /> <span>Acuiell</span>
                        </Link>
                    </li>

                    {/* Sales Section */}
                    <li className="mb-4">
                        <Link to="/DevisList" className="flex items-center space-x-4 p-3 hover:bg-blue-700 rounded-md transition">
                            <FiShoppingCart className="text-xl" /> <span>gestion ventes</span>
                        </Link>
                    </li>

                    {/* Inventory Section */}
                    <li className="mb-4">
                        <Link to="/DevisFormTout" className="flex items-center space-x-4 p-3 hover:bg-blue-700 rounded-md transition">
                            <FiBox className="text-xl" /> <span>devis form</span>
                        </Link>
                    </li>

                    {/* Purchasing Section */}
                    <li className="mb-4">
                        <Link to="/Purchases" className="flex items-center space-x-4 p-3 hover:bg-blue-700 rounded-md transition">
                            <FiTruck className="text-xl" /> <span>Achats</span>
                        </Link>
                    </li>

                    {/* Customer Management Section */}
                    <li className="mb-4">
                        <Link to="/ClientList" className="flex items-center space-x-4 p-3 hover:bg-blue-700 rounded-md transition">
                            <FiUser className="text-xl" /> <span>Clients</span>
                        </Link>
                    </li>

                    {/* Settings Section */}
                    <li className="mb-4">
                        <Link to="/Settings" className="flex items-center space-x-4 p-3 hover:bg-blue-700 rounded-md transition">
                            <FiSettings className="text-xl" /> <span>Paramètres</span>
                        </Link>
                    </li>

                    {/* Logout Section */}
                    <li>
                        <Link to="/" className="flex items-center space-x-4 p-3 hover:bg-blue-700 rounded-md transition">
                            <FiLogOut className="text-xl" /> <span>Déconnexion</span>
                        </Link>
                    </li>
                    
                </ul>
            </div>

            {/* Logo placed outside the sidebar */}
            <div className="logicom-logo absolute bottom-6 right-6 z-50">
                <img src="/logo.png" alt="Logicom Logo" className="w-20 h-auto" />
            </div>
        </>
    );
}

export default SideBar;
