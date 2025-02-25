import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setClientInfos, setClientInfosEntiere } from "../../app/client_slices/clientSlice";

function ClientForm() {
  const clientInfos = useSelector((state) => state.ClientCrud.clientInfos);
  const clearApelle=useSelector((state)=>state.uiStates.clearAppele)

  const dispatch = useDispatch();
  // * mettre à jour les valeurs
  // * des champs du formulaire client / devis
  const handleChange = (e, colonne) => {
    dispatch(setClientInfos({ colonne, valeur: e.target.value }))
  }

  // * useEffect #1 : Si une opération est effectué (insert, update, delete)
  // * indiqué par la mutation de clearApelle
  // * vider les champs text
  // * On a utilisé un useEffect puisque dispatch(setClearAppele(false))
  // * est compté comme effet secondaire (side effect)
  // ! Si on n'utilise pas useEffect on va avoir un erreur
  useEffect(() => {
    console.log(clearApelle);
    if(clearApelle){
      dispatch(setClientInfosEntiere({  // Reset clientInfos in Redux state
        code: "",
        rsoc: "",
        adresse: "",
        cp: "",
        email: "",
        telephone: "",
        desrep: ""
      }));
    }
  }, [clearApelle])
  return (

    <div className="p-6 border border-gray-300 rounded-lg shadow-md bg-white">

      <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
        <span className="text-black">&#x1F464;</span>
        <span>Information Client</span>
      </h3>

      <form className="grid grid-cols-2 gap-4 items-center">
        <div>
          <label className="block font-medium mb-1">Code Client :</label>
          {/* the value is NOT two-way bound */}
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            defaultValue={clientInfos.code}
            onChange={(e) => handleChange(e, "code")}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Raison Sociale :</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            defaultValue={clientInfos.rsoc}
            onChange={(e) => handleChange(e, "rsoc")}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Adresse :</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            defaultValue={clientInfos.adresse}
            onChange={(e) => handleChange(e, "adresse")}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Code Postal :</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            defaultValue={clientInfos.cp}
            onChange={(e) => handleChange(e, "cp")}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email :</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-md p-2"
            defaultValue={clientInfos.email}
            onChange={(e) => handleChange(e, "email")}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Téléphone :</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            defaultValue={clientInfos.telephone}
            onChange={(e) => handleChange(e, "telephone")}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Représentant :</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            defaultValue={clientInfos.desrep}
            onChange={(e) => handleChange(e, "desrep")}
          />
        </div>
       
      </form>
    </div>
  );
}

export default ClientForm;
