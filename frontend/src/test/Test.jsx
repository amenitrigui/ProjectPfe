import React from 'react'
import Test1 from './Test1';
import { useState } from 'react';

function Test(props) {
  return (
    <div>
      <h1>Value in Test Component: {props.testValue}</h1>
    </div>
  )
}

export default Test