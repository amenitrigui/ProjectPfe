
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
      <Link to="/DevisFormTout">← Retour</Link>
      <div id="devis" ref={contentRef} className="p-6 bg-white max-w-6xl mx-auto">

        {/* ... Header, client infos ... */}

        {/* Tableau des articles */}
        <table className="table-auto w-full border mt-4">
          <thead className="bg-gray-200">
            <tr>
              <th>Référence</th>
              <th>Code Article</th>
              <th>Libellé</th>
              <th>Unité</th>
              <th>Quantité</th>
              <th>PU HT</th>
              <th>Remise %</th>
              <th>TVA %</th>
              <th>Net HT</th>
            </tr>
          </thead>
          <tbody>
            {lignesAvecNetHT.map((ligne, i) => (
              <tr key={i} className="border">
                <td>{ligne.famille}</td>
                <td>{ligne.CodeART}</td>
                <td>{ligne.DesART}</td>
                <td>{ligne.Unite}</td>
                <td>{ligne.QteART}</td>
                <td>{ligne.PUART}</td>
                <td>{ligne.Remise}</td>
                <td>{ligne.TauxTVA}</td>
                <td>{ligne.netHt.toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totaux */}
        <div className="mt-6">
          <table className="w-full max-w-md border border-black">
            <tbody>
              <tr>
                <td className="border p-2">Total HT</td>
                <td className="border p-2">{totalHT} DT</td>
              </tr>
              <tr>
                <td className="border p-2">Montant TVA</td>
                <td className="border p-2">{totalTVA} DT</td>
              </tr>
              <tr>
                <td className="border p-2 font-bold">Total TTC</td>
                <td className="border p-2 font-bold">{totalTTC} DT</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Arrêté en lettres */}
        <div className="mt-4 border p-2 font-semibold">
          Arrêté la présente offre à la somme de : <i>{totalTTC} Dinars</i>
        </div>
      </div>
    </div>
  );
}



export default Test2;

