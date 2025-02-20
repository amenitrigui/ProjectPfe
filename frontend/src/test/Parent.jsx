import React, { useState } from 'react'
import Test from './Test';
import Test1 from './Test1';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../app/interface cd/testingSlice';

function Parent() {
  const testValue = useSelector((state) => state.test.testValue)
  const dispatch = useDispatch();
  return (
    <div>parent: {testValue}
    <br />
    <button className="btn btn-primary" onClick={() => dispatch(increment())}>increment</button>
    <button className="btn btn-primary" onClick={() => dispatch(decrement())}>decrement</button>
    </div>
  
  )
}

export default Parent