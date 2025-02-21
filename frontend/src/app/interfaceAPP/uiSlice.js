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
        alertType: ""
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
        }
    }
})
export const { setAlertMessage, toggleAlert, setAlertType } = uiSlice.actions;
export default uiSlice.reducer;