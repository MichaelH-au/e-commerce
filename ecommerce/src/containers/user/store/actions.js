import axios from 'axios'
import { LOGIN_SUCCESS } from "./constants";
import { LOGOUT } from "./constants";
import { ERROR_MSG } from "./constants";
import { ADD_TO_CART } from "./constants";

function loginSuccess(data) {
    return {type:LOGIN_SUCCESS, payload:data}
}

function addToCartSuccess() {
    return {type:ADD_TO_CART}
}

function errorMsg(msg) {
    return {msg, type:ERROR_MSG}
}

export function userLogin(username, password) {
    //TODO validation
    return dispatch=>{
        axios.post('/api/users/login', {username, password})
            .then(res=>{
                if (res.status == 200 && res.data.data) {
                    //success
                    dispatch(loginSuccess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.error))
                }
            })
    }
}

export function addToCart(user_id,product_id) {
    return dispatch => {
        axios.post('/api/products/addCart', {user_id,product_id,count:1})
            .then(res => {
                console.log(res)
                if (res.status == 200 && res.data.succ) {
                    //success
                    console.log('add to cart')
                    dispatch(addToCartSuccess())
                } else {
                    console.log('faile')
                    dispatch(errorMsg(res.data.error))
                }
            })
    }
}

export function logout() {
    return {type:LOGOUT}
}