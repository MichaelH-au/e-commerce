import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
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
                    <div className='row align-items-center justify-content-center p-0'>
                        <Link className='col-3 p-0' to='/'>
                            <img className='w-75' src={require('../../images/NavBread/logo.jpg')} alt=""/>
                        </Link>
                        <div className="col-6 p-0">
                            <input className='searchInput w-100' type="text" placeholder='Mac Pro'/>
                        </div>
                        <div className="col-1 p-0">
                            <button className='btn btn-warning w-100 pt-2 text-white searchButton'>Search</button>
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