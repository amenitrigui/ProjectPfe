import React, { useState } from "react";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Fonction pour basculer la visibilité de la sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="container">
      <div className={`navigation ${isSidebarOpen ? "active" : ""}`}>
        <ul>
          <li>
            <a href="#">
              <span className="icon">
                <ion-icon name="speedometer-outline"></ion-icon>
              </span>
              <span className="title">ERP Logicom</span>
            </a>
          </li>

          {[
            { name: "Dashboard", icon: "home-outline", path: "/" },
            { name: "Customers", icon: "people-outline", path: "/ClientList" },
            { name: "devis", icon: "chatbubble-outline", path: "/DevisList" },
            {
              name: "les societes",
              icon: "help-outline",
              path: "/SocietiesList",
            },
            { name: "Settings", icon: "settings-outline", path: "/" },
            {
              name: "devistout",
              icon: "lock-closed-outline",
              path: "/DevisFormTout",
            },
            { name: "Sign Out", icon: "log-out-outline", path: "/" },
          ].map((item, index) => (
            <li key={index}>
              {/* Use Link instead of <a> */}
              <Link to={item.path}>
                <span className="icon">
                  <ion-icon name={item.icon}></ion-icon>
                </span>
                <span className="title">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={`main ${isSidebarOpen ? "active" : ""}`}>
        <div className="topbar">
          <div className="toggle" onClick={toggleSidebar}>
            <ion-icon name="menu-outline"></ion-icon>
          </div>

          <div className="search">
            <label>
              <input type="text" placeholder="Search here" />
              <ion-icon name="search-outline"></ion-icon>
            </label>
          </div>

          <div className="user">
            <img src="assets/imgs/customer01.jpg" alt="User" />
          </div>
        </div>

        <div className="cardBox">
          {[
            { number: "1,504", name: "Daily Views", icon: "eye-outline" },
            { number: "80", name: "Sales", icon: "cart-outline" },
            { number: "284", name: "Comments", icon: "chatbubbles-outline" },
            { number: "$7,842", name: "Earning", icon: "cash-outline" },
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
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
