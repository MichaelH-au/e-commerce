import React, {Component} from 'react';
import axios from 'axios'
import { connect } from 'react-redux'
import { addToCart } from "../user/store/actions";
import { getProducts } from "./store/actions";
import { updateProductList } from "./store/actions";
import { changeSearchedProduct } from "./store/actions";
import './Home.css'
import AddToCart from '../../components/Modal/AddToCart'
import CateList from './subpages/CateList/CatList'
import Carousel from '../../components/Carousel/Carousel'
import Advertise from './subpages/Advertisement/Advertise'
import ItemArea from '../../components/ItemArea/ItemArea'
//my conflict master confilete new master

//my own code
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
        this.props.getProducts(this.state.selectedPriceRange)
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }
    handleScroll(e) {
        let bottomHeight = document.documentElement.scrollHeight - document.documentElement.scrollTop - window.innerHeight
        if (bottomHeight < 100 && !this.state.loadFinish && !this.state.itemLoading) {
            this.setState({
                itemLoading:true
            })
            let url = this.props.product.searchedProduct ? '/api/products/search' :'/api/products';
            let params = {offset:this.state.itemOffset,limit:4,selectedRange:this.state.selectedPriceRange}
            if (this.props.product.searchedProduct)
                params.keyword = this.props.searchProducts
            axios.get(url, {params})
                .then(res => {
                    if (res.data.result.length < 4) {
                        if (res.data.result.length > 0){
                            console.log(params)
                            this.props.updateProductList('push', res.data.result)
                            this.setState({
                                loadFinish:true,
                                itemLoading:false
                            })
                        } else {
                            this.setState({
                                loadFinish:true,
                                itemLoading:false
                            })
                        }
                    } else {
                        this.props.updateProductList('push', res.data.result)
                        this.setState({
                            itemOffset:this.state.itemOffset + 4,
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
        this.props.getProducts(value, this.props.product.curCategory)
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
        this.props.updateProductList('update',list)
    }
    cancelSearch(){
        this.props.changeSearchedProduct('')
        this.props.getProducts(this.state.selectedPriceRange)
        this.setState({
            itemOffset:8,
            loadFinish:false,
            itemLoading:false,
        })
    }

    render() {
        return (
            <div className='home'>
                <AddToCart modal_body='You have added the product successfully!'/>
                {/*<NavBread/>*/}
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
                    <div className='row justify-content-around mt-3 fontSizeSmall'>
                        {/*<div>Price range</div>*/}
                        <div className='col-4'>
                            <div className='row'>
                                <div className='pl-2 pr-2 sortLabel'>Price range</div>
                                <select name="sord" onChange={(v)=>this.handleChange('selectedPriceRange', v.target.value)}>
                                    <option value="all">All</option>
                                    {this.state.priceFilter.map((price, index) => (
                                        <option value={index} key={index}>
                                            ${price.startPrice} - {price.endPrice}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className='col-3'>
                            <div className='row justify-content-end'>
                                <div className='pl-2 pr-2 sortLabel'>Sort</div>
                                <select name="sord" onChange={(v)=>this.sortChange(v)}>
                                    <option value="">Default</option>
                                    <option value="Highest">Highest</option>
                                    <option value="Lowest">Lowest</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {this.props.product.searchedProduct
                        ?
                        <div className='container  mt-2'>
                            <div className='row'>
                                <div className='greyColor font-weight-light fontSizeSmall align-items-center pt-1'>Search results &nbsp;&nbsp;></div>
                                <div className='ml-2 btn selectItemButton p-0 pr-2' onClick={()=>this.cancelSearch()}>
                                    <div className='row pl-2 align-items-center justify-content-start'>
                                        <div className='col-1 font-weight-light fontSizeSmall'>
                                            item:
                                        </div>
                                        <div className='col ml-1 pr-0 fontSizeSmall text-danger'>
                                            {this.props.product.searchedProduct}
                                        </div>
                                        <div className='col-1 mr-2 greyColor'>x</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        null
                    }
                    {this.props.product.productList.length
                        ?<ItemArea data={this.props.product.productList}/>
                        :<div className='text-center'>
                            <div className='p-2 greyColor fontSizeLarge'>Sorry cannot find result!</div>
                            <img className='w-25 mb-5' src={require('../../images/Home/img-no-cartitems.png')} alt=""/>
                        </div>
                    }
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    user:state.user,
    product:state.product
})
const actionCreators = { addToCart, getProducts, updateProductList, changeSearchedProduct }
export default connect(mapStateToProps, actionCreators)(Home)