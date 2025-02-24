import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
    name: "uiSlice",
    initialState: {
        // * states pour l'affichage d'un alert
        // * message: message d'alert
        // * showAlert: visibilité d'alert
        // * alertType : warning, success, error...
        message: "initial alert message",
        showAlert: false,
        alertType: "",
        // *state alerte model 
        showAlertModal:false,
        alerteModelMessage : "",
        clearAppele:false
    },
    reducers: {
        setAlertMessage: (state, action) => {
            state.message = action.payload;
            state.showAlert= true;
        },
        toggleAlert: (state) => {
            state.showAlert= !state.showAlert
        },
        setAlertType: (state, action) => {
            state.alertType = action.payload;
        },


        /// Alerte  moch simple 
        setAlertMessageModel :(state,action)=>{
            state.alerteModelMessage=action.payload;
           
        },
        setShowAlerteModel : (state,action)=>{
            state.showAlertModal=true;
        },


        setClearAppele : (state,action)=>{
            state.clearAppele=action.payload;
        }



      
    }
})
export const { setAlertMessage, toggleAlert, setAlertType,setAlertMessageModel ,setShowAlerteModel,setClearAppele} = uiSlice.actions;
export default uiSlice.reducer;
