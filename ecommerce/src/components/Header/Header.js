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
                                <div className='mr-5'>Hello {this.props.user.userName}</div>
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