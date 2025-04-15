import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaUser, FaCog, FaCreditCard, FaSignOutAlt , FaRegUserCircle} from "react-icons/fa";
import {
  getNombreTotalDevis,
  getTotalChiffres,
} from "../../app/devis_slices/devisSlice";
import SideBar from "../../components/Common/SideBar";
import { setOuvrireDrawerMenu } from "../../app/interface_slices/uiSlice";

const Dashboard = () => {
  //?==================================================================================================================
  //?=====================================================variables====================================================
  //?==================================================================================================================
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  
  const ouvrireMenuDrawer = useSelector((state) => state.uiStates.ouvrireMenuDrawer);
  const nombredevis = useSelector((state) => state.DevisCrud.nombreDeDevis);
  const totalchifre = useSelector((state) => state.DevisCrud.totalchifre);
  
  const infosUtilisateur = useSelector(
    (state) => state.UtilisateurInfo.infosUtilisateur
  );
  //?==================================================================================================================
  //?==================================================appels UseEffect================================================
  //?==================================================================================================================
  useEffect(() => {
    dispatch(getNombreTotalDevis());
    dispatch(getTotalChiffres());
  }, []);
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
        <div className="topbar">
          <div className="toggle" onClick={toggleSidebar}>
            <ion-icon name="menu-outline"></ion-icon>
          </div>

          <div className="relative inline-block text-left">
            {/* Avatar avec événement de clic */}
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
            <FaRegUserCircle className="mr-3 text-3xl" />
              {/* Indicateur de statut en ligne */}
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            </div>

            {/* Menu déroulant */}
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
                  <li className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer">
                  <Link to="/UtilisateurFormTout" className="flex items-center w-full">

                    <FaUser className="mr-3" /> My Profile
                    </Link>
                  </li>
                  <li className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer">
                  <Link to="/Settings" className="flex items-center w-full">
                    <FaCog className="mr-3" /> Settings
                    </Link>
                  </li>

                  <li className="px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer border-t">
                    <Link to="/" className="flex items-center w-full">
                      <FaSignOutAlt className="mr-3" /> Log Out
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="cardBox">
          {[
            {
              number: nombredevis,
              name: "Nombre devis generes ",
              icon: "cart-outline",
            },
            {
              number: totalchifre.toFixed(2),
              name: "total chiffre",
              icon: "cash-outline",
            },
            {
              number: nombredevis,
              name: "Nombre devis generes ",
              icon: "cart-outline",
            },
            {
              number: totalchifre.toFixed(2),
              name: "total chiffre",
              icon: "cash-outline",
            },
          ].map((card, index) => (
            <div className="card" key={index}>
              <div>
                <div className="numbers">{card.number}</div>
                <div className="cardName">{card.name}</div>
              </div>
              <div className="iconBx">
                <ion-icon name={card.icon}></ion-icon>
              </div>
            </div>
          ))}
        </div>

        <div className="details">
          <div className="recentOrders">
            <div className="cardHeader">
              <h2>Recent Orders</h2>
              <a href="#" className="btn">
                View All
              </a>
            </div>

            <table>
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Payment</td>
                  <td>Status</td>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    name: "Star Refrigerator",
                    price: "$1200",
                    payment: "Paid",
                    status: "delivered",
                  },
                  {
                    name: "Dell Laptop",
                    price: "$110",
                    payment: "Due",
                    status: "pending",
                  },
                  {
                    name: "Apple Watch",
                    price: "$1200",
                    payment: "Paid",
                    status: "return",
                  },
                  {
                    name: "Addidas Shoes",
                    price: "$620",
                    payment: "Due",
                    status: "inProgress",
                  },
                ].map((order, index) => (
                  <tr key={index}>
                    <td>{order.name}</td>
                    <td>{order.price}</td>
                    <td>{order.payment}</td>
                    <td>
                      <span className={`status ${order.status}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="recentCustomers">
            <div className="cardHeader">
              <h2>Recent Customers</h2>
            </div>
            <table>
              <tbody>
                {[
                  {
                    name: "David",
                    country: "Italy",
                    img: "assets/imgs/customer02.jpg",
                  },
                  {
                    name: "Amit",
                    country: "India",
                    img: "assets/imgs/customer01.jpg",
                  },
                ].map((customer, index) => (
                  <tr key={index}>
                    <td width="60px">
                      <div className="imgBx">
                        <img src={customer.img} alt="Customer" />
                      </div>
                    </td>
                    <td>
                      <h4>
                        {customer.name} <br /> <span>{customer.country}</span>
                      </h4>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <script src="%PUBLIC_URL%/assets/js/main.js"></script>
    </div>
  );
};

export default Dashboard;
