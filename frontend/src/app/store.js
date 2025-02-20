import { configureStore } from '@reduxjs/toolkit'
import testSlice from './interfaceAPP/testSlice'
import clientSlice from '../app/client/clientSlice'//thb te5oo js 
export default configureStore(
{
    reducer:
    {
        test2: testSlice,
        ClientCrud : clientSlice
    },
})
//bch nrmiha fiha les data mt3i kol 
