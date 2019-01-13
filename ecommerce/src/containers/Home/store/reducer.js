import { CHANGE_CATE } from "./constants";

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
    ]
}
export default (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_CATE:
            return {...state, category: action.data}
        default:
            return state
    }
}