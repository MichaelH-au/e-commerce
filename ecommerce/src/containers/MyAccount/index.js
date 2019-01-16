import React, {Component} from 'react';
import {connect} from 'react-redux';
import './account.css'
import UserInfo from '../../components/MyInfo'

class MyAccount extends Component {
    constructor(props){
        super(props)
        this.state = {
            infoList:['Info', 'Orders','Change password']
        }
    }
    render() {
        return (
            <div className='home minHeight'>
                <div className='container pt-3'>
                    <div className='row justify-content-center'>
                        <div className="col-2    align-items-start ml-5 flexColumn greyColor">
                            {this.state.infoList.map((item, index)=>(
                                <div className='accountList cursor mb-2' key={index}>{item}</div>
                            ))}
                        </div>
                        <div className="col-7 bg-white greyColor fontSizeSmall">
                            <UserInfo/>
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
