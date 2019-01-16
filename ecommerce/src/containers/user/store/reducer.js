import { LOGIN_SUCCESS } from "./constants";
import { LOGOUT } from "./constants";
import { ADD_TO_CART } from "./constants";
import { DELETE_CART_ITEM } from "./constants";
import { CREATE_ORDER } from "./constants";
import { ERROR_MSG } from "./constants";

const defaultState = {
    isAuth:false,
    errorMsg:'',
    username:'',
    role:'',
    gender:'',
    date_of_birth:'',
    email:'',
    address:'',
    phone:'',
    itemInCart:0,
    cookieFinish:'false'
}
export default (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload,
                itemInCart:parseInt(action.payload.products[0] ? action.payload.products[0].items:0),
                isAuth: true,
                errorMsg: '',
                cookieFinish:true
            }
        case ADD_TO_CART:
            return {...state, itemInCart: state.itemInCart + action.data,errorMsg: ''}
        case DELETE_CART_ITEM:
            return {...state, itemInCart: state.itemInCart - 1,errorMsg: ''}
        case CREATE_ORDER:
            return {...state, itemInCart: state.itemInCart - action.data,errorMsg: ''}
        case LOGOUT:
            return {...defaultState}
        case ERROR_MSG:
            return {...state, errorMsg:action.msg}
        default:
            return state
    }
}