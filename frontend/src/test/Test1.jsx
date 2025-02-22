import React from 'react'

function Test1(props) {
  return (
    <div>
      Change the value from the Test 1 component: <input type="text" onChange={(e) => {props.setTestValue(e.target.value)}} />
    </div>
  )
}

export default Test1