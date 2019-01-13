import React, {Component} from 'react';
import { connect } from 'react-redux'
import axios from "axios";
import './NavBread.css'

class NavBread extends Component {
    handleChange(key, value){
        this.setState({
            [key]:value
        })
    }
    render() {
        return (
            <div className=' bg-white'>
                <div className='container'>
                    <div className='row align-items-center'>
                        <div className='col-3'>
                            <img className='w-75' src={require('../../images/NavBread/logo.jpg')} alt=""/>
                        </div>
                        <div className='col-2 p-0'>
                            <select className="custom-select" onChange={v=>this.handleChange('category',v.target.value)} required>
                                <option value="">Category</option>
                                {this.props.product.category.map((item, index)=>(
                                    <option value={item} key={index}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-6 p-0">
                            <input className='searchInput w-100' type="text" placeholder='Mac Pro'/>
                        </div>
                        <div className="col-1 p-0">
                            <button className='btn btn-warning w-100 pt-2 ml-2 text-white'>Search</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    product:state.product
})
const actionCreator = {}
export default connect(mapStateToProps, actionCreator)(NavBread);