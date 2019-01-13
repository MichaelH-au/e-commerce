import React, {Component} from 'react';
import {connect} from 'react-redux';
import './CatList.css'

class CatList extends Component {
    render() {
        return (
            <div className='bg-white p-2 catListBox'>
                {this.props.product.category.map((item, index) => (
                    <div className='greyColor listItem ' key={index}>{item}</div>
                ))}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        product:state.product
    };
}

export default connect(
    mapStateToProps,
)(CatList);
