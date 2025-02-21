import { configureStore } from '@reduxjs/toolkit'
import testSlice from './interfaceAPP/testSlice'
import clientSlice from '../app/client/clientSlice'//thb te5oo js 
import uiStatesReducer from '../app/interfaceAPP/uiSlice';
export default configureStore(
{
    reducer:
    {
        test2: testSlice,
        ClientCrud : clientSlice,
        uiStates: uiStatesReducer
    },
})
//bch nrmiha fiha les data mt3i kol 
