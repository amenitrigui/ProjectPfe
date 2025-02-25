import { FaFileInvoice, FaUser, FaClipboardList, FaUsers } from "react-icons/fa";
import ToolBar from "../../components/Common/ToolBar";
import SideBar from "../../components/Common/SideBar";
import { Link } from 'react-router-dom';
import { FiHome, FiLogOut, FiShoppingCart, FiUser, FiBox, FiSettings, FiTruck } from 'react-icons/fi';
import DevisList from "./DevisList";


function DevisFormTout() {
    return (
        <div className="bg-gray-100 min-h-screen p-6">
            {/* Toolbar et Sidebar */}

            <div className="drawer">
                <input type="checkbox" id="my-drawer" className="drawer-toggle" />

                <div className="drawer-content">

                    {/* Contenu principal ici */}
                    <div className="flex justify-end">
                        <label htmlFor="my-drawer" className="btn btn-primary drawer-button m-4 w-40 flex items-center justify-center">
                            <img src="enter.png" alt="enter Icon" className="w-6 h-6 mr-2" />
                            Entrer
                        </label>
                    </div>


                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" className="drawer-overlay"></label>
                    <SideBar></SideBar>
                </div>
                <ToolBar />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Identifiants Devis */}
                <div className="space-y-4 p-6 border rounded-lg shadow-md bg-white">
                    <h3 className="text-lg font-bold flex items-center space-x-2">
                        <FaFileInvoice className="text-blue-500" />
                        <span>Identifiants Devis</span>
                    </h3>
                    <label className="block font-medium">N° Devis :</label>
                    <input type="text" className="w-full border border-gray-300 rounded-md p-2 bg-gray-100" readOnly />

                    <label className="block font-medium">Point de vente :</label>
                    <input className="w-full border border-gray-300 rounded-md p-2" />
                </div>

                {/* Information Client */}
                <div className="space-y-4 p-6 border rounded-lg shadow-md bg-white">
                    <h3 className="text-lg font-bold flex items-center space-x-2">
                        <FaUser className="text-green-500" />
                        <span>Information Client</span>
                    </h3>
                    <label className="block font-medium">Code Client :</label>
                    <input type="text" className="w-full border border-gray-300 rounded-md p-2 bg-gray-100" readOnly />

                    <label className="block font-medium">Raison Sociale :</label>
                    <input type="text" className="w-full border border-gray-300 rounded-md p-2 bg-gray-100" readOnly />

                    <label className="block font-medium">Adresse :</label>
                    <input type="text" className="w-full border border-gray-300 rounded-md p-2" />

                    <label className="block font-medium">Code Postal :</label>
                    <input type="text" className="w-full border border-gray-300 rounded-md p-2" />

                    <label className="block font-medium">Email :</label>
                    <input type="email" className="w-full border border-gray-300 rounded-md p-2" />

                    <label className="block font-medium">Téléphone :</label>
                    <input type="text" className="w-full border border-gray-300 rounded-md p-2" />
                </div>

                {/* Détails Devis */}
                <div className="space-y-4 p-6 border rounded-lg shadow-md bg-white">
                    <h3 className="text-lg font-bold flex items-center space-x-2">
                        <FaClipboardList className="text-purple-500" />
                        <span>Détails Devis</span>
                    </h3>
                    <label className="block font-medium">Date :</label>
                    <input type="date" className="w-full border border-gray-300 rounded-md p-2" />

                    <label className="block font-medium">Pièce Liée :</label>
                    <input type="text" className="w-full border border-gray-300 rounded-md p-2" />

                    <label className="block font-medium">Transport :</label>
                    <input type="text" className="w-full border border-gray-300 rounded-md p-2" />

                    <label className="block font-medium">À l'attention de :</label>
                    <input type="text" className="w-full border border-gray-300 rounded-md p-2" />

                    <label className="block font-medium">Délai de livraison :</label>
                    <input type="text" className="w-full border border-gray-300 rounded-md p-2" />
                </div>

                {/* Informations de l'Utilisateur */}
                <div className="space-y-4 p-6 border rounded-lg shadow-md bg-white">
                    <h3 className="text-lg font-bold flex items-center space-x-2">
                        <FaUsers className="text-red-500" />
                        <span>Informations de l'Utilisateur</span>
                    </h3>

                    <label className="block font-medium">Vendeur :</label>
                    <input type="text" className="w-full border border-gray-300 rounded-md p-2" />

                    <label className="block font-medium">RSREP :</label>
                    <input type="text" className="w-full border border-gray-300 rounded-md p-2" />

                    <label className="block font-medium">Code Secteur :</label>
                    <input type="text" className="w-full border border-gray-300 rounded-md p-2" />

                    <label className="block font-medium">Désignation Secteur :</label>
                    <input type="text" className="w-full border border-gray-300 rounded-md p-2" />

                    <label className="block font-medium mt-4">Commentaire :</label>
                    <textarea rows="3" className="w-full border border-gray-300 rounded-md p-2"></textarea>

                    <label className="block font-medium mt-4">Affaire :</label>
                    <input type="text" className="w-full border border-gray-300 rounded-md p-2" />
                </div>
            </div>

            {/* Table des articles */}
            <div className="mt-6">
                <div className="p-4 sticky bottom-0 w-full">
                    <table className="min-w-full table-auto border-collapse border border-gray-300">
                        <thead className="bg-gray-300"> {/* Ajout du fond gris pour l'en-tête */}
                            <tr>
                                <th className="p-3 text-left text-sm font-medium text-gray-600 border">Famille</th>
                                <th className="p-3 text-left text-sm font-medium text-gray-600 border">Code Article</th>
                                <th className="p-3 text-left text-sm font-medium text-gray-600 border">Unité</th>
                                <th className="p-3 text-left text-sm font-medium text-gray-600 border">Quantite</th>
                                <th className="p-3 text-left text-sm font-medium text-gray-600 border">Remise</th>
                                <th className="p-3 text-left text-sm font-medium text-gray-600 border">Libelle</th>
                                <th className="p-3 text-left text-sm font-medium text-gray-600 border">TVA</th>
                                <th className="p-3 text-left text-sm font-medium text-gray-600 border">PUHT</th>
                                <th className="p-3 text-left text-sm font-medium text-gray-600 border">PUTTC</th>
                                <th className="p-3 text-left text-sm font-medium text-gray-600 border">NET HT</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            <tr className="hover:bg-indigo-100 transition-all duration-150 ease-in-out">
                                <td className="p-3 border border-gray-300">A001</td>
                                <td className="p-3 border border-gray-300">Unité</td>
                                <td className="p-3 border border-gray-300">Article Exemple</td>
                                <td className="p-3 border border-gray-300">100.00</td>
                                <td className="p-3 border border-gray-300">19%</td>
                                <td className="p-3 border border-gray-300">10%</td>
                                <td className="p-3 border border-gray-300">20%</td>
                                <td className="p-3 border border-gray-300">200.00</td>
                                <td className="p-3 border border-gray-300">240.00</td>
                                <td className="p-3 border border-gray-300">180.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>



        </div>

    );
}

export default DevisFormTout;
