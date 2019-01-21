import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios'
import ErrorMessage from '../../../../components/ErrorMessage/index'

class Index extends Component {
    constructor(props) {
        super(props);
        this.state={
            currentPassword:'',
            newPassword:'',
            confirmedPassword:'',
            changeSucc:false,
            errorMsg:''
        }
    }
    changeHandler(key, value){
        this.setState({
            [key]: value
        })
    }
    changePassword(){
        axios.post('api/users/update/password',{currentPassword:this.state.currentPassword,newpassword:this.state.newPassword})
            .then(value=>{
                console.log(value.data)
                if (value.data.status === 'succ') {
                    this.setState({
                        changeSucc:true
                    })
                }
            })
    }
    render() {
        return (
            <div>
                <div className='p-4'>
                    <div className='font-weight-bold'>Change password</div>
                    <hr/>
                    <div className="row pl-3">
                        <div className="col-2 p-0">
                            <label htmlFor="">Current password:</label>
                        </div>
                        <div className='col-3'><input type="text" onChange={(v)=>this.changeHandler('currentPassword', v.target.value)}/></div>
                    </div>
                    <div className="row pl-3">
                        <div className="col-2 p-0">
                            <label htmlFor="">New password:</label>
                        </div>
                        <div className='col-3'><input type="text" onChange={(v)=>this.changeHandler('newPassword', v.target.value)}/></div>
                    </div>
                    <div className="row pl-3">
                        <div className="col-2 p-0">
                            <label htmlFor="">Confirm password:</label>
                        </div>
                        <div className='col-3'><input type="text" onChange={(v)=>this.changeHandler('confirmedPassword', v.target.value)}/></div>
                    </div>
                    {this.state.changeSucc ?
                        <div className='text-success fontSizeSmall'>You have successfully changed your password!</div>
                        :
                        null
                    }
                    {this.state.errorMsg?
                        <ErrorMessage data={this.state.errorMsg}/>:
                        null
                    }

                    <button className='btn btn-outline-info mt-3 p-0 pl-2 pr-2' onClick={()=>this.changePassword()}>Submit</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(Index);
