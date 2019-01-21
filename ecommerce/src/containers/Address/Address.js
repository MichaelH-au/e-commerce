import React, {Component} from 'react';
import { Redirect, Link } from 'react-router-dom'
import {connect} from 'react-redux';
import './Address.css'
import $ from 'jquery';
import axios from "axios";

class Address extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addressList:[],
            selectedAddress:null,
            contactName:'',
            address:'',
            phoneNumber:'',
            postCode:''
        }
    }
    componentDidMount(){
        axios.get('/api/users/address', {params:{user_id:this.props.user.id}})
            .then(res => {
                let selectedIndex = null;
                res.data.data.forEach(item=>{
                    if (item.isDefault) {
                        selectedIndex = item.id;
                        return false;
                    }
                })
                this.setState({
                    addressList:res.data.data,
                    selectedAddress:selectedIndex
                })
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
            })
        let list = this.state.addressList;
        list.forEach((item)=>{
            if(item.isDefault && item.id !== address_id) {
                item.isDefault = 0
            } else if (item.id === address_id) {
                item.isDefault = 1
            }
        })
    }
    deleteAddress(address_id, index){
        axios.post('/api/users/address/delete', {address_id,user_id:this.props.user.id})
            .then(res => {
            })
        let list = this.state.addressList;
        list.splice(index,1)
        this.setState({
            addressList:list
        })
    }
    addNewAddress(){
        let contactName = this.state.contactName
        let address = this.state.address
        let phoneNumber = this.state.phoneNumber
        let postCode = this.state.postCode
        //TODO validation
        axios.post('/api/users/address/create', {contactName,user_id:this.props.user.id,address,phoneNumber,postCode})
            .then(res => {
                $('#exampleModal').modal('hide')
                let list = this.state.addressList;
                list.push(res.data.data)
                this.setState({
                    addressList:list
                })
            })
    }
    render() {
        return (
            <div>
                {!this.props.user.isAuth && !this.props.user.cookieFinish ? <Redirect to='/'></Redirect> : null}

                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">New address</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className='col-5'>
                                    <label>Contact Name</label>
                                    <input type="text" className="form-control"
                                           onChange={v=>this.handleChange('contactName',v.target.value)}
                                           placeholder="Nick" required/>
                                </div>
                                <div className='col-5'>
                                    <label>Contact Number</label>
                                    <input type="text" className="form-control"
                                           onChange={v=>this.handleChange('phoneNumber',v.target.value)}
                                           placeholder="0414978789" required/>
                                </div>
                                <div className='col-5'>
                                    <label>Postcode</label>
                                    <input type="text" className="form-control"
                                           onChange={v=>this.handleChange('postCode',v.target.value)}
                                           placeholder="2000" required/>
                                </div>
                                <div className='col-7'>
                                    <label>Address</label>
                                    <input type="text" className="form-control"
                                           onChange={v=>this.handleChange('address',v.target.value)}
                                           placeholder="UNSW Sydney" required/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={()=>this.addNewAddress()}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/*Modal*/}
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
                <div className='row w-100 greyColor'>
                    {this.state.addressList.map((item, index) =>(
                        <div className={`addressBox text-left flex-column pl-4 mb-3 ${this.state.selectedAddress === item.id ? 'activeBorder' : ''}`}
                             onClick={()=>this.handleChange('selectedAddress',item.id)} key={index}
                        >
                            <div className='mt-2 greyColor'>{item.contactName}</div>
                            <div className='mt-2 greyColor'>{item.address}</div>
                            <div className='mt-2 greyColor'>{item.postCode}</div>
                            <div className='mt-2 greyColor'>{item.phoneNumber}</div>
                            <div className="row justify-content-around mt-2">
                                {item.isDefault
                                    ?
                                    <div className='text-warning'>default address</div>
                                    :
                                    <div className='text-warning' onClick={()=>this.setDefaultAddress(item.id)}>set address</div>
                                }
                                <img className='deleteIcon' onClick={()=>this.deleteAddress(item.id, index)} src={require("../../images/Cart/trash.png")} alt=""/>
                            </div>
                        </div>
                    ))}
                    <div className='addressBox text-center flex-column'>
                        <div className='w-100'>
                            <button className='addAddressIcon mt-5' data-toggle="modal" data-target="#exampleModal">
                                <img className='w-100' src={require("../../images/Address/plus-o.png")} alt=""/>
                            </button>
                        </div>
                        <div className='mt-3 greyColor '>Add new address</div>
                    </div>
                </div>
                <div className='row justify-content-between align-items-center w-100 p-0 mt-5 mb-5'>
                    <div className='col-2 ml-5'>
                        <Link to='/cart'>
                            <button className='btn btn-outline-success'>Previous</button>
                        </Link>
                    </div>
                    <div className='col-2 mr-5'>
                        <Link to={{pathname:'/orderconfirm',
                            state:{address_id:this.state.selectedAddress}
                        }}>
                            <button className='btn btn-danger w-100'>Next</button>
                        </Link>
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
    mapStateToProps,{}
)(Address);
