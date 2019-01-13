import { CHANGE_CATE } from "./constants";

export function changeCategory(data) {
    return dispatch => {
        dispatch({type:CHANGE_CATE, data})
    }
}