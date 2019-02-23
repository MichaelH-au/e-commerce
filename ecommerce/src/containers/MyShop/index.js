import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {connect} from 'react-redux'
import ProductManagement from './subpages/proManage'

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infoList:['Product management', 'Order management'],
            listIndex:0,
            showOrderDetail:false
        }
    }

    handlerChanges(key, value) {
        this.setState({
            [key]:value
        })
    }
    render() {
        return (
            <div className='home minHeight'>
                {!this.props.user.isAuth ? <Redirect to='/'></Redirect>:null}
                <div className='pt-3' style={{width:'80%'}}>
                    <div className='row justify-content-center'>
                        <div className="col-2    align-items-start ml-5 flexColumn greyColor">
                            {this.state.infoList.map((item, index)=>(
                                <div className='accountList cursor mb-2' key={index}
                                     onClick={()=>this.handlerChanges('listIndex',index)}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                        <div className="col-9 bg-white greyColor fontSizeSmall">
                            {this.state.listIndex === 0 ? <ProductManagement/> : null}
                            {this.state.listIndex === 1 ? <div>2</div> : null}
                            {this.state.listIndex === 2 ? <div>3</div> : null}
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

const actionCreator = {}



export default connect(mapStateToProps, actionCreator)(Index);