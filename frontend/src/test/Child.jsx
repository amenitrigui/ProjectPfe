import React, { useState } from 'react'

function Child(props) {
    const [st,setSt]= useState("ddd") // hthi mtjimch il parent yaccedi 3liha 
  return (<div>{
    props.ameni()}
    <div>Child</div>
    
    </div>

  )
}

export default Child