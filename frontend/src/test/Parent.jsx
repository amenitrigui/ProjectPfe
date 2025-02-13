import React, { useState } from 'react'
import Child from './Child'

function Parent() {
    const [child,setChild]=useState("intial")
    console.log(setChild)
  return (
    // <div>
    // <div>Parent</div>
    // {child}
    // <Child ajout={child} ameni={setChild}></Child>
    // </div>
    <div className="drawer">
    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content flex flex-col">
      {/* Bouton pour ouvrir la sidebar */}
      <label htmlFor="my-drawer" className="btn btn-primary drawer-button m-4 w-40">
        <img src="enter.png" alt="enter Icon" className="w-6 h-6" />
      </label>
      </div>
      </div>
  )
}

export default Parent