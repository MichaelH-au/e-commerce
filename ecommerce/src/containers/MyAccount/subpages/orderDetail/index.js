import React, {Component} from 'react';

class Index extends Component {
    render() {
        let order = this.props.data
        console.log(order)
        return (
            <div>
                <div className='greyColor fontSizeLarge font-weight-bold mb-3 mt-3 p-0'>Order Detail </div>
                <div className='row'>
                    <div className='col'>Order Number: {order.orderId}</div>
                    <div className='col'>Create Time: {order.created_at.substring(0,19)}</div>
                </div>
            </div>
        );
    }
}

export default Index;