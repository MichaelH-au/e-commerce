import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'
import {connect} from 'react-redux';
import './Address.css'
import axios from "axios";

class Address extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addressList:[],
            selectedAddress:null
        }
    }
    componentDidMount(){
        console.log(this.props.user)
        axios.get('/api/users/address', {params:{user_id:this.props.user.id}})
            .then(res => {
                console.log(res.data)
                this.setState({
                    addressList:res.data.data
                })
                console.log(res.data.data)
            })
    }
    handleChange(key, value){
        this.setState({
            [key]:value
        })
    }
    setDefaultAddress(address_id){
        axios.post('/api/users/address/setDefault', {address_id,user_id:this.props.user.id})
            .then(res => {
                console.log(res.data)
                console.log(res.data.data)
            })
        let list = this.state.addressList;
        list.forEach((item)=>{
            if(item.isDefault && item.id != address_id) {
                item.isDefault = 0
            } else if (item.id == address_id) {
                item.isDefault = 1
            }
        })
    }
    deleteAddress(address_id, index){
        axios.post('/api/users/address/delete', {address_id,user_id:this.props.user.id})
            .then(res => {
                console.log(res.data)
                console.log(res.data.data)
            })
        let list = this.state.addressList;
        list.splice(index,1)
        this.setState({
            addressList:list
        })

    }
    render() {
        return (
            <div>
                {!this.props.user.isAuth ? <Redirect to='/'></Redirect> : null}
                <div className="check-step">
                    <ul>
                        <li className="cur"><span>Confirm</span> address</li>
                        <li><span>View your</span> order</li>
                        <li><span>Make</span> payment</li>
                        <li><span>Order</span> confirmation</li>
                    </ul>
                </div>
                <div className="checkout-title ml-5">
                    <h2><span>Shipping address</span></h2>
                </div>
                <div className='row'>
                    {this.state.addressList.map((item, index) =>(
                        <div className={`addressBox text-left flex-column pl-4 ${this.state.selectedAddress === index ? 'activeBorder' : ''}`} onClick={()=>this.handleChange('selectedAddress',index)} key={index}>
                            <div className='mt-2 greyColor'>{item.contactName}</div>
                            <div className='mt-2 greyColor'>{item.address}</div>
                            <div className='mt-2 greyColor'>{item.postCode}</div>
                            <div className='mt-2 greyColor'>{item.phoneNumber}</div>
                            <div className="row justify-content-around mt-2">
                                {item.isDefault ?
                                    <div className='text-warning'>default address</div> :
                                    <div className='text-warning' onClick={()=>this.setDefaultAddress(item.id)}>set address</div>
                                }
                                <img className='deleteIcon' onClick={()=>this.deleteAddress(item.id, index)} src={require("../../images/Cart/trash.png")} alt=""/>
                            </div>
                        </div>
                    ))}
                    <div className='addressBox text-center flex-column'>
                        <div className='w-100'>
                            <img className='addAddressIcon mt-5' src={require("../../images/Address/plus-o.png")} alt=""/>
                        </div>
                        <div className='mt-3 greyColor '>Add new address</div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        user:state.user
    };
}

export default connect(
    mapStateToProps,{}
)(Address);
