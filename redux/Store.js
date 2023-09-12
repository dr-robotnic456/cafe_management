import { configureStore } from "@reduxjs/toolkit"
import pcReducer from "./PcSlice";
import customerReducer from "./customerSlice";

const store = configureStore({
    reducer:{
        pc: pcReducer,
        customer: customerReducer
    }
})

export default store;