import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom'
import axios from "axios";
import './cart.css'

class Cart extends Component {

    constructor(props){
        super(props)
        this.state = {
            cartList: []
        }
    }
    componentDidMount(){
        axios.get('/api/users/cart', {params:{user_id:this.props.user.id}})
            .then(res => {
                this.setState({
                    cartList: res.data.data
                })
                console.log(this.state.cartList)
            })
    }
    countChange(index, value, product_id) {
        if (value >= 0) {
            let list = this.state.cartList;
            list[index].carts.count = value
            this.setState({
                cartList:list
            })
            axios.post('/api/users/cart/update', {user_id:this.props.user.id, product_id, count:value})
                .then(res => {
                    console.log(res.data)
                })
        }
    }
    render() {
        console.log(this.props.user)
        return (
            <div>
                {!this.props.user.isAuth ? <Redirect to='/'></Redirect> : null}
                <div className='row text-center mt-5 bg-info text-white'>
                    <div className="col-4">Items</div>
                    <div className="col-2">Price</div>
                    <div className="col-2">Quantity</div>
                    <div className="col-2">Subtotal</div>
                    <div className="col-2">Edit</div>
                </div>
                {this.state.cartList.map((item, index) =>(
                    <div className='row text-center pt-4 cartItemList' key={index}>
                        <div className="col-4">
                            <div className='row justify-content-center align-items-center'>
                                <img className='cartItemImage' src={item.imagePath} alt=""/>
                                <div className='ml-2'>{item.productName}</div>
                            </div>

                        </div>
                        <div className="col-2">{item.productPrice}</div>
                        <div className="col-2">
                            <div className='row justify-content-center'>
                                <button className='btn btn-secondary mr-2' onClick={()=>this.countChange(index,parseInt(item.carts.count) - 1, item.id)}>-</button>
                                <input className='w-25 text-center mr-2' type="text" value={item.carts.count} onChange={(e)=>this.countChange(index,e.target.value, item.id)}/>
                                <button className='btn btn-secondary' onClick={()=>this.countChange(index,parseInt(item.carts.count) + 1, item.id)}>+</button>

                            </div>
                        </div>
                        <div className="col-2">{parseInt(item.carts.count) * parseInt(item.productPrice)}</div>
                        <div className="col-2">Edit</div>
                    </div>
                ))}
                <div className='row text-center mt-5 bg-info text-white align-items-center'>
                    <div className="col-6 ">Select All</div>
                    <div className="col-2">Total: </div>
                    <div className="col-2">{this.state.cartList.reduce((sum,item)=>{
                        return sum + parseInt(item.carts.count) * parseInt(item.productPrice)
                    }, 0)}</div>
                    <button className="col-2 btn btn-danger">CheckOut</button>
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
)(Cart);
