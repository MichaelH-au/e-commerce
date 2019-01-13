import React, {Component} from 'react';
import axios from 'axios'
import { connect } from 'react-redux'
import { addToCart } from "../user/store/actions";
import { getProducts } from "./store/actions";
import { updateProductList } from "./store/actions";
import './Home.css'
import AddToCart from '../../components/Modal/addCart'
import $ from 'jquery';
import NavBread from '../../components/NavBread/NavBread'
import CateList from '../../components/CateList/CatList'
import Carousel from '../../components/Carousel/Carousel'
import Advertise from '../../components/Advertisement/Advertise'
import ItemArea from '../../components/ItemArea/ItemArea'

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
        // axios.get('/api/products', {params:{offset:0,limit:8,selectedRange:this.state.selectedPriceRange}})
        //     .then(res => {
        //         this.setState({
        //             productList:res.data.result
        //         })
        //     })
        this.props.getProducts(this.state.selectedPriceRange)
        window.addEventListener('scroll', this.handleScroll.bind(this));
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
                            this.props.updateProductList('push', res.data.result)
                            this.setState({
                                loadFinish:false,
                                // productList:this.state.productList.push(...res.data.result),
                                itemLoading:false
                            })
                        } else {
                            this.setState({
                                loadFinish:true,
                                itemLoading:false
                            })
                        }
                    } else {
                        // let list = this.state.productList;
                        // list.push(...res.data.result);
                        this.props.updateProductList('push', res.data.result)
                        this.setState({
                            itemOffset:this.state.itemOffset + 4,
                            // productList:list,
                            itemLoading:false
                        })
                    }
                })
        }
    }

    handleChange(key, value){
        this.setState({
            [key]:value
        })
        this.props.getProducts(value)
        // axios.get('/api/products', {params:{offset:0,limit:8,selectedRange:value}})
        //     .then(res => {
        //         this.setState({
        //             productList:res.data.result
        //         })
        //     })
    }
    sortChange(e){
        let list = this.props.product.productList;
        list = list.sort(function(a, b) {
            var x = parseInt(a.productPrice);
            var y = parseInt(b.productPrice);
            if (e.target.value === 'Highest')
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
        // if (e.target.value === 'Highest') {
        //     list = list.sort(function(a, b) {
        //         var x = parseInt(a.productPrice);
        //         var y = parseInt(b.productPrice);
        //         return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        //     });
        // } else if (e.target.value === 'Lowest') {
        //     list = list.sort(function(a, b) {
        //         var x = parseInt(a.productPrice);
        //         var y = parseInt(b.productPrice);
        //         return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        //     });
        // }
        this.props.updateProductList('update',list)
    }

    render() {
        return (
            <div className='home'>
                <AddToCart/>
                <NavBread/>
                <div className="row justify-content-center p-0 m-0">
                    <div className="col-2 border border-info p-0">
                        <CateList/>
                    </div>
                    <div className="col-5 p-0">
                        <Carousel/>
                    </div>
                    <div className="col-2">
                        <Advertise/>
                    </div>
                </div>
                <div className='container-fluid '>
                    <div className='row justify-content-center mt-3 '>
                        {/*<div>Price range</div>*/}
                        <div onClick={()=>this.handleChange('selectedPriceRange','all')} className={`cursor col-2 text-center h-100 align-items-center ${this.state.selectedPriceRange==='all'?'priceActive ':''}`}>All</div>

                        {this.state.priceFilter.map((price, index) => (
                            <div onClick={()=>this.handleChange('selectedPriceRange',index)} className={`cursor col-2 text-center h-100 align-items-center ${this.state.selectedPriceRange=== index?'priceActive ':''}`} key={index}>
                                ${price.startPrice} - {price.endPrice}
                            </div>
                        ))}

                        <div className='col-2'>
                            <span>sort by</span>
                            <select name="sord" onChange={(v)=>this.sortChange(v)}>
                                <option value="">Null</option>
                                <option value="Highest">Highest</option>
                                <option value="Lowest">Lowest</option>
                            </select>
                        </div>
                    </div>
                    <ItemArea data={this.props.product.productList}/>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    user:state.user,
    product:state.product
})
const actionCreators = { addToCart, getProducts, updateProductList }
export default connect(mapStateToProps, actionCreators)(Home)