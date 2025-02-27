import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Deconnexion() {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.clear();
        navigate("/");
    })
  return (
    <>
        ...
    </>
  )
}

export default Deconnexion