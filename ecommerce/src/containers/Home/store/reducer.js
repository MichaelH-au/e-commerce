import { CHANGE_CATE } from "./constants";
import { GET_PRODUCTS } from "./constants";
import { UPDATE_PRODUCT_LIST } from "./constants";
import { PUSH_PRODUCT_LIST } from "./constants";
import { CHANGE_SEARCHED_PRODUCT } from "./constants";

const defaultState = {
    curCategory:'All',
    category:[
        'Cameras',
        'Computers, Tablets & Network Hardware',
        'DVD, Blu-ray & Home Cinema',
        'Home Audio Stereos, Components',
        'Jewellery & Watches',
        'Keyboards, Mice & Pointers',
        'Outdoor',
        'Phones & Accessories',
        'Portable Audio & Headphones'
    ],
    productList:[],
    searchedProduct:''
}
export default (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_CATE:
            return {...state, category: action.data}
        case GET_PRODUCTS:
            return {...state, productList: action.data,curCategory:action.category}
        case PUSH_PRODUCT_LIST:
            return {...state, productList: [...state.productList, ...action.data]}
        case UPDATE_PRODUCT_LIST:
            return {...state, productList: action.data}
        case CHANGE_SEARCHED_PRODUCT:
            return {...state, searchedProduct: action.data}
        default:
            return state
    }
}