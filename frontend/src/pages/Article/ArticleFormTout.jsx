import React, { useEffect } from 'react'
import ArticleForm from '../../components/Article/ArticleForm'
import AlertModifier from '../../components/Common/AlertModifier'
import { useDispatch } from 'react-redux'
import { setToolbarTable } from '../../app/interface_slices/uiSlice'
import Recherche from '../Devis/recherche'

function ArticleFormTout() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(setToolbarTable("article"))
  },[])
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 ">
        <Recherche/>
        <ArticleForm/>
        <AlertModifier/>
      </div>
    </div>
  )
}

export default ArticleFormTout