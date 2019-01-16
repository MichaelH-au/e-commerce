import React, {Component} from 'react';
import { withRouter} from 'react-router-dom';
import $ from "jquery";

class AddToCart extends Component {
    moveToCart(){
        $('#registSucc').modal('hide');
        this.props.history.push('cart')
    }
    moveToHome(){
        $('#registSucc').modal('hide');
        this.props.history.push('home')
    }
    render() {
        return (
            <div>
                <div className="modal fade" id="registSucc" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {this.props.modal_data}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-info" onClick={()=>this.moveToHome()}>Start Shopping</button>
                                <button type="button" className="btn btn-success" onClick={()=>this.moveToCart()}>Go to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(AddToCart);