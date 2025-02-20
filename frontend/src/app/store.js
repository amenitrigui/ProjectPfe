import { configureStore } from "@reduxjs/toolkit";
import testReducer from '../app/interface cd/testingSlice'
import clientReducer from '../app/client/clientSlice'
export default configureStore({
    reducer: {
        test: testReducer,
        client: clientReducer
    }
})