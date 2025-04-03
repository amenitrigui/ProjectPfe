import React from 'react'
import ArticleForm from '../../components/Article/ArticleForm'
import AlertModifier from '../../components/Common/AlertModifier'

function ArticleFormTout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 ">
        <ArticleForm/>
        <AlertModifier/>
      </div>
    </div>
  )
}

export default ArticleFormTout