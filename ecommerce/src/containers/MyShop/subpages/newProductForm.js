import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios'

class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productName:'',
            productPrice:'',
            productCat:'Cameras',
            category:[
                'Cameras',
                'Computers, Tablets & Network Hardware',
                'DVD, Blu-ray & Home Cinema',
                'Home Audio Stereos, Components',
                'Jewellery & Watches',
                'Keyboards, Mice & Pointers',
                'Outdoor',
                'Phones & Accessories',
                'Portable Audio & Headphones'
            ],
        }
    }
    changeHandler(key, value) {
        this.setState({
            [key]:value
        })
    }
    submit(){
        let file = this.refs.file.files[0]
        let param = new FormData()
        console.log(this.state.productCat)
        param.append('file', file)
        param.append('productName',this.state.productName)
        param.append('productPrice',this.state.productPrice)
        param.append('productCategory',this.state.productCat)
        let config = {headers:{'Content-Type':'multipart/form-data'}}
        axios.post('/api/users/product/create',param, config)
            .then(data=>{
                console.log(data)
            }).catch(error => {
                console.log(error)
        })
    }
    render() {
        return (
            <div className='mt-5'>
                <div className='row mb-2'>
                    <div className='col-2'>Product Name</div>
                    <div className='col-4'><input className='w-100' type="text" onChange={(e) =>this.changeHandler('productName', e.target.value)}/></div>
                </div>
                <div className='row mb-2'>
                    <div className='col-2'>Product Category</div>
                    <div className='col-4 '>
                        <select onChange={e =>this.changeHandler('productCat',e.target.value)} >
                            {this.state.category.map((val) => (
                                <option value={val} key={val}>{val}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='row mb-2'>
                    <div className='col-2'>Product Price</div>
                    <div className='col-4'><input className='w-100' type="text" onChange={(e) =>this.changeHandler('productPrice', e.target.value)}/></div>
                </div>
                <div className='row mb-2'>
                    <div className='col-2'>Product Image</div>
                    <div className='col-4'><input ref='file' className='w-100' type="file"/></div>
                </div>
                <button className='btn btn-primary p-0 pl-2 pr-2' onClick={() => this.submit()}>Submit</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(MyComponent);
