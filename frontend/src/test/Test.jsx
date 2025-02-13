import React from 'react'
import Test1 from './Test1';
import { useState } from 'react';

function Test() {
  const [testState, setTestState] = useState("initial");
    /**
     * Description
     * 158 -> cent cinquante huite
     * @author Unknown
     * @date 2025-02-11
     * @param {any} number
     * @returns {any}
     */
    function numberToText(number) {
        if (number === undefined || number === null || isNaN(number)) {
          console.error("Valeur invalide pour numberToText:", number);
          return "Valeur invalide";
        }
    
        const units = [
          "",
          "un",
          "deux",
          "trois",
          "quatre",
          "cinq",
          "six",
          "sept",
          "huit",
          "neuf",
          "dix",
          "onze",
          "douze",
          "treize",
          "quatorze",
          "quinze",
          "seize",
          "dix-sept",
          "dix-huit",
          "dix-neuf",
          "vingt",
          "trente",
          "quarante",
          "cinquante",
          "soixante",
          "soixante-dix",
          "quatre-vingts",
          "quatre-vingt-dix",
        ];
        const tens = [
          "",
          "",
          "vingt",
          "trente",
          "quarante",
          "cinquante",
          "soixante",
          "septante",
          "huitante",
          "nonante",
        ];
    
        const convertPart = (num) => {
          if (num < 20) return units[num];
          else if (num < 100) {
            const ten = Math.floor(num / 10);
            const unit = num % 10;
            return `${tens[ten]}${unit ? "-" + units[unit] : ""}`;
          } else {
            return `${units[Math.floor(num / 100)]} cent${
              num % 100 !== 0 ? " " + convertPart(num % 100) : ""
            }`;
          }
        };
    
        const [intPart, decPart] = number.toString().split(".");
        const intText = convertPart(Number(intPart));
    
        if (decPart) {
          const decText = convertPart(Number(decPart));
          return `${intText} dinars et ${decText} millimes`;
        }
    
        return `${intText} dinars`;
      }
  return (
    <div>
      <div>568: {numberToText(568)}</div>
      <Test1 testState= {testState} setTestState= {setTestState}/>
    </div>
  )
}

export default Test