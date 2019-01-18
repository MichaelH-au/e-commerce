import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchProducts } from "../../containers/Home/store/actions";
import { changeSearchedProduct } from "../../containers/Home/store/actions";
import './NavBread.css'

class NavBread extends Component {
    constructor(props) {
        super(props);
        this.state={
            searchValue:''
        }
    }

    handleChange(key, value){
        this.setState({
            [key]:value
        })
    }
    searchItem(){
        console.log(this.state.searchValue)
        this.props.searchProducts('all',this.state.searchValue)
        this.props.changeSearchedProduct(this.state.searchValue)
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
                            <input className='searchInput w-100 pl-3' type="text" placeholder='Mac Pro' onChange={(v)=>this.handleChange('searchValue', v.target.value)}/>
                        </div>
                        <div className="col-1 p-0">
                            <button className='btn btn-warning w-100 pt-2 text-white searchButton' onClick={()=>this.searchItem()}>Search</button>
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
const actionCreator = { searchProducts, changeSearchedProduct }

export default connect(mapStateToProps, actionCreator)(NavBread);