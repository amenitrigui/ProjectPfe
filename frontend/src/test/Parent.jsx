import React, { useState } from 'react'
import Test from './Test';
import Test1 from './Test1';
function Parent() {
    const [testValue, setTestValue] = useState("");
    const [objValue, setObjValue] = useState({
      field1: "",
      field2: "",
      field3: ""
    })

    function updateState() {
      setObjValue({field1: "value1",field2: "value2", field3: "value3"})
    }
  return (
    <div>
      <Test testValue = {testValue}/>
      {/* the state updates, the loop only happens once though */}
      <Test1 setTestValue= {setTestValue}/>
      {Object.values(objValue).map((value) => {
        <h1>{value}</h1>
      })}

      <button onClick={updateState}>Update state</button>
    </div>
  )
}

export default Parent