import { combineReducers } from "redux"
import { alertReducer } from "./alertReducers"
import { authReducer } from "./authenticateReducer"
import {itemReducer} from './itemReducer'
export const rootReducer = combineReducers({
    itemStore:itemReducer,
    auth:authReducer,
    alert:alertReducer
    
})

