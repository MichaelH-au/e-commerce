import React, {Component} from 'react';
import {connect} from 'react-redux';
import { getProducts } from "../../store/actions";
import './CatList.css'

class CatList extends Component {
    constructor(props){
        super(props)
        this.state={
            selectCate : null
        }
    }

    changeHandler(key, index, value){
        this.setState({
            [key]:index
        })
        this.props.getProducts('all', value)
    }
    render() {
        return (
            <div className='bg-white catListBox'>
                {this.props.product.category.map((item, index) => (
                    <div className={`greyColor listItem fontSizeSmall p-2 ${this.state.selectCate === index ? 'listActive':''}`}
                         onClick={()=>this.changeHandler('selectCate',index, item)} key={index}>{item}</div>
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

const actionCreator = { getProducts }

export default connect(
    mapStateToProps, actionCreator
)(CatList);
