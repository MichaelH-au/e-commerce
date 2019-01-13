import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";

class OrderCompleted extends Component {
    render() {
        return (
            <div>
                {!this.props.user.isAuth ? <Redirect to='/'></Redirect> : null}
                <div className="check-step">
                    <ul>
                        <li className="cur"><span>Confirm</span> address</li>
                        <li className="cur"><span>View your</span> order</li>
                        <li className="cur"><span>Make</span> payment</li>
                        <li className="cur"><span>Order</span> confirmation</li>
                    </ul>
                </div>
                <div className='row justify-content-center greyColor mt-5'>
                    <div className="col-5 text-center">
                        <div className='mb-3'>Congratulations!</div>
                        <div className='mb-3'>Your order is under processing!</div>
                        <div className='row mb-2'>
                            <div className="col">Order ID: {this.props.location.state.orderId}</div>
                            <div className="col">Order Amount: {this.props.location.state.orderAmount}</div>
                        </div>
                        <div className='row justify-content-around'>
                            <button className='col-5 p-2 btn btn-outline-success' onClick={()=>this.props.history.push('login')}>Cart List</button>
                            <button className='col-5 p-2 btn btn-outline-info'>Order List</button>
                        </div>

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
)(OrderCompleted);
