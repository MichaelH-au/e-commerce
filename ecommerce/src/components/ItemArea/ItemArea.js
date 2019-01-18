import React, {Component} from 'react';
import {connect} from 'react-redux';
import $ from "jquery";
import { addToCart } from "../../containers/user/store/actions";
import { withRouter} from 'react-router-dom';
import { AWS_PRODUCT_IMAGE_PATH } from "../../js/constants/path";

class ItemArea extends Component {
    addToCart(id){
        let user_id =this.props.user.id;
        let product_id = id;
        this.props.addToCart(user_id, product_id)
        $('#addToCart').modal('show')
    }
    render() {
        return (
            <div>
                <div className='itemArea pb-5'>
                    <div className='row justify-content-center p-0'>
                        {this.props.data.map((item, index) => (
                            <div className='card p-0 mr-3 mt-2 productCards' key={index}>
                                <div className='card-body p-0'>
                                    <div className='itemImage'>
                                        <img className='w-100 h-100' src={AWS_PRODUCT_IMAGE_PATH + item.imagePath} alt=''></img>
                                    </div>
                                </div>
                                <div className='card-footer'>
                                    <div className='text-center text-capitalize fontSizeLarge greyColor'>{item.productName}</div>
                                    <div className="row border-top border-danger justify-content-between align-items-start p-0">
                                        <p className='itemPrice ml-3'>$ {item.productPrice}</p>

                                        <button className='btn btn-danger col-4 p-1 fontSizeSmall' onClick={()=> this.props.user.isAuth ? this.addToCart(item.id) : this.props.history.push('login')}>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        ))}
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

const actionCreator = { addToCart }
export default withRouter(connect(
    mapStateToProps, actionCreator
)(ItemArea));
