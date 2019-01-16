import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Redirect,Link } from 'react-router-dom'
import { userLogin } from "./store/actions";
import ErrorMessage from '../../components/ErrorMessage'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
        this.userLogin = this.userLogin.bind(this);
    }
    handleChange(key, e) {
        this.setState({
            [key]: e.target.value
        })
    }
    userLogin(){
        let username = this.state.username;
        let password = this.state.password;
        this.props.userLogin(username, password)
    }
    render() {
        return (
            <div className='mb-5'>
                {this.props.user.isAuth ? <Redirect to='/'></Redirect>:null}
                <div className='row justify-content-center p-0 mt-5 w-100 pb-5' >
                    <div className='col-lg-3'>
                        <img className='w-100 h-50 text-center mb-5' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBA4WRlfQj-vdSIMYpkEQ-pd3g286Cj_p08Xb54rEDrx3pPFmh" alt=""/>
                        {this.props.msg?<h6 style={{color:'red'}}>{this.props.msg}</h6>:null}
                        {this.props.user.errorMsg ?
                            <ErrorMessage data={this.props.user.errorMsg}/>:
                            null
                        }
                        <label htmlFor="inputEmail" className="sr-only">Username</label>
                        <input  type='text' className="form-control mb-4" placeholder="Username" onChange={v=>this.handleChange('username',v)} required autoFocus/>
                        <label  className="sr-only">Password</label>
                        <input type="password"  className="form-control mb-1" placeholder="Password" onChange={v=>this.handleChange('password',v)} required/>
                        <Link to='register' className='text-decoration-none'>
                            <div className='text-right mb-2'>register</div>
                        </Link>
                        <button className="btn btn-lg btn-primary btn-block" style={{backgroundColor:'#5c7c92', borderRadius:'15px'}} onClick={this.userLogin}>Login</button>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state)=>({
    user:state.user
})
const actionCreators = { userLogin };
export default connect(mapStateToProps, actionCreators)(Login);