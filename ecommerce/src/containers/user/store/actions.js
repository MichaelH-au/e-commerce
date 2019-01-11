import axios from 'axios'
import { LOGIN_SUCCESS } from "./constants";
import { LOGOUT } from "./constants";
import { ERROR_MSG } from "./constants";

function loginSuccess(data) {
    return {type:LOGIN_SUCCESS, payload:data}
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
                    console.log(res.data.data)
                    dispatch(loginSuccess(res.data.data))
                    console.log('req success')
                } else {
                    dispatch(errorMsg(res.data.error))
                }
            })
    }
}

export function logout() {
    return {type:LOGOUT}
}