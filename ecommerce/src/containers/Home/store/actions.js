import { CHANGE_CATE } from "./constants";
import { GET_PRODUCTS } from "./constants";
import { UPDATE_PRODUCT_LIST } from "./constants";
import { PUSH_PRODUCT_LIST } from "./constants";
import axios from "axios";

export function changeCategory(data) {
    return dispatch => {
        dispatch({type:CHANGE_CATE, data})
    }
}

export function getProducts(selectedPriceRange, category) {
    return dispatch => {
        console.log(selectedPriceRange)
        console.log(category)
        axios.get('/api/products', {params:{offset:0,limit:8,selectedRange:selectedPriceRange, category}})
            .then(res => {
                console.log(res.data.result)
                dispatch({type:GET_PRODUCTS, data:res.data.result})
            })
    }
}

export function updateProductList(action, data) {
    return dispatch =>{
        switch (action) {
            case 'push':
                dispatch({type:PUSH_PRODUCT_LIST, data})
                break
            case 'update':
                dispatch({type:UPDATE_PRODUCT_LIST, data})
                break
            default:
                break;
        }
    }
}
