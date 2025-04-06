import React, { useEffect } from 'react'
import ArticleForm from '../../components/Article/ArticleForm'
import AlertModifier from '../../components/Common/AlertModifier'
import { useDispatch, useSelector } from 'react-redux'
import { setToolbarTable } from '../../app/interface_slices/uiSlice'
import Recherche from '../Devis/recherche'

function ArticleFormTout() {
  const dispatch = useDispatch()
  const afficherRecherchePopup = useSelector((state) => state.uiStates.afficherRecherchePopup);
  useEffect(()=>{
    dispatch(setToolbarTable("article"))
  },[])
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 ">
      { afficherRecherchePopup == true && <Recherche/> }
        <ArticleForm/>
        <AlertModifier/>
      </div>
    </div>
  )
}

export default ArticleFormTout