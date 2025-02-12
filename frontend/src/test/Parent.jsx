import React, { useState } from 'react'
import Child from './Child'

function Parent() {
    const [child,setChild]=useState("intial")
    console.log(setChild)
  return (
    <div>
    <div>Parent</div>
    {child}
    <Child ajout={child} ameni={setChild}></Child>
    </div>
  )
}

export default Parent