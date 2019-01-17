import React, {Component} from 'react';
import { Redirect, Link } from 'react-router-dom'
import {connect} from 'react-redux';
import axios from "axios";
import { decreaseCart } from "../user/store/actions";
import { AWS_PRODUCT_IMAGE_PATH } from "../../js/constants/path";
import ConfirmList from '../../components/confirmList'

class OrderConfirm extends Component {
    constructor(props){
        super(props)
        this.state = {
            cartList: [],
            item_total:0,
            shipping:100,
            discount:0,
            tax:0,
            total:0
        }
    }
    componentDidMount() {
        axios.get('/api/users/cart', {params: {user_id: this.props.user.id, status: 'checked'}})
            .then(res => {
                let counter = 0;
                let itemTotal = res.data.data.reduce((sum,item)=>{
                    if (item.carts.status === 'checked')
                        return sum + parseInt(item.carts.count) * parseInt(item.productPrice)
                    return sum
                }, 0)
                let tax = parseInt(itemTotal * 0.2)
                this.setState({
                    cartList: res.data.data,
                    checkoutCounter: counter,
                    item_total:itemTotal,
                    tax:tax,
                    total:itemTotal + tax + this.state.shipping - this.state.discount
                })

            })
    }
    createOrder(){
        let user_id = this.props.user.id;
        let address_id = this.props.location.state.address_id;
        let orderAmount = this.state.total;
        let orderInfo = JSON.stringify(this.state.cartList);
        // this.props.history.push({pathname: '/ordercompleted',state: { key: 11 }})
        axios.post('/api/users/order/create', {user_id, address_id, orderAmount, orderInfo})
            .then(res => {
                this.props.decreaseCart(this.state.cartList.length)
                this.props.history.push({pathname: '/ordercompleted',state: { orderId: res.data.data.orderId, orderAmount:res.data.data.orderAmount }})
            })
    }
    render() {
        return (
            <div className='pb-5 container'>
                {!this.props.user.isAuth && !this.props.user.cookieFinish ? <Redirect to='/'></Redirect> : null}
                <div className="check-step ">
                    <ul>
                        <li className="cur"><span>Confirm</span> address</li>
                        <li className="cur"><span>View your</span> order</li>
                        <li><span>Make</span> payment</li>
                        <li><span>Order</span> confirmation</li>
                    </ul>
                </div>
                <div className="checkout-title ml-5">
                    <h2><span>Order Content</span></h2>
                </div>

                <div className='row text-center mt-2 cartTitle w-100 p-2'>
                    <div className="col-6">Order content</div>
                    <div className="col-2">Price</div>
                    <div className="col-2">Quantity</div>
                    <div className="col-2">Subtotal</div>
                </div>
                <ConfirmList data={this.state.cartList}/>
                <div className="row justify-content-end w-100">
                    <div className="col-2 text-right greyColor">
                        <div>Item subtotal:</div>
                        <div>Shipping:</div>
                        <div>Discount:</div>
                        <div>Tax:</div>
                        <div>Order total:</div>
                    </div>
                    <div className='col-1 text-right mr-2 greyColor'>
                        <div>$ {this.state.item_total}</div>
                        <div>$ {this.state.shipping}</div>
                        <div>$ {this.state.discount}</div>
                        <div>$ {this.state.tax}</div>
                        <div className='text-danger font-weight-bold'>$ {this.state.total}</div>
                    </div>
                </div>
                <div className="row w-100 justify-content-between text-center">
                    <div className='col-2'>
                        <Link to='/address'>
                            <button className='btn btn-outline-success'>Previous</button>
                        </Link>
                    </div>
                    <div className='col-2'>
                        <button className='btn btn-danger w-100' onClick={()=>this.createOrder()}>Payment</button>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user:state.user
    };
}
const actionCreator = { decreaseCart }

export default connect(
    mapStateToProps, actionCreator
)(OrderConfirm);
