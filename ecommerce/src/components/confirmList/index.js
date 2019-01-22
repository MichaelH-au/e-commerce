import React, {Component} from 'react';
import {AWS_PRODUCT_IMAGE_PATH} from "../../js/constants/path";

class ComfirmList extends Component {
    render() {
        return (
            <React.Fragment>
                {this.props.data.map((item, index) =>(
                    <div className='row text-center align-items-center cartItemList w-100 greyColor' key={index}>
                        <div className="col-6">
                            <div className='row justify-content-start align-items-center ml-5'>
                                <img className='cartItemImage' src={AWS_PRODUCT_IMAGE_PATH + item.imagePath} alt=""/>
                                <div className='ml-2 greyColor font-weight-bold'>{item.productName}</div>
                            </div>

                        </div>
                        <div className="col-2">${item.productPrice}</div>
                        <div className="col-2">
                            <div className='row justify-content-center'>
                                <div className='w-25 text-center mr-2' >{item.carts.count}</div>
                            </div>
                        </div>
                        <div className="col-2 font-weight-bold">${parseInt(item.carts.count) * parseInt(item.productPrice)}</div>
                    </div>
                ))}
            </React.Fragment>
        );
    }
}

export default ComfirmList
