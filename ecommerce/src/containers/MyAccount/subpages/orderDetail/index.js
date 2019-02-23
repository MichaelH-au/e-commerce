import React, {Component} from 'react';
import ConfirmList from '../../../../components/confirmList/index'

class Index extends Component {
    render() {
        let order = this.props.data
        console.log(order)
        return (
            <div>
                <div className='greyColor fontSizeLarge font-weight-bold mb-3 mt-3 p-0'>Order Detail </div>
                <div className='row mb-2'>
                    <div className='col'>Order Number: {order.orderId}</div>
                    <div className='col'>Create Time: {order.created_at.substring(0,19)}</div>
                </div>
                <div className='row mb-2'>
                    <div className='col'>Receiver: {order.address.contactName}</div>
                    <div className='col'>Address: {order.address.address}</div>
                </div>
                <div className='mb-2'>Order Status: {order.status}</div>
                <div className='container text-center bg-white mt-3 pb-5'>
                    <div className='row text-center fontSizeSmall w-100 cartTitle p-2'>
                        <div className="col-6">Items</div>
                        <div className="col-2">Price</div>
                        <div className="col-2">Quantity</div>
                        <div className="col-2">Subtotal</div>
                    </div>
                    <ConfirmList data={order.orderInfo}/>
                </div>
            </div>
        );
    }
}

export default Index;