import React, {Component} from 'react';
import {connect} from 'react-redux';
import NewProductForm from './newProductForm'

class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newProduct:false
        }
    }
    showCreateProductForm(){
        this.setState({
            newProduct:true
        })
    }
    render() {
        return (
            <div className='p-3'>
                <div className='row'>
                    <div className='fontSizeLarge mt-2 col-10'>Product Management {this.state.newProduct ? '--Add New Product' : null}</div>
                    <button className='col-2 btn btn-primary fontSizeSmall p-0' onClick={() => this.showCreateProductForm()}>
                        <div className='fontSizeLarge'>+ Add Product</div>
                    </button>
                </div>
                {this.state.newProduct
                    ?
                    <NewProductForm/>
                    :
                    <div>product list</div>
                }

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(MyComponent);
