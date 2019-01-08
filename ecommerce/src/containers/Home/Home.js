import React, {Component} from 'react';
import axios from 'axios'
import './Home.css'

class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            productList:[],
            priceFilter:[
                {
                    startPrice:'0',
                    endPrice:'500'
                },
                {
                    startPrice:'500',
                    endPrice:'1000'
                },
                {
                    startPrice:'1000',
                    endPrice:'2000'
                },
            ],
            selectedPriceRange:'all'
        }
    }
    componentDidMount() {
        axios.get('http://localhost:1337/api/products')
            .then(res => {
                this.setState({
                    productList:res.data.result
                })
            })
    }

    handleChange(key, value){
        // console.log(key, e.target.value)
        this.setState({
            [key]:value
        })
    }
    render() {
        return (
            <div className='home'>
                <div className='container-fluid '>
                    <div className='row'>
                        <div className='col-2'>
                            <p>Price</p>
                            <a href='#' onClick={()=>this.handleChange('selectedPriceRange','all')} className={this.state.selectedPriceRange==='all'?'active':null}><p>All</p></a>
                            {this.state.priceFilter.map((price, index) => (
                                <a href='#' onClick={()=>this.handleChange('selectedPriceRange',index)} className={this.state.selectedPriceRange===index?'active':null} key={index}>
                                    <p>
                                        {price.startPrice} - {price.endPrice}
                                    </p>
                                </a>
                            ))}
                        </div>
                        <div className="col-10">
                            <div className='row'>
                                {this.state.productList.map((item, index) => (
                                    <div className='card p-0 mr-5 productCards' key={index}>
                                        <div className='card-body p-0'>
                                            <div className='itemImage'>

                                            </div>
                                        </div>
                                        <div className='card-footer'>
                                            <p>Name: {item.productName}</p>
                                            <p>Price: {item.productPrice}</p>
                                            <button className='btn btn-outline-info w-100'>Add to cart</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;