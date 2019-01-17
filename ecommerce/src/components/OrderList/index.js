import React, {Component} from 'react';
import {connect} from 'react-redux';
import { getOrders } from "../../containers/user/store/actions";
import ConfirmList from '../../components/confirmList'

class OrderList  extends Component {
    componentDidMount(){
        this.props.getOrders()
    }
    render() {
        return (
            <div>
                <div className='p-4'>
                    <div className='font-weight-bold'>My Order</div>
                    <hr/>
                    <div className='row text-center fontSizeSmall w-100 cartTitle p-2'>
                        <div className="col-6">Items</div>
                        <div className="col-2">Price</div>
                        <div className="col-2">Quantity</div>
                        <div className="col-2">Subtotal</div>
                    </div>
                    {/*<ItemArea data={this.props.user.orderList}/>*/}
                </div>
                <div className='pl-4 pr-4'>
                    {this.props.user.orderList.map((order,index)=>(
                        <div key={index} className='mb-3'>
                            <div className='row text-center fontSizeSmall w-100 cartTitle p-2'>
                                <div className="col-4 p-0">Order number: {order.orderId}</div>
                                <div className="col-4 p-0">{order.created_at.substring(0,19)}</div>
                                <div className="col-2 p-0">Status: {order.status}</div>
                                <div className="col-2 p-0 text-danger">Total Amount: ${order.orderAmount}</div>
                            </div>
                            <ConfirmList data={order.orderInfo}/>
                        </div>
                    ))}
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

const actionCreators = { getOrders }

export default connect(
    mapStateToProps, actionCreators
)(OrderList );
