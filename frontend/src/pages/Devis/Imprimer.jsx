import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

function Imprimer() {
  const devisInfo = useSelector((state) => state.devisSlice.devisInfo);
  const derniereNumbl = useSelector((state) => state.devisSlice.derniereNumbl);
  console.log(derniereNumbl);
  const totalPages = Math.ceil(devisInfo.articles.length / 10);
  console.log(totalPages);
  const dbName = useSelector((state) => state.utilisateurSystemSlice.dbName);
  console.log(devisInfo.articles);

  const clientInfos = useSelector((state) => state.clientSlice.clientInfos);
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  return (
    <div>
      <style>
        {`
          @media print {
            .no-page-break {
              page-break-inside: avoid !important;
              break-inside: avoid !important;
            }

            #devis {
              page-break-after: avoid !important;
            }

            body {
              font-size: 12px !important;
            }

            table {
              width: 100% !important;
              page-break-before: auto;
            }

            .table-auto {
              page-break-inside: auto !important;
            }

            .p-6 {
              padding: 1rem !important;
            }

            .text-sm {
              font-size: 10px !important;
            }

            .mt-4 {
              margin-top: 10px !important;
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
          <div className="grid grid-cols-2 md:grid-cols-2 border-b border-[#2a2185] pb-4 mb-6 gap-3">
            <div>
              <h1 className="text-[#2a2185] font-bold italic text-3xl">
                Ste Logicom - Progiciel de Gestion Intégrée ERP
              </h1>

              <h2 className="text-2xl italic font-bold #ccc underline mt-4">
                Devis/Facture Proforma
              </h2>

              <div className="text-sm text-gray-600 mt-2">
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
                className="w-32 h-auto ml-auto mb-2"
                alt="Logo"
              />
              <div className="text-sm text-gray-600 space-y-1">
                <div>S.A.R.L au capital de 11.000 DT</div>
                <div>
                  <a
                    href="http://www.logicom-dev.com.tn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    <strong>Site Web :</strong> www.logicom-dev.com.tn
                  </a>
                </div>
                <div>
                  <strong>BIAT HARZALLAH:</strong> 08 700 00040 10 52971444
                </div>
                <div>R.Teniour Av .H.Ayadi K605-3041chihia</div>
                <div>
                  <strong>Tél/Fax:</strong> 74 400110 - 74461010 - 70033548
                </div>
                <div>
                  <strong>Code TVA :</strong> 620495N/A/M/000 RC: B141691998
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
          <div className="overflow-x-auto mb-6">
  <table className="table-auto w-full border border-gray-300">
    <thead className="bg-gray-200">
      <tr>
        {[
          "Referance",
          "Code Article",
          "Libellé",
          "Unite",
          "QteART",
          "PU HT",
          "Remise",
          "TVA %",
          "Net HT",
        ].map((header) => (
          <th
            key={header}
            className="border border-gray-300 px-2 py-1 text-left text-sm"
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {devisInfo.articles.map((ligne, index) => (
        <tr
          key={index}
          className="border-b hover:bg-gray-50 no-page-break"
        >
          <td className="border border-gray-300 px-2 py-1 text-sm">{ligne.famille}</td>
          <td className="border border-gray-300 px-2 py-1 text-sm">{ligne.CodeART}</td>
          <td className="border border-gray-300 px-2 py-1 text-sm">{ligne.DesART}</td>
          <td className="border border-gray-300 px-2 py-1 text-sm">{ligne.Unite}</td>
          <td className="border border-gray-300 px-2 py-1 text-sm">{ligne.QteART}</td>
          <td className="border border-gray-300 px-2 py-1 text-sm">{ligne.PUART}</td>
          <td className="border border-gray-300 px-2 py-1 text-sm">{ligne.Remise}</td>
          <td className="border border-gray-300 px-2 py-1 text-sm">{ligne.TauxTVA}</td>
          <td className="border border-gray-300 px-2 py-1 text-sm">{ligne.netHt}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


          {/* Totaux et conditions */}
          <div className="flex flex-col lg:flex-row justify-between gap-6">
  {/* Bloc TVA */}
  <div className="w-full lg:w-1/3 p-4 rounded-lg border-[#2a2185]">
    <table className="table-auto w-full border-collapse">
      <tbody>
        <tr>
          <td className="border px-2 py-1">Taux TVA</td>
          <td className="border px-2 py-1">
            {devisInfo.articles.tauxtva}
          </td>
        </tr>
        <tr>
          <td className="border px-2 py-1">Base</td>
          <td className="border px-2 py-1">
            {" "}
            {devisInfo.articles
              .reduce(
                (acc, ligne) => acc + parseFloat(ligne.netHt || 0),
                0
              )
              .toFixed(3)}
          </td>
        </tr>
        <tr>
          <td className="border px-2 py-1">Montants</td>
          <td className="border px-2 py-1"> {devisInfo.taxe || 0}</td>
        </tr>
        <tr>
          <td className="border px-2 py-1 font-bold text-right">
            Total Taxe
          </td>
          <td className="border px-2 py-1 font-bold">
            {" "}
            {devisInfo.taxe || 0}
          </td>
        </tr>
      </tbody>
    </table>
    <div className="mt-4 p-2 border border-[#2a2185] rounded-lg inline-block">
      <p className="text-right text-sm font-medium">
        Arrêter la présentation de devise à la somme :{" "}
        <span className="text-[#2a2185] font-semibold">
          Zéro dinar
        </span>
      </p>
    </div>
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
          <td className="border">{devisInfo.MTVA}</td>
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
          <button
            type="button"
            className="text-white bg-[#2a2185] hover:bg-[#1f1a66] px-6 py-2 rounded-lg focus:outline-none"
            onClick={() => reactToPrintFn()}
          >
            <span className="h-6 w-6 inline-block mr-2">🖨️</span>
            Imprimer
          </button>
        </div>
      </div>
    </div>
  );
}

export default Imprimer;
