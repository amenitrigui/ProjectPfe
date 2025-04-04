import React from "react";

function Input(props) {
  return (
    <div>
      <input
        type={props.type}
        className="border border-gray-300 rounded-md p-2"
        list={props.list ? props.list : ""}
        value={props.value || ""}
        disabled={props.activerChampsForm}
        maxLength={props.maxLength}
      />
    </div>
  );
}

export default Input;
