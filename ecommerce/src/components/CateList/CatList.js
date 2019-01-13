import React, {Component} from 'react';
import {connect} from 'react-redux';
import './CatList.css'

class CatList extends Component {
    constructor(props){
        super(props)
        this.state={
            selectCate : null
        }
    }

    changeHandler(key, value){
        this.setState({
            [key]:value
        })
    }
    render() {
        return (
            <div className='bg-white catListBox'>
                {this.props.product.category.map((item, index) => (
                    <div className={`greyColor listItem fontSizeSmall p-2 ${this.state.selectCate === index ? 'listActive':''}`} onClick={(v)=>this.changeHandler('selectCate',index)} key={index}>{item}</div>
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
