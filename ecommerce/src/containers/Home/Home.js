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
            selectedPriceRange:'all',
            itemOffset:8,
            loadFinish:false,
            test:0
        }
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }
    componentDidMount() {
        axios.get('http://localhost:1337/api/products', {params:{offset:0,limit:8}})
            .then(res => {
                this.setState({
                    productList:res.data.result
                })
            })
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }
    handleScroll(e) {
        let bottomHeight = document.documentElement.scrollHeight - document.documentElement.scrollTop - window.innerHeight
        if (bottomHeight < 100 && !this.state.loadFinish) {
            axios.get('http://localhost:1337/api/products', {params:{offset:this.state.itemOffset,limit:8}})
                .then(res => {
                    if (res.data.result.length < 4) {
                        this.setState({
                            loadFinish:true,
                            productList:this.state.productList.push(...res.data.result)
                        })
                    } else {
                        let list = this.state.productList;
                        list.push(...res.data.result);
                        this.setState({
                            itemOffset:this.state.itemOffset + 4,
                            productList:list
                        })
                    }
                })
        }
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
                        <div className='col-2 pl-2'>
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
                                    <div className='card p-0 mr-5 mt-5 productCards' key={index}>
                                        <div className='card-body p-0'>
                                            <div className='itemImage'>
                                                <img className='w-100 h-100' src={item.imagePath}></img>
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
                        <h1>{this.state.test}</h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;