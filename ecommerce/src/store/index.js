import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import {reducer as userReducer } from '../containers/user/store'
import {reducer as productReducer } from '../containers/Home/store'

const reducer = combineReducers({
    user:userReducer,
    product:productReducer
})
const store = createStore(reducer, applyMiddleware(thunk))
export default store