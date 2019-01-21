import React, {Component} from 'react';
import {connect} from 'react-redux';
import './account.css'
import UserInfo from './subpages/MyInfo'
import OrderList from './subpages/OrderList'
import ChangePassword from './subpages/ChangePassword'

class MyAccount extends Component {
    constructor(props){
        super(props)
        this.state = {
            infoList:['Info', 'Orders','Change password'],
            listIndex:0
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
                <div className='container pt-3'>
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
                            {this.state.listIndex === 0 ? <UserInfo/> : null}
                            {this.state.listIndex === 1 ? <OrderList/> : null}
                            {this.state.listIndex === 2 ? <ChangePassword/> : null}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user:state.user
    };
}

export default connect(
    mapStateToProps,
)(MyAccount);
