import axios from 'axios'
import { LOGIN_SUCCESS } from "./constants";
import { LOGOUT } from "./constants";
import { ERROR_MSG } from "./constants";
import { ADD_TO_CART } from "./constants";
import { DELETE_CART_ITEM } from "./constants";
import { CREATE_ORDER } from "./constants";
import { GET_ORDERS } from "./constants";

function loginSuccess(data) {
    return {type:LOGIN_SUCCESS, payload:data}
}

function addToCartSuccess(data) {
    return {type:ADD_TO_CART,data}
}


function deleteFromCartSuccess() {
    return {type:DELETE_CART_ITEM}
}

function createOrderSuccess(data) {
    return {type:CREATE_ORDER,data}
}

function errorMsg(msg) {
    return {msg, type:ERROR_MSG}
}

export function userLogin(username, password) {
    //TODO validation
    if(!username) {
        return dispatch=>dispatch(errorMsg('Username should not be empty'))
    }
    if(!password) {
        return dispatch=>dispatch(errorMsg('Password should not be empty'))
    }
    return dispatch=>{
        axios.post('/api/users/login', {username, password})
            .then(res=>{
                if (res.status === 200 && res.data.data) {
                    // success
                    // console.log('login')
                    // console.log(res.data.data)
                    dispatch(loginSuccess(res.data.data))

                } else {
                    dispatch(errorMsg(res.data.error))
                }
            })
    }
}

export function getUserData() {
    return dispatch=>{
        axios.get('/api/users/userInfo')
            .then(res=>{
                if (res.status === 200 && res.data.data) {
                    dispatch(loginSuccess(res.data.data))

                } else {
                    // dispatch(errorMsg())
                }
            })
    }
}

export function addToCart(user_id,product_id) {
    return dispatch => {
        axios.post('/api/products/addCart', {user_id,product_id,count:1})
            .then(res => {
                if (res.status === 200 && res.data.succ ==='update') {
                    //success
                    dispatch(addToCartSuccess(0))
                } else if (res.status === 200 && res.data.succ ==='new'){
                    dispatch(addToCartSuccess(1))
                }
                else {
                    dispatch(errorMsg(res.data.error))
                }
            })
    }
}

export function deleteFromCart(user_id, product_id) {
    return dispatch => {
        axios.post('/api/users/cart/delete', {user_id,product_id})
            .then(res => {
                if (res.status === 200) {
                    //success
                    dispatch(deleteFromCartSuccess())
                }
                else {
                    dispatch(errorMsg(res.data.error))
                }
            })
    }
}

export function logout() {
    return dispatch=>{
        axios.get('/api/users/logout')
            .then(res => {
                if (res.status === 200) {
                    //success
                    dispatch({type:LOGOUT})
                }
                else {
                    dispatch(errorMsg(res.data.error))
                }
            })
    }
}

export function decreaseCart(data) {
    return dispatch => {
        dispatch(createOrderSuccess(data))
    }
}

/**
 * Actions for order
 * */

export function getOrders() {
    return dispatch => {
        axios.get('/api/users/order')
            .then(res => {
                if (res.status === 200) {
                    //success
                    // console.log('get order')
                    let data = res.data.data
                    data.forEach(order=>{
                        order.orderInfo = JSON.parse(order.orderInfo)
                    })
                    dispatch({type:GET_ORDERS,data:data})
                }
                else {
                    dispatch(errorMsg(res.data.error))
                }
            })
    }
}

