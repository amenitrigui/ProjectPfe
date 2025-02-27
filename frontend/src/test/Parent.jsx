import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../app/interface_slices/testSlice";
import { getListeClient } from "../app/client_slices/clientSlice";
import SideBar from "../components/Common/SideBar";
import ArticlesDevis from "../components/Devis/ArticlesDevis";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";


function Parent() {
  // const [testValue, setTestValue] = useState("");
  // const [objValue, setObjValue] = useState({
  //   field1: "",
  //   field2: "",
  //   field3: "",
  // });

  // function updateState() {
  //   setObjValue({ field1: "value1", field2: "value2", field3: "value3" });
  // }

  // const count = useSelector((state) => state.test2.value);
  // const status = useSelector((state) => state.test2.status);
  // const listeClients = useSelector((state) => state.test2.listeClients); // Récupération des clients
  // console.log(listeClients);
  // const dispatch = useDispatch();

  // // Charger la liste des clients au montage du composant
  // useEffect(() => {
  //   dispatch(getListeClient());
  // }, [dispatch]);

  const afficherToast = () => {
    toast.warning("test", {
      position: "top-right"
    });
  }

  return (
    // <div>
    //   <div>
    //     <SideBar></SideBar>
    //   <ArticlesDevis></ArticlesDevis>
    //     <button onClick={() => dispatch(increment())}>Increment</button>
    //     <span>{count}</span>
    //   </div>
    //   <button onClick={() => dispatch(decrement())}>Decrement</button>

    //   {status === "loading" && <p>Chargement...</p>}
    //   {status === "failed" && <p>Erreur lors du chargement des clients</p>}

    //   {status === "succeeded" &&
    //     Object.values(listeClients)?.map((item, index) => (
    //       <div key={index}>{item.code}</div> // Assurez-vous que chaque item a une propriété "name"
    //     ))}
    // </div>
    <>
      <button onClick={() => afficherToast()}>afficher toast</button>
      <ToastContainer 
        theme="dark"
      />
    </>
  );
}

export default Parent;
