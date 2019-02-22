import { CHANGE_CATE } from "./constants";
import { GET_PRODUCTS } from "./constants";
import { UPDATE_PRODUCT_LIST } from "./constants";
import { PUSH_PRODUCT_LIST } from "./constants";
import { CHANGE_SEARCHED_PRODUCT } from "./constants";
import axios from "axios";

export function changeCategory(data) {
    return dispatch => {
        dispatch({type:CHANGE_CATE, data})
    }
}

export function getProducts(selectedPriceRange, category) {
    return dispatch => {
        axios.get('/api/products', {params:{offset:0,limit:8,selectedRange:selectedPriceRange, category}})
            .then(res => {
                // console.log(res.data.result)
                dispatch({type:GET_PRODUCTS, data:res.data.result,category})
            })
    }
}
export function searchProducts(selectedPriceRange, keyword) {
    return dispatch => {
        axios.get('/api/products/search', {params:{offset:0,limit:8,selectedRange:selectedPriceRange, keyword}})
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

export function changeSearchedProduct(value) {
    return dispatch => {
        dispatch({type:CHANGE_SEARCHED_PRODUCT, data:value})
    }
}
