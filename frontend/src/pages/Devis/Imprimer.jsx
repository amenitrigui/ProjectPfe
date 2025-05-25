import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

function Imprimer() {
  const [entetesDevis, setEntetesDevis] = useState({});
  useEffect(() => {
    setEntetesDevis(JSON.parse(localStorage.getItem("entetesDevis")));
  }, []);
  console.log(entetesDevis);
  const devisInfo = useSelector((state) => state.devisSlice.devisInfo);
  const derniereNumbl = useSelector((state) => state.devisSlice.derniereNumbl);
  const totalPages = Math.ceil(devisInfo.articles.length / 10);
  const dbName = useSelector((state) => state.utilisateurSystemSlice.dbName);
  const clientInfos = useSelector((state) => state.clientSlice.clientInfos);
  const contentRef = useRef(null);
  const lignes = devisInfo.articles || [];

  const lignesAvecNetHT = lignes.map((ligne) => {
    const netHt = ligne.QteART * ligne.PUART * (1 - (ligne.Remise || 0) / 100);
    const tva = (netHt * (ligne.TauxTVA || 0)) / 100;
    const ttc = netHt + tva;
    return { ...ligne, netHt, tva, ttc };
  });
  const totalTVA = lignesAvecNetHT
    .reduce((sum, l) => sum + l.tva, 0)
    .toFixed(3);
  const totalHT = lignesAvecNetHT
    .reduce((sum, l) => sum + l.netHt, 0)
    .toFixed(3);

  const reactToPrintFn = useReactToPrint({ contentRef });

  const convertir = (valeur) => {
    if (valeur === 0) return "Zéro Dinars";
    valeur = parseFloat(valeur);
    // Split into integer and decimal parts
    const parts = valeur.toFixed(3).split(".");
    const dinars = Math.abs(parseInt(parts[0]));
    const millimes = parseInt(parts[1].substring(0, 3)); // Take exactly 3 digits

    // Words for numbers 0 to 19
    const units = [
      "",
      "Un",
      "Deux",
      "Trois",
      "Quatre",
      "Cinq",
      "Six",
      "Sept",
      "Huit",
      "Neuf",
      "Dix",
      "Onze",
      "Douze",
      "Treize",
      "Quatorze",
      "Quinze",
      "Seize",
      "Dix-Sept",
      "Dix-Huit",
      "Dix-Neuf",
    ];

    // Words for tens
    const tens = [
      "",
      "",
      "Vingt",
      "Trente",
      "Quarante",
      "Cinquante",
      "Soixante",
      "Soixante-Dix",
      "Quatre-Vingt",
      "Quatre-Vingt-Dix",
    ];

    // Convert integer part to words
    const convertInteger = (num) => {
      if (num === 0) return "";
      let result = "";

      // Hundreds
      if (num >= 100) {
        const hundreds = Math.floor(num / 100);
        result = (hundreds === 1 ? "Cent" : units[hundreds] + " Cent") + " ";
        num %= 100;
      }

      // Special French numbers (70-99)
      if (num >= 80 && num < 100) {
        result +=
          num === 80 ? "Quatre-Vingts" : "Quatre-Vingt-" + units[num - 80];
      } else if (num >= 60 && num < 80) {
        result +=
          "Soixante" +
          (num === 60 ? "" : num === 61 ? " et Un" : "-" + units[num - 60]);
      }
      // 20-59
      else if (num >= 20) {
        result +=
          tens[Math.floor(num / 10)] +
          (num % 10 === 0
            ? ""
            : num % 10 === 1
            ? " et Un"
            : "-" + units[num % 10]);
      }
      // 1-19
      else if (num > 0) {
        result += units[num];
      }

      return result.trim();
    };

    // Build the Dinars part
    let dinarsText = "";
    if (dinars > 0) {
      dinarsText = convertInteger(dinars);
      // Special cases for "Un"
      dinarsText = dinarsText.replace(/^Un Cent/, "Cent");
      dinarsText += " Dinars" + (dinars > 1 ? "" : "");
    }

    // Build the Millimes part
    let millimesText = "";
    if (millimes > 0) {
      const fullMillimes =
        millimes < 10
          ? millimes * 100
          : millimes < 100
          ? millimes * 10
          : millimes;
      millimesText = convertInteger(fullMillimes);
      millimesText += " Millimes";
    }

    // Combine parts
    let result = "";
    if (valeur < 0) result = "Moins ";
    result += dinarsText;
    if (dinarsText && millimesText) result += " Et ";
    result += millimesText;

    // Handle zero dinars case
    if (!dinarsText && millimesText) {
      result = millimesText;
    }

    return result || "Zéro Dinars";
  };
  const MTVA = lignesAvecNetHT.reduce((sum, l) => sum + l.tva, 0).toFixed(3);
  return (
    <div>
      <style>
        {`
  @media print {
    body, #devis, .print-container {
      margin: 0 !important;
      padding: 0 !important;
      height: auto !important;
      overflow: visible !important;
    }

    table {
      width: 100% !important;
      font-size: 8px !important; /* Réduire encore la taille de police */
      border-collapse: collapse;
    }

    th, td {
      padding: 2px !important;
    }

    /* Réduire les marges et espacements */
    .grid, .flex {
      margin: 0 !important;
      gap: 2px !important;
    }

    /* Masquer les éléments non essentiels */
    .no-print {
      display: none !important;
    }

    /* Forcer les tableaux à rester compacts */
    .table-auto {
      table-layout: fixed;
    }

    /* Réduire la taille des images */
    img {
      max-width: 80px !important;
      height: auto !important;
    }

    /* Réduire les espacements entre sections */
    .border-b, .border-t, .mt-6, .mb-6 {
      margin-top: 4px !important;
      margin-bottom: 4px !important;
    }

    /* Réduire les polices */
    h1, h2, h3 {
      font-size: 12px !important;
      margin: 2px 0 !important;
    }

    /* Réduire les marges internes */
    .p-6, .p-4, .p-2 {
      padding: 4px !important;
    }

    /* Ajuster spécifiquement le tableau des articles */
    .overflow-x-auto table {
      font-size: 7px !important;
    }

    /* Forcer le contenu à tenir sur une page */
    @page {
      size: A4;
      margin: 0.3cm;
    }
  }
`}
      </style>
      <Link
        to="/DevisFormTout"
        className="text-[#2a2185] hover:text-[#1f1a66] px-6 py-2 rounded-lg focus:outline-none flex items-center"
      >
        ← Retour
      </Link>
      <div
        id="devis"
        className="p-6 bg-white rounded-lg shadow-lg max-w-screen-lg mx-auto"
      >
        <span ref={contentRef}>
          {/* Header */}
          {/* Header */}
          <div className="grid grid-cols-2 border-b border-[#2a2185] pb-1 mb-2 gap-1">
            <div>
              <h1 className="text-[#2a2185] font-bold italic text-sm">
                Ste Logicom - ERP
              </h1>
              <h2 className="text-xs italic font-bold #ccc underline">
                Devis/Facture Proforma
              </h2>
              <div className="text-xs text-gray-600">
                <div>
                  <strong>Numéro:</strong> {derniereNumbl?.NUMBL ?? ""}
                  {derniereNumbl?.NUMBL && devisInfo?.NUMBL ? " || " : ""}
                  {devisInfo?.NUMBL ?? ""}
                </div>
                <div>
                  <strong>Date:</strong> {devisInfo.DATEBL}
                </div>
              </div>
            </div>
            <div className="text-right">
              <img
                src="logo.png"
                className="w-20 h-auto ml-auto mb-1"
                alt="Logo"
              />
              <div className="text-xs text-gray-600 space-y-0">
                <div>S.A.R.L 11.000 DT</div>
                <div>
                  <strong>Site:</strong> www.logicom-dev.com.tn
                </div>
                <div>
                  <strong>BIAT:</strong> 08 700 00040 10 52971444
                </div>
                <div>R.Teniour Av .H.Ayadi</div>
                <div>
                  <strong>Tél:</strong> 74 400110
                </div>
                <div>
                  <strong>TVA:</strong> 620495N/A/M/000
                </div>
              </div>
            </div>
          </div>

          {/* Infos client */}
          <div className="grid grid-cols-2 gap-4 border-t border-[#2a2185] pt-4 mt-6">
            <div className="col-span-2 text-center font-semibold text-[#2a2185] text-lg">
              Nom de la Société : <span className="text-black">{dbName}</span>
            </div>{" "}
            <div className="flex flex-col gap-2">
              <p className="border border-[#2a2185] p-2 text-sm">
                <strong>DATE:</strong> {devisInfo.DATEBL}
              </p>
              <p className="border border-[#2a2185] p-2 text-sm">
                <strong>CLIENT:</strong> {devisInfo.CODECLI}
              </p>
              <p className="flex-1 border border-[#2a2185] p-2 text-sm">
                <strong>Mat Fiscale:</strong> {clientInfos.matriculef}
              </p>

              <p className="mt-4 text-sm text-gray-700 sm:text-base md:text-lg lg:text-xl whitespace-normal">
                <strong>
                  Monsieur / Madame, suite à votre demande, nous avons le
                  plaisir de vous communiquer notre meilleure offre de prix pour
                  :
                </strong>
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="border border-[#2a2185] p-2 text-sm">
                <strong>Raison Sociale:</strong> {devisInfo.RSCLI}
              </p>
              <p className="border border-[#2a2185] p-2 text-sm">
                <strong>Adresse:</strong> {devisInfo.ADRCLI}
              </p>

              <div className="flex flex-col sm:flex-row gap-2">
                <p className="border border-[#2a2185] p-2 text-sm">
                  <strong>PAGE:</strong> 1/1
                </p>
                <p className="flex-1 border border-[#2a2185] p-2 text-sm">
                  <strong>À l'attention de :</strong> {devisInfo.REFCOMM}
                </p>
              </div>
            </div>
          </div>

          {/* Tableau des articles */}
          {/* Tableau des articles */}
          <div className="overflow-x-auto mb-2">
            <table className="table-auto w-full border border-gray-300 text-xs">
              <thead className="bg-gray-200">
                <tr>
                  {[
                    "Ref",
                    "Code",
                    "Libellé",
                    "Un",
                    "Qte",
                    "PU HT",
                    "Rem",
                    "TVA",
                    "Net HT",
                  ].map((header) => (
                    <th
                      key={header}
                      className="border border-gray-300 px-1 py-0 text-left"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {devisInfo.articles.map((ligne, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="border border-gray-300 px-1 py-0 truncate max-w-[40px]">
                      {ligne.famille}
                    </td>
                    <td className="border border-gray-300 px-1 py-0 truncate max-w-[40px]">
                      {ligne.CodeART}
                    </td>
                    <td className="border border-gray-300 px-1 py-0 truncate max-w-[60px]">
                      {ligne.DesART}
                    </td>
                    <td className="border border-gray-300 px-1 py-0 text-center">
                      {ligne.Unite}
                    </td>
                    <td className="border border-gray-300 px-1 py-0 text-right">
                      {ligne.QteART}
                    </td>
                    <td className="border border-gray-300 px-1 py-0 text-right">
                      {ligne.PUART}
                    </td>
                    <td className="border border-gray-300 px-1 py-0 text-right">
                      {ligne.Remise}%
                    </td>
                    <td className="border border-gray-300 px-1 py-0 text-right">
                      {ligne.TauxTVA}%
                    </td>
                    <td className="border border-gray-300 px-1 py-0 text-right">
                      {(
                        ligne.QteART *
                        ligne.PUART *
                        (1 - ligne.Remise / 100)
                      ).toFixed(3)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totaux et conditions */}
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            {/* Bloc TVA */}
            {/* Bloc TVA */}
            <div className="w-full lg:w-1/3 p-4 rounded-lg border-[#2a2185]">
              <table className="table-auto w-full border-collapse">
                <tbody>
                  <tr>
                    <td className="border px-2 py-1">Taux TVA</td>
                    <td className="border px-2 py-1">
                      {/* Afficher tous les taux TVA distincts */}
                      {[
                        ...new Set(
                          devisInfo.articles.map((item) => item.TauxTVA)
                        ),
                      ].join(", ")}
                      %
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">Base HT</td>
                    <td className="border px-2 py-1">
                      {lignesAvecNetHT
                        .reduce((sum, l) => sum + l.netHt, 0)
                        .toFixed(3)}{" "}
                      DT
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">Montant TVA</td>
                    <td className="border px-2 py-1">
                      {lignesAvecNetHT
                        .reduce((sum, l) => sum + l.tva, 0)
                        .toFixed(3)}{" "}
                      DT
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1 font-bold text-right">
                      Total Taxe
                    </td>
                    <td className="border px-2 py-1 font-bold">
                      {lignesAvecNetHT
                        .reduce((sum, l) => sum + l.tva, 0)
                        .toFixed(3)}{" "}
                      DT
                    </td>
                  </tr>
                </tbody>
              </table>
              {console.log(devisInfo)}
              <div className="mt-4 p-2 border border-[#2a2185] rounded-lg inline-block">
                <p className="text-right text-sm font-medium">
                  Arrêter la présentation de devise à la somme :
                  {convertir(MTVA)}
                </p>
              </div>
              {/* ... reste du code ... */}
            </div>
            {/* Bloc Conditions */}
            <div className="w-full lg:w-1/3 p-4">
              <table className="table-auto w-full mt-4 border-collapse border border-[#2a2185]">
                <tbody>
                  <tr>
                    <td className="border font-semibold">
                      Délai de Livraison:
                    </td>
                    <td className="border">{devisInfo.delailivr}</td>
                  </tr>
                  <tr>
                    <td className="border font-semibold">Transport:</td>
                    <td className="border">{devisInfo.transport}</td>
                  </tr>
                  <tr>
                    <td className="border font-semibold">Mode de Paiement:</td>
                    <td className="border">{devisInfo.modepaie}</td>
                  </tr>
                </tbody>
              </table>
              <div className="border px-4 py-5 border-[#2a2185] rounded-lg">
                <h3 className="text-lg font-semibold text-[#2a2185]">
                  Cachet & Signature
                </h3>
                <div className="h-16 border-dashed border-[#2a2185] flex justify-center items-center"></div>
              </div>
            </div>

            {/* Bloc Totaux */}
            <div className="w-full lg:w-1/3 p-4 rounded-lg border-[#2a2185]">
              <table className="table-auto w-full text border-collapse">
                <tbody>
                  <tr>
                    <td className="border font-medium">Total HT:</td>
                    <td className="border">{devisInfo.MHT}</td>
                  </tr>
                  <tr>
                    <td className="border font-medium">Net HT Global:</td>
                    <td className="border">{devisInfo.MHT}</td>
                  </tr>
                  <tr>
                    <td className="border font-medium">Total TAXES:</td>
                    <td className="border">{totalTVA} DT</td>
                  </tr>
                  <tr>
                    <td className="border font-medium">MT T.T.C:</td>
                    <td className="border">{devisInfo.MTTC}</td>
                  </tr>
                  <tr>
                    <td className="border font-medium">Timbre:</td>
                    <td className="border">{devisInfo.TIMBRE}</td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1 font-medium">
                      Montant à Payer:
                    </td>
                    <td className="border px-2 py-1 font-bold">
                      {devisInfo.MTTC}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <p className="mt-4 text-xs text-center text-gray-600">
              Espérons que notre offre trouve votre entière satisfaction,
              veuillez agréer, Monsieur/Madame, nos sentiments les plus
              distingués.
            </p>
          </div>
        </span>
        {/* Bouton d'impression */}
        <div className="flex justify-center mt-6">
          <div className="flex justify-center mt-4 no-print">
            <button
              type="button"
              className="text-white bg-[#2a2185] hover:bg-[#1f1a66] px-4 py-1 rounded text-sm"
              onClick={() => reactToPrintFn()}
            >
              <span className="h-4 w-4 inline-block mr-1">🖨️</span>
              Imprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Imprimer;
