import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Redirect, Link } from 'react-router-dom'
import axios from "axios";
import { deleteFromCart } from "../user/store/actions";
import './cart.css'

class Cart extends Component {

    constructor(props){
        super(props)
        this.state = {
            cartList: [],
            selectAll:true,
            checkoutCounter:0
        }
    }
    componentDidMount(){
        axios.get('/api/users/cart', {params:{user_id:this.props.user.id}})
            .then(res => {
                let counter = 0;
                let selectAll = true
                res.data.data.forEach(item => {
                    if (item.carts.status === 'checked'){
                        counter++;
                    } else {
                        selectAll = false
                    }
                })
                this.setState({
                    cartList: res.data.data,
                    checkoutCounter:counter,
                    selectAll
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
    checkboxHandler(index, value, product_id){
        let list = this.state.cartList;
        list[index].carts.status = value;
        let counter = value === 'checked' ? 1 : -1
        this.setState({
            cartList:list,
            checkoutCounter:this.state.checkoutCounter + counter
        })
        axios.post('/api/users/cart/update', {user_id:this.props.user.id, product_id, status:value})
            .then(res => {
                console.log(res.data)
            })
    }
    deleteItem(product_id, index){
        console.log(product_id)
        this.props.deleteFromCart(this.props.user.id,product_id)
        let list = this.state.cartList
        list.splice(index,1)
        this.setState({
            cartList:list,
            checkoutCounter:this.state.checkoutCounter - 1
        })
    }
    selectAll(){

        let list = this.state.cartList;
        list.forEach(item =>{
            item.carts.status = this.state.selectAll ? 'pending' : 'checked'
        })
        let count = this.state.selectAll ? 0 :this.state.cartList.length
        axios.post('/api/users/cart/selectAll', {user_id:this.props.user.id, selectAll:!this.state.selectAll})
            .then(res => {
                console.log(res.data)
            })
        this.setState({
            cartList:list,
            selectAll:!this.state.selectAll,
            checkoutCounter: count
        })
    }
    render() {
        console.log(this.props.user)
        return (
            <div className='minHeight'>
                {!this.props.user.isAuth ? <Redirect to='/'></Redirect> : null}
                <div className='row text-center mt-5 bg-info text-white w-100'>
                    <div className="col-4">Items</div>
                    <div className="col-2">Price</div>
                    <div className="col-2">Quantity</div>
                    <div className="col-2">Subtotal</div>
                    <div className="col-2">Edit</div>
                </div>
                {this.state.cartList.map((item, index) =>(
                    <div className='row text-center pt-4 cartItemList w-100 greyColor' key={index}>
                        <div className="col-4">
                            <div className='row justify-content-start align-items-center'>
                                {item.carts.status === 'pending' ?
                                    <img className='checkBox' onClick={()=>this.checkboxHandler(index, 'checked', item.id)} src={require('../../images/Cart/check_box_outline_blank.png')} alt=""/> :
                                    <img className='checkBox' onClick={()=>this.checkboxHandler(index, 'pending', item.id)} src={require('../../images/Cart/check_box.png')} alt=""/>
                                }
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
                        <div className="col-2" onClick={()=>this.deleteItem(item.id, index)}><img className='deleteIcon' src={require('../../images/Cart/trash.png')} alt=""/></div>
                    </div>
                ))}
                <div className='row text-center mt-5 bg-info text-white align-items-center w-100 p-0'>
                    <div className="col-6 ">
                        {!this.state.selectAll ?
                            <img className='checkBox border-dark' onClick={() => this.selectAll()}  src={require('../../images/Cart/check-box-blank.png')} alt=""/> :
                            <img className='checkBox bg-white' onClick={() => this.selectAll()} src={require('../../images/Cart/check_box.png')} alt=""/>
                        }
                        Select All
                    </div>
                    <div className="col-2">Total: </div>
                    <div className="col-2">{this.state.cartList.reduce((sum,item)=>{
                        if (item.carts.status === 'checked')
                        return sum + parseInt(item.carts.count) * parseInt(item.productPrice)
                        return sum
                    }, 0)}</div>


                    <button className={this.state.checkoutCounter ? "col-2 btn btn-danger text-white" :"col-2 btn btn-secondary text-white"} disabled={!this.state.checkoutCounter}>
                        <Link to='/address'>
                            <div className='w-100'>
                                Checkout
                            </div>
                        </Link>
                    </button>
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
const actionCreator = { deleteFromCart }
export default connect(
    mapStateToProps,
    actionCreator
)(Cart);
