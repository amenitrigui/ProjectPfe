import React, { useState } from 'react'
import Child from './Child'
import ToolBar from '../components/Common/ToolBar'
function Parent() {
    const [child,setChild]=useState("intial")
    console.log(setChild)
  return (
    <div>
    <div>Parent</div>
    {child}
    <Child ajout={child} ameni={setChild}></Child>
    <ToolBar />
    </div>
  )
}

export default Parent