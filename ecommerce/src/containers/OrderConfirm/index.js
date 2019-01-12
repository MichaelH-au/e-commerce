import React, {Component} from 'react';
import { Redirect, Link } from 'react-router-dom'
import {connect} from 'react-redux';
import axios from "axios";

class OrderConfirm extends Component {
    // componentWillMount(){
    //     console.log(this.props.location.state)//val值
    // }
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
                let selectAll = true
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

                console.log(this.state.cartList)
            })
    }

    render() {
        return (
            <div>
                {!this.props.user.isAuth ? <Redirect to='/'></Redirect> : null}
                <div className="check-step">
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

                <div className='row text-center mt-2 bg-info text-white w-100'>
                    <div className="col-6">Order content</div>
                    <div className="col-2">Price</div>
                    <div className="col-2">Quantity</div>
                    <div className="col-2">Subtotal</div>
                </div>
                {this.state.cartList.map((item, index) =>(
                    <div className='row text-center pt-4 cartItemList w-100' key={index}>
                        <div className="col-6">
                            <div className='row justify-content-start align-items-center ml-5'>
                                <img className='cartItemImage' src={item.imagePath} alt=""/>
                                <div className='ml-2'>{item.productName}</div>
                            </div>

                        </div>
                        <div className="col-2">{item.productPrice}</div>
                        <div className="col-2">
                            <div className='row justify-content-center'>
                                <div className='w-25 text-center mr-2' >{item.carts.count}</div>
                            </div>
                        </div>
                        <div className="col-2">{parseInt(item.carts.count) * parseInt(item.productPrice)}</div>
                    </div>
                ))}
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
                        <button className='btn btn-danger w-100'>Payment</button>
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

export default connect(
    mapStateToProps,
)(OrderConfirm);
