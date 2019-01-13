import { LOGIN_SUCCESS } from "./constants";
import { LOGOUT } from "./constants";
import { ADD_TO_CART } from "./constants";
import { DELETE_CART_ITEM } from "./constants";
import { CREATE_ORDER } from "./constants";

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
    itemInCart:0
}
export default (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload,
                itemInCart:parseInt(action.payload.products[0] ? action.payload.products[0].items:0),
                isAuth: true,
                errorMsg: ''
            }
        case ADD_TO_CART:
            return {...state, itemInCart: state.itemInCart + action.data}
        case DELETE_CART_ITEM:
            return {...state, itemInCart: state.itemInCart - 1}
        case CREATE_ORDER:
            return {...state, itemInCart: state.itemInCart - action.data}
        case LOGOUT:
            return {...defaultState}
        default:
            return state
    }
}