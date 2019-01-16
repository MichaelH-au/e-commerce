import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from "../../containers/user/store/actions";
import './header.css'
class Header extends Component {
    render() {
        console.log(this.props.user)
        return (
            <div>
                <div className="row align-items-center navBar m-0" >
                    <div className="col-1 mainIcon text-center">
                        <Link to='/' className='text-decoration-none greyColor'>
                            <div className='mr-5'>Home</div>
                        </Link>
                    </div>
                    <div className='col-11 text-right'>
                        {this.props.user.isAuth ?
                            <div className="row justify-content-end greyColor">
                                <div className='mr-3'>Hello {this.props.user.userName}</div>
                                <Link to='/account' className='text-decoration-none greyColor'>
                                    <div className='mr-3'>My Account</div>
                                </Link>
                                <Link to={'cart'} className='text-decoration-none greyColor'>
                                    <div className='cart mr-4'>
                                        <img className='cart' src={require('../../images/Header/cart.png')} alt=''/>
                                        <div className='itemCounter p-0'>{this.props.user.itemInCart}</div>
                                    </div>
                                </Link>
                                <div className='mr-5 cursor' onClick={this.props.logout}>Logout</div>
                            </div> :
                            <div className="row justify-content-end">
                                <Link to='/login' className='text-decoration-none greyColor'>
                                    <div className='mr-5'>Login</div>
                                </Link>
                                <Link to='/register' className='text-decoration-none greyColor'>
                                    <div className='mr-5'>Register</div>
                                </Link>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
const mapStatetoProps = (state)=>({
    user:state.user
})
const actionCreators = { logout } ;
export default connect(mapStatetoProps, actionCreators)(Header);