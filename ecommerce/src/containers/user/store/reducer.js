import { LOGIN_SUCCESS } from "./constants";
import { LOGOUT } from "./constants";

const defaultState = {
    isAuth:false,
    errorMsg:'',
    username:'',
    role:'',
    gender:'',
    date_of_birth:'',
    email:'',
    address:'',
    phone:''
}
export default (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isAuth: true,
                errorMsg: ''
            }
        case LOGOUT:
            return {...defaultState}
        default:
            return state

    }
}