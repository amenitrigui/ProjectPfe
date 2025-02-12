import React from 'react'


import { useNavigate } from 'react-router-dom';

function ToolBar(props) {
    const isNewMode = props.isNewMode;
    const isEditMode = props.isEditMode;
    const message = props.message;
    const navigate = useNavigate();
    
  return (
    <div>ToolBar</div>
  )
}

export default ToolBar