
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

function Test2() {
  const devisInfo = useSelector((state) => state.devisSlice.devisInfo);
  const derniereNumbl = useSelector((state) => state.devisSlice.derniereNumbl);
  const dbName = useSelector((state) => state.utilisateurSystemSlice.dbName);
  const clientInfos = useSelector((state) => state.clientSlice.clientInfos);
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ content: () => contentRef.current });

  // Calculs
  const lignes = devisInfo.articles || [];

  const lignesAvecNetHT = lignes.map(ligne => {
    const netHt = ligne.QteART * ligne.PUART * (1 - (ligne.Remise || 0) / 100);
    const tva = netHt * (ligne.TauxTVA || 0) / 100;
    const ttc = netHt + tva;
    return { ...ligne, netHt, tva, ttc };
  });

  const totalHT = lignesAvecNetHT.reduce((sum, l) => sum + l.netHt, 0).toFixed(3);
  const totalTVA = lignesAvecNetHT.reduce((sum, l) => sum + l.tva, 0).toFixed(3);
  const totalTTC = lignesAvecNetHT.reduce((sum, l) => sum + l.ttc, 0).toFixed(3);

  return (
    <div>
      <div className="drawer">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Page content here */}
    <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
      {/* Sidebar content here */}
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
    </ul>
  </div>
</div>
    </div>
  );
}



export default Test2;

