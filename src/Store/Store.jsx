import {configureStore} from '@reduxjs/toolkit'
import PersonsApi from '../Slice/Slice2'


const StoreApi = configureStore({
    reducer: {
        persons:PersonsApi.reducer,
    }
})

export default StoreApi