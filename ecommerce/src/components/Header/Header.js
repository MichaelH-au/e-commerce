import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from "../../containers/user/store/actions";
import './header.css'
class Header extends Component {
    render() {
        return (
            <div>
                <div className="row align-items-center navBar m-0" >
                    <div className="col-1 mainIcon text-center">
                        <Link to='/'>
                            <div className='mr-5'>Home</div>
                        </Link>
                    </div>
                    <div className='col-11 text-right'>
                        {this.props.user.isAuth ?
                            <div className="row justify-content-end">
                                <div className='mr-3'>Hello {this.props.user.userName}</div>
                                <Link to={'cart'}>
                                    <div className='cart mr-4'>
                                        <img className='cart' src={require('../../images/Header/cart.png')}/>
                                        <div className='itemCounter p-0'>{this.props.user.products[0].items}</div>
                                    </div>
                                </Link>
                                <div className='mr-5' onClick={this.props.logout}>Logout</div>
                            </div> :
                            <div className="row justify-content-end">
                                <Link to='/login'>
                                    <div className='mr-5'>Login</div>
                                </Link>
                                <Link to='/register'>
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