import React, {Component} from 'react';
import axios from 'axios'
import { connect } from 'react-redux'
import { addToCart } from "../user/store/actions";
import './Home.css'
import AddToCart from '../../components/Modal/addCart'
import $ from 'jquery';

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
                    endPrice:'5000'
                },
            ],
            selectedPriceRange:'all',
            itemOffset:8,
            loadFinish:false,
            itemLoading:false,
        }
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }
    componentDidMount() {
        axios.get('/api/products', {params:{offset:0,limit:8,selectedRange:this.state.selectedPriceRange}})
            .then(res => {
                this.setState({
                    productList:res.data.result
                })
            })
        window.addEventListener('scroll', this.handleScroll.bind(this));
        console.log(this.props.user)
    }
    handleScroll(e) {
        let bottomHeight = document.documentElement.scrollHeight - document.documentElement.scrollTop - window.innerHeight
        if (bottomHeight < 100 && !this.state.loadFinish && !this.state.itemLoading) {
            this.setState({
                itemLoading:true
            })
            axios.get('/api/products', {params:{offset:this.state.itemOffset,limit:4,selectedRange:this.state.selectedPriceRange},})
                .then(res => {
                    if (res.data.result.length < 4) {
                        if (res.data.result.length > 0){
                            this.setState({
                                loadFinish:false,
                                productList:this.state.productList.push(...res.data.result),
                                itemLoading:false
                            })
                        } else {
                            this.setState({
                                loadFinish:true,
                                itemLoading:false
                            })
                        }
                    } else {
                        let list = this.state.productList;
                        list.push(...res.data.result);
                        this.setState({
                            itemOffset:this.state.itemOffset + 4,
                            productList:list,
                            itemLoading:false
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
        axios.get('/api/products', {params:{offset:0,limit:8,selectedRange:value}})
            .then(res => {
                this.setState({
                    productList:res.data.result
                })
            })
    }
    sortChange(e){
        if (e.target.value === 'Highest') {
            let list = this.state.productList;
            list = list.sort(function(a, b) {
                var x = parseInt(a.productPrice);
                var y = parseInt(b.productPrice);
                return ((x > y) ? -1 : ((x < y) ? 1 : 0));
            });
            this.setState({
                productList:list
            })
        } else if (e.target.value === 'Lowest') {
            let list = this.state.productList;
            list = list.sort(function(a, b) {
                var x = parseInt(a.productPrice);
                var y = parseInt(b.productPrice);
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
            this.setState({
                productList:list
            })

        }
    }

    addToCart(id){
        let user_id =this.props.user.id;
        let product_id = id;
        this.props.addToCart(user_id, product_id)
        $('#addToCart').modal('show')
        // axios.post('/api/products/addCart', {user_id,product_id,count:1})
        //     .then(res => {
        //         console.log(res)
        //     })
    }
    render() {
        return (
            <div className='home'>
                <AddToCart/>
                <div className='container-fluid '>
                    <div className='row justify-content-end'>
                        <div className='col-2'>
                            <span>sort </span>
                            <select name="sord" onChange={(v)=>this.sortChange(v)}>
                                <option value="">Null</option>
                                <option value="Highest">Highest</option>
                                <option value="Lowest">Lowest</option>
                            </select>
                        </div>
                    </div>
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
                                            <button className='btn btn-outline-info w-100' onClick={()=> this.props.user.isAuth ? this.addToCart(item.id) : this.props.history.push('login')}>Add to cart</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/*<h1>{this.state.test}</h1>*/}
                            {this.state.loadFinish ? <h1>No more items</h1> : null}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    user:state.user
})
const actionCreators = { addToCart }
export default connect(mapStateToProps, actionCreators)(Home)